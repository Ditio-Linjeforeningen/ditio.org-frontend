export interface Registration {
  id: number;
  eventId: number;
  name: string;
  email: string;
  registeredAt: string;
}

export const mockRegistrations: Registration[] = [
  {
    id: 1,
    eventId: 1,
    name: "Ola Nordmann",
    email: "ola@test.com",
    registeredAt: "2026-03-01T10:15:00Z",
  },
  {
    id: 2,
    eventId: 2,
    name: "Fardinch",
    email: "fardinch@test.com",
    registeredAt: "2026-03-02T14:40:00Z",
  },
  {
    id: 3,
    eventId: 2,
    name: "Per",
    email: "per@example.com",
    registeredAt: "2026-03-03T08:05:00Z",
  },
  {
    id: 4,
    eventId: 3,
    name: "Anne",
    email: "anne@test.com",
    registeredAt: "2026-03-04T16:20:00Z",
  },
];
