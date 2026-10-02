import { getAll } from '@/lib/data';
import { releasePath, SITE } from '@/lib/format';

export const revalidate = 60;

export default async function sitemap() {
  const { projects, releases } = await getAll();
  return [
    { url: SITE, lastModified: releases[0]?.date },
    ...projects
      .filter((p) => p.count)
      .map((p) => ({ url: `${SITE}/${p.slug}`, lastModified: p.latest.date })),
    ...releases.map((r) => ({
      url: `${SITE}${releasePath(r)}`,
      lastModified: r.date,
    })),
  ];
}
