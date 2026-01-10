import { verifySession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { logout } from '@/actions/auth';

export default async function NGODashboard() {
  const session = await verifySession();

  if (!session || session.role !== 'ngo') {
    redirect('/signin');
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
         <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">NGO Dashboard</h1>
          <form action={logout}>
            <button className="rounded px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:underline">
              Sign Out
            </button>
          </form>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow">
             <h3 className="text-lg font-medium text-gray-900">My Profile</h3>
             <p className="mt-2 text-gray-600">Manage your NGO details and location.</p>
             <button className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Edit Profile</button>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
             <h3 className="text-lg font-medium text-gray-900">Impact Stats</h3>
             <p className="mt-2 text-gray-600">View your contribution analytics.</p>
             <button className="mt-4 rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">View Reports</button>
          </div>
        </div>
      </div>
    </div>
  );
}
