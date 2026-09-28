'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db, KINDS } from '@/lib/db';
import { COOKIE, sign, verify } from '@/lib/session';

async function requireAdmin() {
  const jar = await cookies();
  const session = await verify(jar.get(COOKIE)?.value);
  if (!session) redirect('/admin/login');
  return db();
}

const refresh = () => revalidatePath('/', 'layout');

export async function login(_prev, form) {
  const email = String(form.get('email') ?? '').trim();
  const password = String(form.get('password') ?? '');
  const next = String(form.get('next') ?? '/admin');
  if (!email || !password) return { error: 'Enter your email and password.' };
  const [admin] =
    await db()`select password from admins where email = ${email}`;
  const ok = admin && (await bcrypt.compare(password, admin.password));
  if (!ok) return { error: "That email and password don't match." };
  const jar = await cookies();
  jar.set(COOKIE, await sign(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  });
  redirect(next.startsWith('/admin') ? next : '/admin');
}

export async function logout() {
  const jar = await cookies();
  jar.delete(COOKIE);
  redirect('/admin/login');
}

const VERSION = /^\d+(\.\d+){0,3}$/;
const SLUG = /^[a-z0-9-]+$/;

function readRelease(input) {
  const changes = (input.changes ?? [])
    .map((c) => ({ kind: c.kind, text: String(c.text ?? '').trim() }))
    .filter((c) => c.text && KINDS.includes(c.kind));
  const commits = String(input.commits ?? '')
    .split(/[\s,]+/)
    .map((c) => c.trim())
    .filter((c) => /^[0-9a-f]{7,40}$/i.test(c))
    .map((c) => c.slice(0, 7));
  return {
    project: String(input.project ?? ''),
    version: String(input.version ?? '').trim(),
    date: String(input.date ?? ''),
    title: String(input.title ?? '').trim(),
    notes: String(input.notes ?? '').trim(),
    changes,
    commits,
  };
}

const UUID = /^[0-9a-f-]{36}$/i;

export async function saveRelease(id, input) {
  const sql = await requireAdmin();
  const data = readRelease(input);
  const [project] =
    await sql`select slug from projects where slug = ${data.project}`;
  if (!project) return { error: 'Pick a project.' };
  if (!VERSION.test(data.version))
    return { error: 'Versions look like 2.1 or 2.0.1.' };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) return { error: 'Pick a date.' };
  if (!data.title) return { error: 'Give it a title.' };
  if (!data.changes.length) return { error: 'Add at least one change.' };
  if (id && !UUID.test(id)) return { error: 'That revision is gone.' };
  const [clash] = await sql`select id from releases
    where project = ${data.project} and version = ${data.version}
    and id is distinct from ${id ?? null}::uuid`;
  if (clash) return { error: `${data.version} is already on this drawing.` };
  const changes = JSON.stringify(data.changes);
  const [saved] = id
    ? await sql`update releases set project = ${data.project}, version = ${data.version},
        day = ${data.date}, title = ${data.title}, changes = ${changes}::jsonb,
        notes = ${data.notes}, commits = ${data.commits}
        where id = ${id} returning id, project, version`
    : await sql`insert into releases (project, version, day, title, changes, notes, commits)
        values (${data.project}, ${data.version}, ${data.date}, ${data.title},
        ${changes}::jsonb, ${data.notes}, ${data.commits})
        returning id, project, version`;
  if (!saved)
    return { error: 'That revision is gone. It may have been deleted.' };
  refresh();
  return { ok: true, id: saved.id, path: `/${saved.project}/${saved.version}` };
}

export async function deleteRelease(id) {
  const sql = await requireAdmin();
  if (!UUID.test(id)) return { ok: true };
  const [gone] = await sql`delete from releases where id = ${id}
    returning project, version, to_char(day, 'YYYY-MM-DD') as date, title, changes, notes, commits`;
  refresh();
  if (!gone) return { ok: true };
  return { ok: true, restore: { ...gone, commits: gone.commits.join(' ') } };
}

export async function restoreRelease(data) {
  const sql = await requireAdmin();
  const d = readRelease(data);
  await sql`insert into releases (project, version, day, title, changes, notes, commits)
    values (${d.project}, ${d.version}, ${d.date}, ${d.title},
    ${JSON.stringify(d.changes)}::jsonb, ${d.notes}, ${d.commits})
    on conflict (project, version) do nothing`;
  refresh();
  return { ok: true };
}

