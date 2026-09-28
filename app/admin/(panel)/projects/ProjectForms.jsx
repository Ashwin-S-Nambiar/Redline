'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Plus } from '@/components/Icons';
import { toast } from '@/lib/toast';
import { saveProject } from '../../actions';

const blank = {
  slug: '',
  name: '',
  formerly: [],
  blurb: '',
  url: '',
  repo: '',
  note: '',
  order: 0,
  count: 0,
};

function ProjectForm({ project, onDone }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState('');
  const [f, setF] = useState({
    ...project,
    formerly: project.formerly.join(', '),
  });
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    setError('');
    start(async () => {
      const res = await saveProject(project.slug || null, f);
      if (res.error) {
        setError(res.error);
        return;
      }
      toast('Saved', `${f.name} is up to date.`);
      router.refresh();
      onDone?.();
    });
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-3 border-b border-graphite p-4 min-[720px]:p-6"
    >
      <div className="flex items-baseline gap-3">
        <h2 className="letter text-[20px] leading-none">
          {project.name || 'New project'}
        </h2>
        {project.slug ? (
          <span className="mono text-xs text-lead">
            {project.count} revisions
          </span>
        ) : null}
      </div>
      <div className="grid gap-3 min-[720px]:grid-cols-[1fr_1fr_1fr_90px]">
        <label className="field">
          <span className="caption">Name</span>
          <input
            className="input"
            value={f.name}
            onChange={set('name')}
            required
          />
        </label>
        <label className="field">
          <span className="caption">Address</span>
          <input
            className="input mono text-sm"
            value={f.slug}
            onChange={set('slug')}
            placeholder="tenzies"
            required
          />
        </label>
        <label className="field">
          <span className="caption">Formerly</span>
          <input
            className="input"
            value={f.formerly}
            onChange={set('formerly')}
            placeholder="Old names, comma separated"
          />
        </label>
        <label className="field">
          <span className="caption">Order</span>
          <input
            className="input mono text-sm"
            type="number"
            value={f.order}
            onChange={set('order')}
          />
        </label>
      </div>
      <label className="field">
        <span className="caption">Description</span>
        <textarea
          className="input min-h-16"
          value={f.blurb}
          onChange={set('blurb')}
        />
      </label>
      <div className="grid gap-3 min-[720px]:grid-cols-3">
        <label className="field">
          <span className="caption">Live site</span>
          <input
            className="input text-sm"
            type="url"
            value={f.url}
            onChange={set('url')}
          />
        </label>
        <label className="field">
          <span className="caption">GitHub repo</span>
          <input
            className="input mono text-sm"
            value={f.repo}
            onChange={set('repo')}
            placeholder="owner/name"
          />
        </label>
        <label className="field">
          <span className="caption">Note</span>
          <input
            className="input text-sm"
            type="url"
            value={f.note}
            onChange={set('note')}
          />
        </label>
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" className="btn solid" disabled={pending}>
          {pending ? 'Saving' : project.slug ? 'Save' : 'Add project'}
        </button>
        <p className="text-[13.5px] text-redline-ink" aria-live="polite">
          {error}
        </p>
      </div>
    </form>
  );
}

export default function ProjectForms({ projects }) {
  const [adding, setAdding] = useState(false);
  return (
    <div>
      <div className="flex items-center gap-3 border-b border-graphite px-4 py-3">
        <h1 className="letter text-[26px] leading-none">Projects</h1>
        <span className="mono text-xs text-lead">{projects.length}</span>
        <button
          type="button"
          className="btn ml-auto"
          onClick={() => setAdding(true)}
          disabled={adding}
        >
          <Plus size={16} /> Add a project
        </button>
      </div>
      {adding ? (
        <ProjectForm project={blank} onDone={() => setAdding(false)} />
      ) : null}
      {projects.map((p) => (
        <ProjectForm key={p.slug} project={p} />
      ))}
    </div>
  );
}
