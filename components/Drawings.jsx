'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function Drawings({ projects, total, onPick }) {
  const current = useSelectedLayoutSegment();
  return (
    <ul className="drawings">
      <li>
        <Link
          href="/"
          aria-current={current === null ? 'page' : undefined}
          onClick={onPick}
        >
          <span className="nm">All projects</span>
          <span className="n">{total}</span>
        </Link>
      </li>
      {projects.map((p) => (
        <li key={p.slug}>
          <Link
            href={`/${p.slug}`}
            aria-current={current === p.slug ? 'page' : undefined}
            onClick={onPick}
          >
            <span className="nm">{p.name}</span>
            <span className="n">{p.latest?.version ?? '·'}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
