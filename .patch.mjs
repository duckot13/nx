import { readFileSync, writeFileSync } from 'node:fs';

// usage: node .patch.mjs <file> <markerStart>
// reads OLD and NEW from env vars PATCH_OLD / PATCH_NEW (base64) to avoid shell mangling
const file = process.argv[2];
const oldStr = Buffer.from(process.env.PATCH_OLD, 'base64').toString('utf8');
const newStr = Buffer.from(process.env.PATCH_NEW, 'base64').toString('utf8');
const content = readFileSync(file, 'utf8');
const count = content.split(oldStr).length - 1;
if (count === 0) {
  console.error('OLD string not found in ' + file);
  process.exit(2);
}
if (count > 1) {
  console.error('OLD string not unique (' + count + ' matches) in ' + file);
  process.exit(3);
}
writeFileSync(file, content.replace(oldStr, newStr));
console.log('PATCHED ' + file);
