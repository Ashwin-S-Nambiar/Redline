import Image from 'next/image';
import { DrawingsIcon } from './Icons';

export default function TitleBlock({
  name,
  description,
  cells,
  className = '',
  icon,
}) {
  return (
    <div className={`titleblock ${className}`}>
      <div className="wide">
        <span className="lbl">Title</span>
        <span className="name">
          {icon ? (
            <Image
              src={icon}
              alt=""
              width={38}
              height={38}
              className="shrink-0"
              unoptimized
            />
          ) : (
            <DrawingsIcon size={38} className="shrink-0" />
          )}
          {name}
        </span>
      </div>
      {description ? (
        <div className="wide">
          <span className="lbl">Description</span>
          <span className="val body">{description}</span>
        </div>
      ) : null}
      {cells.map((c) => (
        <div key={c.label}>
          <span className="lbl">{c.label}</span>
          <span className={`val ${c.mono ? 'mono' : ''}`}>{c.value}</span>
        </div>
      ))}
    </div>
  );
}
