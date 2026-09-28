import './globals.css';
import Tips from '@/components/Tips';
import { DESCRIPTOR, NAME, SITE } from '@/lib/format';
import { atkinson, azeret, osifont } from './fonts';

const title = `${NAME} · ${DESCRIPTOR}`;
const description =
  'Every release of every project Ashwin builds, newest first, with what was added, changed, fixed and removed.';

export const metadata = {
  metadataBase: new URL(SITE),
  title: { default: title, template: `%s · ${NAME}` },
  description,
  applicationName: NAME,
  alternates: {
    canonical: '/',
    types: {
      'application/atom+xml': [
        { url: '/feed.xml', title: `${NAME} · Every project` },
      ],
    },
  },
  openGraph: {
    type: 'website',
    siteName: NAME,
    title,
    description,
    url: SITE,
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'The Redline register of revisions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.jpg'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-32.png', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  themeColor: '#e7eae3',
  colorScheme: 'light',
};

const reveal = `(()=>{const d=document.documentElement;d.classList.add('wait');const go=()=>d.classList.remove('wait');setTimeout(go,600);document.fonts&&document.fonts.ready.then(go)})()`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-GB"
      className={`${osifont.variable} ${atkinson.variable} ${azeret.variable}`}
      style={{ background: '#e7eae3' }}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: reveal }} />
      </head>
      <body>
        {children}
        <Tips />
      </body>
    </html>
  );
}
