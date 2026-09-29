import Image from 'next/image';
import Link from 'next/link';
import { logout } from '../actions';
import AdminNav from './AdminNav';

export default function PanelLayout({ children }) {
  return (
    <div className="mx-auto min-h-dvh max-w-[1180px] p-0 min-[720px]:p-5">
      <div className="min-h-[calc(100dvh-40px)] border-graphite bg-film min-[720px]:border-2">
        <header className="sticky top-0 z-20 flex flex-wrap items-center gap-x-4 gap-y-2 border-b-[1.5px] border-graphite bg-film px-4 py-2.5">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/icon.svg" alt="" width={28} height={28} unoptimized />
            <span className="letter text-[21px] leading-none">Redline</span>
            <span className="caption ml-1">Admin</span>
          </Link>
          <AdminNav />
          <div className="ml-auto flex items-center gap-1">
            <Link href="/" className="btn quiet" target="_blank">
              View site
            </Link>
            <form action={logout}>
              <button type="submit" className="btn quiet">
                Sign out
              </button>
            </form>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
