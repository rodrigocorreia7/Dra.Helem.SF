import { motion } from 'framer-motion';
import { MessageCircle, Instagram, Mail } from 'lucide-react';
import { site, whatsappLink } from '../lib/site';
import { useBooking } from '../lib/booking';

export default function FinalCta() {
  const { openBooking } = useBooking();

  return (
    <section id="agendar" className="px-5 pb-20 sm:px-8 sm:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="grain relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-forest px-6 py-16 text-center text-ivory sm:px-14 sm:py-20"
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #b0654466 0%, transparent 70%)' }}
        />
        <div className="relative grid items-center gap-8 lg:grid-cols-12">
          <div className="hidden lg:block lg:col-span-4">
            <div className="overflow-hidden rounded-2xl border border-ivory/20 shadow-2xl">
              <img
                src="/images/3.png"
                alt="Dra. Hélem Machado Almeida"
                className="aspect-[3/4] w-full object-cover object-top"
              />
            </div>
          </div>

          <div className="lg:col-span-8 lg:text-left">
            <h2 className="font-display text-3xl leading-tight sm:text-[2.7rem]">
              Seu corpo está te dando sinais. Vale a pena entender o que eles significam.
            </h2>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href={whatsappLink(
                  `Olá, ${site.doctor}! Vim pelo site e gostaria de agendar uma consulta.`
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-clay px-8 py-4 text-base font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-clay-soft hover:text-forest sm:w-auto"
              >
                <MessageCircle size={18} /> Falar no WhatsApp
              </a>
              <button
                onClick={() => openBooking()}
                className="inline-flex w-full items-center justify-center rounded-full border border-ivory/30 px-8 py-4 text-base font-medium text-ivory transition-all hover:bg-ivory hover:text-forest sm:w-auto"
              >
                Agendar consulta
              </button>
            </div>

            <p className="mt-8 text-sm text-ivory/60">Ou envie uma mensagem:</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm lg:justify-start">
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-ivory/80 underline-offset-4 hover:text-ivory hover:underline"
              >
                <Instagram size={15} /> {site.instagramLabel}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-ivory/80 underline-offset-4 hover:text-ivory hover:underline"
              >
                <Mail size={15} /> {site.email}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-ivory/80 underline-offset-4 hover:text-ivory hover:underline"
              >
                <MessageCircle size={15} /> {site.whatsappLabel}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
