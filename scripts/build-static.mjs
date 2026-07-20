import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const publicDir = join(root, 'public');
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212663357039';

if (!/^\d+$/.test(whatsappNumber)) {
  throw new Error('NEXT_PUBLIC_WHATSAPP_NUMBER must contain digits only.');
}

const entries = [
  ['index.html', 'index.html'],
  ['styles.css', 'styles.css'],
  ['assets', 'assets'],
];

await rm(publicDir, { recursive: true, force: true });
await mkdir(publicDir, { recursive: true });

await Promise.all(
  entries.map(([source, destination]) =>
    cp(join(root, source), join(publicDir, destination), { recursive: true }),
  ),
);

const clientScript = await readFile(join(root, 'script.js'), 'utf8');
await writeFile(
  join(publicDir, 'script.js'),
  clientScript.replace('__WHATSAPP_NUMBER__', whatsappNumber),
);
