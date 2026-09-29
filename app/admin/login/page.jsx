import Image from 'next/image';
import LoginForm from './LoginForm';

export const metadata = { title: 'Sign in' };

export default async function LoginPage({ searchParams }) {
  const { next } = await searchParams;
  return (
    <main className="grid min-h-dvh place-items-center p-4">
      <div className="w-full max-w-[380px] border-2 border-graphite bg-film">
        <div className="flex items-center gap-2.5 border-b border-graphite px-5 py-4">
          <Image src="/icon.svg" alt="" width={34} height={34} unoptimized />
          <span className="letter text-[26px] leading-none">Redline</span>
        </div>
        <LoginForm next={typeof next === 'string' ? next : '/admin'} />
      </div>
    </main>
  );
}
