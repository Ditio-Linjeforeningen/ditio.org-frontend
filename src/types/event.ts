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

/** Form state uses empty strings in place of null for optional text fields */
export interface EventFormState {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  maxAttendees: number | null;
  isPublished: boolean;
}

