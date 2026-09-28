export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-6 text-[13px] text-lead min-[720px]:pl-20">
      <span>
        Made by{' '}
        <a className="link text-graphite" href="https://ashwin.co.in">
          Ashwin
        </a>
      </span>
      <span>
        Commits link to{' '}
        <a className="link" href="https://github.com/Ashwin-S-Nambiar">
          GitHub
        </a>
      </span>
    </footer>
  );
}
