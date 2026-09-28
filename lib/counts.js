export function kindCounts(releases) {
  const counts = { added: 0, changed: 0, fixed: 0, removed: 0 };
  for (const r of releases) for (const c of r.changes) counts[c.kind] += 1;
  return counts;
}
