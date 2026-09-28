import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Keys from '@/components/Keys';
import Legend from '@/components/Legend';
import ProjectLinks from '@/components/ProjectLinks';
import Register from '@/components/Register';
import TitleBlock from '@/components/TitleBlock';
import { kindCounts } from '@/lib/counts';
import { getAll, getProject } from '@/lib/data';
import { projectCells } from '@/lib/project-cells';

export async function generateStaticParams() {
  const { projects } = await getAll();
  return projects.map((p) => ({ project: p.slug }));
}

export async function generateMetadata({ params }) {
  const { project: slug } = await params;
  const found = await getProject(slug);
  if (!found) return { title: 'Not found' };
  const { project } = found;
  return {
    title: project.name,
    description: `Every release of ${project.name}, with what was added, changed, fixed and removed.`,
    alternates: {
      canonical: `/${slug}`,
      types: {
        'application/atom+xml': [
          { url: `/${slug}/feed.xml`, title: `${project.name} · Redline` },
        ],
      },
    },
  };
}

export default async function ProjectPage({ params }) {
  const { project: slug } = await params;
  const found = await getProject(slug);
  if (!found) notFound();
  const { project, releases } = found;
  const counts = kindCounts(releases);
  return (
    <div className="page">
      <main className="min-w-0">
        <header className="border-b border-graphite px-4 pt-6 pb-5 min-[720px]:pt-8 min-[720px]:pr-6 min-[720px]:pb-7 min-[720px]:pl-20">
          <h1 className="letter text-[32px] leading-none min-[720px]:text-[44px]">
            {project.name}
          </h1>
          {project.formerly.length ? (
            <p className="mt-2 text-[13px] text-lead">
              Formerly{' '}
              <span className="letter tracking-[0.08em]">
                {project.formerly.join(', ')}
              </span>
            </p>
          ) : null}
          <p className="mt-2.5 max-w-[56ch] text-pretty">{project.blurb}</p>
          <ProjectLinks project={project} className="mt-4" />
        </header>
        {releases.length ? (
          <Register
            releases={releases}
            repos={{ [slug]: project.repo }}
            showProject={false}
          />
        ) : (
          <p className="px-4 py-10 text-lead min-[720px]:pl-20">
            No revisions on this drawing yet.
          </p>
        )}
        <Footer />
      </main>
      <aside className="side" aria-label={`About ${project.name}`}>
        <div className="only-wide grid gap-6 px-[22px] pt-6">
          <Legend counts={counts} />
        </div>
        <div className="mt-auto">
          <TitleBlock
            name={project.name}
            description={project.blurb}
            cells={projectCells(project)}
          />
        </div>
        <div className="only-narrow">
          <Legend counts={counts} compact />
        </div>
      </aside>
      <Keys up="/" />
    </div>
  );
}
