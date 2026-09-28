import { commitUrl, KIND_LABEL, NAME, releasePath, SITE } from './format';

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function content(r, repo) {
  const groups = Object.keys(KIND_LABEL)
    .map((k) => [k, r.changes.filter((c) => c.kind === k)])
    .filter(([, l]) => l.length)
    .map(
      ([k, l]) =>
        `<h3>${KIND_LABEL[k]}</h3><ul>${l.map((c) => `<li>${esc(c.text)}</li>`).join('')}</ul>`,
    )
    .join('');
  const commits = r.commits.length
    ? `<p>Commits: ${r.commits.map((c) => (repo ? `<a href="${commitUrl(repo, c)}">${c}</a>` : c)).join(', ')}</p>`
    : '';
  return groups + commits;
}

export function atom({ title, path, releases, repos }) {
  const updated = releases[0]?.date ?? new Date(0).toISOString();
  const entries = releases
    .map((r) => {
      const url = `${SITE}${releasePath(r)}`;
      return `<entry>
<id>${url}</id>
<title>${esc(`${r.name} ${r.version} · ${r.title}`)}</title>
<link href="${url}"/>
<updated>${r.date}</updated>
<category term="${esc(r.project)}" label="${esc(r.name)}"/>
<content type="html">${esc(content(r, repos[r.project]))}</content>
</entry>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
<id>${SITE}${path}</id>
<title>${esc(title)}</title>
<subtitle>What changed in everything Ashwin builds</subtitle>
<link rel="self" href="${SITE}${path}"/>
<link href="${SITE}${path.replace(/\/?feed\.xml$/, '') || '/'}"/>
<author><name>Ashwin</name><uri>https://ashwin.co.in</uri></author>
<icon>${SITE}/icon-192.png</icon>
<updated>${updated}</updated>
<generator>${NAME}</generator>
${entries}
</feed>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
}
