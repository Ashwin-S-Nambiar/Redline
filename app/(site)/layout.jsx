import Frame from '@/components/Frame';
import MobileHead from '@/components/MobileHead';
import NavigationTransitions from '@/components/NavigationTransitions';
import Rail from '@/components/Rail';
import Toaster from '@/components/Toaster';
import { getAll } from '@/lib/data';

export default async function SiteLayout({ children }) {
  const { projects, releases } = await getAll();
  const list = projects
    .filter((p) => p.count > 0)
    .sort((a, b) => releases.indexOf(a.latest) - releases.indexOf(b.latest));
  return (
    <NavigationTransitions>
      <Frame />
      <div className="sheet">
        <MobileHead projects={list} total={releases.length} />
        <div className="sheet-grid">
          <Rail projects={list} total={releases.length} />
          {children}
        </div>
      </div>
      <Toaster />
    </NavigationTransitions>
  );
}
