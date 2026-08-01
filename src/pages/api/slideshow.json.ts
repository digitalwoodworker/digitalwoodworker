import fs from 'fs';
import path from 'path';

export async function get() {
  try {
    const dir = path.join(process.cwd(), 'public', 'Slideshow');
    const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp|avif|gif)$/i.test(f)).sort();
    return new Response(JSON.stringify(files), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
