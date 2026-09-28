import Delta from './Delta';

export default function TitleBlock({
  name,
  description,
  cells,
  className = '',
}) {
  return (
    <div className={`titleblock ${className}`}>
      <div className="wide">
        <span className="lbl">Title</span>
        <span className="name">
          <Delta size={30} className="shrink-0 text-redline" />
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
