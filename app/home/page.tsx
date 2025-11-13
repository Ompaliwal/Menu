// app/home/page.tsx  (Server Component)
import Image from 'next/image';
import CategoryNavClient from '@/app/components/CategoryNavClient';
import { connectToDatabase } from '@/lib/mongoose';
import { Menu as MenuModel } from '@/models/Menu';

export default async function HeroMenu() {
  const slug = 'indian-restaurant';
  const table = 'T1';

  try {
    await connectToDatabase();
  } catch (err) {
    console.error('DB connect error', err);
    return <div className="p-6">Database connection error</div>;
  }

  const doc = await MenuModel.findOne({ slug }).lean().exec();

  if (!doc) {
    return <div className="p-6">Menu not available</div>;
  }

  const menu = doc as {
    slug: string;
    name: string;
    currency: string;
    categories: { id: string; name: string; icon?: string }[];
    items: Array<{
      id: string;
      categoryId: string;
      name: string;
      description?: string;
      price: number;
      weightGrams?: number;
      calories?: number;
      images?: string[];
      veg?: boolean;
    }>;
  };

  return (
    <main
      className="max-w-4xl mx-auto p-4"
      style={{
        backgroundColor: 'var(--color-bg-main)',
        color: 'var(--color-text-main)',
      }}
    >
      <header className="mb-4">
        <h1 className="text-2xl font-bold">{menu.name}</h1>
      </header>

      <CategoryNavClient categories={menu.categories} />

      {menu.categories.map((cat) => (
        <section
          id={cat.id}
          key={cat.id}
          style={{ scrollMarginTop: '4rem' }}
          className="mb-6"
        >
          <h2 className="text-xl font-semibold mb-2">{cat.name}</h2>
          <div className="space-y-4">
            {menu.items
              .filter((it) => it.categoryId === cat.id)
              .map((item) => (
                <article key={item.id} className="flex gap-3 items-start border-b pb-3">
                  <div className="w-28 h-20 relative rounded overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.images?.[0] ? (
                      <Image src={item.images[0]} alt={item.name} fill style={{ objectFit: 'cover' }} />
                    ) : null}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">
                        {item.name} {item.veg ? '🌱' : '🍖'}
                      </h3>
                      <div className="text-right">
                        <div className="text-sm">
                          {menu.currency} {item.price}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.weightGrams ?? '-'} g • {item.calories ?? '-'} kcal
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </article>
              ))}
          </div>
        </section>
      ))}

      <footer className="text-center text-xs text-gray-500 mt-6">
        Developed with ❤️ by Bagora Agency
      </footer>
    </main>
  );
}
