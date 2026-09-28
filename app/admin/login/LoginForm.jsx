'use client';

import { useActionState, useState } from 'react';
import { login } from '../actions';

export default function LoginForm({ next }) {
  const [state, action, pending] = useActionState(login, null);
  const [email, setEmail] = useState('');
  return (
    <form action={action} className="grid gap-4 p-5">
      <input type="hidden" name="next" value={next} />
      <label className="field">
        <span className="caption">Email</span>
        <input
          className="input"
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="field">
        <span className="caption">Password</span>
        <input
          className="input"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>
      <p className="min-h-5 text-[13.5px] text-redline-ink" aria-live="polite">
        {state?.error ?? ''}
      </p>
      <button type="submit" className="btn solid h-10" disabled={pending}>
        {pending ? 'Signing in' : 'Sign in'}
      </button>
    </form>
  );
}
