import { getEvents } from "@/actions/ngo-features";
import EventsClient from "@/components/dashboard/EventsClient";

export default async function EventsPage() {
  const { data, stats, error } = await getEvents();

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return <EventsClient initialData={data || []} initialStats={stats} />;
}
