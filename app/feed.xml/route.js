import { getAll } from '@/lib/data';
import { atom } from '@/lib/feed';

export const dynamic = 'force-static';

export async function GET() {
  const { projects, releases } = await getAll();
  const repos = Object.fromEntries(projects.map((p) => [p.slug, p.repo]));
  return atom({
    title: 'Redline · Every project',
    path: '/feed.xml',
    releases,
    repos,
  });
}
