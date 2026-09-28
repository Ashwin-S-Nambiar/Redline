import { getAll } from '@/lib/data';
import ProjectForms from './ProjectForms';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Projects' };

export default async function AdminProjects() {
  const { projects } = await getAll();
  return (
    <ProjectForms projects={projects.map(({ latest, first, ...p }) => p)} />
  );
}