export async function saveProject(originalSlug, input) {
  const sql = await requireAdmin();
  const data = {
    slug: String(input.slug ?? '')
      .trim()
      .toLowerCase(),
    name: String(input.name ?? '').trim(),
    formerly: String(input.formerly ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    blurb: String(input.blurb ?? '').trim(),
    url: String(input.url ?? '').trim(),
    repo: String(input.repo ?? '')
      .trim()
      .replace(/^https:\/\/github\.com\//, ''),
    note: String(input.note ?? '').trim(),
    sort: Number(input.order ?? 0) || 0,
  };
  if (!data.name) return { error: 'Give it a name.' };
  if (!SLUG.test(data.slug) || ['admin', 'feed.xml'].includes(data.slug))
    return { error: 'Addresses use lowercase letters, numbers and dashes.' };
  if (data.repo && !/^[\w.-]+\/[\w.-]+$/.test(data.repo))
    return { error: 'Repos look like owner/name.' };
  const [clash] =
    await sql`select slug from projects where slug = ${data.slug}`;
  if (clash && clash.slug !== originalSlug)
    return { error: `/${data.slug} is taken.` };
  const d = data;
  if (originalSlug) {
    await sql`update projects set slug = ${d.slug}, name = ${d.name}, formerly = ${d.formerly},
      blurb = ${d.blurb}, url = ${d.url}, repo = ${d.repo}, note = ${d.note}, sort = ${d.sort}
      where slug = ${originalSlug}`;
  } else {
    await sql`insert into projects (slug, name, formerly, blurb, url, repo, note, sort)
      values (${d.slug}, ${d.name}, ${d.formerly}, ${d.blurb}, ${d.url}, ${d.repo}, ${d.note}, ${d.sort})`;
  }
  refresh();
  return { ok: true, slug: data.slug };
}

const KIND_OF = [
  [/^(feat|add)\b/i, 'added'],
  [/^(fix|bug|hotfix)\b/i, 'fixed'],
  [/^(revert|remove|drop)\b/i, 'removed'],
];

function toChange(message) {
  const line = message.split('\n')[0].trim();
  const match = line.match(/^(\w+)(\([^)]*\))?!?:\s*(.+)$/);
  const type = match?.[1] ?? '';
  const text = (match?.[3] ?? line).replace(/\s*\(#\d+\)$/, '');
  const kind = KIND_OF.find(([re]) => re.test(type || text))?.[1] ?? 'changed';
  return {
    kind,
    text: `${text.charAt(0).toUpperCase() + text.slice(1).replace(/\.$/, '')}.`,
  };
}

const SKIP = /^(merge|docs?|chore\(deps|update readme|wip)\b/i;

export async function draftFromGitHub(project) {
  const sql = await requireAdmin();
  const [p] = await sql`select repo from projects where slug = ${project}`;
  if (!p?.repo) return { error: 'This project has no GitHub repo set.' };
  const [last] =
    await sql`select version, commits, to_char(day, 'YYYY-MM-DD') as day
    from releases where project = ${project} order by day desc, created_at desc limit 1`;
  const params = new URLSearchParams({ per_page: '100' });
  if (last) params.set('since', `${last.day}T00:00:00Z`);
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'redline',
  };
  if (process.env.GITHUB_TOKEN)
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(
    `https://api.github.com/repos/${p.repo}/commits?${params}`,
    {
      headers,
      cache: 'no-store',
    },
  );
  if (res.status === 403 || res.status === 429)
    return { error: 'GitHub is rate limiting us. Try again in an hour.' };
  if (!res.ok) return { error: `GitHub answered ${res.status} for ${p.repo}.` };
  const list = await res.json();
  const used =
    await sql`select unnest(commits) as c from releases where project = ${project}`;
  const known = new Set(used.map((u) => u.c));
  const fresh = list.filter((c) => !known.has(c.sha.slice(0, 7)));
  const picked = fresh.filter((c) => !SKIP.test(c.commit.message));
  if (!picked.length)
    return {
      error: last
        ? `No new commits since ${last.version}.`
        : 'No commits found.',
    };
  const changes = picked.reverse().map((c) => toChange(c.commit.message));
  const parts = (last?.version ?? '0.0').split('.').map(Number);
  const onlyFixes = changes.every((c) => c.kind === 'fixed');
  const version = onlyFixes
    ? [parts[0], parts[1] ?? 0, (parts[2] ?? 0) + 1].join('.')
    : [parts[0] || 1, (parts[1] ?? 0) + (parts[0] ? 1 : 0)].join('.');
  return {
    ok: true,
    version,
    changes,
    commits: picked.map((c) => c.sha.slice(0, 7)).join(' '),
    date: picked.at(-1).commit.committer.date.slice(0, 10),
  };
}
