import Link from 'next/link';
import Footer from './Footer';
import TitleBlock from './TitleBlock';

export default function NotFoundBody() {
  return (
    <div className="page">
      <main className="min-w-0">
        <header className="border-b border-graphite px-4 pt-6 pb-5 min-[720px]:pt-8 min-[720px]:pr-6 min-[720px]:pb-7 min-[720px]:pl-20">
          <h1 className="letter text-[32px] leading-none min-[720px]:text-[44px]">
            Not in the set
          </h1>
          <p className="mt-2.5 max-w-[46ch] text-lead">
            This page isn&apos;t on any drawing. The link may be old, or that
            version was never issued.
          </p>
        </header>
        <div className="px-4 py-10 min-[720px]:pl-20">
          <div className="cloud relative grid h-56 max-w-[560px] place-items-center">
            <span className="letter text-[64px] leading-none text-redline-ink">
              404
            </span>
          </div>
          <Link href="/" className="btn solid mt-8">
            See the revisions
          </Link>
        </div>
        <Footer />
      </main>
      <aside className="side" aria-label="About this page">
        <div className="mt-auto">
          <TitleBlock
            name="Not found"
            cells={[
              { label: 'Sheet', value: '404', mono: true },
              { label: 'Status', value: 'Not issued' },
            ]}
          />
        </div>
      </aside>
    </div>
  );
}
