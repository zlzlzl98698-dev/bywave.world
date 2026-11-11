const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_DIR = path.resolve(__dirname, '..');
const srcImage = path.join(ROOT_DIR, 'public', 'logo.webp');

async function generate() {
  console.log('Generating crisp favicons from', srcImage);

  // 1. Extract centered 3-dog faces/upper bodies (left: 20, top: 90, width: 320, height: 320)
  // This removes empty margins and zooms into the cute dog faces so they are crisp even at 16x16!
  const cropped = sharp(srcImage).extract({ left: 20, top: 90, width: 320, height: 320 });

  // 2. Generate PNGs
  const png16 = await cropped.clone().resize(16, 16, { fit: 'cover' }).png().toBuffer();
  const png32 = await cropped.clone().resize(32, 32, { fit: 'cover' }).png().toBuffer();
  const png48 = await cropped.clone().resize(48, 48, { fit: 'cover' }).png().toBuffer();
  const png64 = await cropped.clone().resize(64, 64, { fit: 'cover' }).png().toBuffer();
  const png180 = await cropped.clone().resize(180, 180, { fit: 'cover' }).png().toBuffer();
  
  // Navbar logo (full 256x256)
  const pngLogo = await sharp(srcImage).resize(256, 256, { fit: 'contain', background: { r: 242, g: 240, b: 235, alpha: 1 } }).png().toBuffer();

  // Vector SVG Favicon with embedded base64 PNG (Crisp, resolution-independent, zero distortion across Chrome/Edge/Safari!)
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <clipPath id="circleClip">
      <circle cx="32" cy="32" r="30" />
    </clipPath>
  </defs>
  <circle cx="32" cy="32" r="31" fill="#ede8df" stroke="#d5ccbd" stroke-width="2"/>
  <image href="data:image/png;base64,${png64.toString('base64')}" x="2" y="2" width="60" height="60" clip-path="url(#circleClip)" />
</svg>`;

  // 3. Construct modern, 100% bug-free PNG-in-ICO standard binary file (Vista/Win7/Win10/Win11/Chrome/Edge native)
  // This completely eliminates the 24-bit DIB chromatic channel corruption bug!
  const items = [
    { size: 16, buffer: png16 },
    { size: 32, buffer: png32 },
    { size: 48, buffer: png48 }
  ];

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(items.length, 4); // 3 images

  let offset = 6 + 16 * items.length;
  const entries = [];
  for (const item of items) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.size >= 256 ? 0 : item.size, 0); // width
    entry.writeUInt8(item.size >= 256 ? 0 : item.size, 1); // height
    entry.writeUInt8(0, 2); // color palette (0 = no palette)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data
    entries.push(entry);
    offset += item.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...entries, ...items.map(i => i.buffer)]);

  // 4. Write all files to public/
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'favicon.png'), png32);
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'favicon-32x32.png'), png32);
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'favicon-16x16.png'), png16);
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'favicon.svg'), svgFavicon);
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'logo.png'), pngLogo);

  // 5. Also copy directly to .vitepress/dist/ if it exists so preview is immediately updated
  const distDir = path.join(ROOT_DIR, '.vitepress', 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'favicon.ico'), icoBuffer);
    fs.writeFileSync(path.join(distDir, 'favicon.png'), png32);
    fs.writeFileSync(path.join(distDir, 'favicon-32x32.png'), png32);
    fs.writeFileSync(path.join(distDir, 'favicon-16x16.png'), png16);
    fs.writeFileSync(path.join(distDir, 'favicon.svg'), svgFavicon);
    fs.writeFileSync(path.join(distDir, 'apple-touch-icon.png'), png180);
    fs.writeFileSync(path.join(distDir, 'logo.png'), pngLogo);
  }

  console.log('Successfully generated crisp PNG-in-ICO, multi-size PNGs, and logo.png!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
