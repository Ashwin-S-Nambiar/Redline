import Revision from './Revision';

export default function Register({ releases, repos, showProject = true }) {
  const latestId = releases[0]?.id;
  return (
    <>
      <div className="thead" aria-hidden="true">
        <span>Rev</span>
        <span>Description</span>
        <span>Date</span>
      </div>
      <div className="register">
        {releases.map((r) => (
          <Revision
            key={r.id}
            r={r}
            repo={repos[r.project]}
            showProject={showProject}
            latest={r.id === latestId}
          />
        ))}
      </div>
    </>
  );
}
