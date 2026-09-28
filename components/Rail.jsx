'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import Delta from './Delta';
import Drawings from './Drawings';
import Follow from './Follow';

export default function Rail({ projects, total }) {
  const current = useSelectedLayoutSegment();
  const project = projects.find((p) => p.slug === current);
  return (
    <nav className="rail" aria-label="Projects">
      <Link
        href="/"
        className="flex items-center gap-2.5 border-b border-graphite px-[22px] pt-5 pb-4"
      >
        <Delta size={24} className="text-redline" />
        <span className="letter text-[26px] leading-none">Redline</span>
      </Link>
      <div className="grid gap-3 px-[22px] pt-5">
        <h2 className="caption">Drawing list</h2>
        <Drawings projects={projects} total={total} />
      </div>
      <div className="mt-auto px-[22px] pt-8 pb-5">
        <Follow project={project} reserve />
      </div>
    </nav>
  );
}
