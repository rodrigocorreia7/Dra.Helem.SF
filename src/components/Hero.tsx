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
  const [videoSrc, setVideoSrc] = useState('/videos/hero_mobile.mp4?v=ios-smooth-v4');
  const [isDesktop, setIsDesktop] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Device & Motion Preference Detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      setVideoSrc(desktop ? '/videos/hero_scrub.mp4?v=ios-smooth-v4' : '/videos/hero_mobile.mp4?v=ios-smooth-v4');

      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(motionQuery.matches);
    }
  }, []);

  // IntersectionObserver: Pause all GPU/CPU loops when Hero is scrolled out of view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Scroll Progress across the dynamic viewport container (350dvh for iOS address bar stability)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Ultra-responsive spring tuned for 60fps mobile & desktop scrub
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
    restDelta: 0.001,
  });

  // iOS Safari Reactive RAF Scrub Loop (Direto de smoothProgress.get() com trava nativa !v.seeking)
  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    let raf: number;

    const tick = () => {
      const v = videoRef.current;
      if (v && v.duration && !isNaN(v.duration) && !v.seeking) {
        const progress = smoothProgress.get();
        const target = Math.min(Math.max(progress * v.duration, 0.01), v.duration - 0.05);
        const diff = Math.abs(v.currentTime - target);
        if (diff >= 0.02) {
          v.currentTime = target;
        }
      }

      if (isDesktop) {
        const bgV = bgVideoRef.current;
        if (bgV && bgV.duration && !isNaN(bgV.duration) && !bgV.seeking) {
          const progress = smoothProgress.get();
          const target = Math.min(Math.max(progress * bgV.duration, 0.01), bgV.duration - 0.05);
          if (Math.abs(bgV.currentTime - target) >= 0.04) {
            bgV.currentTime = target;
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, prefersReducedMotion, isDesktop, smoothProgress]);

  // Phase 1 (0.00 -> 0.30): Na Recepção - Slide from left
  const p1Opacity = useTransform(scrollYProgress, [0, 0.22, 0.30], [1, 1, 0]);
  const p1X = useTransform(scrollYProgress, [0, 0.25, 0.30], [0, 0, 30]);
  const p1Scale = useTransform(scrollYProgress, [0, 0.30], [1, 0.96]);

  // Phase 2 (0.35 -> 0.68): No Corredor / Ambiente - Slide from left
  const p2Opacity = useTransform(scrollYProgress, [0.32, 0.40, 0.60, 0.68], [0, 1, 1, 0]);
  const p2X = useTransform(scrollYProgress, [0.32, 0.40, 0.60, 0.68], [-40, 0, 0, 30]);

  // Phase 3 (0.72 -> 1.00): Chegando ao Consultório + Aperto de Mão + CTA
  const p3Opacity = useTransform(scrollYProgress, [0.70, 0.78, 1], [0, 1, 1]);
  const p3X = useTransform(scrollYProgress, [0.70, 0.78, 1], [-40, 0, 0]);

  // Bottom visual journey progress bar
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      id="topo"
      className="relative h-[350dvh] bg-[#071914] text-white [overscroll-behavior-y:none] [-webkit-overflow-scrolling:touch]"
    >
      {/* Sticky Viewport com dvh para estabilidade total durante expansão da barra do Safari iOS */}
      <div className="sticky top-[108px] md:top-[96px] lg:top-[104px] h-[calc(100dvh-108px)] md:h-[calc(100dvh-96px)] lg:h-[calc(100dvh-104px)] w-full overflow-hidden flex flex-col md:block items-center justify-start md:justify-center bg-[#071914] [transform:translate3d(0,0,0)] [backface-visibility:hidden]">
        
        {/* Layer 1: Ambient Blurred Background Video (Desktop only - 390KB ultra-lightweight 480p) */}
        {isDesktop && (
          <video
            ref={bgVideoRef}
            src="/videos/hero_scrub_bg.mp4?v=1"
            poster="/images/hero_poster.webp"
            muted
            playsInline
            autoPlay
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover blur-3xl opacity-35 scale-110 pointer-events-none [transform:translate3d(0,0,0)]"
          />
        )}

        {/* Layer 2: Container do Vídeo (100% Uncropped contain) */}
        <div className="relative w-full aspect-video md:aspect-auto md:h-full md:absolute md:inset-0 shrink-0 flex items-center justify-center bg-black/60 overflow-hidden [transform:translate3d(0,0,0)] pt-1 sm:pt-2 md:pt-0">
          <video
            ref={videoRef}
            src={videoSrc}
            poster="/images/hero_poster.webp"
            muted
            playsInline
            autoPlay
            preload="auto"
            disablePictureInPicture
            className="w-full h-full object-contain object-center z-0 [transform:translate3d(0,0,0)] [will-change:transform]"
            onLoadedData={(e) => {
              const v = e.currentTarget;
              v.pause();
              const progress = smoothProgress.get();
              if (v.duration) {
                v.currentTime = Math.min(Math.max(progress * v.duration, 0.01), v.duration - 0.05);
              }
            }}
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (!v.paused && v.currentTime > 0.05) {
                v.pause();
              }
            }}
          />

          {/* Cinematic Vignette Overlays no lado esquerdo do desktop */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent sm:w-3/4 lg:w-3/5 z-1 hidden md:block" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071914] via-transparent to-black/30 z-1" />
        </div>

        {/* Layer 3: Container das Frases (Centralizado verticalmente na tela) */}
        <div className="relative z-10 w-full flex-1 md:absolute md:inset-0 mx-auto max-w-6xl px-5 sm:px-10 lg:px-16 flex flex-col items-center md:items-start justify-start md:justify-center text-center md:text-left pt-3 sm:pt-4 md:pt-0">
          
          {/* ================= FASE 1 (0% -> 30%): Na Recepção ================= */}
          <motion.div
            style={{ opacity: p1Opacity, x: p1X, scale: p1Scale }}
            className="w-full max-w-xl md:absolute md:top-1/2 md:-translate-y-1/2 flex flex-col items-center md:items-start text-center md:text-left bg-transparent p-0 border-none shadow-none pt-1 md:pt-0 [transform:translate3d(0,0,0)] [will-change:transform,opacity]"
          >
            {/* Phrase 1 */}
            <h1 className="font-display text-lg sm:text-2xl md:text-[2rem] lg:text-[2.4rem] xl:text-[2.8rem] leading-snug md:leading-[1.18] tracking-tight text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.95)]">
              SUA JORNADA DE TRANSFORMAÇÃO COMEÇA NO MOMENTO EM QUE VOCÊ{' '}
              <span className="text-clay-soft underline decoration-clay-soft/40 underline-offset-4 md:underline-offset-8">
                ATRAVESSA ESTA PORTA...
              </span>
            </h1>

            {/* Scroll Indicator */}
            <div className="mt-2.5 sm:mt-4 md:mt-5 flex items-center gap-2 text-white/80 animate-pulse">
              <ChevronDown size={18} className="animate-bounce text-clay-soft" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-clay-soft drop-shadow">
                Role para acompanhar a experiência
              </span>
            </div>
          </motion.div>

          {/* ================= FASE 2 (35% -> 68%): No Corredor / Ambiente ================= */}
          <motion.div
            style={{ opacity: p2Opacity, x: p2X }}
            className="w-full max-w-xl absolute top-2 sm:top-3 md:top-1/2 md:-translate-y-1/2 flex flex-col items-center md:items-start text-center md:text-left bg-transparent p-0 border-none shadow-none pointer-events-none md:pt-0 [transform:translate3d(0,0,0)] [will-change:transform,opacity]"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-clay-soft/40 bg-black/60 backdrop-blur-md px-3.5 py-1 text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-clay-soft shadow-lg mb-1 sm:mb-2 md:mb-2.5">
              <Sparkles size={13} /> Investigação na Causa Raiz
            </span>

            {/* Phrase 2 */}
            <h2 className="font-display text-lg sm:text-2xl md:text-[2rem] lg:text-[2.4rem] xl:text-[2.8rem] leading-snug md:leading-[1.18] tracking-tight text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.95)]">
              Uma medicina que investiga a <span className="text-clay-soft">causa raiz</span> da sua saúde, sem pressa e com escuta profunda.
            </h2>
          </motion.div>

          {/* ================= FASE 3 (72% -> 100%): Chegando ao Consultório + Aperto de Mão + CTA ================= */}
          <motion.div
            style={{ opacity: p3Opacity, x: p3X }}
            className="w-full max-w-xl absolute top-2 sm:top-3 md:top-1/2 md:-translate-y-1/2 flex flex-col items-center md:items-start text-center md:text-left bg-transparent p-0 border-none shadow-none md:pt-0 [transform:translate3d(0,0,0)] [will-change:transform,opacity]"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-forest/90 backdrop-blur-md px-3.5 py-1 text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-white shadow-xl mb-1 sm:mb-2 md:mb-2.5">
              <CheckCircle2 size={13} className="text-clay-soft" /> Atendimento de Alto Padrão
            </span>

            {/* Phrase 3 */}
            <h2 className="font-display text-xl sm:text-2xl md:text-[2.2rem] lg:text-[2.6rem] xl:text-[3rem] leading-snug md:leading-[1.14] tracking-tight text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.95)]">
              Dra. Hélem Machado Almeida
            </h2>

            <p className="mt-1 sm:mt-1.5 text-sm sm:text-base md:text-lg lg:text-xl font-display text-clay-soft drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Seja bem-vindo(a) à sua nova fase.
            </p>

            {/* Final Credentials in Phase 3 */}
            <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-semibold tracking-wider text-white/85 uppercase">
              {site.crm} · Médica e Psicóloga · Membro ABMEV
            </p>

            {/* Action CTA Button */}
            <div className="mt-2.5 sm:mt-4 md:mt-5 w-full sm:w-auto flex justify-center md:justify-start">
              <button
                onClick={() => openBooking('geral')}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-clay px-6 sm:px-8 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base font-bold text-white shadow-2xl shadow-clay/50 transition-all duration-300 hover:scale-105 hover:bg-clay-soft hover:text-forest cursor-pointer"
              >
                <ShinyText
                  text="Agendar Minha Consulta Médica"
                  color="#ffffff"
                  shineColor="#ffd166"
                  speed={2.4}
                  spread={100}
                  className="font-bold"
                />
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Cinematic Scrollytelling Progress Bar at the Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/15 z-20 [transform:translate3d(0,0,0)]">
          <motion.div
            style={{ width: progressBarWidth }}
            className="h-full bg-gradient-to-r from-clay via-clay-soft to-emerald-400 shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}
