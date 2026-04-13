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
