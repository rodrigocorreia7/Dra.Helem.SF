import { useCallback, useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = clamp((value - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

type ScrollExpandProps = {
  src: string;
  alt: string;
  title?: string;
  scrollHint?: string;
  children?: ReactNode;
  stageHeight?: number;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  imageClassName?: string;
  className?: string;
  style?: CSSProperties;
};

/** Scroll-driven media reveal using the page scroll, never an inner scroll area. */
export default function ScrollExpand({
  src,
  alt,
  title = '',
  scrollHint = '',
  children,
  stageHeight = 520,
  startWidth = 66,
  startHeight = 62,
  startRadius = 28,
  endRadius = 22,
  mediaZoom = 1.18,
  scrollDistance = 0.62,
  holdDistance = 0.18,
  smoothing = 0.1,
  overlayScrim = 0.55,
  imageClassName = '',
  className = '',
  style,
}: ScrollExpandProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLImageElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const applyProgress = useCallback((progress: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;

    const eased = smoothstep(0, 1, progress);
    const width = startWidth + (100 - startWidth) * eased;
    const height = startHeight + (100 - startHeight) * eased;
    const insetX = Math.max(0, (100 - width) / 2);
    const insetY = Math.max(0, (100 - height) / 2);
    const radius = startRadius + (endRadius - startRadius) * eased;

    frame.style.clipPath = `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`;
    media.style.transform = `scale(${mediaZoom + (1 - mediaZoom) * eased})`;

    if (scrimRef.current) scrimRef.current.style.opacity = `${overlayScrim * eased}`;

    if (titleRef.current) {
      const exit = smoothstep(0.12, 0.34, progress);
      titleRef.current.style.opacity = `${1 - exit}`;
      titleRef.current.style.transform = `translate3d(0, ${-24 * exit}px, 0)`;
    }

    if (hintRef.current) {
      const exit = smoothstep(0, 0.16, progress);
      hintRef.current.style.opacity = `${1 - exit}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * exit}px, 0)`;
    }

    if (overlayRef.current) {
      const enter = smoothstep(0.28, 0.58, progress);
      overlayRef.current.style.opacity = `${enter}`;
      overlayRef.current.style.transform = `translate3d(0, ${children ? 0 : 18 * (1 - enter)}px, 0)`;
    }
  }, [children, endRadius, mediaZoom, overlayScrim, startHeight, startRadius, startWidth]);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let current = 0;
    let target = 0;
    let running = false;

    const measure = () => {
      const height = Math.max(360, stageHeight);
      const stickyTop = Number.parseFloat(window.getComputedStyle(stage).top) || 0;
      const scrollRange = height * (Math.max(0, scrollDistance) + Math.max(0, holdDistance));
      const trackHeight = Math.max(height, stickyTop + height + scrollRange);
      root.style.height = `${trackHeight}px`;
      stage.style.height = `${height}px`;
      track.style.height = `${trackHeight}px`;
    };

    const readProgress = () => {
      const span = Math.max(1, stageHeight * Math.max(0.01, scrollDistance));
      return clamp(-track.getBoundingClientRect().top / span, 0, 1);
    };

    const tick = () => {
      const factor = smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * smoothing));
      current += (target - current) * factor;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const onScroll = () => {
      target = readProgress();
      if (reduceMotion || smoothing <= 0) {
        current = target;
        applyProgress(current);
        return;
      }
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      resizeObserver.disconnect();
    };
  }, [applyProgress, holdDistance, scrollDistance, smoothing, stageHeight]);

  return (
    <div ref={rootRef} className={`relative w-full ${className}`.trim()} style={style}>
      <div ref={trackRef} className="relative w-full">
        <div ref={stageRef} className="sticky top-[clamp(7rem,34vh,22rem)] w-full overflow-hidden rounded-[2rem] bg-forest">
          <div ref={frameRef} className="absolute inset-0 overflow-hidden [will-change:clip-path]">
            <Image
              ref={mediaRef}
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
              className={`h-full w-full object-cover object-center origin-center select-none [will-change:transform] ${imageClassName}`.trim()}
              draggable={false}
            />
            <div
              ref={scrimRef}
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(7,25,20,0.92),rgba(7,25,20,0.12)_55%,rgba(7,25,20,0.38))] opacity-0"
            />
            {children ? (
              <div
                ref={overlayRef}
                className="absolute inset-0 flex items-end justify-center p-6 text-center opacity-0 sm:p-10"
                style={{ willChange: 'opacity, transform' }}
              >
                {children}
              </div>
            ) : null}
          </div>

          {title ? (
            <div
              ref={titleRef}
              className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center font-display text-3xl font-semibold tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] sm:text-5xl"
              style={{ willChange: 'opacity, transform' }}
            >
              {title}
            </div>
          ) : null}

          {scrollHint ? (
            <div
              ref={hintRef}
              className="pointer-events-none absolute inset-x-0 bottom-5 text-center text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/75 sm:text-xs"
              style={{ willChange: 'opacity, transform' }}
            >
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
