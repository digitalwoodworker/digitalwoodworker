const fs = require('fs');
const path = require('path');

function generate() {
  const dir = path.join(process.cwd(), 'public', 'Slideshow');
  let files = [];
  try {
    files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp|avif|gif)$/i.test(f)).sort();
  } catch (err) {
    // ignore
  }

  const outDir = path.join(process.cwd(), 'public');
  const outPath = path.join(outDir, 'slideshow-manifest.json');
  try {
    fs.writeFileSync(outPath, JSON.stringify(files, null, 2));
    console.log('Wrote slideshow manifest with', files.length, 'entries');
  } catch (err) {
    console.error('Failed to write slideshow manifest:', err);
    process.exitCode = 1;
  }
}

generate();
