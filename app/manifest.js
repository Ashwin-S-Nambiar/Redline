export default function manifest() {
  return {
    name: 'Redline',
    short_name: 'Redline',
    description: 'What changed in everything Ashwin builds',
    start_url: '/',
    display: 'standalone',
    background_color: '#e7eae3',
    theme_color: '#e7eae3',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/icon-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
