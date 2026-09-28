import { notFound } from 'next/navigation';
import { getAll } from '@/lib/data';
import Editor from '../Editor';
import { editorProjects } from '../editor-projects';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Edit revision' };

export default async function EditRelease({ params }) {
  const { id } = await params;
  const { projects, releases } = await getAll();
  const release = releases.find((r) => r.id === id);
  if (!release) notFound();
  return (
    <Editor
      key={release.id}
      projects={editorProjects(projects)}
      release={release}
    />
  );
}
