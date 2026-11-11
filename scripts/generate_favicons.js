const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_DIR = path.resolve(__dirname, '..');
const srcImage = path.join(ROOT_DIR, 'public', 'logo.webp');

async function generate() {
  console.log('Generating favicons from', srcImage);

  // 1. Generate 32x32 PNG
  const png32 = await sharp(srcImage)
    .resize(32, 32, { fit: 'cover' })
    .png()
    .toBuffer();

  // 2. Generate 16x16 PNG
  const png16 = await sharp(srcImage)
    .resize(16, 16, { fit: 'cover' })
    .png()
    .toBuffer();

  // 3. Generate 180x180 apple-touch-icon
  const png180 = await sharp(srcImage)
    .resize(180, 180, { fit: 'cover' })
    .png()
    .toBuffer();

  // 4. Generate 256x256 logo.png
  const pngLogo = await sharp(srcImage)
    .resize(256, 256, { fit: 'cover' })
    .png()
    .toBuffer();

  // 5. Construct valid ICO file containing 32x32 PNG
  // ICONDIR header (6 bytes)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(1, 4); // 1 image

  // ICONDIRENTRY (16 bytes)
  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0); // width 32
  entry.writeUInt8(32, 1); // height 32
  entry.writeUInt8(0, 2);  // color palette (0 = no palette)
  entry.writeUInt8(0, 3);  // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bpp
  entry.writeUInt32LE(png32.length, 8); // size of image data
  entry.writeUInt32LE(22, 12); // offset (6 + 16 = 22)

  const icoBuffer = Buffer.concat([header, entry, png32]);

  // Write all files to public/
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'favicon.png'), png32);
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'favicon-32x32.png'), png32);
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'favicon-16x16.png'), png16);
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'logo.png'), pngLogo);

  // Also write to .vitepress/dist/ if it exists so preview is immediately updated
  const distDir = path.join(ROOT_DIR, '.vitepress', 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'favicon.ico'), icoBuffer);
    fs.writeFileSync(path.join(distDir, 'favicon.png'), png32);
    fs.writeFileSync(path.join(distDir, 'favicon-32x32.png'), png32);
    fs.writeFileSync(path.join(distDir, 'favicon-16x16.png'), png16);
    fs.writeFileSync(path.join(distDir, 'apple-touch-icon.png'), png180);
    fs.writeFileSync(path.join(distDir, 'logo.png'), pngLogo);
  }

  console.log('Successfully generated favicon.ico, favicon.png, apple-touch-icon.png, and logo.png!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
