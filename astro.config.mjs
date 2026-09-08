import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://zealedfujoshi.xyz',
  trailingSlash: 'ignore',

  integrations: [react(), tailwind()],

  vite: {
    ssr: {
      noExternal: ['lucide-react'],
    },
  },

  build: {
    format: 'file',
  },

  integrations: [react(), tailwind()],
});