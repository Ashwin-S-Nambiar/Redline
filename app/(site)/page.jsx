import Footer from '@/components/Footer';
import Keys from '@/components/Keys';
import Legend from '@/components/Legend';
import Register from '@/components/Register';
import TitleBlock from '@/components/TitleBlock';
import { kindCounts } from '@/lib/counts';
import { getAll } from '@/lib/data';
import { DESCRIPTOR, formatDate } from '@/lib/format';

export default async function Home() {
  const { projects, releases } = await getAll();
  const repos = Object.fromEntries(projects.map((p) => [p.slug, p.repo]));
  const live = projects.filter((p) => p.count > 0);
  return (
    <div className="page">
      <main className="min-w-0">
        <header className="page-intro border-b border-graphite px-4 pt-6 pb-5 min-[720px]:pt-8 min-[720px]:pr-6 min-[720px]:pb-7 min-[720px]:pl-20">
          <h1 className="letter text-[32px] leading-none min-[720px]:text-[44px]">
            Revisions
          </h1>
          <p className="mt-2.5 max-w-[48ch] text-lead">
            Selected changes across my projects, newest first. What each project
            is lives in{' '}
            <a className="link" href="https://notes.ashwin.co.in">
              my notes
            </a>
            ; what changed and when lives here.
          </p>
          <p className="mt-2 max-w-[52ch] text-[13px] leading-normal text-lead">
            Selected product changes from {live.length} projects. Open a project
            to see the dates covered; its code has the full commit history.
          </p>
        </header>
        <Register releases={releases} repos={repos} />
        <Footer />
      </main>
      <aside className="side" aria-label="About this changelog">
        <div className="only-wide grid gap-6 px-5.5 pt-6">
          <p className="text-[13.5px] leading-normal text-lead">
            <b className="font-semibold text-graphite">How to read this.</b>{' '}
            Each project is a drawing. Each entry is a numbered revision. The
            newest one is clouded in red.
          </p>
          <Legend counts={kindCounts(releases)} />
          <p className="text-xs text-lead">
            <kbd className="mono">J</kbd> and <kbd className="mono">K</kbd> step
            through revisions.
          </p>
        </div>
        <div className="mt-auto">
          <TitleBlock
            className="home"
            name="All projects"
            description={DESCRIPTOR}
            cells={[
              { label: 'Drawn by', value: 'Ashwin' },
              { label: 'Projects', value: live.length, mono: true },
              {
                label: 'Last revised',
                value: releases[0] ? formatDate(releases[0].date) : '·',
                mono: true,
              },
              { label: 'Revisions', value: releases.length, mono: true },
            ]}
          />
        </div>
        <div className="only-narrow">
          <Legend counts={kindCounts(releases)} compact />
        </div>
      </aside>
      <Keys />
    </div>
  );
}
