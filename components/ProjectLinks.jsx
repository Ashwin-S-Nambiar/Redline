import { Out } from './Icons';

export default function ProjectLinks({ project, className = '' }) {
  const links = [
    project.url && { href: project.url, label: `Open ${project.name}` },
    project.repo && {
      href: `https://github.com/${project.repo}`,
      label: 'Code',
    },
    project.note && { href: project.note, label: 'Notes' },
  ].filter(Boolean);
  if (!links.length) return null;
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {links.map((l) => (
        <li key={l.href}>
          <a className="btn out" href={l.href} target="_blank" rel="noreferrer">
            {l.label}
            <Out size={15} />
          </a>
        </li>
      ))}
    </ul>
  );
}
