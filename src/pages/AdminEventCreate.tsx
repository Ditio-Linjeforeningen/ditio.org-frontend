import { useNavigate, Link } from "react-router-dom";
import { createEvent } from "../api/events";
import type { EventInput } from "../api/events";
import EventForm from "../components/EventForm";

export default function AdminEventCreate() {
  const navigate = useNavigate();

  const handleSubmit = async (data: EventInput) => {
    await createEvent(data);
    navigate("/admin/events");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Nytt arrangement</h1>
        <Link
          to="/admin/events"
          className="text-sm font-semibold underline"
        >
          Tilbake
        </Link>
      </div>

      <div className="rounded border border-slate-200 p-6">
        <EventForm
          onSubmit={handleSubmit}
          submitLabel="Opprett arrangement"
          onCancel={() => navigate("/admin/events")}
        />
      </div>
    </div>
  );
}
