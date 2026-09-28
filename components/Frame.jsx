const cols = ['1', '2', '3', '4', '5', '6', '7', '8'];
const rows = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function Frame() {
  return (
    <div className="frame" aria-hidden="true">
      <div className="band top" />
      <div className="band bottom" />
      <div className="outer" />
      <div className="inner" />
      <div className="zones top">
        {cols.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
      <div className="zones bottom">
        {cols.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
      <div className="zones left">
        {rows.map((r) => (
          <span key={r}>{r}</span>
        ))}
      </div>
      <div className="zones right">
        {rows.map((r) => (
          <span key={r}>{r}</span>
        ))}
      </div>
    </div>
  );
}
