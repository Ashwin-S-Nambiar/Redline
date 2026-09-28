import { getAll } from '@/lib/data';
import ReleaseList from './ReleaseList';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Revisions' };

export default async function AdminHome() {
  const { projects, releases } = await getAll();
  return (
    <ReleaseList
      releases={releases}
      projects={projects.map((p) => ({ slug: p.slug, name: p.name }))}
    />
  );
}
