'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/admin', label: 'Revisions' },
  { href: '/admin/new', label: 'New revision' },
  { href: '/admin/projects', label: 'Projects' },
];

export default function AdminNav() {
  const path = usePathname();
  return (
    <nav className="flex gap-1" aria-label="Admin">
      {items.map((i) => {
        const on =
          i.href === '/admin' ? path === '/admin' : path.startsWith(i.href);
        return (
          <Link
            key={i.href}
            href={i.href}
            aria-current={on ? 'page' : undefined}
            className="letter relative px-2.5 py-2 text-[13px] leading-none aria-[current]:text-redline-ink hover-fine:bg-(--hover)"
          >
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
