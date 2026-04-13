import { Link } from "react-router-dom";
import { mockEvents } from "../data/mockEvent";
import { mockRegistrations } from "../data/mockRegistration";

export default function AdminEvents() {
  const getRegistrationCount = (eventId: number) =>
    mockRegistrations.filter((registration) => registration.eventId === eventId)
      .length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold">Admin: Arrangementer</h1>
      <p className="mb-8 text-sm text-slate-600">
        Trykk "Se detaljer" for mer info.
      </p>

      <div className="overflow-x-auto rounded border border-slate-200">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2">Tittel</th>
              <th className="px-3 py-2">Dato</th>
              <th className="px-3 py-2">Sted</th>
              <th className="px-3 py-2">Påmeldte</th>
              <th className="px-3 py-2">Handling</th>
            </tr>
          </thead>
          <tbody>
            {mockEvents.map((event) => (
              <tr key={event.id} className="border-t border-slate-200">
                <td className="px-3 py-2 font-medium">{event.title}</td>
                <td className="px-3 py-2">{event.date}</td>
                <td className="px-3 py-2">{event.location}</td>
                <td className="px-3 py-2">{getRegistrationCount(event.id)}</td>
                <td className="px-3 py-2">
                  <Link
                    to={`/admin/events/${event.id}`}
                    className="rounded border border-slate-300 px-2 py-1"
                  >
                    Se detaljer
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
