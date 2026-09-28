export const editorProjects = (projects) =>
  projects.map((p) => ({
    slug: p.slug,
    name: p.name,
    repo: p.repo,
    count: p.count,
    latest: p.latest ? { version: p.latest.version } : null,
  }));
