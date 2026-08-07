import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Check, MessageCircle, Loader2 } from 'lucide-react';
import { useBooking } from '../lib/booking';
import { site, whatsappLink, type Audience } from '../lib/site';

type Errors = Partial<Record<'name' | 'phone' | 'email', string>>;

export default function BookingModal() {
  const { open, audience, closeBooking } = useBooking();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [aud, setAud] = useState<Audience>('nao_informado');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (open) {
      setAud(audience);
      setDone(false);
      setApiError('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, audience]);

  const validate = () => {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = 'Informe seu nome completo.';
    if (phone.replace(/\D/g, '').length < 10) e.phone = 'Informe um WhatsApp válido com DDD.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'E-mail inválido.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setApiError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          audience: aud,
          message,
          source: 'site-landing',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Erro ao enviar');
      setDone(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : 'Não foi possível enviar. Tente pelo WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const field =
    'w-full rounded-xl border border-forest/18 bg-ivory px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-forest/35 focus:border-forest';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/55 backdrop-blur-sm sm:items-center"
          onClick={closeBooking}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[1.75rem] bg-ivory p-6 shadow-2xl sm:rounded-[1.75rem] sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-clay">Agendamento</p>
                <h3 className="mt-2 font-display text-2xl leading-snug text-forest">
                  {done ? 'Recebido. Já está com a equipe.' : 'Conte o que você está sentindo'}
                </h3>
              </div>
              <button
                onClick={closeBooking}
                aria-label="Fechar"
                className="rounded-full border border-forest/15 p-2 text-forest/70 transition-colors hover:bg-forest hover:text-ivory"
              >
                <X size={16} />
              </button>
            </div>

            {done ? (
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest text-ivory">
                  <Check size={24} />
                </div>
                <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/75">
                  Sua solicitação foi registrada. O retorno é feito por WhatsApp para confirmar
                  horário e orientar sobre exames prévios, quando necessário.
                </p>
                <a
                  href={whatsappLink(
                    `Olá, ${site.doctor}! Acabei de preencher o formulário no site.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-medium text-ivory transition-colors hover:bg-forest"
                >
                  <MessageCircle size={16} /> Adiantar pelo WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4" noValidate>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-forest/60">
                    Nome completo *
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={field}
                    placeholder="Seu nome"
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-clay">{errors.name}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-forest/60">
                      WhatsApp *
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={field}
                      placeholder="(00) 00000-0000"
                      inputMode="tel"
                    />
                    {errors.phone && <p className="mt-1.5 text-xs text-clay">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-forest/60">
                      E-mail
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={field}
                      placeholder="opcional"
                      inputMode="email"
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-clay">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-forest/60">
                    Perfil de atendimento
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { v: 'mulheres', l: 'Mulher 40+' },
                        { v: 'homens', l: 'Homem' },
                        { v: 'nao_informado', l: 'Outro' },
                      ] as { v: Audience; l: string }[]
                    ).map((o) => (
                      <button
                        type="button"
                        key={o.v}
                        onClick={() => setAud(o.v)}
                        className={`rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                          aud === o.v
                            ? 'border-forest bg-forest text-ivory'
                            : 'border-forest/18 text-forest/70 hover:border-forest/40'
                        }`}
                      >
                        {o.l}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-forest/60">
                    O que você está sentindo?
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className={`${field} resize-none`}
                    placeholder="Ex.: cansaço constante, insônia, ganho de peso..."
                  />
                </div>

                {apiError && (
                  <p className="rounded-xl border border-clay/30 bg-clay/8 px-4 py-3 text-sm text-clay">
                    {apiError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-4 text-base font-medium text-ivory transition-colors hover:bg-forest-soft disabled:opacity-60"
                >
                  {submitting && <Loader2 className="animate-spin" size={17} />}
                  {submitting ? 'Enviando...' : 'Solicitar agendamento'}
                </button>

                <p className="text-center text-xs leading-relaxed text-forest/50">
                  Seus dados são usados apenas para contato sobre a consulta.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
