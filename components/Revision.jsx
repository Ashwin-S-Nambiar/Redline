import Link from 'next/link';
import { ViewTransition } from 'react';
import {
  commitUrl,
  formatDate,
  isoDay,
  KIND_LABEL,
  releasePath,
} from '@/lib/format';
import Delta from './Delta';

export default function Revision({
  r,
  repo,
  showProject = true,
  latest = false,
  limit = 3,
  preview = false,
}) {
  const more = Math.max(0, r.changes.length - limit);
  const title = preview ? (
    <span>{r.title || 'Untitled revision'}</span>
  ) : (
    <Link className="rev-link" href={releasePath(r)} data-rev-link>
      {r.title}
    </Link>
  );
  return (
    <article className={`rev ${latest ? 'cloud latest' : ''}`}>
      <div className="cell flex justify-center">
        <ViewTransition
          name={preview ? undefined : `delta-${r.id}`}
          share="morph"
          default="none"
        >
          <Delta n={r.rev} className={latest ? 'text-redline' : ''} />
        </ViewTransition>
      </div>
      <div className="cell">
        <div className="flex items-baseline gap-2.5">
          {showProject ? (
            <span className="letter text-[13px] leading-none tracking-[0.1em] text-lead">
              {r.name}
            </span>
          ) : null}
          <span className="mono text-xs leading-none font-semibold">
            {r.version || '0.0'}
          </span>
        </div>
        <h2 className="mt-2 mb-2.5 text-[19px] leading-tight font-bold tracking-[-0.005em] text-balance">
          <ViewTransition
            name={preview ? undefined : `title-${r.id}`}
            share="morph"
            default="none"
          >
            {title}
          </ViewTransition>
        </h2>
        <ul className="changes">
          {r.changes.map((c, i) => (
            <li
              key={c.key ?? `${c.kind}-${c.text}`}
              data-kind={c.kind}
              data-extra={i >= limit ? '' : undefined}
            >
              <span className="kind">{KIND_LABEL[c.kind]}</span>
              <span>{c.text}</span>
            </li>
          ))}
        </ul>
        {more > 0 ? (
          <p className="more mt-2.5 text-[13px] text-lead">+ {more} more</p>
        ) : null}
      </div>
      <div className="cell meta mono flex flex-col gap-1.5 text-xs leading-snug font-medium max-[719px]:flex-row max-[719px]:flex-wrap max-[719px]:gap-x-3">
        <time dateTime={isoDay(r.date)} className="font-semibold">
          {formatDate(r.date)}
        </time>
        {r.commits.map((c) =>
          repo ? (
            <a
              key={c}
              className="above link w-fit text-lead"
              href={commitUrl(repo, c)}
              target="_blank"
              rel="noreferrer"
            >
              {c}
            </a>
          ) : (
            <span key={c} className="text-lead">
              {c}
            </span>
          ),
        )}
      </div>
    </article>
  );
}
