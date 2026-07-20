import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const publicDir = join(root, 'public');

const entries = [
  ['index.html', 'index.html'],
  ['script.js', 'script.js'],
  ['styles.css', 'styles.css'],
  ['assets', 'assets'],
  ['realisations', 'realisations'],
  ['agence', 'agence'],
];

await rm(publicDir, { recursive: true, force: true });
await mkdir(publicDir, { recursive: true });

await Promise.all(
  entries.map(([source, destination]) =>
    cp(join(root, source), join(publicDir, destination), { recursive: true }),
  ),
);
