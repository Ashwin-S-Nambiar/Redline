import { neon } from '@neondatabase/serverless';

let client = null;

export function db() {
  client ??= neon(process.env.DATABASE_URL);
  return client;
}

export const KINDS = ['added', 'changed', 'fixed', 'removed'];
