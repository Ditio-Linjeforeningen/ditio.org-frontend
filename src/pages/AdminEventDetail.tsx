import { Link, useParams } from "react-router-dom";
import { mockEvents } from "../data/mockEvent";
import { mockRegistrations } from "../data/mockRegistration";

const formatUnix = (value: number) =>
  value > 0 ? new Date(value * 1000).toLocaleString("nb-NO") : "Ikke satt";

export default function AdminEventDetail() {
  const { id } = useParams<{ id: string }>();
  const eventId = Number(id);
  const event = mockEvents.find((item) => item.id === eventId);

  if (!event) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold">Arrangement ikke funnet</h1>
        <Link to="/admin/events" className="text-sm font-semibold underline">
          Tilbake til admin
        </Link>
      </div>
    );
  }

  const registrations = mockRegistrations.filter(
    (registration) => registration.eventId === event.id
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin: {event.title}</h1>
        <Link to="/admin/events" className="text-sm font-semibold underline">
          Tilbake
        </Link>
      </div>

      <div className="mb-8 grid gap-3 rounded border border-slate-200 p-4 text-sm">
        <p>
          <span className="font-semibold">Dato:</span> {event.date}
        </p>
        <p>
          <span className="font-semibold">Sted:</span> {event.location}
        </p>
        <p>
          <span className="font-semibold">Beskrivelse:</span> {event.description}
        </p>
        <p>
          <span className="font-semibold">Kategori ID:</span> {event.categoryId}
        </p>
        <p>
          <span className="font-semibold">Offentlig:</span>{" "}
          {event.isPublic ? "Ja" : "Nei"}
        </p>
        <p>
          <span className="font-semibold">Start:</span> {formatUnix(event.start)}
        </p>
        <p>
          <span className="font-semibold">Slutt:</span> {formatUnix(event.end)}
        </p>
        <p>
          <span className="font-semibold">Opprettet:</span>{" "}
          {new Date(event.createdAt).toLocaleString("nb-NO")}
        </p>
        <p>
          <span className="font-semibold">Oppdatert:</span>{" "}
          {new Date(event.updatedAt).toLocaleString("nb-NO")}
        </p>
      </div>

      <h2 className="mb-3 text-xl font-semibold">
        Påmeldte ({registrations.length})
      </h2>
      <div className="overflow-x-auto rounded border border-slate-200">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2">Navn</th>
              <th className="px-3 py-2">E-post</th>
              <th className="px-3 py-2">Påmeldt</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration) => (
              <tr key={registration.id} className="border-t border-slate-200">
                <td className="px-3 py-2">{registration.name}</td>
                <td className="px-3 py-2">{registration.email}</td>
                <td className="px-3 py-2">
                  {new Date(registration.registeredAt).toLocaleString("nb-NO")}
                </td>
              </tr>
            ))}
            {registrations.length === 0 && (
              <tr className="border-t border-slate-200">
                <td className="px-3 py-2 text-slate-500" colSpan={3}>
                  Ingen påmeldte enda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
