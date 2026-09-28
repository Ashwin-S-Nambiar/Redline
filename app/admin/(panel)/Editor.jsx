'use client';

import { useRouter } from 'next/navigation';
import { useId, useRef, useState, useTransition } from 'react';
import { Close, Down, Plus, Pull, Up } from '@/components/Icons';
import Revision from '@/components/Revision';
import { KIND_LABEL, plural } from '@/lib/format';
import { toast } from '@/lib/toast';
import { draftFromGitHub, saveRelease } from '../actions';

const today = () => new Date().toISOString().slice(0, 10);
let key = 0;
const withKey = (c) => ({ ...c, key: ++key });

export default function Editor({ projects, release, defaultProject }) {
  const router = useRouter();
  const id = useId();
  const [pending, start] = useTransition();
  const [drafting, startDraft] = useTransition();
  const [error, setError] = useState('');
  const list = useRef(null);
  const [form, setForm] = useState(() => ({
    project: release?.project ?? defaultProject ?? projects[0]?.slug ?? '',
    version: release?.version ?? '',
    date: release?.date?.slice(0, 10) ?? today(),
    title: release?.title ?? '',
    notes: release?.notes ?? '',
    commits: release?.commits?.join(' ') ?? '',
    changes: (release?.changes?.length
      ? release.changes
      : [{ kind: 'added', text: '' }]
    ).map(withKey),
  }));

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));
  const setChange = (i, patch) =>
    setForm((f) => ({
      ...f,
      changes: f.changes.map((c, j) => (j === i ? { ...c, ...patch } : c)),
    }));

  function addChange(after = form.changes.length - 1, kind = 'added') {
    setForm((f) => {
      const changes = [...f.changes];
      changes.splice(after + 1, 0, withKey({ kind, text: '' }));
      return { ...f, changes };
    });
    requestAnimationFrame(() => {
      list.current?.querySelectorAll('input[data-change]')[after + 1]?.focus();
    });
  }

  function move(i, by) {
    setForm((f) => {
      const changes = [...f.changes];
      const j = i + by;
      if (j < 0 || j >= changes.length) return f;
      [changes[i], changes[j]] = [changes[j], changes[i]];
      return { ...f, changes };
    });
  }

  function removeChange(i) {
    setForm((f) => ({ ...f, changes: f.changes.filter((_, j) => j !== i) }));
  }

  const current = projects.find((p) => p.slug === form.project);

  function draft() {
    setError('');
    startDraft(async () => {
      const res = await draftFromGitHub(form.project);
      if (res.error) {
        setError(res.error);
        return;
      }
      setForm((f) => {
        const kept = f.changes.filter((c) => c.text.trim());
        return {
          ...f,
          version: f.version || res.version,
          date: res.date,
          commits: res.commits,
          changes: [...kept, ...res.changes.map(withKey)],
        };
      });
      toast(
        'Drafted',
        `${plural(res.changes.length, 'change')} from GitHub. Rewrite them for people, not commits.`,
        4000,
      );
    });
  }

  function save(e) {
    e.preventDefault();
    setError('');
    start(async () => {
      const res = await saveRelease(release?.id, form);
      if (res.error) {
        setError(res.error);
        return;
      }
      toast(
        release ? 'Saved' : 'Published',
        `${current?.name} ${form.version} is live.`,
      );
      if (release) router.refresh();
      else router.push('/admin');
    });
  }

  const rev = release?.rev ?? (current?.count ?? 0) + 1;
  const preview = {
    ...form,
    id: 'preview',
    rev,
    name: current?.name ?? '',
    date: `${form.date || today()}T12:00:00.000Z`,
    commits: form.commits.split(/[\s,]+/).filter(Boolean),
    changes: form.changes.filter((c) => c.text.trim()),
  };

  return (
    <form
      onSubmit={save}
      className="grid min-[1000px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
    >
      <div className="grid content-start gap-5 border-graphite p-4 min-[1000px]:border-r min-[720px]:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="letter text-[26px] leading-none">
            {release ? 'Edit revision' : 'New revision'}
          </h1>
          <button
            type="button"
            className="btn"
            onClick={draft}
            disabled={drafting || !current?.repo}
            data-tip={
              current?.repo
                ? `Commits since ${current?.latest?.version ?? 'the start'}`
                : undefined
            }
          >
            <Pull size={16} />
            {drafting ? 'Reading GitHub' : 'Draft from GitHub'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 min-[560px]:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,1fr)]">
          <label className="field col-span-2 min-[560px]:col-span-1">
            <span className="caption">Project</span>
            <select
              className="input"
              value={form.project}
              onChange={(e) => set({ project: e.target.value })}
            >
              {projects.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="caption">Version</span>
            <input
              className="input mono"
              value={form.version}
              onChange={(e) => set({ version: e.target.value })}
              placeholder={
                current?.latest?.version
                  ? `After ${current.latest.version}`
                  : '1.0'
              }
              inputMode="decimal"
              required
            />
          </label>
          <label className="field">
            <span className="caption">Date</span>
            <input
              className="input mono"
              type="date"
              value={form.date}
              onChange={(e) => set({ date: e.target.value })}
              required
            />
          </label>
        </div>

        <label className="field">
          <span className="caption">Title</span>
          <input
            className="input"
            value={form.title}
            onChange={(e) => set({ title: e.target.value })}
            placeholder="What this release is, in a few words"
            required
          />
        </label>

        <fieldset className="grid gap-2">
          <legend className="caption mb-2">Changes</legend>
          <ul ref={list} className="grid gap-2">
            {form.changes.map((c, i) => (
              <li
                key={c.key}
                className="grid grid-cols-[104px_minmax(0,1fr)_auto] gap-1.5"
              >
                <select
                  className="input px-2 text-sm"
                  value={c.kind}
                  aria-label="Kind of change"
                  onChange={(e) => setChange(i, { kind: e.target.value })}
                >
                  {Object.entries(KIND_LABEL).map(([k, label]) => (
                    <option key={k} value={k}>
                      {label}
                    </option>
                  ))}
                </select>
                <input
                  data-change
                  className="input"
                  value={c.text}
                  aria-label={`Change ${i + 1}`}
                  placeholder="What someone using it will notice"
                  onChange={(e) => setChange(i, { text: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addChange(i, c.kind);
                    }
                    if (
                      e.key === 'Backspace' &&
                      !c.text &&
                      form.changes.length > 1
                    ) {
                      e.preventDefault();
                      removeChange(i);
                      requestAnimationFrame(() =>
                        list.current
                          ?.querySelectorAll('input[data-change]')
                          [Math.max(0, i - 1)]?.focus(),
                      );
                    }
                  }}
                />
                <span className="flex">
                  <button
                    type="button"
                    className="btn icon quiet w-8"
                    aria-label="Move up"
                    disabled={i === 0}
                    onClick={() => move(i, -1)}
                  >
                    <Up size={16} />
                  </button>
                  <button
                    type="button"
                    className="btn icon quiet w-8"
                    aria-label="Move down"
                    disabled={i === form.changes.length - 1}
                    onClick={() => move(i, 1)}
                  >
                    <Down size={16} />
                  </button>
                  <button
                    type="button"
                    className="btn icon quiet w-8"
                    aria-label="Remove"
                    disabled={form.changes.length === 1}
                    onClick={() => removeChange(i)}
                  >
                    <Close size={16} />
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="btn w-fit"
            onClick={() => addChange()}
          >
            <Plus size={16} /> Add a change
          </button>
          <p className="text-xs text-lead">
            Enter adds another line. Backspace on an empty line removes it.
          </p>
        </fieldset>

        <label className="field">
          <span className="caption">Notes</span>
          <textarea
            className="input min-h-28"
            value={form.notes}
            onChange={(e) => set({ notes: e.target.value })}
            placeholder="Optional. Markdown. Shown on the revision's own page."
          />
        </label>

        <label className="field">
          <span className="caption">Commits</span>
          <input
            className="input mono text-sm"
            value={form.commits}
            onChange={(e) => set({ commits: e.target.value })}
            placeholder="Short hashes, separated by spaces"
            aria-describedby={`${id}-commits`}
          />
          <span id={`${id}-commits`} className="text-xs text-lead">
            They link to{' '}
            {current?.repo ? `github.com/${current.repo}` : 'GitHub'}.
          </span>
        </label>
      </div>

      <div className="grid content-start gap-4 border-t border-graphite p-4 min-[1000px]:sticky min-[1000px]:top-14.5 min-[1000px]:border-t-0 min-[720px]:p-6">
        <h2 className="caption">Preview</h2>
        <div className="border-y border-graphite">
          <Revision
            r={preview}
            repo={current?.repo}
            showProject
            latest
            preview
            limit={99}
          />
        </div>
        <p
          className="min-h-5 text-[13.5px] text-redline-ink"
          aria-live="polite"
        >
          {error}
        </p>
        <div className="flex gap-2">
          <button
            type="submit"
            className="btn solid h-10 px-5"
            disabled={pending}
          >
            {pending ? 'Saving' : release ? 'Save changes' : 'Publish'}
          </button>
          <button
            type="button"
            className="btn quiet h-10"
            onClick={() => router.push('/admin')}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
