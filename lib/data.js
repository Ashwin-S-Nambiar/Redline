import 'server-only';
import { cache } from 'react';
import { db } from './db';

const plainProject = (p) => ({
  slug: p.slug,
  name: p.name,
  formerly: p.formerly ?? [],
  blurb: p.blurb ?? '',
  url: p.url ?? '',
  repo: p.repo ?? '',
  note: p.note ?? '',
  order: p.sort ?? 0,
});

const plainRelease = (r) => ({
  id: r.id,
  project: r.project,
  version: r.version,
  date: `${r.day}T12:00:00.000Z`,
  title: r.title,
  changes: (r.changes ?? []).map((c) => ({ kind: c.kind, text: c.text })),
  notes: r.notes ?? '',
  commits: r.commits ?? [],
});

export const getAll = cache(async () => {
  const sql = db();
  const [projects, releases] = await Promise.all([
    sql`select * from projects order by sort, name`,
    sql`select id, project, version, to_char(day, 'YYYY-MM-DD') as day, title, changes, notes, commits
        from releases order by day desc, created_at desc`,
  ]);
  const list = releases.map(plainRelease);
  const perProject = new Map();
  for (const r of [...list].reverse()) {
    const n = (perProject.get(r.project) ?? 0) + 1;
    perProject.set(r.project, n);
    r.rev = n;
  }
  const bySlug = new Map();
  for (const p of projects.map(plainProject)) {
    const own = list.filter((r) => r.project === p.slug);
    bySlug.set(p.slug, {
      ...p,
      count: own.length,
      latest: own[0] ?? null,
      first: own.at(-1) ?? null,
    });
  }
  for (const r of list) r.name = bySlug.get(r.project)?.name ?? r.project;
  return {
    projects: [...bySlug.values()],
    bySlug,
    releases: list,
  };
});

export async function getProject(slug) {
  const { bySlug, releases } = await getAll();
  const project = bySlug.get(slug);
  if (!project) return null;
  return { project, releases: releases.filter((r) => r.project === slug) };
}

export async function getRelease(slug, version) {
  const found = await getProject(slug);
  if (!found) return null;
  const i = found.releases.findIndex((r) => r.version === version);
  if (i === -1) return null;
  return {
    project: found.project,
    release: found.releases[i],
    newer: found.releases[i - 1] ?? null,
    older: found.releases[i + 1] ?? null,
  };
}
