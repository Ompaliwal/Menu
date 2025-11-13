// app/api/admin/price/route.ts  
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Menu } from '@/models/Menu';
import { verifyAdmin, TOKEN_NAME } from '@/lib/auth';
import { cookies } from 'next/headers';

async function requireAuth() {
  // NOTE: cookies() returns a Promise in some Next versions, so await it
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  if (!token) return null;
  return verifyAdmin(token as string);
}

export async function PUT(req: Request) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, price } = await req.json();

    if (!id || typeof price !== 'number') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    await connectToDatabase();

    // Update the nested item's price
    const res = await Menu.updateOne(
      { slug: 'indian-restaurant', 'items.id': id },
      { $set: { 'items.$.price': price } }
    );

    // Mongoose 8: updateOne returns an object with matchedCount / modifiedCount
    if ((res as any).matchedCount === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Return the updated item (refetch doc)
    const doc = await Menu.findOne({ slug: 'indian-restaurant' }).lean();
    const item = doc?.items.find((it) => it.id === id);

    return NextResponse.json({ ok: true, item });
  } catch (e: any) {
    console.error('update price error', e);
    return NextResponse.json({ error: 'Could not update' }, { status: 500 });
  }
}
