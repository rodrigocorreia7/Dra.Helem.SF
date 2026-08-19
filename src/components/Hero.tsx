import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, Award, ChevronDown, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { site } from '../lib/site';
import { useBooking } from '../lib/booking';

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
        // Optimization: Deadzone filter (skips micro-movements < 0.025s)
        const diff = Math.abs(v.currentTime - target);
        if (diff > 0.025) {
          isSeeking = true;
          if ('fastSeek' in v) {
            v.fastSeek(target);
          } else {
            v.currentTime = target;
          }

          // Only sync secondary background video on desktop to save mobile GPU
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

  // Phase 1 (0.00 -> 0.30): Na Recepção - Slide from left
  const p1Opacity = useTransform(scrollYProgress, [0, 0.22, 0.30], [1, 1, 0]);
  const p1X = useTransform(scrollYProgress, [0, 0.25, 0.30], [0, 0, 40]);
  const p1Scale = useTransform(scrollYProgress, [0, 0.30], [1, 0.96]);

  // Phase 2 (0.35 -> 0.68): No Corredor / Ambiente - Slide from left
  const p2Opacity = useTransform(scrollYProgress, [0.32, 0.40, 0.60, 0.68], [0, 1, 1, 0]);
  const p2X = useTransform(scrollYProgress, [0.32, 0.40, 0.60, 0.68], [-60, 0, 0, 40]);

  // Phase 3 (0.72 -> 1.00): Chegando ao Consultório + Aperto de Mão + CTA
  const p3Opacity = useTransform(scrollYProgress, [0.70, 0.78, 1], [0, 1, 1]);
  const p3X = useTransform(scrollYProgress, [0.70, 0.78, 1], [-60, 0, 0]);

  // Bottom visual journey progress bar
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      id="topo"
      className="relative h-[350vh] bg-[#071914] text-white [overscroll-behavior-y:none]"
    >
      {/* Sticky Viewport positioned strictly below the menu */}
      <div className="sticky top-[64px] sm:top-[88px] h-[calc(100vh-64px)] sm:h-[calc(100vh-88px)] w-full overflow-hidden flex items-center justify-center bg-[#071914] [transform:translateZ(0)]">
        
        {/* Layer 1: Ambient Blurred Background Video (Desktop only to conserve mobile GPU) */}
        {isDesktop && (
          <video
            ref={bgVideoRef}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover blur-3xl opacity-35 scale-110 pointer-events-none [transform:translateZ(0)]"
          />
        )}

        {/* Layer 2: Main Crisp Video Preserving 100% Original 16:9 Framing (Zero Head Cropping) */}
        <div className="relative w-full h-full flex items-center justify-center [transform:translateZ(0)]">
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            className="w-full h-full max-h-full max-w-full object-contain object-center z-0 [transform:translateZ(0)] [will-change:transform]"
          />

          {/* Cinematic Vignette Overlays for Text Legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent sm:w-3/4 lg:w-3/5 z-1" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-1" />

          {/* Storytelling Text Overlays Container - Aligned to the Left & Comfortably Spaced */}
          <div className="absolute inset-0 z-10 mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-16 flex items-center min-h-[60vh]">
            
            {/* ================= FASE 1 (0% -> 30%): Na Recepção ================= */}
            <motion.div
              style={{ opacity: p1Opacity, x: p1X, scale: p1Scale }}
              className="absolute max-w-xl text-left flex flex-col items-start [transform:translateZ(0)] [will-change:transform,opacity]"
            >
              {/* Top Badges */}
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-lg">
                  <ShieldCheck size={14} className="text-clay-soft" />
                  {site.crm} · Médica & Psicóloga
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-lg">
                  <Award size={14} className="text-clay-soft" />
                  ABMEV
                </span>
              </div>

              {/* Phrase 1 (Grande, Branca, Alinhada à Esquerda) */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-[3.2rem] leading-[1.12] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                SUA JORNADA DE TRANSFORMAÇÃO COMEÇA NO MOMENTO EM QUE VOCÊ{' '}
                <span className="text-clay-soft underline decoration-clay-soft/40 underline-offset-8">
                  ATRAVESSA ESTA PORTA...
                </span>
              </h1>

              {/* Scroll Indicator */}
              <div className="mt-8 flex items-center gap-3 text-white/80 animate-pulse">
                <ChevronDown size={22} className="animate-bounce text-clay-soft" />
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-clay-soft drop-shadow">
                  Role para acompanhar a experiência
                </span>
              </div>
            </motion.div>

            {/* ================= FASE 2 (35% -> 68%): No Corredor / Ambiente ================= */}
            <motion.div
              style={{ opacity: p2Opacity, x: p2X }}
              className="absolute max-w-xl text-left flex flex-col items-start pointer-events-none [transform:translateZ(0)] [will-change:transform,opacity]"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-clay-soft/40 bg-black/60 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-clay-soft shadow-lg">
                <Sparkles size={14} /> Investigação na Causa Raiz
              </span>

              {/* Phrase 2 (Grande, Branca, Alinhada à Esquerda) */}
              <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-[3.2rem] leading-[1.15] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                Uma medicina que investiga a <span className="text-clay-soft">causa raiz</span> da sua saúde, sem pressa e com escuta profunda.
              </h2>
            </motion.div>

            {/* ================= FASE 3 (72% -> 100%): Chegando ao Consultório + Aperto de Mão + CTA ================= */}
            <motion.div
              style={{ opacity: p3Opacity, x: p3X }}
              className="absolute max-w-xl text-left flex flex-col items-start [transform:translateZ(0)] [will-change:transform,opacity]"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-forest/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-xl">
                <CheckCircle2 size={15} className="text-clay-soft" /> Atendimento de Alto Padrão
              </span>

              {/* Phrase 3 (Grande, Branca, Alinhada à Esquerda) */}
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[3.4rem] leading-[1.1] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                Dra. Hélem Machado Almeida
              </h2>

              <p className="mt-2 text-lg sm:text-2xl font-display text-clay-soft drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                Seja bem-vindo(a) à sua nova fase.
              </p>

              <p className="mt-2 text-xs sm:text-sm font-semibold tracking-wider text-white/85 uppercase">
                {site.crm} · Médica e Psicóloga · Membro ABMEV
              </p>

              {/* Action CTA Button */}
              <div className="mt-7 flex flex-col sm:flex-row items-start gap-4">
                <button
                  onClick={() => openBooking('geral')}
                  className="group inline-flex items-center gap-3 rounded-full bg-clay px-8 py-4 text-base font-bold text-white shadow-2xl shadow-clay/50 transition-all duration-300 hover:scale-105 hover:bg-clay-soft hover:text-forest cursor-pointer"
                >
                  Agendar Minha Consulta Médica
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </div>
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
