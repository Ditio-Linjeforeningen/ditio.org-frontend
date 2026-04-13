import { Link } from "react-router-dom";
import { EventCard } from "../components/EventCard";
import { useEvents } from "../hooks/useEvents";

export default function Home() {
  const { events, loading, error } = useEvents();

  return (
    <div className="min-h-screen bg-white text-black">
      <section className="px-8 py-24 max-w-7xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-black mb-6">Ditio</h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Linjeforeningen for IT ved OsloMet. Vi skaper det sosiale og faglige
          miljøet i Pilestredet.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/events"
            className="bg-ditio-navy text-white px-8 py-3 font-bold hover:bg-black transition"
          >
            Se hva som skjer
          </Link>
          <a
            href="https://discord.gg/"
            className="border-2 border-ditio-navy text-ditio-navy px-8 py-3 font-bold hover:bg-slate-100 transition"
          >
            Discord
          </a>
        </div>
      </section>

      <section className="bg-slate-50 py-20 px-8 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-5">
            <div>
              <h2 className="text-4xl font-black">Kommende</h2>
            </div>
            <Link
              to="/events"
              className="text-xs font-bold uppercase border-b border-black pb-1"
            >
              Se alle
            </Link>
          </div>

          {loading && <p className="text-sm">Laster arrangementer...</p>}
          {error && <p className="text-sm text-red-600">Feil: {error}</p>}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.slice(0, 3).map((event) => (
                <EventCard key={event.eventId} event={event} />
              ))}
              {events.length === 0 && (
                <p className="text-sm ">Ingen arrangementer enda.</p>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-8 max-w-7xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">Kontakt oss</h3>
        <div className="flex flex-col md:flex-row justify-center gap-8 font-bold">
          <a
            href="mailto:kontakt@ditio.org"
            className="text-ditio-blue hover:underline"
          >
            kontakt@ditio.org
          </a>
          <a
            href="mailto:bedrift@ditio.org"
            className="text-ditio-blue hover:underline"
          >
            bedrift@ditio.org
          </a>
        </div>
      </section>

      <footer className="py-12 px-8 border-t border-slate-100 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-bold text-black mb-1">DITIO LINJEFORENING</p>
            <p>Pilestredet 35, 0166 Oslo</p>
          </div>

          <div className="flex gap-6 font-bold">
            <a href="#" className="hover:text-ditio-blue">
              Instagram
            </a>
            <a href="#" className="hover:text-ditio-blue">
              LinkedIn
            </a>
          </div>

          <div className="text-center md:text-right">
            <p>Org.nr: 936 009 395</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
