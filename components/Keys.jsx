'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const typing = (el) =>
  el?.closest?.('input, textarea, select, [contenteditable="true"]');

export default function Keys({ up }) {
  const router = useRouter();
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || typing(e.target)) return;
      const key = e.key.toLowerCase();
      if (
        key === 'escape' &&
        up &&
        !document.querySelector('[role="dialog"]')
      ) {
        router.push(up);
        return;
      }
      if (key !== 'j' && key !== 'k') return;
      const step = document.querySelector(
        key === 'j' ? '[data-step="older"]' : '[data-step="newer"]',
      );
      if (step) {
        e.preventDefault();
        step.click();
        return;
      }
      const links = [...document.querySelectorAll('[data-rev-link]')].filter(
        (a) => a.offsetParent,
      );
      if (!links.length) return;
      e.preventDefault();
      const i = links.indexOf(document.activeElement);
      const next =
        key === 'j'
          ? i < 0
            ? 0
            : Math.min(i + 1, links.length - 1)
          : i < 0
            ? 0
            : Math.max(i - 1, 0);
      const target = links[next];
      target.focus({ preventScroll: true });
      const rev = target.closest('.rev');
      const r = rev.getBoundingClientRect();
      const top =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--edge'),
        ) || 0;
      const head = document.querySelector('.thead')?.offsetHeight ?? 0;
      const mhead = document.querySelector('.mhead')?.offsetHeight ?? 0;
      const min = top + head + mhead;
      if (r.top < min || r.bottom > innerHeight - top) {
        scrollBy({
          top: r.top - min - 16,
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        });
      }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [router, up]);
  return null;
}
