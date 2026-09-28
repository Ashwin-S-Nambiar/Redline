import Toaster from '@/components/Toaster';

export const metadata = {
  title: { default: 'Admin', template: '%s · Admin · Redline' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
