'use client';

import { useState } from 'react';
import { flushSync } from 'react-dom';
import Revision from './Revision';

export default function Register({ releases, repos, showProject = true }) {
  const latestId = releases[0]?.id;
  const [transitionId, setTransitionId] = useState(null);
  return (
    <>
      <div className="thead" aria-hidden="true">
        <span>Rev</span>
        <span>Description</span>
        <span>Date</span>
      </div>
      <div
        className="register"
        onClickCapture={(event) => {
          if (!event.target.closest('a[data-rev-link]')) return;
          const id = event.target.closest('.rev')?.dataset.releaseId;
          if (id) flushSync(() => setTransitionId(id));
        }}
      >
        {releases.map((r) => (
          <Revision
            key={r.id}
            r={r}
            repo={repos[r.project]}
            showProject={showProject}
            latest={r.id === latestId}
            activeTransition={r.id === transitionId}
          />
        ))}
      </div>
    </>
  );
}
