// app/api/admin/menu/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Menu } from '@/models/Menu';
import { verifyAdmin, TOKEN_NAME } from '@/lib/auth';
import { cookies } from 'next/headers';

// Basic cookie auth check for admin — reuse verifyAdmin
async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  if (!token) return null;
  return verifyAdmin(token as string);
}

export async function GET() {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectToDatabase();
    const doc = await Menu.findOne({ slug: 'indian-restaurant' }).lean();
    if (!doc) return NextResponse.json({ error: 'Menu not found' }, { status: 404 });

    // return items only (so dashboard receives a small payload)
    const items = (doc.items || []).map((it: any) => ({
      id: it.id,
      name: it.name,
      categoryId: it.categoryId,
      price: it.price,
      images: it.images?.slice(0, 1) || [],
    }));

    return NextResponse.json({ items });
  } catch (e: any) {
    console.error('[api/admin/menu] error', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
