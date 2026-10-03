import { createHash } from 'node:crypto';

export function cardImage(project, release = null) {
  const revision = createHash('sha256')
    .update(
      JSON.stringify({
        name: project.name,
        ...(release ? {} : { blurb: project.blurb, count: project.count }),
        release: release ?? project.latest,
      }),
    )
    .digest('hex')
    .slice(0, 16);
  const params = new URLSearchParams({
    project: project.slug,
    v: '1',
    rev: revision,
  });
  if (release) params.set('version', release.version);
  return `/api/og?${params}`;
}

export function cardMetadata(project, release) {
  return {
    url: cardImage(project, release),
    width: 1200,
    height: 630,
    type: 'image/png',
    alt: `${project.name}${release ? ` ${release.version}` : ''} · Redline revisions`,
  };
}
