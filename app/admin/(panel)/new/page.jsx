import { getAll } from '@/lib/data';
import Editor from '../Editor';
import { editorProjects } from '../editor-projects';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'New revision' };

export default async function NewRelease({ searchParams }) {
  const { project } = await searchParams;
  const { projects } = await getAll();
  return (
    <Editor
      projects={editorProjects(projects)}
      defaultProject={typeof project === 'string' ? project : undefined}
    />
  );
}
