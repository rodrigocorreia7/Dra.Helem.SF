import { useEffect, useState } from 'react';
import { Menu, X, Star, ShieldCheck, Phone, Video } from 'lucide-react';
import { site, whatsappLink } from '../lib/site';
import { useBooking } from '../lib/booking';
import Logo from './Logo';

const links = [
  { href: '#publicos', label: 'Para Quem' },
  { href: '#diferenciais', label: 'O Diferencial' },
  { href: '#sobre', label: 'Sobre a Médica' },
  { href: '#processo', label: 'Como Funciona' },
  { href: '#casos', label: 'Casos Clínicos' },
  { href: '#duvidas', label: 'FAQ' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      {/* Topbar Superior */}
      <div className="bg-forest text-ivory text-[11px] py-1.5 px-4 hidden sm:block border-b border-ivory/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-medium text-clay-soft">
              <ShieldCheck size={13} /> {site.crm}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-ivory/80">
              <Video size={13} /> Presencial SC & Telemedicina Brasil
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-amber-300 font-semibold">
              <Star size={12} className="fill-amber-300" /> Avaliação ★ 4.9 no Google
            </span>
            <span>•</span>
            <a
              href={whatsappLink(`Olá, gostaria de informações sobre agendamento.`)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-ivory/90 hover:text-white hover:underline"
            >
              <Phone size={12} /> {site.whatsappFormatted}
            </a>
          </div>
        </div>
      </div>

      {/* Header Sticky Container */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'glass-card border-b border-forest/10 py-3 shadow-md'
            : 'bg-black/30 backdrop-blur-md border-b border-white/10 py-3'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#topo" className="group flex items-center" aria-label="Voltar ao topo">
            <Logo variant={scrolled ? "dark" : "light"} showSubtitle={true} className="scale-95 origin-left" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                  scrolled
                    ? 'text-forest/85 hover:text-clay'
                    : 'text-white/90 hover:text-clay-soft drop-shadow-sm'
                }`}
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => openBooking('geral')}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all shadow-lg ${
                scrolled
                  ? 'bg-forest text-ivory hover:bg-forest-soft shadow-forest/15'
                  : 'bg-clay text-white hover:bg-clay-soft shadow-clay/30'
              }`}
            >
              Agendar Consulta
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full border border-forest/20 p-2 text-forest lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="mx-5 mt-3 rounded-2xl border border-forest/15 bg-white p-5 shadow-2xl lg:hidden">
            <nav className="flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-semibold uppercase tracking-wider text-forest/90 hover:text-clay"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openBooking('geral');
                }}
                className="mt-2 rounded-full bg-forest px-5 py-3 text-xs font-bold uppercase tracking-wider text-ivory"
              >
                Agendar Consulta
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
