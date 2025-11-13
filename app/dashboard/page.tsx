// app/dashboard/page.tsx
import LoginClient from '@/app/components/LoginClient';
import DashboardClient from '@/app/components/DashboardClient';
import LogoutButton from '@/app/components/LogoutButton';  // ✅ import this
import { cookies } from 'next/headers';
import { verifyAdmin, TOKEN_NAME } from '@/lib/auth';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const user = token ? verifyAdmin(token) : null;

  if (!user) {
    return (
      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard — Login</h1>
        <LoginClient />
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="text-sm text-gray-500">
            Signed in as: <span className="font-medium">{String((user as any).username)}</span>
          </div>
        </div>

        {/* ✅ Logout button here */}
        <LogoutButton />
      </div>

      <DashboardClient />
    </main>
  );
}
