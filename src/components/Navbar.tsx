import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto border-b border-slate-100">
      <Link to="/" className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <img src="/favicon.ico" alt="Ditio logo" className="h-12" />
          <span className="text-xl font-bold tracking-tighter">DITIO</span>
        </div>
      </Link>

      <div className="flex gap-6 text-xs font-bold uppercase tracking-widest">
        <Link to="/events" className="hover:text-ditio-blue transition">
          Arrangementer
        </Link>
        <Link to="/om-oss" className="hover:text-ditio-blue transition">
          Om oss
        </Link>
        <Link to="/kontakt" className="hover:text-ditio-blue transition">
          Kontakt
        </Link>
      </div>
    </nav>
  );
}
