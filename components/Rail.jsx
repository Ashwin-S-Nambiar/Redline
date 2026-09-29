'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import Drawings from './Drawings';
import Follow from './Follow';

export default function Rail({ projects, total }) {
  const current = useSelectedLayoutSegment();
  const project = projects.find((p) => p.slug === current);
  return (
    <nav className="rail" aria-label="Projects">
      <Link
        href="/"
        className="flex min-h-[68px] items-center gap-2 border-b border-graphite px-[18px]"
      >
        <Image src="/icon.svg" alt="" width={34} height={34} unoptimized />
        <span className="letter text-[24px] leading-none">Redline</span>
      </Link>
      <div className="px-[22px] pt-5">
        <Drawings projects={projects} total={total} />
      </div>
      <div className="mt-auto px-[22px] pt-8 pb-5">
        <Follow project={project} reserve />
      </div>
    </nav>
  );
}
