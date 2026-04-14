export default function Footer() {
  return (
    <footer className="py-12 px-8 border-t border-slate-100 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="font-bold text-black mb-1">DITIO LINJEFORENING</p>
          <p>Pilestredet 35, 0166 Oslo</p>
        </div>

        <div className="flex gap-6 font-bold">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ditio-blue"
          >
            Instagram
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ditio-blue"
          >
            LinkedIn
          </a>
        </div>

        <div className="text-center md:text-right">
          <p>Org.nr: 936 009 395</p>
        </div>
      </div>
    </footer>
  );
}
