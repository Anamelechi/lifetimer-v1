#!/usr/bin/env node
/**
 * Icon generator to create required PWA icons from a base PNG, or synthesize
 * a simple branded icon if no base is provided.
 *
 * Usage:
 *   node scripts/generate-icons.js [optional/path/to/source.png]
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = process.argv[2] || path.join(process.cwd(), 'public', 'icons', 'source.png');
const outDir = path.join(process.cwd(), 'public', 'icons');

function svgIcon(size) {
  // Simple rounded-square with gradient and "LT" monogram centered
  const radius = Math.round(size * 0.2);
  const fontSize = Math.round(size * 0.44);
  const textY = Math.round(size * 0.68);
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" role="img">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0ea5e9"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" fill="url(#g)"/>
    <g fill="#ffffff" font-family="system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'" font-weight="700" font-size="${fontSize}">
      <text x="50%" y="${textY}" text-anchor="middle" >LT</text>
    </g>
  </svg>`;
}

async function writeFromSVG(size, filePath) {
  const svg = svgIcon(size);
  const buf = Buffer.from(svg);
  await sharp(buf)
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(filePath);
}

(async () => {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const sizes = [192, 512, 180];
  const names = {
    192: ['icon-192.png', 'maskable-192.png'],
    512: ['icon-512.png', 'maskable-512.png'],
    180: ['apple-touch-icon.png']
  };

  const hasSource = fs.existsSync(SRC);
  if (!hasSource) {
    console.log('No base icon found at', SRC, '- generating a simple branded icon.');
  }

  for (const size of sizes) {
    let base;
    if (hasSource) {
      base = sharp(SRC).resize(size, size, { fit: 'cover' });
    }
    for (const name of names[size]) {
      const outPath = path.join(outDir, name);
      if (hasSource) {
        await base.clone().png({ compressionLevel: 9, quality: 90 }).toFile(outPath);
      } else {
        await writeFromSVG(size, outPath);
      }
      console.log('Wrote', path.relative(process.cwd(), outPath));
    }
  }
})();
