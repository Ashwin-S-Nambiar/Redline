import { formatDate } from './format';

export const projectCells = (project) => [
  { label: 'Current', value: project.latest?.version ?? '·', mono: true },
  {
    label: 'First issued',
    value: project.first ? formatDate(project.first.date) : '·',
    mono: true,
  },
  {
    label: 'Last revised',
    value: project.latest ? formatDate(project.latest.date) : '·',
    mono: true,
  },
  { label: 'Revisions', value: project.count, mono: true },
];
