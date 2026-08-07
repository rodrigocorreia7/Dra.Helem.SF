import { site } from '../lib/site';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-forest/12 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 text-sm text-forest/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <Logo variant="dark" showSubtitle={true} className="items-start" />
          <p className="mt-2 text-xs text-forest/60">
            {site.crm} · {site.attendance}
          </p>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-forest/50">
          Este site tem caráter informativo e não substitui a consulta médica. O conteúdo segue as
          diretrizes do Código de Ética Médica (CFM).
        </p>
      </div>
    </footer>
  );
}
