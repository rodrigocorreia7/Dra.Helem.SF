import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { site, whatsappLink } from '../lib/site';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      const publicosEl = document.getElementById('publicos');
      if (publicosEl) {
        const rect = publicosEl.getBoundingClientRect();
        // Só torna o WhatsApp visível quando o topo da seção "Públicos" (Recupere sua energia...) atingir a tela
        setVisible(rect.top <= window.innerHeight * 0.6);
      } else {
        setVisible(window.scrollY > window.innerHeight * 3.4);
      }
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto"
        >
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="glass-dark relative flex items-center gap-3 rounded-2xl border border-white/20 p-3.5 text-white shadow-2xl max-w-xs"
              >
                <button
                  onClick={() => setShowTooltip(false)}
                  className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-xs text-white hover:bg-slate-700 cursor-pointer"
                  aria-label="Fechar recado"
                >
                  <X size={12} />
                </button>
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-clay">
                  <img
                    src="/images/Dra_Helem_2.webp"
                    alt="Dra. Hélem Machado Almeida"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-white">Dra. Hélem Machado</p>
                  <p className="text-white/80 mt-0.5">Olá! Precisa agendar ou tirar dúvidas?</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={whatsappLink(`Olá, Dra. Hélem! Gostaria de obter informações sobre horários disponíveis para consulta.`)}
            target="_blank"
            rel="noreferrer"
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#075e54] text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-[#0b7367] focus:outline-none focus:ring-4 focus:ring-emerald-500/50 cursor-pointer"
            aria-label="Falar no WhatsApp com a equipe da Dra. Hélem"
          >
            <span className="absolute -inset-1 animate-ping rounded-full bg-[#075e54] opacity-30 group-hover:opacity-50" />
            <MessageCircle size={28} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
