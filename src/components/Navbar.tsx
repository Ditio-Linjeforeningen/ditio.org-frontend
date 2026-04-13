import { Link } from "react-router-dom";
import { authService } from "../auth";
import { useAuth } from "../auth/useAuth";

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto border-b border-slate-100">
      <Link to="/" className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <img src="/favicon.ico" alt="Ditio logo" className="h-12" />
          <span className="text-xl font-bold tracking-tighter">DITIO</span>
        </div>
      </Link>

      <div className="flex gap-6 text-xs font-bold uppercase tracking-widest items-center">
        <Link to="/events" className="hover:text-ditio-blue transition">
          Arrangementer
        </Link>
        {user?.isAdmin && (
          <Link to="/admin/events" className="hover:text-ditio-blue transition">
            Admin
          </Link>
        )}
        <Link to="/about" className="hover:text-ditio-blue transition">
          Om oss
        </Link>
        <span className="text-slate-500 cursor-default">
          Kontakt
        </span>
        {!loading &&
          (user ? (
            <button
              onClick={() => authService.logout()}
              className="border border-ditio-navy text-ditio-navy px-4 py-1.5 hover:bg-slate-100 transition normal-case"
            >
              Logg ut
            </button>
          ) : (
            <button
              onClick={() => authService.startLogin()}
              className="bg-ditio-navy text-white px-4 py-1.5 hover:bg-black transition normal-case"
            >
              Logg inn
            </button>
          ))}
      </div>
    </nav>
  );
}
