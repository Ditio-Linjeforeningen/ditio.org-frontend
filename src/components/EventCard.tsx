import { Link } from "react-router-dom";
import type { Event } from "../data/mockEvent";

type EventCardProps = {
  event: Event;
};

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="group bg-white border border-slate-100 shadow-sm flex flex-col h-full">
      <div className="h-48">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-6 flex flex-col">
        <p className="text-xs font-bold mb-1">{event.date}</p>
        <h2 className="text-xl font-black mb-3">{event.title}</h2>
        <p className="text-sm mb-4">{event.description}</p>

        <div className="flex items-center text-xs mb-6">
          <p className="">Sted: {event.location}</p>
        </div>
        <Link
          to={`/events/${event.id}`}
          className="text-sm font-bold uppercase border-b-2 pb-1 self-start hover:text-ditio-blue hover:border-ditio-blue transition-colors"
        >
          Les mer
        </Link>
      </div>
    </div>
  );
};
