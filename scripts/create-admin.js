import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const { ADMIN_EMAIL, ADMIN_PASSWORD, DATABASE_URL } = process.env;
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD first.');
  process.exit(1);
}
const sql = neon(DATABASE_URL);
const password = await bcrypt.hash(ADMIN_PASSWORD, 12);
await sql`insert into admins (email, password) values (${ADMIN_EMAIL}, ${password})
  on conflict (email) do update set password = excluded.password`;
console.log(`Admin ready: ${ADMIN_EMAIL}`);
