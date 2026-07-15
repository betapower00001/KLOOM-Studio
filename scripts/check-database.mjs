import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { neon } from '@neondatabase/serverless';

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const at = line.indexOf('=');
    if (at < 1) continue;
    const key = line.slice(0, at).trim();
    let value = line.slice(at + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnv(path.join(process.cwd(), '.env'));
loadEnv(path.join(process.cwd(), '.env.local'));

const url =
  process.env.DATABASE_URL_UNPOOLED ??
  process.env.POSTGRES_URL_NON_POOLING ??
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL;
if (!url) {
  console.error('ไม่พบ DATABASE_URL หรือ POSTGRES_URL');
  process.exit(1);
}

try {
  const sql = neon(url);
  const rows = await sql`
    select
      current_database() as database_name,
      current_user as database_user,
      to_regclass('public.admin_users') is not null as schema_ready,
      to_regclass('public.portfolio_items') is not null as portfolio_ready,
      case when to_regclass('public.products') is not null
        then (select count(*)::int from public.products)
        else 0
      end as product_count
  `;
  console.log('เชื่อมต่อ Neon สำเร็จ');
  console.table(rows[0]);
} catch (error) {
  console.error('เชื่อมต่อ Neon ไม่สำเร็จ');
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
