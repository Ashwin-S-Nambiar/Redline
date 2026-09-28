import localFont from 'next/font/local';

export const osifont = localFont({
  src: './fonts/osifont.woff2',
  variable: '--font-osifont',
  weight: '400',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['Arial Narrow', 'Arial', 'sans-serif'],
});

export const atkinson = localFont({
  src: './fonts/atkinson-hyperlegible-next.woff2',
  variable: '--font-atkinson',
  weight: '200 800',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

export const azeret = localFont({
  src: './fonts/azeret-mono.woff2',
  variable: '--font-azeret',
  weight: '100 900',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['ui-monospace', 'Menlo', 'monospace'],
});
