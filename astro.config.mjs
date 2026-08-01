// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  base: import.meta.env.PROD ? '/digitalwoodworker/' : '/',
  vite: {
    plugins: [tailwindcss()]
  }
});