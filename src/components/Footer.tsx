import { site, whatsappLink } from '../lib/site';
import Logo from './Logo';
import { Instagram, Mail, MessageCircle, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-forest/15 bg-forest text-ivory py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-12 pb-12 border-b border-ivory/15">
          {/* Logo & Info */}
          <div className="md:col-span-5 space-y-4">
            <Logo variant="light" showSubtitle={true} className="items-start" />
            <p className="text-xs text-ivory/80 leading-relaxed max-w-sm">
              Atendimento médico integral focado na causa raiz dos desequilíbrios metabólicos e hormonais em homens e mulheres.
            </p>
            <div className="flex items-center gap-2 text-xs text-clay-soft font-semibold">
              <ShieldCheck size={16} />
              <span>{site.crm} · Médica e Psicóloga</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <p className="font-display text-sm font-bold uppercase tracking-wider text-clay-soft">
              Navegação
            </p>
            <ul className="space-y-2 text-ivory/80">
              <li><a href="#publicos" className="hover:text-ivory hover:underline">Para Quem É</a></li>
              <li><a href="#diferenciais" className="hover:text-ivory hover:underline">O Diferencial Médico</a></li>
              <li><a href="#sobre" className="hover:text-ivory hover:underline">Sobre a Dra. Hélem</a></li>
              <li><a href="#processo" className="hover:text-ivory hover:underline">Jornada em 3 Etapas</a></li>
              <li><a href="#casos" className="hover:text-ivory hover:underline">Casos Clínicos</a></li>
              <li><a href="#duvidas" className="hover:text-ivory hover:underline">Perguntas Frequentes</a></li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <p className="font-display text-sm font-bold uppercase tracking-wider text-clay-soft">
              Canais de Atendimento
            </p>
            <div className="space-y-2 text-ivory/80">
              <p>📍 {site.attendance}</p>
              <a
                href={whatsappLink(`Olá! Gostaria de informações sobre agendamento.`)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-ivory/90 hover:text-white hover:underline"
              >
                <MessageCircle size={15} className="text-emerald-400" /> WhatsApp: {site.whatsappFormatted}
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-ivory/90 hover:text-white hover:underline"
              >
                <Instagram size={15} className="text-pink-400" /> Instagram: {site.instagramLabel}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-ivory/90 hover:text-white hover:underline"
              >
                <Mail size={15} className="text-amber-300" /> E-mail: {site.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 text-xs text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.doctor}. Todos os direitos reservados.</p>
          <p className="max-w-md text-[11px] leading-relaxed text-ivory/50">
            Este site tem caráter estritamente informativo e não substitui a consulta médica presencial ou por telemedicina. O conteúdo segue as diretrizes do Código de Ética Médica do Conselho Federal de Medicina (CFM).
          </p>
        </div>
      </div>
    </footer>
  );
}
