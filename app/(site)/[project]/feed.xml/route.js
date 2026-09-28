import { getAll, getProject } from '@/lib/data';
import { atom } from '@/lib/feed';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const { projects } = await getAll();
  return projects.map((p) => ({ project: p.slug }));
}

export async function GET(_request, { params }) {
  const { project: slug } = await params;
  const found = await getProject(slug);
  if (!found) return new Response('Not found', { status: 404 });
  const { project, releases } = found;
  return atom({
    title: `${project.name} · Redline`,
    path: `/${slug}/feed.xml`,
    releases,
    repos: { [slug]: project.repo },
  });
}
