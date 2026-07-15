import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { neon } from '@neondatabase/serverless';
import { list } from '@vercel/blob';

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const at = line.indexOf('=');
    if (at < 1) continue;
    const key = line.slice(0, at).trim();
    let value = line.slice(at + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    if (!(key in process.env)) process.env[key] = value;
  }
}

const root = process.cwd();
loadEnv(path.join(root, '.env'));
loadEnv(path.join(root, '.env.local'));

const results = [];
const add = (service, ok, detail) => results.push({ service, status: ok ? 'พร้อม' : 'มีปัญหา', detail });
const withTimeout = (promise, ms, label) => Promise.race([
  promise,
  new Promise((_, reject) => setTimeout(() => reject(new Error(`${label} ใช้เวลานานเกิน ${Math.round(ms / 1000)} วินาที`)), ms)),
]);

const databaseUrl = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
if (!databaseUrl) add('Neon', false, 'ไม่พบ DATABASE_URL');
else {
  try {
    const sql = neon(databaseUrl);
    const rows = await withTimeout(
      sql`select current_database() as database_name, to_regclass('public.admin_users') is not null as schema_ready`,
      10000,
      'Neon',
    );
    const row = rows[0];
    add('Neon', true, `ฐานข้อมูล ${row.database_name}; schema ${row.schema_ready ? 'พร้อม' : 'ยังไม่พร้อม'}`);
  } catch (error) {
    add('Neon', false, error instanceof Error ? error.message : String(error));
  }
}

const authSecret = process.env.AUTH_SECRET ?? '';
add('Admin Auth', authSecret.length >= 32, authSecret.length >= 32 ? 'AUTH_SECRET พร้อม' : 'AUTH_SECRET ต้องยาวอย่างน้อย 32 ตัวอักษร');

const blobToken = process.env.BLOB_READ_WRITE_TOKEN ?? '';
if (!blobToken) add('Vercel Blob', false, 'ไม่พบ BLOB_READ_WRITE_TOKEN');
else {
  try {
    await withTimeout(list({ limit: 1, token: blobToken }), 10000, 'Vercel Blob');
    add('Vercel Blob', true, 'เชื่อม Blob Store สำเร็จ');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    add('Vercel Blob', false, message.includes('does not exist') ? 'Token ไม่ตรงกับ Blob Store หรือ Store ถูกลบ' : message);
  }
}

console.table(results);
process.exit(results.some((item) => item.status !== 'พร้อม') ? 1 : 0);
