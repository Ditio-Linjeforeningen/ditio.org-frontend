import { useState } from "react";
import { Link } from "react-router-dom";
import { boardMembers, komiteer, vedtekter, type Vedtekt } from "../data/about";

const osloMetLink = (
  <a href="https://www.oslomet.no/om/tkd/it" className="text-ditio-blue underline underline-offset-2">
    institutt for informasjonsteknologi
  </a>
);

const hoverBar = "absolute bottom-0 left-0 h-0.5 w-0 bg-ditio-blue transition-all duration-300 group-hover:w-full";

function initials(name: string) {
  const parts = name.trim().split(" ");
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function SectionHeader({ label, title, sub }: { label: string; title: string; sub?: React.ReactNode }) {
  return (
    <div className="mb-10">
      <p className="text-xs uppercase tracking-widest text-ditio-blue font-semibold mb-3">{label}</p>
      <h2 className="text-3xl font-black mb-2">{title}</h2>
      {sub && <div className="text-sm text-slate-500">{sub}</div>}
    </div>
  );
}

function InfoCard({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-8 group relative overflow-hidden">
      <p className="text-xs uppercase tracking-widest font-bold text-slate-300 mb-4 flex items-center gap-3">
        {num} <span className="flex-1 h-px bg-slate-100" />
      </p>
      <h2 className="text-base font-bold mb-2">{title}</h2>
      {children}
      <span className={hoverBar} />
    </div>
  );
}

function VedtektItem({ item }: { item: Vedtekt }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 hover:bg-slate-50 px-2 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-ditio-blue w-8 shrink-0">{item.par}</span>
          <span className="text-sm font-semibold text-slate-800">{item.title}</span>
        </div>
        <span className="text-slate-300 text-lg shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="text-sm text-slate-500 leading-relaxed px-2 pb-5 ml-12">{item.body}</p>}
    </div>
  );
}

