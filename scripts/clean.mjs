import fs from 'node:fs';
import path from 'node:path';

for (const name of ['.next', 'node_modules/.cache']) {
  const target = path.join(process.cwd(), name);
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
    console.log(`ลบ ${name} แล้ว`);
  }
}
