import { SITE } from '@/lib/format';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin' },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
