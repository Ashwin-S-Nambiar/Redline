export default function Delta({ n, size = 34, className = '' }) {
  return (
    <svg
      className={`delta ${className}`}
      viewBox="0 0 34 30"
      width={size}
      height={(size * 30) / 34}
      role="img"
      aria-label={n ? `Revision ${n}` : 'Redline'}
    >
      <path d="M17 2.5 32 28H2Z" />
      {n ? (
        <text x="17" y="24.5">
          {n}
        </text>
      ) : null}
    </svg>
  );
}
