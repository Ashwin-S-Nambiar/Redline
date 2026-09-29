export default function Footer() {
  return (
    <footer className="flex items-center justify-between gap-4 px-4 py-6 text-[13px] text-lead">
      <span>
        Made by{' '}
        <a className="link text-graphite" href="https://ashwin.co.in">
          Ashwin
        </a>
      </span>
      <a
        className="link whitespace-nowrap text-graphite"
        href="https://github.com/Ashwin-S-Nambiar/Redline"
        target="_blank"
        rel="noreferrer"
      >
        Redline source ↗
      </a>
    </footer>
  );
}
