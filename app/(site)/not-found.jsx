import NotFoundBody from '@/components/NotFoundBody';

export const metadata = {
  title: 'Not found',
  robots: { index: false },
};

export default function NotFound() {
  return <NotFoundBody />;
}
