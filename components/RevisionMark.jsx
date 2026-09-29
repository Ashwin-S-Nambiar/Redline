export default function RevisionMark({ n, size = 34, className = '' }) {
  return (
    <svg
      className={`delta ${className}`}
      viewBox="0 0 34 30"
      width={size}
      height={(size * 30) / 34}
      role="img"
      aria-label={`Revision ${n}`}
    >
      <circle cx="17" cy="15" r="13" />
      <text x="17" y="20">
        {n}
      </text>
    </svg>
  );
}
