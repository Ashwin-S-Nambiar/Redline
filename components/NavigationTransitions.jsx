'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function NavigationTransitions({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const pending = useRef(null);

  useEffect(() => {
    if (!pathname) return;
    pending.current?.();
    pending.current = null;
  }, [pathname]);

  useEffect(() => {
    const onClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      )
        return;
      const link = event.target.closest('a[href]');
      if (!link || link.target || link.hasAttribute('download')) return;
      if (link.matches('[data-rev-link], [data-step]')) return;
      const url = new URL(link.href);
      if (
        url.origin !== location.origin ||
        url.pathname === location.pathname ||
        url.pathname.endsWith('.xml')
      )
        return;
      event.preventDefault();
      const href = `${url.pathname}${url.search}${url.hash}`;
      if (
        !document.startViewTransition ||
        matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        router.push(href);
        return;
      }
      pending.current?.();
      document.startViewTransition(
        () =>
          new Promise((resolve) => {
            pending.current = resolve;
            router.push(href);
            setTimeout(() => {
              if (pending.current === resolve) {
                pending.current = null;
                resolve();
              }
            }, 2500);
          }),
      );
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [router]);

  return children;
}
