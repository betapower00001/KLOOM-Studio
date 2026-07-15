import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const text = line.startsWith('export ') ? line.slice(7).trim() : line;
    const at = text.indexOf('=');
    if (at < 1) continue;
    const key = text.slice(0, at).trim();
    let value = text.slice(at + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

function splitSql(source) {
  const out = [];
  let current = '';
  let single = false;
  let double = false;
  let lineComment = false;
  let blockComment = false;
  let dollar = null;

  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i];
    const next = source[i + 1];

    if (lineComment) {
      current += ch;
      if (ch === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      current += ch;
      if (ch === '*' && next === '/') {
        current += next;
        i += 1;
        blockComment = false;
      }
      continue;
    }
    if (dollar) {
      if (source.startsWith(dollar, i)) {
        current += dollar;
        i += dollar.length - 1;
        dollar = null;
      } else current += ch;
      continue;
    }
    if (single) {
      current += ch;
      if (ch === "'" && next === "'") {
        current += next;
        i += 1;
      } else if (ch === "'") single = false;
      continue;
    }
    if (double) {
      current += ch;
      if (ch === '"' && next === '"') {
        current += next;
        i += 1;
      } else if (ch === '"') double = false;
      continue;
    }

    if (ch === '-' && next === '-') {
      current += ch + next;
      i += 1;
      lineComment = true;
    } else if (ch === '/' && next === '*') {
      current += ch + next;
      i += 1;
      blockComment = true;
    } else if (ch === "'") {
      current += ch;
      single = true;
    } else if (ch === '"') {
      current += ch;
      double = true;
    } else if (ch === '$') {
      const match = source.slice(i).match(/^\$[A-Za-z_][A-Za-z0-9_]*\$|^\$\$/);
      if (match) {
        dollar = match[0];
        current += dollar;
        i += dollar.length - 1;
      } else current += ch;
    } else if (ch === ';') {
      if (current.trim()) out.push(current.trim());
      current = '';
    } else current += ch;
  }

  if (current.trim()) out.push(current.trim());
  return out.filter((statement) => {
    const normalized = statement.replace(/^\s*(?:--[^\n]*\n\s*)+/g, '').trim().toLowerCase();
    return normalized && normalized !== 'begin' && normalized !== 'commit';
  });
}

async function runFile(sql, file) {
  const statements = splitSql(fs.readFileSync(file, 'utf8'));
  console.log(`กำลังรัน ${path.basename(file)} (${statements.length} คำสั่ง)`);
  await sql.transaction(statements.map((statement) => sql.query(statement)));
  console.log(`สำเร็จ: ${path.basename(file)}`);
}

async function main() {
  const root = process.cwd();
  loadEnv(path.join(root, '.env'));
  loadEnv(path.join(root, '.env.local'));

  const url =
  process.env.DATABASE_URL_UNPOOLED ??
  process.env.POSTGRES_URL_NON_POOLING ??
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL;
  if (!url) throw new Error('ไม่พบ DATABASE_URL กรุณารัน `vercel env pull .env.local` ก่อน');

  const mode = process.argv[2] ?? 'all';
  if (!['all', 'schema', 'seed'].includes(mode)) throw new Error('โหมดไม่ถูกต้อง');

  const sql = neon(url);
  await sql`select 1`;
  console.log('เชื่อมต่อ Neon สำเร็จ');

  if (mode === 'all' || mode === 'schema') await runFile(sql, path.join(root, 'database', 'schema.sql'));
  if (mode === 'all' || mode === 'seed') await runFile(sql, path.join(root, 'database', 'seed.sql'));

  if (mode === 'all') {
    const initialEmail = (process.env.INITIAL_ADMIN_EMAIL ?? '').trim().toLowerCase();
    const initialPassword = process.env.INITIAL_ADMIN_PASSWORD ?? '';
    if (initialEmail && initialPassword) {
      if (initialPassword.length < 8) {
        throw new Error('INITIAL_ADMIN_PASSWORD ต้องมีอย่างน้อย 8 ตัวอักษร');
      }
      const passwordHash = await bcrypt.hash(initialPassword, 12);
      await sql`
        insert into public.admin_users (email, password_hash, display_name, is_active)
        values (${initialEmail}, ${passwordHash}, 'KLOOM Admin', true)
        on conflict (email) do update
        set password_hash = excluded.password_hash,
            display_name = excluded.display_name,
            is_active = true
        returning id
      `;
      console.log(`สร้างหรืออัปเดตบัญชีผู้ดูแล ${initialEmail} สำเร็จ`);
    } else {
      console.log('ข้ามการสร้างผู้ดูแล: ยังไม่ได้ตั้ง INITIAL_ADMIN_EMAIL/INITIAL_ADMIN_PASSWORD');
    }
  }

  const [count] = await sql`
    select
      (select count(*)::int from public.product_categories) as categories,
      (select count(*)::int from public.products) as products,
      (select count(*)::int from public.product_variants) as variants,
      (select count(*)::int from public.articles) as articles,
      (select count(*)::int from public.portfolio_items) as portfolio_items
  `;
  console.log('ติดตั้งฐานข้อมูลเสร็จแล้ว');
  console.table(count);
}

main().catch((error) => {
  console.error('ติดตั้งฐานข้อมูลไม่สำเร็จ');
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
