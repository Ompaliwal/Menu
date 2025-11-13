// app/api/admin/logout/route.ts

import { NextResponse } from 'next/server';
import { TOKEN_NAME } from '@/lib/auth';

// Clear the admin token cookie
export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(TOKEN_NAME, '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0), // expire immediately
  });
  return res;
}
