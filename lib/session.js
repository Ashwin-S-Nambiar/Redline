import { jwtVerify, SignJWT } from 'jose';

export const COOKIE = 'rl_admin';
const key = () => new TextEncoder().encode(process.env.JWT_SECRET);

export function sign(email) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('14d')
    .sign(key());
}

export async function verify(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key());
    return payload;
  } catch {
    return null;
  }
}
