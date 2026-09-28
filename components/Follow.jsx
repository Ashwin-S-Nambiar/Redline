'use client';

import { SITE } from '@/lib/format';
import { copy } from '@/lib/toast';
import { Copy, Feed } from './Icons';

function Row({ label, path, ghost = false }) {
  const url = `${SITE}${path}`;
  return (
    <li
      aria-hidden={ghost || undefined}
      className={`${ghost ? 'invisible' : ''} grid grid-cols-[1fr_auto] items-center gap-2 border-t border-dashed border-(--rule-soft) py-1.5 first:border-0`}
    >
      <a href={path} className="min-w-0 group">
        <span className="letter block text-[13px] leading-tight">{label}</span>
        <span className="mono block truncate text-[11px] text-lead">
          {path}
        </span>
      </a>
      <button
        type="button"
        className="btn icon quiet"
        data-tip="Copy feed link"
        aria-label={`Copy the ${label} feed link`}
        onClick={() => copy(url, 'Paste it into your feed reader.')}
      >
        <Copy size={17} />
      </button>
    </li>
  );
}

export default function Follow({ project, reserve = false }) {
  return (
    <section className="grid gap-2">
      <h2 className="caption flex items-center gap-2">
        <Feed size={14} /> Follow
      </h2>
      <ul>
        <Row label="Every project" path="/feed.xml" />
        {project ? (
          <Row label={project.name} path={`/${project.slug}/feed.xml`} />
        ) : reserve ? (
          <Row label="Project" path="/project/feed.xml" ghost />
        ) : null}
      </ul>
      <p className="text-xs leading-snug text-lead">
        Atom feeds. Copy one into any feed reader.
      </p>
    </section>
  );
}
