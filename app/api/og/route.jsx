import { ImageResponse } from 'next/og';
import { getProject, getRelease } from '@/lib/data';
import { cardImage } from '@/lib/og';
import { cardAssets, RevisionCard } from '@/lib/og-card';

export async function GET(request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('project');
  const version = url.searchParams.get('version');
  if (
    !/^[a-z0-9-]{1,80}$/.test(slug ?? '') ||
    (version !== null && !/^[a-zA-Z0-9._-]{1,40}$/.test(version))
  ) {
    return new Response('Invalid revision', {
      status: 400,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
  let found;
  try {
    found = version ? await getRelease(slug, version) : await getProject(slug);
  } catch {
    return new Response(null, {
      status: 307,
      headers: {
        Location: new URL('/og.jpg?v=4', url.origin).href,
        'Cache-Control': 'no-store',
      },
    });
  }
  if (!found)
    return new Response('Revision not found', {
      status: 404,
      headers: { 'Cache-Control': 'no-store' },
    });
  const { project } = found;
  const release = version ? found.release : project.latest;
  const canonical = new URL(
    cardImage(project, version ? release : null),
    url.origin,
  );
  if (canonical.search !== url.search) {
    return new Response(null, {
      status: 307,
      headers: { Location: canonical.href, 'Cache-Control': 'no-store' },
    });
  }
  const assets = await cardAssets();
  return new ImageResponse(
    <RevisionCard
      project={project}
      release={release}
      projectPage={!version}
      icon={assets.icon}
    />,
    {
      width: 1200,
      height: 630,
      fonts: assets.fonts,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable',
      },
    },
  );
}
