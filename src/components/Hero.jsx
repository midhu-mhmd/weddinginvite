import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WEDDING } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ isPreloaderDone = true }) {
  const sectionRef = useRef(null);
  const zoomWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const dateRef = useRef(null);
  const scrollDotRef = useRef(null);
  const botanicalRef = useRef(null);

  useEffect(() => {
    // If preloader is still running, defer entrance until it completes
    if (!isPreloaderDone) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // ─── Instant rest-states if reduced motion is preferred ───
      if (prefersReduced) {
        gsap.set(
          [
            overlayRef.current,
            dateRef.current,
            botanicalRef.current,
            '.hero-eyebrow',
            '.hero-letter',
            '.hero-ampersand',
            '.hero-scroll-cue',
          ],
          { opacity: 1, scale: 1, y: 0, rotation: 0, clearProps: 'all' }
        );
        if (zoomWrapperRef.current) {
          gsap.set(zoomWrapperRef.current, { scale: 1.0, opacity: 1 });
        }
        return;
      }

      // ─── 1. Choreographed Entrance Master Timeline ───
      const entranceTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.15,
      });

      // (a) Cinematic Image Entrance: settle at full 100% width and height (scale 1.0)
      entranceTl.fromTo(
        zoomWrapperRef.current,
        { scale: 1.04 },
        { scale: 1.0, duration: 2.0, ease: 'power2.out' },
        0
      );

      entranceTl.fromTo(
        overlayRef.current,
        { opacity: 0.7 },
        { opacity: 0.4, duration: 1.6, ease: 'power2.out' },
        0
      );

      // (b) Subtle Botanical Background Accent Reveal
      if (botanicalRef.current) {
        entranceTl.fromTo(
          botanicalRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 0.08, scale: 1, duration: 2.0, ease: 'power2.out' },
          0.3
        );
      }

      // (c) Eyebrow: "We are getting married"
      entranceTl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: 16, letterSpacing: '0.48em' },
        { opacity: 1, y: 0, letterSpacing: '0.40em', duration: 1.1, ease: 'power2.out' },
        0.4
      );

      // (d) Groom's Name: Letter-by-letter with subtle settle
      entranceTl.fromTo(
        '.letter-groom',
        {
          opacity: 0,
          y: 28,
          rotation: (i) => (i % 2 === 0 ? -3 : 3),
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.035,
          ease: 'power3.out',
        },
        0.6
      );

      // (e) Ampersand: Minimal whisper fade
      entranceTl.fromTo(
        '.hero-ampersand',
        { opacity: 0, scale: 0.9, y: 8 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.85
      );

      // (f) Bride's Name: Letter-by-letter with subtle settle
      entranceTl.fromTo(
        '.letter-bride',
        {
          opacity: 0,
          y: 28,
          rotation: (i) => (i % 2 === 0 ? 3 : -3),
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.035,
          ease: 'power3.out',
        },
        1.05
      );

      // (g) Date: breathes in effortlessly
      if (dateRef.current) {
        entranceTl.fromTo(
          dateRef.current,
          {
            opacity: 0,
            y: 14,
            letterSpacing: '0.36em',
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: '0.28em',
            duration: 1.2,
            ease: 'power2.out',
          },
          1.25
        );
      }

      // (h) Editorial Scroll Cue Reveal
      entranceTl.fromTo(
        '.hero-scroll-cue',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1.0 },
        1.7
      );

      // ─── 2. Traveling Dot on Hairline Scroll Cue ───
      if (scrollDotRef.current) {
        gsap.fromTo(
          scrollDotRef.current,
          { y: 0, opacity: 0 },
          {
            y: 40,
            opacity: 1,
            duration: 2.2,
            repeat: -1,
            ease: 'power2.inOut',
            keyframes: [
              { opacity: 0, y: 0, duration: 0 },
              { opacity: 1, y: 10, duration: 0.6 },
              { opacity: 1, y: 28, duration: 0.8 },
              { opacity: 0, y: 40, duration: 0.8 },
            ],
          }
        );
      }

      // ─── 3. Scroll-triggered Parallax (tuned for mobile) ───
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: isMobile ? 8 : 15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // ─── 4. Fade out Hero Content on Scroll (Untouched) ───
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '60% top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isPreloaderDone]);

  // Helper to split text for accessible letter-by-letter rendering
  const renderLetters = (word, className) => {
    return (
      <span className="inline-block" aria-hidden="true">
        {word.split('').map((char, index) => (
          <span
            key={index}
            className={`hero-letter hero-gold-char ${className} inline-block will-change-transform`}
            style={{ transformOrigin: '50% 90%' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-deep-olive"
    >
      {/* Background Video Container: 100% full width and full height */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {/* Crisp, clean dark overlay for readability */}
        <div
          ref={overlayRef}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none bg-black/35 will-change-[opacity]"
        />

        {/* Zoom wrapper for cinematic entrance (isolated from parallax) */}
        <div
          ref={zoomWrapperRef}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <video
            ref={imageRef}
            src="/16289502_1920_1080_60fps.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-[60%_center] will-change-transform"
          />
        </div>
      </div>

      {/* Botanical Line Accent (Preserved soft botanical squiggle) */}
      <svg
        ref={botanicalRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[500px] h-auto opacity-[0.08] z-10 pointer-events-none will-change-[opacity,transform]"
        viewBox="0 0 400 500"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M200 0 C200 250, 100 300, 50 500 M200 0 C200 250, 300 300, 350 500 M200 100 C180 150, 120 180, 80 200 M200 100 C220 150, 280 180, 320 200 M200 200 C185 230, 140 260, 100 300 M200 200 C215 230, 260 260, 300 300"
          stroke="#D4A5A5"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>

      {/* Hero Content: Pure, Minimalist Luxury */}
      <div
        ref={contentRef}
        className="relative z-20 text-center px-6 flex flex-col items-center max-w-4xl mx-auto select-none"
      >
        {/* Eyebrow: Minimal, quiet, high-fashion tracking */}
        <p className="hero-eyebrow font-['Cinzel'] uppercase tracking-[0.40em] text-[11px] md:text-xs text-cream/80 font-normal mb-3 md:mb-5">
          We are getting married
        </p>

        {/* Groom's Name with Screen Reader Preservation */}
        <h1
          className="text-fluid-display font-serif italic font-normal text-cream leading-[1.05] tracking-tight"
          aria-label={WEDDING.groomFirst}
        >
          {renderLetters(WEDDING.groomFirst, 'letter-groom')}
        </h1>

        {/* Ampersand: Whisper-thin, delicate italic serif */}
        <span
          className="hero-ampersand font-serif italic text-2xl md:text-3xl text-cream/70 my-1 md:my-2 font-light leading-none select-none"
          aria-hidden="true"
        >
          &amp;
        </span>

        {/* Bride's Name with Screen Reader Preservation */}
        <h1
          className="text-fluid-display font-serif italic font-normal text-cream leading-[1.05] tracking-tight mb-2 md:mb-3"
          aria-label={WEDDING.brideFirst}
        >
          {renderLetters(WEDDING.brideFirst, 'letter-bride')}
        </h1>

        {/* Date: Minimalist, serene, floating typography */}
        <p
          ref={dateRef}
          className="mt-3 md:mt-5 font-['Cinzel'] text-xs md:text-sm tracking-[0.28em] uppercase text-cream/85 font-normal will-change-[letter-spacing,opacity]"
        >
          {WEDDING.dateDisplay}
        </p>
      </div>

      {/* Editorial Hairline Scroll Cue with Traveling Dot */}
      <div
        className="hero-scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5 select-none pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-cream/50 font-['Cinzel'] font-normal">
          Scroll
        </span>
        <div className="relative w-[1px] h-10 md:h-12 bg-gradient-to-b from-cream/40 via-cream/15 to-transparent">
          <div
            ref={scrollDotRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cream/90 shadow-[0_0_6px_rgba(255,255,255,0.7)]"
          />
        </div>
      </div>
    </section>
  );
}

