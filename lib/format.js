const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const formatDate = (iso) => {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};
export const isoDay = (iso) => new Date(iso).toISOString().slice(0, 10);

export const KIND_LABEL = {
  added: 'Added',
  changed: 'Changed',
  fixed: 'Fixed',
  removed: 'Removed',
};

export const SITE = 'https://redline.ashwin.co.in';
export const NAME = 'Redline';
export const DESCRIPTOR = 'What changed in everything Ashwin builds';

export const commitUrl = (repo, hash) =>
  `https://github.com/${repo}/commit/${hash}`;
export const releasePath = (r) => `/${r.project}/${r.version}`;

export function plural(n, one, many = `${one}s`) {
  return `${n} ${n === 1 ? one : many}`;
}
