import { readFileSync } from 'node:fs';
import { neon } from '@neondatabase/serverless';
import { projects, releases } from './seed-data.js';

const sql = neon(process.env.DATABASE_URL);
const schema = readFileSync(new URL('./schema.sql', import.meta.url), 'utf8');
for (const statement of schema
  .split(';')
  .map((s) => s.trim())
  .filter(Boolean)) {
  await sql.query(statement);
}
await sql`truncate releases, projects`;
for (const p of projects) {
  await sql`insert into projects (slug, name, formerly, blurb, url, repo, note, sort)
    values (${p.slug}, ${p.name}, ${p.formerly}, ${p.blurb}, ${p.url}, ${p.repo}, ${p.note}, ${p.order})`;
}
for (const r of releases) {
  await sql`insert into releases (project, version, day, title, changes, notes, commits)
    values (${r.project}, ${r.version}, ${r.date}, ${r.title}, ${JSON.stringify(r.changes)}::jsonb,
    ${r.notes ?? ''}, ${r.commits})`;
}
console.log(`${projects.length} projects, ${releases.length} releases`);
