import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eventsApi } from '../../api/events';
import type { Event } from '../../types/event';
import styles from './AdminEvents.module.css';

export default function AdminEventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    eventsApi
      .getAll()
      .then(setEvents)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : 'Failed to load events'),
      )
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await eventsApi.delete(id);
      setEvents((prev) => prev.filter((e) => e.eventId !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete event');
    }
  }

  if (loading) return <p className={styles.status}>Loading events…</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Events</h1>
        <Link to="/admin/events/new" className={styles.newButton}>
          + New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <p className={styles.status}>No events found.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Start</th>
              <th>Location</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.eventId}>
                <td>{event.title}</td>
                <td>{new Date(event.startTime).toLocaleString()}</td>
                <td>{event.location ?? '—'}</td>
                <td>{event.isPublished ? '✅' : '❌'}</td>
                <td className={styles.actions}>
                  <Link to={`/admin/events/${event.eventId}/edit`}>Edit</Link>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(event.eventId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
