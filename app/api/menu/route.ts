// app/api/menu/route.ts  (temporary debug version)
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Menu } from '@/models/Menu';

export async function GET() {
  try {
    await connectToDatabase();

    // how many docs Mongoose sees
    const count = await Menu.collection.countDocuments().catch(() => -1);
    // try to find our slug
    const found = await Menu.findOne({ slug: 'indian-restaurant' }).lean();
    // peek at any sample doc
    const sample = await Menu.findOne({}).lean();

    return NextResponse.json({
      ok: true,
      collectionCount: count,
      foundSlug: found ? found.slug : null,
      sampleSlug: sample ? sample.slug : null,
    });
  } catch (e: any) {
    console.error('menu route debug error', e);
    return NextResponse.json({ error: 'Server error', detail: String(e) }, { status: 500 });
  }
}
