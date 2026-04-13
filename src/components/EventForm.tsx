import { useState } from "react";
import type { EventInput } from "../api/events";

type EventFormProps = {
  initialValues?: Partial<EventInput>;
  onSubmit: (data: EventInput) => Promise<void>;
  submitLabel: string;
  onCancel?: () => void;
};

const toDatetimeLocal = (iso?: string | null): string => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 16);
};

const fromDatetimeLocal = (value: string): string | null => {
  if (!value) return null;
  return new Date(value).toISOString();
};

export default function EventForm({
  initialValues,
  onSubmit,
  submitLabel,
  onCancel,
}: EventFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );
  const [startTime, setStartTime] = useState(
    toDatetimeLocal(initialValues?.startTime)
  );
  const [endTime, setEndTime] = useState(
    toDatetimeLocal(initialValues?.endTime)
  );
  const [location, setLocation] = useState(initialValues?.location ?? "");
  const [maxAttendees, setMaxAttendees] = useState<string>(
    initialValues?.maxAttendees != null
      ? String(initialValues.maxAttendees)
      : ""
  );
  const [isPublished, setIsPublished] = useState(
    initialValues?.isPublished ?? false
  );

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError("Tittel er påkrevd.");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || null,
        startTime: fromDatetimeLocal(startTime),
        endTime: fromDatetimeLocal(endTime),
        location: location.trim() || null,
        maxAttendees: maxAttendees
          ? (parseInt(maxAttendees, 10) || null)
          : null,
        isPublished,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "En feil oppstod");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ditio-blue";
  const labelClass = "mb-1 block text-sm font-semibold";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {error && (
        <p className="rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div>
        <label className={labelClass}>
          Tittel <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          placeholder="Arrangementstittel"
          required
        />
      </div>

      <div>
        <label className={labelClass}>Beskrivelse</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
          rows={4}
          placeholder="Kort beskrivelse av arrangementet"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Starttidspunkt</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Sluttidspunkt</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Sted</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={inputClass}
            placeholder="f.eks. Rom A, OsloMet"
          />
        </div>
        <div>
          <label className={labelClass}>Maks antall påmeldte</label>
          <input
            type="number"
            min={1}
            value={maxAttendees}
            onChange={(e) => setMaxAttendees(e.target.value)}
            className={inputClass}
            placeholder="Ingen grense"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="isPublished"
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300"
        />
        <label htmlFor="isPublished" className="text-sm font-semibold">
          Publisert (synlig for alle)
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded border border-ditio-navy bg-ditio-navy px-4 py-2 text-sm font-semibold text-white hover:bg-black transition-colors disabled:opacity-50"
        >
          {submitting ? "Lagrer..." : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Avbryt
          </button>
        )}
      </div>
    </form>
  );
}
