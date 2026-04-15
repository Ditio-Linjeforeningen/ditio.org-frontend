export interface Event {
  id: number;
  title: string;
  image: string;
  date: string;
  location: string;
  start: number;
  end: number;
  description: string;
  categoryId: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export const mockEvents: Event[] = [
  {
    id: 1,
    title: "Bedriftspresentasjon",
    image: "https://picsum.photos/id/237/200/300",
    date: "2026-03-10",
    location: "Rom A",
    start: 1710082800,
    end: 1710090000,
    description: "Lær om karrieremuligheter.",
    categoryId: 1,
    isPublic: true,
    createdAt: "2026-01-01T10:00:00Z",
    updatedAt: "2026-01-01T10:00:00Z"
  },
  {
    id: 2,
    title: "Pizza og Programmering",
    image: "https://picsum.photos/id/237/200/300",
    date: "2026-03-12",
    location: "Rom B",
    start: 1710255600,
    end: 1710266400,
    description: "Vi koder sammen og spiser pizza.",
    categoryId: 2,
    isPublic: true,
    createdAt: "2026-01-05T12:00:00Z",
    updatedAt: "2026-01-05T12:00:00Z"
  }
  ,
  {
    id: 3,
    title: "Programmering",
    image: "https://picsum.photos/id/237/200/300",
    date: "2026-03-12",
    location: "Rom B",
    start: 1710255600,
    end: 1710266400,
    description: "Vi koder sammen.",
    categoryId: 2,
    isPublic: true,
    createdAt: "2026-01-05T12:00:00Z",
    updatedAt: "2026-01-05T12:00:00Z"
  }
];