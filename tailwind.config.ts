import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {},
  },

  plugins: [typography, daisyui],

  daisyui: {
    themes: [
      'light',
      'dark',
      {
        snags: {
          primary: '#FF8D00',
          secondary: '#8F4F00',
          accent: '#607d8b',
          neutral: '#3d4451',
          base: '#ffffff',
          info: '#2196f3',
          success: '#4caf50',
          warning: '#ff9800',
          error: '#f44336',
        },
      },
    ],
  },
} as Config;
