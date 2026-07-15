import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { neon } from "@neondatabase/serverless";

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const raw of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const text = line.startsWith("export ") ? line.slice(7).trim() : line;
    const at = text.indexOf("=");
    if (at < 1) continue;
    const key = text.slice(0, at).trim();
    let value = text.slice(at + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

function splitSql(source) {
  const statements = [];
  let current = "";
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
      if (ch === "\n") lineComment = false;
      continue;
    }
    if (blockComment) {
      current += ch;
      if (ch === "*" && next === "/") {
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

    if (ch === "-" && next === "-") {
      current += ch + next;
      i += 1;
      lineComment = true;
    } else if (ch === "/" && next === "*") {
      current += ch + next;
      i += 1;
      blockComment = true;
    } else if (ch === "'") {
      current += ch;
      single = true;
    } else if (ch === '"') {
      current += ch;
      double = true;
    } else if (ch === "$") {
      const match = source.slice(i).match(/^\$[A-Za-z_][A-Za-z0-9_]*\$|^\$\$/);
      if (match) {
        dollar = match[0];
        current += dollar;
        i += dollar.length - 1;
      } else current += ch;
    } else if (ch === ";") {
      if (current.trim()) statements.push(current.trim());
      current = "";
    } else current += ch;
  }

  if (current.trim()) statements.push(current.trim());
  return statements;
}

async function main() {
  const root = process.cwd();
  loadEnv(path.join(root, ".env"));
  loadEnv(path.join(root, ".env.local"));

  const url =
    process.env.DATABASE_URL_UNPOOLED ??
    process.env.POSTGRES_URL_NON_POOLING ??
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL;

  if (!url) throw new Error("ไม่พบ DATABASE_URL ใน .env.local");

  const file = path.join(root, "database", "PORTFOLIO_REVIEW_LINK_UPDATE.sql");
  if (!fs.existsSync(file)) throw new Error("ไม่พบ database/PORTFOLIO_REVIEW_LINK_UPDATE.sql");

  const sql = neon(url);
  await sql`select 1`;
  console.log("เชื่อมต่อ Neon สำเร็จ");

  const statements = splitSql(fs.readFileSync(file, "utf8"));
  await sql.transaction(statements.map((statement) => sql.query(statement)));

  const [result] = await sql`
    select count(*)::int as portfolio_items
    from public.portfolio_items
  `;

  console.log("เพิ่มลิงก์รีวิวและผูกข้อมูลผลงานเดิมเรียบร้อยแล้ว");
  console.table(result);
}

main().catch((error) => {
  console.error("อัปเดตลิงก์รีวิวของผลงานไม่สำเร็จ");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
