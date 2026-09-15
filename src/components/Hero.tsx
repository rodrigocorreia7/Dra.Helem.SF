import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { site } from '../lib/site';
import { useBooking } from '../lib/booking';
import ShinyText from './ShinyText';

export default function Hero() {
  const { openBooking } = useBooking();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState('/videos/hero_mobile.mp4');
  const [isDesktop, setIsDesktop] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [prefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
  );

  const lastSeekRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const selectHeroVideo = () => {
      const desktop = window.innerWidth >= 768;
      const prefersDataSaver = Boolean(
        (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
      );
      const shouldUsePremiumVideo =
        desktop && !prefersDataSaver && (window.innerWidth >= 1280 || window.devicePixelRatio >= 1.5);

      setIsDesktop(desktop);
      setVideoSrc(
        desktop
          ? shouldUsePremiumVideo
            ? '/videos/hero_scrub_1080.mp4'
            : '/videos/hero_scrub.mp4'
          : '/videos/hero_mobile.mp4'
      );
    };

    selectHeroVideo();
    window.addEventListener('resize', selectHeroVideo);

    return () => window.removeEventListener('resize', selectHeroVideo);
  }, []);

  // Primar o vídeo (obrigatório no iOS Safari para liberar o decoder e permitir seeks arbitrários)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const needsTouchUnlock =
      typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches;

    const unlock = () => {
      if (!needsTouchUnlock) {
        v.pause();
        v.currentTime = 0.01;
        return;
      }

      const p = v.play();
      if (p !== undefined) {
        p.then(() => {
          v.pause();
          v.currentTime = 0.01;
        }).catch(() => {});
      }
    };

    // Tenta no loadedmetadata
    v.addEventListener('loadedmetadata', unlock, { once: true });

    // E também no primeiro toque do usuário (mais seguro para mobile)
    const onFirstTouch = () => {
      unlock();
      window.removeEventListener('touchstart', onFirstTouch);
    };
    window.addEventListener('touchstart', onFirstTouch, { once: true, passive: true });

    return () => {
      v.removeEventListener('loadedmetadata', unlock);
      window.removeEventListener('touchstart', onFirstTouch);
    };
  }, [videoSrc]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setIsInView(e.isIntersecting), { threshold: 0.01 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // O scroll bruto pode avançar vários frames de uma vez em touchpad e mobile.
  // A mola mantém texto e vídeo sincronizados, mas com uma aceleração cinematográfica.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.12,
    restDelta: 0.001,
  });
  const narrativeProgress = prefersReducedMotion ? scrollYProgress : smoothProgress;

  // Reliable scrub loop: allows seeking as soon as metadata is loaded (readyState >= 1 / duration > 0)
  // This is critical for Incognito mode and clean cache sessions where browsers don't pre-buffer until seek occurs.
  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;
    let raf: number;

    const tick = (now: number) => {
      const v = videoRef.current;
      if (v && v.duration && !isNaN(v.duration) && v.duration > 0) {
        if (!v.paused) v.pause();
        if (now - lastSeekRef.current >= 24) {
          const p = narrativeProgress.get();
          const t = Math.max(0.01, Math.min(p * v.duration, v.duration - 0.05));
          if (Math.abs(v.currentTime - t) > 0.015) {
            v.currentTime = t;
            lastSeekRef.current = now;
          }
        }
      }

      if (isDesktop) {
        const bg = bgVideoRef.current;
        if (bg && bg.duration && !isNaN(bg.duration) && bg.duration > 0) {
          if (!bg.paused) bg.pause();
          const p = narrativeProgress.get();
          const t = Math.max(0.01, Math.min(p * bg.duration, bg.duration - 0.05));
          if (Math.abs(bg.currentTime - t) > 0.03) {
            bg.currentTime = t;
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, prefersReducedMotion, isDesktop, narrativeProgress]);

  // Fases com sobreposição intencional: uma narrativa sai enquanto a próxima entra.
  // Isso evita o “vazio” entre blocos quando o usuário rola mais rapidamente.
  // Phase 1 (0.00 -> 0.30): Na Recepção
  const p1Opacity = useTransform(narrativeProgress, [0, 0.18, 0.3], [1, 1, 0]);
  const p1X = useTransform(narrativeProgress, [0, 0.24, 0.3], [0, 0, 28]);
  const p1Y = useTransform(narrativeProgress, [0, 0.24, 0.3], ['-50%', '-50%', '-54%']);
  const p1Scale = useTransform(narrativeProgress, [0, 0.3], [1, 0.98]);

  // Phase 2 (0.27 -> 0.68): No Corredor / Ambiente
  const p2Opacity = useTransform(narrativeProgress, [0.27, 0.36, 0.6, 0.68], [0, 1, 1, 0]);
  const p2X = useTransform(narrativeProgress, [0.27, 0.36, 0.6, 0.68], [-24, 0, 0, 24]);
  const p2Y = useTransform(narrativeProgress, [0.27, 0.36, 0.6, 0.68], ['-46%', '-50%', '-50%', '-54%']);

  // Phase 3 (0.67 -> 1.00): Consultório + CTA
  const p3Opacity = useTransform(narrativeProgress, [0.64, 0.72, 1], [0, 1, 1]);
  const p3X = useTransform(narrativeProgress, [0.64, 0.72, 1], [-24, 0, 0]);
  const p3Y = useTransform(narrativeProgress, [0.64, 0.72, 1], ['-46%', '-50%', '-50%']);

  // Movimento quase imperceptível para dar profundidade sem deslocar o conteúdo.
  const videoScale = useTransform(
    narrativeProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [1.015, 1.035, 1.06],
  );
  const videoY = useTransform(narrativeProgress, [0, 1], prefersReducedMotion ? ['0%', '0%'] : ['0%', '-1.5%']);

  const progressBarWidth = useTransform(narrativeProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      id="topo"
      className="relative h-[350dvh] bg-[#071914] text-white [overscroll-behavior-y:none] [-webkit-overflow-scrolling:touch]"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-[var(--nav-height,108px)] h-[calc(100dvh-var(--nav-height,108px))] w-full overflow-hidden flex flex-col md:block items-center justify-start md:justify-center bg-[#071914] [transform:translate3d(0,0,0)] [backface-visibility:hidden]">
        
        {/* Layer 1: Blurred Background (Desktop only) */}
        {isDesktop && (
          <video
            ref={bgVideoRef}
            src="/videos/hero_scrub_bg.mp4"
            poster="/images/hero_poster.webp"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover blur-3xl opacity-35 scale-110 pointer-events-none [transform:translate3d(0,0,0)]"
          />
        )}

        {/* Layer 2: Main Video / Poster */}
        <div className="relative w-full aspect-video md:aspect-auto md:h-full md:absolute md:inset-0 shrink-0 flex items-center justify-center bg-black/60 overflow-hidden [transform:translate3d(0,0,0)]">
          <motion.video
            ref={videoRef}
            src={videoSrc}
            poster="/images/hero_poster.webp"
            muted
            playsInline
            preload={isDesktop ? "auto" : "metadata"}
            disablePictureInPicture
            style={{ scale: videoScale, y: videoY }}
            className="hero-primary-video z-0 [transform:translate3d(0,0,0)] [will-change:transform]"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent sm:w-3/4 lg:w-3/5 z-1 hidden md:block" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071914] via-transparent to-black/30 z-1" />
        </div>

        {/* Layer 3: Narrative Phases */}
        <div className="relative z-10 w-full flex-1 md:absolute md:inset-0 mx-auto max-w-6xl px-6 sm:px-10 lg:px-16 flex flex-col items-center md:items-start justify-center text-center md:text-left py-8 sm:py-10 md:py-0">
          
          {/* ================= FASE 1 (0% -> 30%): Atravessar a porta ================= */}
          <motion.div
            style={{ opacity: p1Opacity, x: p1X, y: p1Y, scale: p1Scale }}
            className="absolute left-0 right-0 top-1/2 mx-auto w-full max-w-[22rem] sm:max-w-[34rem] md:left-auto md:right-auto md:mx-0 md:max-w-xl flex flex-col items-center md:items-start text-center md:text-left bg-transparent p-0 border-none shadow-none pointer-events-none [transform:translate3d(0,0,0)] [will-change:transform,opacity]"
          >
            <h1 className="font-display text-[1.9rem] min-[390px]:text-[2.15rem] sm:text-[2.65rem] md:text-[2rem] lg:text-[2.4rem] xl:text-[2.8rem] leading-[1.08] md:leading-[1.18] tracking-tight text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.95)]">
              SUA JORNADA DE TRANSFORMAÇÃO COMEÇA NO MOMENTO EM QUE VOCÊ{' '}
              <span className="text-clay-soft underline decoration-clay-soft/40 underline-offset-4 md:underline-offset-8">
                ATRAVESSA ESTA PORTA...
              </span>
            </h1>

            <div className="mt-5 md:mt-5 flex items-center justify-center md:justify-start gap-2 text-white/80 animate-pulse">
              <ChevronDown size={18} className="animate-bounce text-clay-soft" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-clay-soft drop-shadow">
                Role para atravessar a experiência
              </span>
            </div>
          </motion.div>

          {/* ================= FASE 2 (27% -> 68%): Investigar a causa raiz ================= */}
          <motion.div
            style={{ opacity: p2Opacity, x: p2X, y: p2Y }}
            className="w-full max-w-[22rem] sm:max-w-[34rem] absolute left-0 right-0 top-1/2 mx-auto md:left-auto md:right-auto md:mx-0 md:max-w-xl flex flex-col items-center md:items-start text-center md:text-left bg-transparent p-0 border-none shadow-none pointer-events-none [transform:translate3d(0,0,0)] [will-change:transform,opacity]"
          >
            <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-clay-soft/40 bg-black/60 backdrop-blur-md px-4 py-1.5 text-[11px] md:text-xs font-bold uppercase tracking-[0.16em] text-clay-soft shadow-lg mb-4 sm:mb-5 md:mb-2.5">
              <Sparkles size={13} /> Investigação na Causa Raiz
            </span>
            <h2 className="font-display text-[2rem] min-[390px]:text-[2.2rem] sm:text-[2.75rem] md:text-[2rem] lg:text-[2.4rem] xl:text-[2.8rem] leading-[1.1] md:leading-[1.18] tracking-tight text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.95)]">
              Uma medicina que investiga a <span className="text-clay-soft">causa raiz</span> da sua saúde, sem pressa e com escuta profunda.
            </h2>
            <div className="mt-6 md:mt-5 flex items-center justify-center md:justify-start gap-2 text-white/80">
              <ChevronDown size={18} className="animate-bounce text-clay-soft" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-clay-soft drop-shadow">
                Continue para conhecer a Dra. Hélem
              </span>
            </div>
          </motion.div>

          {/* ================= FASE 3 (64% -> 100%): Conhecer a Dra. Hélem ================= */}
          <motion.div
            style={{ opacity: p3Opacity, x: p3X, y: p3Y }}
            className="w-full max-w-[22rem] sm:max-w-[34rem] absolute left-0 right-0 top-1/2 mx-auto md:left-auto md:right-auto md:mx-0 md:max-w-xl flex flex-col items-center md:items-start text-center md:text-left bg-transparent p-0 border-none shadow-none [transform:translate3d(0,0,0)] [will-change:transform,opacity]"
          >
            <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/25 bg-forest/90 backdrop-blur-md px-4 py-1.5 text-[11px] md:text-xs font-bold uppercase tracking-[0.16em] text-white shadow-xl mb-4 sm:mb-5 md:mb-2.5">
              <CheckCircle2 size={13} className="text-clay-soft" /> Atendimento de Alto Padrão
            </span>
            <h2 className="font-display text-[2.35rem] min-[390px]:text-[2.6rem] sm:text-[3.15rem] md:text-[2.2rem] lg:text-[2.6rem] xl:text-[3rem] leading-[1.05] md:leading-[1.14] tracking-tight text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.95)]">
              Dra. Hélem Machado Almeida
            </h2>
            <p className="mt-3 md:mt-1.5 text-lg sm:text-xl md:text-lg lg:text-xl font-display text-clay-soft drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Seja bem-vindo(a) à sua nova fase.
            </p>
            <p className="mt-2 md:mt-1 text-[11px] sm:text-xs font-semibold tracking-wider text-white/85 uppercase">
              {site.crm} · Médica e Psicóloga · Membro ABMEV
            </p>
            <p className="mt-4 md:mt-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-white/70">
              Última etapa: agende sua consulta
            </p>
            <div className="mt-6 md:mt-5 w-full sm:w-auto flex justify-center md:justify-start">
              <button
                onClick={() => openBooking('geral')}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-clay px-6 sm:px-8 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base font-bold text-white shadow-2xl shadow-clay/50 transition-all duration-300 hover:scale-105 hover:bg-clay-soft hover:text-forest cursor-pointer"
              >
                <ShinyText text="Agendar Minha Consulta Médica" color="#ffffff" shineColor="#ffd166" speed={2.4} spread={100} className="font-bold" />
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div
          aria-label="Progresso da experiência em três etapas"
          className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/15 z-20 [transform:translate3d(0,0,0)]"
        >
          <motion.div style={{ width: progressBarWidth }} className="h-full bg-gradient-to-r from-clay via-clay-soft to-emerald-400 shadow-sm" />
          <div className="pointer-events-none absolute inset-0 grid grid-cols-3">
            <span className="border-r border-[#071914]/60" />
            <span className="border-r border-[#071914]/60" />
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
