'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { useCallback, useState } from 'react';
import { KIND_LABEL } from '@/lib/format';
import Drawings from './Drawings';
import Follow from './Follow';
import { Down, Feed } from './Icons';
import { useOnly } from './Legend';
import Sheet from './Sheet';

export default function MobileHead({ projects, total }) {
  const router = useRouter();
  const [sheet, setSheet] = useState({ open: false, kind: 'drawings' });
  const close = useCallback(() => setSheet((s) => ({ ...s, open: false })), []);
  const show = (kind) => {
    if (kind === 'drawings') {
      router.prefetch('/');
      for (const item of projects) router.prefetch(`/${item.slug}`);
    }
    setSheet({ open: true, kind });
  };
  const current = useSelectedLayoutSegment();
  const project = projects.find((p) => p.slug === current);
  const only = useOnly();
  return (
    <>
      <header className="mhead">
        <Link href="/" className="flex items-center gap-2.5 px-4">
          <Image src="/icon.svg" alt="" width={34} height={34} unoptimized />
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
