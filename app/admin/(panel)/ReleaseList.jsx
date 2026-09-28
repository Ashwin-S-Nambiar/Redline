'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import Delta from '@/components/Delta';
import { Plus, Trash } from '@/components/Icons';
import { formatDate, releasePath } from '@/lib/format';
import { toast } from '@/lib/toast';
import { deleteRelease, restoreRelease } from '../actions';

export default function ReleaseList({ releases, projects }) {
  const router = useRouter();
  const [project, setProject] = useState('');
  const [, start] = useTransition();
  const [gone, setGone] = useState(() => new Set());
  const [undo, setUndo] = useState(null);

  useEffect(() => {
    if (!undo) return;
    const t = setTimeout(() => setUndo(null), 8000);
    return () => clearTimeout(t);
  }, [undo]);
  const list = releases.filter(
    (r) => (!project || r.project === project) && !gone.has(r.id),
  );

  function remove(r) {
    setGone((g) => new Set(g).add(r.id));
    start(async () => {
      const res = await deleteRelease(r.id);
      router.refresh();
      if (!res.restore) return;
      toast('Deleted', `${r.name} ${r.version}. Undo puts it back.`, 6000);
      setUndo({ r, data: res.restore });
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 border-b border-graphite px-4 py-3">
        <h1 className="letter text-[26px] leading-none">Revisions</h1>
        <span className="mono text-xs text-lead">{list.length}</span>
        <div className="ml-auto flex items-center gap-2">
          <select
            className="input h-9 min-h-0 w-auto py-0 text-sm"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            aria-label="Project"
          >
            <option value="">All projects</option>
            {projects.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
          {undo ? (
            <button
              type="button"
              className="btn"
              onClick={() =>
                start(async () => {
                  const { r, data } = undo;
                  setUndo(null);
                  await restoreRelease(data);
                  router.refresh();
                  toast('Restored', `${r.name} ${r.version} is back.`);
                })
              }
            >
              Undo
            </button>
          ) : null}
          <Link
            href={`/admin/new${project ? `?project=${project}` : ''}`}
            className="btn solid"
          >
            <Plus size={16} /> New revision
          </Link>
        </div>
      </div>
      <ul>
        {list.map((r) => (
          <li
            key={r.id}
            className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 border-b border-(--rule) px-4 py-2.5 min-[720px]:grid-cols-[40px_140px_64px_minmax(0,1fr)_110px_auto]"
          >
            <Delta n={r.rev} size={26} />
            <span className="letter hidden text-[13px] text-lead min-[720px]:block">
              {r.name}
            </span>
            <span className="mono hidden text-xs font-semibold min-[720px]:block">
              {r.version}
            </span>
            <Link href={`/admin/${r.id}`} className="min-w-0">
              <span className="block truncate font-semibold hover-fine:underline">
                {r.title}
              </span>
              <span className="mono block text-[11px] text-lead min-[720px]:hidden">
                {r.name} {r.version} · {formatDate(r.date)}
              </span>
            </Link>
            <span className="mono hidden text-xs text-lead min-[720px]:block">
              {formatDate(r.date)}
            </span>
            <span className="flex">
              <a
                className="btn quiet hidden min-[720px]:inline-flex"
                href={releasePath(r)}
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>
              <button
                type="button"
                className="btn icon quiet"
                data-tip="Delete"
                aria-label={`Delete ${r.name} ${r.version}`}
                onClick={() => remove(r)}
              >
                <Trash size={17} />
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