export default function About() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 py-16 flex flex-col items-center text-center">
        <p className="text-xs uppercase tracking-widest text-ditio-blue font-semibold mb-4">Om oss</p>
        <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
          Om Ditio-<br />linjeforeningen
        </h1>
        <p className="max-w-xl text-base md:text-lg text-slate-500 leading-7">
          Ditio er linjeforeningen for studenter ved linjene under {osloMetLink} ved OsloMet.
          Vi arrangerer faglige og sosiale aktiviteter som gir et bedre studentliv.
        </p>
      </section>

      {/* Om / Hvem / Hvordan */}
      <section className="max-w-6xl mx-auto px-8 pb-20">
        <div className="grid lg:grid-cols-3 border border-slate-200 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          <InfoCard num="01" title="Hva er Ditio?">
            <p className="text-sm text-slate-500 leading-relaxed">
              Ditio er en sosial og faglig forening for studenter ved institutt IT ved OsloMet.
              Vi jobber med å organisere events og forbedre studentmiljøet. Første generalforsamling ble holdt 25.09.2025.
            </p>
          </InfoCard>
          <InfoCard num="02" title="Hvem kan bli med?">
            <p className="text-sm text-slate-500 leading-relaxed">
              Alle som studerer ved linjene under {osloMetLink} på OsloMet og andre interessenter.
            </p>
          </InfoCard>
          <InfoCard num="03" title="Hvordan bli med?">
            <p className="text-sm text-slate-500 leading-relaxed">
              Alle som går linjene under institutt for informasjonsteknologi på OsloMet er automatisk
              medlem. Ingen påmelding nødvendig.
            </p>
          </InfoCard>
        </div>
      </section>

      {/* Styret */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <SectionHeader
            label="Styret 2025–2026"
            title="Nåværende styre"
            sub="Valgt inn 25.09.2025"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {boardMembers.map((m) => (
              <div key={m.name} className="border border-slate-200 bg-slate-50 p-5 hover:border-ditio-blue transition-colors">
                <div className="w-10 h-10 rounded-full bg-ditio-blue/10 text-ditio-blue flex items-center justify-center text-xs font-black mb-4">
                  {initials(m.name)}
                </div>
                <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">{m.role}</p>
                <p className="text-sm font-bold text-slate-900 mb-1">{m.name}</p>
                <p className="text-xs text-slate-400">{m.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Komiteer */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <SectionHeader
          label="Engasjer deg"
          title="Komiteer"
          sub="Vi har flere komiteer som medlemmer kan bli med i. Alle studenter kan bidra."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {komiteer.map((k, i) => (
            <div key={k.navn} className="bg-white border border-slate-200 p-8 group relative overflow-hidden hover:border-ditio-blue transition-colors">
              <p className="text-xs uppercase tracking-widest font-bold text-slate-300 mb-4 flex items-center gap-3">
                {String(i + 1).padStart(2, "0")} <span className="flex-1 h-px bg-slate-100" />
              </p>
              <h3 className="text-base font-bold mb-3 text-slate-900">{k.navn}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{k.beskrivelse}</p>
              <span className={hoverBar} />
            </div>
          ))}
        </div>
      </section>

      {/* Bidra */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <SectionHeader
          label="Engasjer deg"
          title="Bidra til Ditio"
          sub="Det er mange måter å bidra på — finn den som passer deg."
        />
        <div className="grid lg:grid-cols-2 border border-slate-200 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          <div className="bg-ditio-blue text-white p-10 flex flex-col">
            <p className="text-xs uppercase tracking-widest font-bold text-white/40 mb-5 flex items-center gap-3">
              Komiteer <span className="flex-1 h-px bg-white/20" />
            </p>
            <h2 className="text-xl font-black mb-3">Bli med i en komité</h2>
            <p className="text-sm text-white/70 leading-relaxed mb-8">
              Hjelp til på events, bygg nettsiden, eller støtt tillitsvalgte.
              Alle studenter kan engasjere seg — ingen erfaring nødvendig.
            </p>
            <a
              href="mailto:kontakt@ditio.org"
              className="mt-auto self-start border border-white/40 hover:bg-white hover:text-ditio-blue transition-colors px-5 py-2.5 text-xs font-bold uppercase tracking-widest"
            >
              Ta kontakt →
            </a>
          </div>
          <div className="bg-white p-10 flex flex-col">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-300 mb-5 flex items-center gap-3">
              Nettside <span className="flex-1 h-px bg-slate-100" />
            </p>
            <h2 className="text-xl font-black mb-3">Bidra til nettsiden</h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-8">
              Siden er åpen kildekode og under aktiv utvikling. Vil du bidra
              med kode eller innhold? Lag en pull request på GitHub.
            </p>
            <a
              href="https://github.com/Ditio-Linjeforeningen/forslag-til-ny-nettside-krav"
              target="_blank" rel="noopener noreferrer"
              className="mt-auto self-start border border-ditio-blue text-ditio-blue hover:bg-ditio-blue hover:text-white transition-colors px-5 py-2.5 text-xs font-bold uppercase tracking-widest"
            >
              Se krav på GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* Vedtekter */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <SectionHeader
            label="Styringsdokumenter"
            title="Vedtekter"
            sub={<>Sist revidert 25.09.2025 &middot;{" "}<a href="https://github.com/Ditio-Linjeforeningen/vedtekter" target="_blank" rel="noopener noreferrer" className="text-ditio-blue underline underline-offset-2">Se alltid oppdatert versjon på GitHub</a></>}
          />
          <div className="border border-slate-200 bg-slate-50 divide-y divide-slate-100">
            {vedtekter.map((v) => <VedtektItem key={v.par} item={v} />)}
          </div>
          <p className="text-xs text-slate-400 mt-4">
            Forslag til endringer?{" "}
            <a href="https://github.com/Ditio-Linjeforeningen/vedtekter" target="_blank" rel="noopener noreferrer" className="text-ditio-blue underline underline-offset-2">
              Lag en pull request på GitHub
            </a>{" "}
            eller send oss en e-post for å bidra anonymt.
          </p>
        </div>
      </section>

      {/* Kontakt */}
      <section className="max-w-6xl mx-auto px-8 py-20 flex flex-col items-center text-center">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">Ta kontakt</p>
        <h3 className="text-2xl font-black mb-2">Spørsmål?</h3>
        <p className="text-sm text-slate-500 mb-8">Kontakt oss direkte eller ta kontakt med et styremedlem.</p>
        <Link
          to="/kontakt"
          onClick={() => window.scrollTo(0, 0)}
          className="border border-ditio-blue text-ditio-blue hover:bg-ditio-blue hover:text-white transition-colors px-8 py-3 text-xs font-bold uppercase tracking-widest"
        >
          Se kontaktinformasjon →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-slate-50 py-8 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div>
            <p className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">Ditio Linjeforening</p>
            <p>Pilestredet 35, 0166 Oslo &middot; Org.nr: 936 009 395</p>
          </div>
          <div className="flex gap-6 font-bold text-slate-500">
            <a href="#" className="hover:text-ditio-blue transition-colors">Instagram</a>
            <a href="#" className="hover:text-ditio-blue transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
