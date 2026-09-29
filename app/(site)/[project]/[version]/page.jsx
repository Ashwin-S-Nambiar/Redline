import { marked } from 'marked';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ViewTransition } from 'react';
import CopyLink from '@/components/CopyLink';
import Footer from '@/components/Footer';
import { Back } from '@/components/Icons';
import Keys from '@/components/Keys';
import ProjectLinks from '@/components/ProjectLinks';
import RevisionMark from '@/components/RevisionMark';
import TitleBlock from '@/components/TitleBlock';
import { getAll, getRelease } from '@/lib/data';
import {
  commitUrl,
  formatDate,
  isoDay,
  KIND_LABEL,
  releasePath,
} from '@/lib/format';
import { projectCells } from '@/lib/project-cells';
import { projectIcon } from '@/lib/project-icons';

export async function generateStaticParams() {
  const { releases } = await getAll();
  return releases.map((r) => ({ project: r.project, version: r.version }));
}

export async function generateMetadata({ params }) {
  const { project, version } = await params;
  const found = await getRelease(project, decodeURIComponent(version));
  if (!found) return { title: 'Not found' };
  const { release: r } = found;
  return {
    title: `${r.name} ${r.version}`,
    description: `${r.title}. ${r.changes
      .slice(0, 3)
      .map((c) => c.text)
      .join(' ')}`.slice(0, 200),
    alternates: { canonical: releasePath(r) },
  };
}

function Pager({ r, step, label }) {
  if (!r)
    return (
      <span className="grid min-w-0 content-start gap-1 p-4 text-lead opacity-50">
        <span className="caption">{label}</span>
        <span className="text-sm">None</span>
      </span>
    );
  return (
    <Link
      href={releasePath(r)}
      data-step={step}
      className="grid min-w-0 content-start gap-1 p-4 transition-colors hover-fine:bg-(--hover)"
    >
      <span className="caption">
        {label} ·{' '}
        <span className="mono tracking-normal normal-case">{r.version}</span>
      </span>
      <span className="truncate text-sm font-semibold">{r.title}</span>
    </Link>
  );
}

export default async function ReleasePage({ params }) {
  const { project: slug, version } = await params;
  const found = await getRelease(slug, decodeURIComponent(version));
  if (!found) notFound();
  const { project, release: r, newer, older } = found;
  const groups = Object.keys(KIND_LABEL)
    .map((k) => [k, r.changes.filter((c) => c.kind === k)])
    .filter(([, list]) => list.length);
  const notes = r.notes ? marked.parse(r.notes, { async: false }) : '';
  const isLatest = !newer;
  return (
    <div className="page">
      <main className="min-w-0">
        <div className="flex items-center justify-between gap-3 border-b border-graphite px-2 py-2">
          <Link
            href={`/${slug}`}
            className="btn quiet"
            aria-label={`Back to ${project.name}`}
          >
            <Back size={16} />
            {project.name}
          </Link>
          <CopyLink path={releasePath(r)} />
        </div>
        <article className={`relative ${isLatest ? 'cloud' : ''}`}>
          <header className="grid grid-cols-[46px_minmax(0,1fr)] gap-x-3 px-4 pt-8 pb-6 min-[720px]:grid-cols-[64px_minmax(0,1fr)] min-[720px]:gap-x-0 min-[720px]:pr-8 min-[720px]:pl-0">
            <div className="flex justify-center pt-1">
              <ViewTransition
                name={`delta-${r.id}`}
                share="morph"
                default="none"
              >
                <RevisionMark n={r.rev} size={40} />
              </ViewTransition>
            </div>
            <div className="min-w-0 min-[720px]:px-4">
              <p className="flex flex-wrap items-baseline gap-x-2.5">
                <span className="letter text-[13px] text-lead">
                  {project.name}
                </span>
                <span className="mono text-[13px] font-semibold">
                  {r.version}
                </span>
              </p>
              <h1 className="mt-2 text-[26px] leading-[1.15] font-bold tracking-[-0.01em] text-balance min-[720px]:text-[32px]">
                <ViewTransition
                  name={`title-${r.id}`}
                  share="morph"
                  default="none"
                >
                  <span>{r.title}</span>
                </ViewTransition>
              </h1>
              <p className="mono mt-3 text-xs text-lead">
                <time
                  dateTime={isoDay(r.date)}
                  className="font-semibold text-graphite"
                >
                  {formatDate(r.date)}
                </time>{' '}
                · revision {r.rev} of {project.count}
              </p>
            </div>
          </header>
          <div className="grid gap-7 px-4 pb-10 min-[720px]:pr-8 min-[720px]:pl-20">
            {groups.map(([k, list]) => (
              <section key={k} className="grid gap-2.5">
                <h2 className="kind border-b border-(--rule) pb-1.5 text-graphite">
                  {KIND_LABEL[k]}
                </h2>
                <ul className="grid list-[square] gap-2 pl-5 text-[15.5px] leading-normal marker:text-lead">
                  {list.map((c) => (
                    <li key={c.text} className="text-pretty">
                      {c.text}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            {notes ? (
              <section className="grid gap-2.5">
                <h2 className="kind border-b border-(--rule) pb-1.5 text-graphite">
                  Notes
                </h2>
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: notes }}
                />
              </section>
            ) : null}
            {r.commits.length ? (
              <section className="grid gap-2.5">
                <h2 className="kind border-b border-(--rule) pb-1.5 text-graphite">
                  Commits
                </h2>
                <ul className="mono flex flex-wrap gap-x-4 gap-y-1.5 text-[13px]">
                  {r.commits.map((c) => (
                    <li key={c}>
                      <a
                        className="link"
                        href={commitUrl(project.repo, c)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {c}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </article>
        <nav
          aria-label="Other revisions"
          className="grid grid-cols-2 border-y border-graphite [&>*+*]:border-l [&>*+*]:border-graphite"
        >
          <Pager r={older} step="older" label="Older" />
          <Pager r={newer} step="newer" label="Newer" />
        </nav>
        <Footer />
      </main>
      <aside className="side end" aria-label={`About ${project.name}`}>
        <div className="only-wide grid gap-4 px-5.5 pt-6">
          <h2 className="caption">This drawing</h2>
          <p className="text-[13.5px] leading-normal text-pretty text-lead">
            {project.blurb}
          </p>
          <ProjectLinks project={project} />
        </div>
        <div className="mt-auto">
          <TitleBlock
            name={project.name}
            icon={projectIcon(project.slug)}
            cells={projectCells(project)}
          />
        </div>
      </aside>
      <Keys up={`/${slug}`} />
    </div>
  );
}
