import { neon } from '@neondatabase/serverless';
import { releases } from './seed-data.js';

const sql = neon(process.env.DATABASE_URL);
const additions = [
  ['tenzies', '1.1'],
  ['fandeck', '1.1'],
  ['stampbook', '1.1'],
  ['quizzme', '1.1'],
  ['portfolio', '2.0'],
  ['portfolio', '3.0'],
];

for (const [project, version] of additions) {
  const r = releases.find(
    (item) => item.project === project && item.version === version,
  );
  if (!r) throw new Error(`Missing ${project} ${version} from seed data`);
  await sql`insert into releases (project, version, day, title, changes, notes, commits)
    values (${r.project}, ${r.version}, ${r.date}, ${r.title}, ${JSON.stringify(r.changes)}::jsonb,
    ${r.notes ?? ''}, ${r.commits})
    on conflict (project, version) do nothing`;
}

console.log(`Checked ${additions.length} historical revisions`);
