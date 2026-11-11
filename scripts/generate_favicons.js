const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const toIco = require('to-ico');

const ROOT_DIR = path.resolve(__dirname, '..');
const srcImage = path.join(ROOT_DIR, 'public', 'logo.webp');

async function generate() {
  console.log('Generating favicons from', srcImage);

  // 1. Generate PNGs of various sizes
  const png16 = await sharp(srcImage).resize(16, 16, { fit: 'cover' }).png().toBuffer();
  const png32 = await sharp(srcImage).resize(32, 32, { fit: 'cover' }).png().toBuffer();
  const png48 = await sharp(srcImage).resize(48, 48, { fit: 'cover' }).png().toBuffer();
  const png180 = await sharp(srcImage).resize(180, 180, { fit: 'cover' }).png().toBuffer();
  const pngLogo = await sharp(srcImage).resize(256, 256, { fit: 'cover' }).png().toBuffer();

  // 2. Generate valid multi-resolution ICO file
  const icoBuffer = await toIco([png16, png32, png48]);

  // 3. Write all files to public/
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'favicon.png'), png32);
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'favicon-32x32.png'), png32);
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'favicon-16x16.png'), png16);
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'logo.png'), pngLogo);

  // Also write directly to .vitepress/dist/ if it exists so preview is immediately updated
  const distDir = path.join(ROOT_DIR, '.vitepress', 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'favicon.ico'), icoBuffer);
    fs.writeFileSync(path.join(distDir, 'favicon.png'), png32);
    fs.writeFileSync(path.join(distDir, 'favicon-32x32.png'), png32);
    fs.writeFileSync(path.join(distDir, 'favicon-16x16.png'), png16);
    fs.writeFileSync(path.join(distDir, 'apple-touch-icon.png'), png180);
    fs.writeFileSync(path.join(distDir, 'logo.png'), pngLogo);
  }

  console.log('Successfully generated multi-res favicon.ico (16,32,48), PNGs, apple-touch-icon, and logo.png!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
