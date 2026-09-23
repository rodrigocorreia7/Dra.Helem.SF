'use client';

import { useEffect, useRef } from 'react';

export type DoctoraliaWidgetType =
  | 'big'
  | 'big_with_calendar'
  | 'button_calendar_medium'
  | 'certificate';

interface DoctoraliaWidgetProps {
  type?: DoctoraliaWidgetType;
  opinion?: boolean;
  className?: string;
}

export default function DoctoraliaWidget({
  type = 'big',
  opinion = true,
  className = '',
}: DoctoraliaWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = 'zl-widget-s';

    // Se o script já existe no DOM, recarregamos para que ele processe novos nós
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = '//platform.docplanner.com/js/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const s = document.getElementById(scriptId);
      if (s) {
        s.remove();
      }
    };
  }, [type, opinion]);

  return (
    <div
      ref={containerRef}
      className={`doctoralia-embed-container flex w-full justify-center items-center ${className}`}
    >
      <a
        id="zl-url"
        className="zl-url text-forest font-medium hover:underline text-sm py-4 inline-block"
        href="https://www.doctoralia.com.br/helem-machado-almeida/medico-clinico-geral/balneario-camboriu"
        rel="nofollow"
        data-zlw-doctor="helem-machado-almeida"
        data-zlw-type={type}
        data-zlw-opinion={opinion ? 'true' : 'false'}
        data-zlw-hide-branding="true"
        data-zlw-saas-only="true"
        data-zlw-a11y-title="Widget de marcação de consultas médicas e avaliações na Doctoralia"
      >
        Marque uma consulta com a Dra. Hélem Machado Almeida na Doctoralia
      </a>
    </div>
  );
}
