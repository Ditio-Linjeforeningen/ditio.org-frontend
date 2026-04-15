import { boardMembers, komiteer } from "../data/about";
import Footer from "../components/Footer";

function initials(name: string) {
  const parts = name.trim().split(" ");
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const generalContacts = [
  { tag: "Generelt",  email: "kontakt@ditio.org",  desc: "Generelle henvendelser og spørsmål" },
  { tag: "Bedrift",   email: "bedrift@ditio.org",   desc: "Samarbeid og bedriftsrelasjoner" },
  { tag: "Styret",    email: "styret@ditio.org",    desc: "Direkte til styret" },
];

export default function Contact() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 py-16 flex flex-col items-center text-center">
        <p className="text-xs uppercase tracking-widest text-ditio-blue font-semibold mb-4">Kontakt</p>
        <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
          Ta kontakt med<br />Ditio
        </h1>
        <p className="max-w-xl text-base md:text-lg text-slate-500 leading-7">
          Har du spørsmål, ideer eller ønsker å samarbeide? Her finner du
          kontaktinformasjon til styret, komiteene og generelle henvendelser.
        </p>
      </section>

      {/* Generelle e-poster */}
      <section className="max-w-6xl mx-auto px-8 pb-20">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-ditio-blue font-semibold mb-3">E-post</p>
          <h2 className="text-3xl font-black mb-2">Generell kontakt</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {generalContacts.map((c) => (
            <a
              key={c.email}
              href={`mailto:${c.email}`}
              className="bg-white border border-slate-200 hover:border-ditio-blue hover:bg-blue-50 transition-all p-6 flex flex-col gap-2"
            >
              <span className="text-xs uppercase tracking-widest bg-ditio-blue/10 text-ditio-blue px-2 py-0.5 font-bold self-start">
                {c.tag}
              </span>
              <span className="text-sm font-bold text-ditio-blue">{c.email}</span>
              <span className="text-xs text-slate-400">{c.desc}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Styret */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-ditio-blue font-semibold mb-3">Styre 2025–2026</p>
            <h2 className="text-3xl font-black mb-2">Kontakt styret</h2>
            <p className="text-sm text-slate-500">
              Du kan kontakte et styremedlem direkte via e-post nedenfor, eller nå hele styret på{" "}
              <a href="mailto:styret@ditio.org" className="text-ditio-blue underline underline-offset-2">
                styret@ditio.org
              </a>
              .
            </p>
          </div>
          <div className="border border-slate-200 divide-y divide-slate-100">
            {boardMembers.map((m) => (
              <div
                key={m.name}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-ditio-blue/10 text-ditio-blue flex items-center justify-center text-xs font-black shrink-0">
                    {initials(m.name)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{m.name}</p>
                    <p className="text-xs text-slate-400">{m.role}</p>
                  </div>
                </div>
                {m.emails.length > 0 ? (
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    {m.emails.map((e) => (
                      <a
                        key={e}
                        href={`mailto:${e}`}
                        className="text-xs font-bold text-ditio-blue border border-ditio-blue/30 bg-ditio-blue/5 hover:bg-ditio-blue hover:text-white transition-colors px-3 py-1.5"
                      >
                        {e}
                      </a>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-slate-300 italic hidden sm:block">Ingen offentlig e-post</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Komiteer */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-ditio-blue font-semibold mb-3">Komiteer</p>
          <h2 className="text-3xl font-black mb-2">Kontakt komiteene</h2>
          <p className="text-sm text-slate-500">
            Ønsker du å bidra eller har spørsmål til en spesifikk komité? Ta kontakt direkte.
          </p>
        </div>
        <div className="border border-slate-200 divide-y divide-slate-100">
          {komiteer.map((k) => (
            <div
              key={k.navn}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 hover:bg-slate-50 transition-colors"
            >
              <div>
                <p className="text-sm font-bold text-slate-900">{k.navn}</p>
                <p className="text-xs text-slate-400">{k.kontakt} &middot; {k.rolle}</p>
              </div>
              <a
                href={`mailto:${k.email}`}
                className="text-xs font-bold text-ditio-blue border border-ditio-blue/30 bg-ditio-blue/5 hover:bg-ditio-blue hover:text-white transition-colors px-3 py-1.5 self-start sm:self-auto shrink-0"
              >
                {k.email}
              </a>
            </div>
          ))}
        </div>
      </section>

      <Footer />

    </main>
  );
}
