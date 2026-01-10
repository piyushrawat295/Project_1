import { verifySession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { logout } from '@/actions/auth';

export default async function AdminDashboard() {
  const session = await verifySession();

  if (!session || session.role !== 'admin') {
    redirect('/signin');
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <form action={logout}>
            <button className="rounded px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:underline">
              Sign Out
            </button>
          </form>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
             <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
             <p className="mt-2 text-3xl font-bold text-blue-600">Pending</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
             <h3 className="text-lg font-medium text-gray-900">All NGOs</h3>
             <p className="mt-2 text-3xl font-bold text-green-600">Pending</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
             <h3 className="text-lg font-medium text-gray-900">System Status</h3>
             <p className="mt-2 text-xl font-semibold text-gray-500">Operational</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Recent Activity</h2>
            <p className="text-gray-500">No recent activity found.</p>
        </div>
      </div>
    </div>
  );
}
