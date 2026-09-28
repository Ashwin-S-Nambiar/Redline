'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useCallback, useState } from 'react';
import { KIND_LABEL } from '@/lib/format';
import Delta from './Delta';
import Drawings from './Drawings';
import Follow from './Follow';
import { Down, Feed } from './Icons';
import { useOnly } from './Legend';
import Sheet from './Sheet';

export default function MobileHead({ projects, total }) {
  const [sheet, setSheet] = useState({ open: false, kind: 'drawings' });
  const close = useCallback(() => setSheet((s) => ({ ...s, open: false })), []);
  const show = (kind) => setSheet({ open: true, kind });
  const current = useSelectedLayoutSegment();
  const project = projects.find((p) => p.slug === current);
  const only = useOnly();
  return (
    <>
      <header className="mhead">
        <Link href="/" className="flex items-center gap-2.5 px-4">
          <Delta size={22} className="text-redline" />
          <span className="letter text-[25px] leading-none">Redline</span>
        </Link>
        <button
          type="button"
          className="grid w-14 place-items-center border-l border-graphite"
          aria-label="Follow"
          onClick={() => show('follow')}
        >
          <Feed size={20} />
        </button>
      </header>
      <div className="mbar grid-cols-[minmax(0,1fr)_auto] border-b border-graphite bg-film">
        <button
          type="button"
          className="flex min-w-0 items-center justify-between gap-3 px-4 py-3.5 text-left"
          onClick={() => show('drawings')}
        >
          <span className="letter truncate text-[15px] leading-none">
            {project?.name ?? 'All projects'}
            {only ? (
              <span className="text-redline-ink"> · {KIND_LABEL[only]}</span>
            ) : null}
          </span>
          <Down size={16} />
        </button>
        <span className="mono flex w-[92px] items-center justify-end border-l border-graphite px-4 text-[11px] text-lead">
          {project ? project.count : total} revs
        </span>
      </div>
      <Sheet
        open={sheet.open}
        onClose={close}
        title={sheet.kind === 'follow' ? 'Follow' : 'Drawing list'}
      >
        {sheet.kind === 'follow' ? (
          <Follow project={project} />
        ) : (
          <div className="px-3.5">
            <Drawings projects={projects} total={total} onPick={close} />
          </div>
        )}
      </Sheet>
    </>
  );
}
