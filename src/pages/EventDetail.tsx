import { useParams } from "react-router-dom";
import { mockEvents } from "../data/mockEvent";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const event = mockEvents.find((e) => e.id === parseInt(id || "0"));

  if (!event) {
    return (
      <div className="mx-auto max-w-5xl py-8">
        <h1 className="mb-6 text-2xl font-bold">Arrangement ikke funnet</h1>
        <p>Det arrangementet du leter etter finnes ikke.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl py-8">
      <img
        src={event.image}
        alt={event.title}
        className="h-64 w-full object-cover mb-6"
      />
      <h1 className="mb-4 text-3xl font-bold">{event.title}</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p>Dato:{event.date}</p>
          <p>Sted:{event.location}</p>
          <p >Kategori:{event.categoryId}</p>
          <p>Offentlig:{event.isPublic ? "Ja" : "Nei"}</p>
        </div>
        <div>
          <p>Beskrivelse:</p>
          <p>{event.description}</p>
        </div>
      </div>
    </div>
  );
}