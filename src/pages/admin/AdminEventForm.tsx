import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eventsApi } from '../../api/events';
import type { EventFormData } from '../../types/event';
import styles from './AdminEvents.module.css';

const EMPTY: EventFormData = {
  title: '',
  description: '',
  startTime: '',
  endTime: '',
  location: '',
  maxAttendees: null,
  isPublished: false,
};

function toInputDatetime(iso: string | null | undefined): string {
  if (!iso) return '';
  // LocalDateTime from Java comes as "2024-01-15T18:00:00" – valid for datetime-local
  return iso.slice(0, 16);
}

export default function AdminEventForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<EventFormData>(EMPTY);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    eventsApi
      .getById(id)
      .then((event) => {
        setForm({
          title: event.title,
          description: event.description ?? '',
          startTime: toInputDatetime(event.startTime),
          endTime: toInputDatetime(event.endTime),
          location: event.location ?? '',
          maxAttendees: event.maxAttendees,
          isPublished: event.isPublished,
        });
      })
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : 'Failed to load event'),
      )
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (name === 'maxAttendees') {
      setForm((prev) => ({
        ...prev,
        maxAttendees: value === '' ? null : Number(value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: EventFormData = {
      ...form,
      description: form.description || null,
      endTime: form.endTime || null,
      location: form.location || null,
    };

    try {
      if (isEditing && id) {
        await eventsApi.update(id, payload);
      } else {
        await eventsApi.create(payload);
      }
      navigate('/admin/events');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save event');
      setSaving(false);
    }
  }

  if (loading) return <p className={styles.status}>Loading…</p>;

  return (
    <div className={styles.container}>
      <h1>{isEditing ? 'Edit Event' : 'New Event'}</h1>

      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Title *
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description ?? ''}
            onChange={handleChange}
            rows={5}
          />
        </label>

        <label>
          Start Time *
          <input
            type="datetime-local"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          End Time
          <input
            type="datetime-local"
            name="endTime"
            value={form.endTime ?? ''}
            onChange={handleChange}
          />
        </label>

        <label>
          Location
          <input
            name="location"
            value={form.location ?? ''}
            onChange={handleChange}
          />
        </label>

        <label>
          Max Attendees
          <input
            type="number"
            name="maxAttendees"
            value={form.maxAttendees ?? ''}
            onChange={handleChange}
            min={1}
          />
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="isPublished"
            checked={form.isPublished}
            onChange={handleChange}
          />
          Published
        </label>

        <div className={styles.formActions}>
          <button type="submit" disabled={saving} className={styles.saveBtn}>
            {saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Event'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/events')}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
