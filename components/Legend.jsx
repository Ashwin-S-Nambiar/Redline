'use client';

import { useEffect, useState } from 'react';
import { KIND_LABEL } from '@/lib/format';

const HINT = {
  added: 'New things you can do',
  changed: 'Things that work differently',
  fixed: 'Things that were broken',
  removed: 'Things that are gone',
};

function apply(kind) {
  const root = document.documentElement;
  const set = () => {
    if (kind) root.dataset.only = kind;
    else delete root.dataset.only;
  };
  if (
    document.startViewTransition &&
    !matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    document.startViewTransition(set);
  } else set();
}

export function useOnly() {
  const [only, setOnly] = useState(null);
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setOnly(root.dataset.only ?? null);
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ['data-only'] });
    return () => {
      mo.disconnect();
    };
  }, []);
  return only;
}

export default function Legend({ counts, compact = false }) {
  const only = useOnly();
  useEffect(() => () => delete document.documentElement.dataset.only, []);
  return (
    <section
      className={compact ? 'legend-strip' : 'grid gap-2'}
      aria-label="Show only"
    >
      {compact ? null : <h2 className="caption">Show</h2>}
      <div className={compact ? 'legend compact' : 'legend grid'}>
        {Object.keys(KIND_LABEL).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={only === k}
            disabled={!counts[k]}
            onClick={() => apply(only === k ? null : k)}
          >
            <span className="kind">{KIND_LABEL[k]}</span>
            {compact ? null : (
              <span className="text-[13.5px] leading-5">{HINT[k]}</span>
            )}
            <span className="mono text-[11px] leading-5 text-lead">
              {counts[k] ?? 0}
            </span>
          </button>
        ))}
      </div>
      {compact ? null : (
        <p className="text-xs leading-snug text-lead">
          {only
            ? 'Tap it again to show everything.'
            : 'Tap one to show only those changes.'}
        </p>
      )}
    </section>
  );
}
