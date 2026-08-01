const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const dir = path.join(process.cwd(), 'public', 'Slideshow');
const generator = path.join(process.cwd(), 'scripts', 'generate-slideshow-manifest.cjs');

let timer = null;

function regen() {
  console.log('[slideshow-watcher] Regenerating slideshow manifest...');
  const p = spawn(process.execPath, [generator], { stdio: 'inherit' });
  p.on('error', (err) => console.error('[slideshow-watcher] spawn error', err));
}

if (!fs.existsSync(dir)) {
  try {
    fs.mkdirSync(dir, { recursive: true });
    console.log('[slideshow-watcher] created missing directory', dir);
  } catch (err) {
    console.error('[slideshow-watcher] failed to create directory', err);
  }
}

console.log('[slideshow-watcher] watching', dir);

try {
  const watcher = fs.watch(dir, { persistent: true }, (eventType, filename) => {
    // Debounce multiple events
    if (!filename) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log('[slideshow-watcher] change detected:', eventType, filename.toString());
      regen();
    }, 200);
  });

  process.on('SIGINT', () => {
    watcher.close();
    process.exit(0);
  });
} catch (err) {
  console.error('[slideshow-watcher] watch failed:', err);
}
