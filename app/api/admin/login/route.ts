// app/api/admin/login/route.ts
import { NextResponse } from 'next/server';
import { signAdmin, TOKEN_NAME } from '@/lib/auth';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const ADMIN_USER = process.env.ADMIN_USER || 'admin';
  const ADMIN_PASS = process.env.ADMIN_PASS || 'password';

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = signAdmin({ username });

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: TOKEN_NAME,
    value: token,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
