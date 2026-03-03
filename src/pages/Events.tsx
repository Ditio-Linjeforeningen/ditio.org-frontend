import { EventCard } from "../components/EventCard";
import { mockEvents } from "../data/mockEvent";

export default function Events() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Arrangementer</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
