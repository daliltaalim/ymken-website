import { access, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(root, 'public');
const html = await readFile(join(outputDir, 'index.html'), 'utf8');
const imageSources = [...html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)].map(
  ([, source]) => source,
);

if (imageSources.length === 0) {
  throw new Error('No <img> elements found in the generated index.html.');
}

const requiredImages = [
  'assets/premium/ChatGPT Image 21 juil. 2026, 00_59_50.png',
  'assets/premium/ChatGPT Image 21 juil. 2026, 01_00_33.png',
  'assets/premium/ChatGPT Image 21 juil. 2026, 01_00_47.png',
  'assets/premium/ChatGPT Image 21 juil. 2026, 01_01_10.png',
  'assets/premium/ChatGPT Image 21 juil. 2026, 01_01_24.png',
  'assets/premium/ChatGPT Image 21 juil. 2026, 01_01_36.png',
  'assets/premium/ChatGPT Image 21 juil. 2026, 01_01_54.png',
  'assets/premium/ChatGPT Image 21 juil. 2026, 01_06_10.png',
  'assets/fondateur-nadi-tarik.jpeg',
];

for (const requiredImage of requiredImages) {
  if (!imageSources.includes(requiredImage)) {
    throw new Error(`Required image is not referenced by an <img>: ${requiredImage}`);
  }
}

for (const source of new Set(imageSources)) {
  if (/^(?:[a-z]+:)?\/\//i.test(source) || source.startsWith('data:')) continue;

  const pathname = decodeURIComponent(source.split(/[?#]/, 1)[0]).replace(/^\//, '');
  await access(join(outputDir, pathname));
}

console.log(
  `Verified ${imageSources.length} <img> references, including all ${requiredImages.length} required images.`,
);
