import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { formatDate } from './format';

let assets;
export function cardAssets() {
  assets ??= Promise.all([
    readFile(join(process.cwd(), 'lib/og-fonts/atkinson-regular.ttf')),
    readFile(join(process.cwd(), 'lib/og-fonts/atkinson-bold.ttf')),
    readFile(join(process.cwd(), 'lib/og-fonts/atkinson-semibold.ttf')),
    readFile(join(process.cwd(), 'lib/og-fonts/azeret-regular.ttf')),
    readFile(join(process.cwd(), 'public/icon.svg')),
  ]).then(([regular, bold, semibold, mono, icon]) => ({
    fonts: [
      { name: 'Atkinson', data: regular, weight: 400, style: 'normal' },
      { name: 'Atkinson', data: bold, weight: 700, style: 'normal' },
      { name: 'Atkinson', data: semibold, weight: 650, style: 'normal' },
      { name: 'Azeret', data: mono, weight: 400, style: 'normal' },
    ],
    icon: `data:image/svg+xml;base64,${icon.toString('base64')}`,
  }));
  return assets;
}

const clip = (value, max) => {
  const text = String(value || '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
};
const column = { display: 'flex', flexDirection: 'column' };
const mono = { fontFamily: 'Azeret', fontWeight: 400 };

function cloud() {
  let d = 'M 4 4';
  for (let x = 16; x <= 484; x += 12) d += ` Q ${x - 6} -1 ${x} 4`;
  for (let y = 16; y <= 304; y += 12) d += ` Q 489 ${y - 6} 484 ${y}`;
  for (let x = 472; x >= 4; x -= 12) d += ` Q ${x + 6} 309 ${x} 304`;
  for (let y = 292; y >= 4; y -= 12) d += ` Q -1 ${y + 6} 4 ${y}`;
  return `${d} Z`;
}

export function RevisionCard({ project, release, icon, projectPage = false }) {
  const heading = projectPage
    ? project.name
    : `${project.name} ${release.version}`;
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        width: 1200,
        height: 630,
        backgroundColor: '#e7eae3',
        backgroundImage:
          'linear-gradient(#9ccbe01f 1px, transparent 1px), linear-gradient(90deg, #9ccbe01f 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        color: '#23272a',
        fontFamily: 'Atkinson',
      }}
    >
      <div style={{ ...column, marginLeft: 72, width: 485 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          <img src={icon} width={42} height={42} alt="" />
          Redline
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 42,
            fontSize: heading.length > 30 ? 45 : 56,
            lineHeight: 1.08,
            letterSpacing: '-.045em',
            fontWeight: 650,
            maxHeight: 180,
            overflow: 'hidden',
          }}
        >
          {clip(heading, 85)}
        </div>
        <div
          style={{
            display: 'flex',
            ...mono,
            fontSize: 12,
            color: '#c2331d',
            marginTop: 22,
          }}
        >
          {projectPage
            ? `${project.count} SELECTED REVISIONS`
            : `REVISION ${release.rev} · ${formatDate(release.date).toUpperCase()}`}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 21,
            lineHeight: 1.5,
            color: '#5f666b',
            marginTop: 18,
          }}
        >
          {clip(projectPage ? project.blurb : release.title, 125)}
        </div>
      </div>
      <div
        style={{
          ...column,
          position: 'absolute',
          left: 614,
          width: 514,
          border: '1px solid #23272a66',
          boxShadow: '8px 8px 0 #23272a0c',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '17px 23px',
            borderBottom: '1px solid #23272a66',
            ...mono,
            fontSize: 12,
          }}
        >
          <span>REGISTER OF REVISIONS</span>
          <span style={{ color: '#c2331d' }}>
            {projectPage ? 'LATEST REVISION' : 'REVISION NOTES'}
          </span>
        </div>
        <div
          style={{
            ...column,
            position: 'relative',
            height: 304,
            margin: 12,
            padding: '25px 26px',
          }}
        >
          <svg
            aria-hidden="true"
            width="488"
            height="308"
            viewBox="0 0 488 308"
            style={{ position: 'absolute', top: -2, left: -1 }}
          >
            <path d={cloud()} fill="none" stroke="#d63e27" strokeWidth="1.3" />
          </svg>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              ...mono,
              fontSize: 11,
              color: '#5f666b',
            }}
          >
            <span>
              {clip(
                `${project.slug.toUpperCase()} / ${release?.version ?? '—'}`,
                31,
              )}
            </span>
            <span>
              {release
                ? formatDate(release.date).toUpperCase()
                : 'NO REVISIONS YET'}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 18,
              fontSize: 29,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: '-.025em',
              height: 65,
              overflow: 'hidden',
            }}
          >
            {clip(release?.title ?? project.name, 65)}
          </div>
          <div style={{ ...column, marginTop: 20, gap: 12 }}>
            {(
              release?.changes ?? [
                {
                  kind: 'changed',
                  text: 'New revisions will appear here as this project develops.',
                },
              ]
            )
              .slice(0, 3)
              .map((change) => (
                <div
                  key={`${change.kind}:${change.text}`}
                  style={{
                    display: 'flex',
                    gap: 12,
                    fontSize: 14,
                    lineHeight: 1.4,
                    height: 40,
                    overflow: 'hidden',
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      ...mono,
                      fontSize: 10,
                      letterSpacing: '.07em',
                      width: 82,
                      flexShrink: 0,
                      paddingTop: 3,
                      color:
                        change.kind === 'added'
                          ? '#287a4d'
                          : change.kind === 'changed'
                            ? '#5f666b'
                            : '#c2331d',
                    }}
                  >
                    {change.kind.toUpperCase()}
                  </span>
                  <span style={{ display: 'flex', width: 320 }}>
                    {clip(change.text, 82)}
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '15px 23px',
            borderTop: '1px solid #23272a66',
            ...mono,
            fontSize: 11,
            color: '#5f666b',
          }}
        >
          <span>+ ADDED · ~ CHANGED · FIXED</span>
          <span>NEWEST FIRST ↓</span>
        </div>
      </div>
    </div>
  );
}
