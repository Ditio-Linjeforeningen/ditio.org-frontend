export interface Event {
  eventId: string;
  title: string;
  description: string | null;
  startTime: string;
  endTime: string | null;
  location: string | null;
  maxAttendees: number | null;
  isPublished: boolean;
}

export type EventFormData = Omit<Event, 'eventId'>;
