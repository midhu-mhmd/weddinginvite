import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

/* ─────────────────────────────────────────────────────────────
   Minimalist Sacred Bismillah Preloader
   - Authentic calligraphic artwork matching the user's reference
   - Clean, quiet luxury aesthetic: no noisy particles or flares
   - Perfectly scaled down for refined editorial breathing room
   - Gentle, reverent fade entrance and seamless dissolve
   ───────────────────────────────────────────────────────────── */

const SESSION_KEY = 'wedding-preloader-blush-seen';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const calligraphyRef = useRef(null);
  const subtitleRef = useRef(null);
  const hasPlayed = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      onComplete();
      return;
    }
    setReady(true);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, 'true');
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      onComplete,
    });
  }, [onComplete]);

  const buildTimeline = useCallback(() => {
    const container = containerRef.current;
    if (!container) return null;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, 'true');
        onComplete();
      },
    });

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      tl.to(container, { opacity: 0, duration: 0.5, delay: 0.8 });
      return tl;
    }

    // ── 01. Gentle, quiet entrance of the authentic Bismillah calligraphy ──
    tl.fromTo(
      calligraphyRef.current,
      { opacity: 0, y: 10, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'power2.out' },
      0.3
    );

    // ── 02. Minimal English translation whisper ──
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 6, letterSpacing: '0.22em' },
      { opacity: 0.75, y: 0, letterSpacing: '0.28em', duration: 1.1, ease: 'power2.out' },
      0.9
    );

    // ── 03. Seamless ethereal dissolve into the wedding experience ──
    tl.to(
      [calligraphyRef.current, subtitleRef.current],
      {
        opacity: 0,
        y: -8,
        duration: 0.7,
        ease: 'power2.in',
      },
      2.5
    );

    tl.to(
      container,
      {
        opacity: 0,
        duration: 0.75,
        ease: 'power2.inOut',
      },
      2.6
    );

    return tl;
  }, [onComplete]);

  useEffect(() => {
    if (!ready || hasPlayed.current) return;
    hasPlayed.current = true;
    const tl = buildTimeline();
    return () => tl?.kill();
  }, [ready, buildTimeline]);

  if (sessionStorage.getItem(SESSION_KEY)) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer select-none bg-[#FDF5F3]"
      aria-label="Welcome blessing"
      role="banner"
    >
      {/* ── Central Minimalist Composition ── */}
      <div className="relative flex flex-col items-center w-full max-w-lg px-8 text-center">
        
        {/* Authentic Bismillah Calligraphy (Deep Charcoal Ink on #FDF5F3) */}
        <div
          ref={calligraphyRef}
          className="relative w-full max-w-[270px] sm:max-w-[330px] md:max-w-[380px] aspect-[901/183] opacity-0 will-change-transform mb-4"
          style={{
            WebkitMaskImage: `url('/bismillah.png')`,
            maskImage: `url('/bismillah.png')`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            backgroundColor: '#1E1E1E',
          }}
          role="img"
          aria-label="بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ"
        />

        {/* Minimal English translation in refined warm charcoal */}
        <div
          ref={subtitleRef}
          className="opacity-0 will-change-transform"
        >
          <p className="font-['Cormorant_Garamond',serif] italic font-normal text-xs sm:text-sm text-[#2C2C2C]/75 tracking-[0.28em] uppercase leading-relaxed">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>

      </div>

      {/* Subtle bottom cue to skip */}
      <div className="absolute bottom-6 text-[10px] tracking-[0.25em] uppercase font-['Cinzel',serif] text-[#2C2C2C]/30 pointer-events-none">
        Tap to enter
      </div>
    </div>
  );
}
