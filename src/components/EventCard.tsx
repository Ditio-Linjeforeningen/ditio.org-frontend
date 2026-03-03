import type { Event } from "../data/mockEvent";

type EventCardProps = {
  event: Event;
};

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="border border-black bg-white">
      <img
        src={event.image}
        alt={event.title}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg">{event.title}</h2>
        <p className="text-sm">{event.description}</p>  
        <p className="text-sm">{event.location}</p>
        <p className="text-sm">{event.categoryId}</p>
        <p className="text-sm">{event.date}</p>

        <button>
          Les mer
        </button>
      </div>
    </div>
  );
};
