export default function DashboardLoading() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 w-64 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
        ))}
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <div className="h-[400px] bg-gray-50 rounded-2xl animate-pulse" />
          <div className="h-[300px] bg-gray-50 rounded-2xl animate-pulse" />
        </div>
        <div className="space-y-8">
          <div className="h-[250px] bg-gray-50 rounded-2xl animate-pulse" />
          <div className="h-[250px] bg-gray-50 rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
