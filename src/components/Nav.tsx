import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site } from '../lib/site';
import { useBooking } from '../lib/booking';
import Logo from './Logo';

const links = [
  { href: '#publicos', label: 'Para quem' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#processo', label: 'Como funciona' },
  { href: '#duvidas', label: 'Dúvidas' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-ivory/90 backdrop-blur-md border-b border-forest/10 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#topo" className="group flex items-center">
          <Logo variant="dark" showSubtitle={true} className="scale-95 origin-left" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm text-forest/75 transition-colors hover:text-forest"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => openBooking()}
            className="rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-ivory transition-all hover:bg-forest-soft hover:shadow-lg hover:shadow-forest/20"
          >
            Agendar consulta
          </button>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-forest/20 p-2 text-forest md:hidden"
          aria-label="Abrir menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="mx-5 mt-3 rounded-2xl border border-forest/10 bg-ivory p-5 shadow-xl shadow-forest/5 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-forest/80"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                openBooking();
              }}
              className="mt-1 rounded-full bg-forest px-5 py-3 text-sm font-medium text-ivory"
            >
              Agendar consulta
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
