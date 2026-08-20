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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Device & Motion Preference Detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      setVideoSrc(desktop ? '/videos/hero_scrub.mp4' : '/videos/hero_mobile.mp4');

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

  // Scroll Progress across the 350vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth physics spring for scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.25,
    restDelta: 0.001,
  });

  // Zero-latency mobile & desktop video scrub with deadzone filter and IntersectionObserver
  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    const el = videoRef.current;
    if (!el) return;

    let target = 0;
    let isSeeking = false;
    let raf: number;

    const handleSeeked = () => {
      isSeeking = false;
    };

    el.addEventListener('seeked', handleSeeked);

    const unsub = smoothProgress.on('change', (v) => {
      if (el.duration) {
        target = Math.min(Math.max(v * el.duration, 0.01), el.duration - 0.05);
      }
    });

    const loop = () => {
      const v = videoRef.current as any;
      const bgV = bgVideoRef.current as any;

      if (v && v.duration && !isSeeking) {
        const diff = Math.abs(v.currentTime - target);
        if (diff > 0.025) {
          isSeeking = true;
          if ('fastSeek' in v) {
            v.fastSeek(target);
          } else {
            v.currentTime = target;
          }

          if (bgV && bgV.duration) {
            if ('fastSeek' in bgV) {
              bgV.fastSeek(target);
            } else {
              bgV.currentTime = target;
            }
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      el.removeEventListener('seeked', handleSeeked);
      cancelAnimationFrame(raf);
      unsub();
    };
  }, [smoothProgress, videoSrc, isInView, prefersReducedMotion]);

  // Phase 1 (0.00 -> 0.30): Na Recepção - Fade & subtle scale
  const p1Opacity = useTransform(scrollYProgress, [0, 0.22, 0.30], [1, 1, 0]);
  const p1Y = useTransform(scrollYProgress, [0, 0.25, 0.30], [0, 0, -25]);
  const p1Scale = useTransform(scrollYProgress, [0, 0.30], [1, 0.96]);

  // Phase 2 (0.35 -> 0.68): No Corredor / Ambiente
  const p2Opacity = useTransform(scrollYProgress, [0.32, 0.40, 0.60, 0.68], [0, 1, 1, 0]);
  const p2Y = useTransform(scrollYProgress, [0.32, 0.40, 0.60, 0.68], [25, 0, 0, -25]);

  // Phase 3 (0.72 -> 1.00): Chegando ao Consultório + Aperto de Mão + CTA
  const p3Opacity = useTransform(scrollYProgress, [0.70, 0.78, 1], [0, 1, 1]);
  const p3Y = useTransform(scrollYProgress, [0.70, 0.78, 1], [25, 0, 0]);

  // Bottom visual journey progress bar
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      id="topo"
      className="relative h-[350vh] bg-[#071914] text-white [overscroll-behavior-y:none]"
    >
      {/* Sticky Viewport com altura responsiva adaptada para 1366x768 e todas as telas */}
      <div className="sticky top-[108px] md:top-[96px] lg:top-[104px] h-[calc(100vh-108px)] md:h-[calc(100vh-96px)] lg:h-[calc(100vh-104px)] w-full overflow-hidden flex flex-col md:block items-center justify-start md:justify-center bg-[#071914] [transform:translateZ(0)]">
        
        {/* Layer 1: Ambient Blurred Background Video (Desktop only) */}
        {isDesktop && (
          <video
            ref={bgVideoRef}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover blur-3xl opacity-40 scale-110 pointer-events-none [transform:translateZ(0)]"
          />
        )}

        {/* Layer 2: Container do Vídeo (100% Uncropped contain) */}
        <div className="relative w-full aspect-video md:aspect-auto md:h-full md:absolute md:inset-0 shrink-0 flex items-center justify-center bg-black/60 overflow-hidden [transform:translateZ(0)] pt-1 sm:pt-2 md:pt-0">
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            className="w-full h-full object-contain object-center z-0 [transform:translateZ(0)] [will-change:transform]"
          />

          {/* Cinematic Vignette Overlays para manter o texto 100% legível no centro */}
          <div className="pointer-events-none absolute inset-0 bg-black/45 md:bg-black/50 z-1" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071914] via-transparent to-black/40 z-1" />
        </div>

        {/* Layer 3: Container Centralizado das Frases (Sem corte em nenhuma resolução) */}
        <div className="relative z-10 w-full flex-1 md:absolute md:inset-0 mx-auto max-w-4xl px-4 sm:px-8 lg:px-12 flex flex-col items-center justify-start md:justify-center text-center pt-3 sm:pt-4 md:pt-0">
          
          {/* ================= FASE 1 (0% -> 30%): Na Recepção ================= */}
          <motion.div
            style={{ opacity: p1Opacity, y: p1Y, scale: p1Scale }}
            className="w-full max-w-3xl flex flex-col items-center justify-center text-center bg-transparent p-0 border-none shadow-none pt-1 [transform:translateZ(0)] [will-change:transform,opacity]"
          >
            {/* Phrase 1 */}
            <h1 className="font-display text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug md:leading-tight tracking-tight text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.95)]">
              SUA JORNADA DE TRANSFORMAÇÃO COMEÇA NO MOMENTO EM QUE VOCÊ{' '}
              <span className="text-clay-soft underline decoration-clay-soft/40 underline-offset-4 md:underline-offset-8">
                ATRAVESSA ESTA PORTA...
              </span>
            </h1>

            {/* Scroll Indicator */}
            <div className="mt-2.5 sm:mt-4 md:mt-6 flex items-center justify-center gap-2 text-white/80 animate-pulse">
              <ChevronDown size={18} className="animate-bounce text-clay-soft" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-clay-soft drop-shadow">
                Role para acompanhar a experiência
              </span>
            </div>
          </motion.div>

          {/* ================= FASE 2 (35% -> 68%): No Corredor / Ambiente ================= */}
          <motion.div
            style={{ opacity: p2Opacity, y: p2Y }}
            className="w-full max-w-3xl absolute top-2 sm:top-3 md:static flex flex-col items-center justify-center text-center bg-transparent p-0 border-none shadow-none pointer-events-none [transform:translateZ(0)] [will-change:transform,opacity]"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-clay-soft/40 bg-black/60 backdrop-blur-md px-3.5 py-1 text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-clay-soft shadow-lg mb-1 sm:mb-2">
              <Sparkles size={13} /> Investigação na Causa Raiz
            </span>

            {/* Phrase 2 */}
            <h2 className="font-display text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug md:leading-tight tracking-tight text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.95)]">
              Uma medicina que investiga a <span className="text-clay-soft">causa raiz</span> da sua saúde, sem pressa e com escuta profunda.
            </h2>
          </motion.div>

          {/* ================= FASE 3 (72% -> 100%): Chegando ao Consultório + Aperto de Mão + CTA ================= */}
          <motion.div
            style={{ opacity: p3Opacity, y: p3Y }}
            className="w-full max-w-3xl absolute top-2 sm:top-3 md:static flex flex-col items-center justify-center text-center bg-transparent p-0 border-none shadow-none [transform:translateZ(0)] [will-change:transform,opacity]"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-forest/90 backdrop-blur-md px-3.5 py-1 text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-white shadow-xl mb-1 sm:mb-2">
              <CheckCircle2 size={13} className="text-clay-soft" /> Atendimento de Alto Padrão
            </span>

            {/* Phrase 3 */}
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug md:leading-tight tracking-tight text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.95)]">
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
            <div className="mt-2.5 sm:mt-4 md:mt-5 flex justify-center">
              <button
                onClick={() => openBooking('geral')}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-clay px-6 sm:px-8 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base font-bold text-white shadow-2xl shadow-clay/50 transition-all duration-300 hover:scale-105 hover:bg-clay-soft hover:text-forest cursor-pointer"
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
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/15 z-20 [transform:translateZ(0)]">
          <motion.div
            style={{ width: progressBarWidth }}
            className="h-full bg-gradient-to-r from-clay via-clay-soft to-emerald-400 shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}
