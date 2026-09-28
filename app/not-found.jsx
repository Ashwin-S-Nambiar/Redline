import NotFoundBody from '@/components/NotFoundBody';
import SiteLayout from './(site)/layout';

export const metadata = {
  title: 'Not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <SiteLayout>
      <NotFoundBody />
    </SiteLayout>
  );
}
