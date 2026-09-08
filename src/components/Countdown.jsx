import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WEDDING } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

function getTimeLeft(target) {
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/* ─── Minimal Silk-Glide Number Unit ─── */
function MinimalNumber({ value, label, isSeconds = false }) {
  const formatted = String(value).padStart(2, '0');
  const [currentDisplay, setCurrentDisplay] = useState(formatted);
  const [outgoingDisplay, setOutgoingDisplay] = useState(null);
  const incomingRef = useRef(null);
  const outgoingRef = useRef(null);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      const nextStr = String(value).padStart(2, '0');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        setCurrentDisplay(nextStr);
        prevValue.current = value;
        return;
      }

      setOutgoingDisplay(currentDisplay);
      setCurrentDisplay(nextStr);

      // Smooth silk fade and subtle slide
      requestAnimationFrame(() => {
        if (incomingRef.current) {
          gsap.fromTo(
            incomingRef.current,
            { y: 12, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            }
          );
        }

        if (outgoingRef.current) {
          gsap.fromTo(
            outgoingRef.current,
            { y: 0, opacity: 1 },
            {
              y: -12,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.in',
              onComplete: () => setOutgoingDisplay(null),
            }
          );
        }
      });

      prevValue.current = value;
    }
  }, [value, currentDisplay]);

  return (
    <div className="flex flex-col items-center select-none min-w-[70px] sm:min-w-[90px] md:min-w-[130px]">
      {/* Colossal Minimal Numeral Container with generous room */}
      <div className="relative h-20 sm:h-24 md:h-32 lg:h-36 flex items-center justify-center w-full">
        {/* Outgoing floating numeral */}
        {outgoingDisplay !== null && (
          <span
            ref={outgoingRef}
            className="absolute inset-0 flex items-center justify-center font-['Playfair_Display'] font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream/25 tracking-normal tabular-nums"
            aria-hidden="true"
          >
            {outgoingDisplay}
          </span>
        )}

        {/* Incoming / Active floating numeral */}
        <span
          ref={incomingRef}
          className={`absolute inset-0 flex items-center justify-center font-['Playfair_Display'] font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream tracking-normal tabular-nums countdown-num-glow ${
            isSeconds ? 'text-cream' : 'text-cream/95'
          }`}
        >
          {currentDisplay}
        </span>
      </div>

      {/* Editorial High-Fashion Label */}
      <div className="mt-2 md:mt-4 flex items-center gap-2">
        <span className="font-['Cinzel'] text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.38em] text-sage/80 font-normal">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft(WEDDING.date));
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft(WEDDING.date));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // Subtle ambient light reveal
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 2.2, ease: 'power2.out' },
        0
      );

      // Section Content Stagger
      tl.fromTo(
        '.cd-reveal',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.15, ease: 'power3.out' },
        0.2
      );

      // Separator hairlines breathing
      tl.fromTo(
        '.cd-divider',
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 0.4, duration: 1.0, stagger: 0.1, ease: 'power2.out' },
        0.6
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="countdown"
      className="relative py-28 md:py-44 bg-deep-olive text-center overflow-hidden"
    >
      {/* Subtle Cinematic Ambient Light */}
      <div
        ref={glowRef}
        className="countdown-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-5xl h-[500px] pointer-events-none blur-3xl opacity-0"
        aria-hidden="true"
      />

      <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Minimal High-Fashion Arabic Eyebrow: The Journey to Forever */}
        <p
          dir="rtl"
          className="cd-reveal font-['Aref_Ruqaa',serif] text-base sm:text-lg md:text-xl text-sage/90 mb-3 font-normal tracking-wide"
        >
          رِحْلَةٌ إِلَى الأَبَدْ
        </p>

        {/* Breathtaking Arabic Heading: Our Day */}
        <h2
          dir="rtl"
          className="cd-reveal font-['Aref_Ruqaa',serif] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream mb-14 md:mb-20 font-bold tracking-normal leading-tight"
        >
          يَوْمُنَا
        </h2>

        {/* Minimal 2026 Floating Digits Layout */}
        <div className="cd-reveal flex justify-center items-center gap-3 sm:gap-6 md:gap-10 lg:gap-14">
          {/* Days */}
          <MinimalNumber value={time.days} label="Days" />

          {/* Elegant Hairline Divider */}
          <div
            className="cd-divider h-14 sm:h-20 md:h-28 w-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent transform-gpu"
            aria-hidden="true"
          />

          {/* Hours */}
          <MinimalNumber value={time.hours} label="Hours" />

          {/* Elegant Hairline Divider */}
          <div
            className="cd-divider h-14 sm:h-20 md:h-28 w-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent transform-gpu"
            aria-hidden="true"
          />

          {/* Minutes */}
          <MinimalNumber value={time.minutes} label="Minutes" />

          {/* Elegant Hairline Divider */}
          <div
            className="cd-divider h-14 sm:h-20 md:h-28 w-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent transform-gpu"
            aria-hidden="true"
          />

          {/* Seconds */}
          <MinimalNumber value={time.seconds} label="Seconds" isSeconds={true} />
        </div>

        {/* Bottom Editorial Accent & Date Cue */}
        <div className="cd-reveal mt-16 md:mt-24 flex flex-col items-center gap-3 select-none">
          {/* Subtle pulse hairline */}
          <div className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          
          <span className="font-['Cinzel'] text-[9px] md:text-[10px] uppercase tracking-[0.38em] text-cream/50 font-normal">
            {WEDDING.dateDisplay}
          </span>
        </div>
      </div>
    </section>
  );
}


