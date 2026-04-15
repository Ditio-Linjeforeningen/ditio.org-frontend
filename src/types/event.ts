export type Event = {
  eventId: string;
  title: string;
  description?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  location?: string | null;
  maxAttendees?: number | null;
  isPublished: boolean;
};

export type NewEvent = {
  title: string;
  description?: string | null;
  startTime: string;
  endTime?: string | null;
  location?: string | null;
  maxAttendees?: number | null;
  isPublished: boolean;
};
