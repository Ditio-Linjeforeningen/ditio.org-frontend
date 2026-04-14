import { EventCard } from "../components/EventCard";
import { useEvents } from "../hooks/useEvents";
import Footer from "../components/Footer";

export default function Events() {
  const { events, loading, error } = useEvents();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Arrangementer</h1>

      {loading && <p className="text-sm">Laster...</p>}
      {error && <p className="text-sm text-red-600">Feil: {error}</p>}
      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.eventId} event={event} />
          ))}
          {events.length === 0 && (
            <p className="text-sm">Ingen arrangementer enda.</p>
          )}
        </div>
      )}
    </div>
    <Footer />
  );
}
