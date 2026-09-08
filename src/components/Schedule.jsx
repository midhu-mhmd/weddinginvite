import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Heart,
  Wine,
  Utensils,
  Music,
  Sparkles,
  GlassWater,
  PartyPopper,
  Clock,
  MapPin,
  CalendarCheck,
} from 'lucide-react';
import { WEDDING } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  heart: Heart,
  wine: Wine,
  utensils: Utensils,
  music: Music,
  sparkles: Sparkles,
  'glass-water': GlassWater,
  'party-popper': PartyPopper,
};

// Rich contextual metadata for 2026 luxury wedding itinerary
const scheduleMetadata = {
  0: {
    num: '01',
    arabicTitle: 'استقبال الضيوف الكرام',
    location: 'Garden Courtyard',
    tag: 'Welcome',
  },
  1: {
    num: '02',
    arabicTitle: 'مراسم عقد القِران',
    location: 'The Ancient Oak Canopy',
    tag: 'Vows & Rings',
  },
  2: {
    num: '03',
    arabicTitle: 'ساعة الكوكتيل والموسيقى',
    location: 'Veranda & Rose Lawn',
    tag: 'Canapés & Drinks',
  },
  3: {
    num: '04',
    arabicTitle: 'مأدبة العشاء الملكية',
    location: 'Olive Grove Pavilion',
    tag: '4-Course Feast',
  },
  4: {
    num: '05',
    arabicTitle: 'الرقصة الأولى',
    location: 'The Grand Pavilion',
    tag: 'First Dance',
  },
  5: {
    num: '06',
    arabicTitle: 'حفل السهر والبهجة',
    location: 'Ballroom & Open Terrace',
    tag: 'Live Band & DJ',
  },
  6: {
    num: '07',
    arabicTitle: 'وداع الشموع البراقة',
    location: 'Estate Grand Gate',
    tag: 'Sparklers Exit',
  },
};

export default function Schedule() {
  const sectionRef = useRef(null);
  const timelineContainerRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Animate progress line scaling down with scroll scrub
      if (progressLineRef.current && timelineContainerRef.current && !prefersReduced) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: timelineContainerRef.current,
              start: 'top 75%',
              end: 'bottom 80%',
              scrub: 0.6,
            },
          }
        );
      }

      // Timeline Cards Reveal Animation
      const items = sectionRef.current?.querySelectorAll('.timeline-row');
      if (!items?.length) return;

      items.forEach((item, index) => {
        const isEven = index % 2 === 0;
        const card = item.querySelector('.timeline-card');
        const node = item.querySelector('.timeline-node');

        if (prefersReduced) {
          gsap.set([card, node], { opacity: 1 });
          return;
        }

        gsap.set(card, {
          opacity: 0,
          y: 35,
          x: window.innerWidth >= 768 ? (isEven ? -30 : 30) : 0,
        });
        gsap.set(node, { opacity: 0, scale: 0.5 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 82%',
            toggleActions: 'play none none none',
            once: true,
          },
        });

        tl.to(node, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(2)',
        }).to(
          card,
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.3'
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative py-28 md:py-44 bg-[#FAF6F3] text-deep-olive overflow-hidden"
    >
      {/* 2026 Minimalist Ambient Glow Orbs */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[350px] bg-gradient-to-b from-[#E8B4B8]/15 via-[#DFC18A]/10 to-transparent blur-3xl pointer-events-none rounded-full"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-12 right-10 w-96 h-96 bg-[#C7A252]/05 blur-3xl pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28">
          {/* Refined Eyebrow Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/70 border border-gold/25 backdrop-blur-md mb-5 shadow-xs scroll-reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
            <span className="font-['Cinzel',serif] text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-gold-deep font-semibold">
              THE ITINERARY • بَرْنَامَجُ الحَفْل
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-['Playfair_Display',serif] text-4xl sm:text-5xl md:text-6xl text-deep-olive font-normal italic tracking-tight mb-3 scroll-reveal">
            The Day
          </h2>

          {/* Poetic Arabic Calligraphy */}
          <p
            dir="rtl"
            className="font-['Aref_Ruqaa',serif] text-2xl sm:text-3xl text-mauve/90 font-normal tracking-wide mt-1 scroll-reveal"
          >
            لَحَظَاتٌ تُخَلِّدُهَا الذِّكْرَى
          </p>

          {/* Ornamental Divider */}
          <div className="flex items-center justify-center gap-3 mt-6 scroll-reveal">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/40 to-gold/60" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-gold/40 to-gold/60" />
          </div>

          {/* Minimalist Subtitle */}
          <p className="font-sans text-xs sm:text-sm text-olive/70 font-light tracking-wide mt-4 uppercase">
            October 24, 2026 • Portland, Oregon
          </p>
        </div>

        {/* Timeline Architecture */}
        <div ref={timelineContainerRef} className="relative">
          {/* Central Vertical Baseline Track */}
          <div
            className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-sage/25"
            aria-hidden="true"
          />

          {/* Dynamic Scroll-Driven Golden Progress Line */}
          <div
            ref={progressLineRef}
            className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] -translate-x-[0.5px] bg-gradient-to-b from-gold-deep via-gold to-gold-warm shadow-[0_0_8px_rgba(199,162,82,0.6)]"
            aria-hidden="true"
          />

          {/* Timeline Milestones */}
          <div className="space-y-12 md:space-y-16">
            {WEDDING.schedule.map((item, i) => {
              const Icon = iconMap[item.icon] || Heart;
              const meta = scheduleMetadata[i] || {
                num: String(i + 1).padStart(2, '0'),
                arabicTitle: '',
                location: 'Venue Grounds',
                tag: 'Milestone',
              };
              const isEven = i % 2 === 0;

              return (
                <div
                  key={i}
                  className={`timeline-row relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Empty Spacer Column on Desktop to balance the alternating layout */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Central Node Badge */}
                  <div className="timeline-node absolute left-6 md:left-1/2 -translate-x-1/2 top-7 z-20 flex items-center justify-center">
                    <div className="relative group/node flex items-center justify-center w-8 h-8 rounded-full bg-[#FAF6F3] border border-gold/40 shadow-[0_0_12px_rgba(199,162,82,0.25)] transition-all duration-300 hover:scale-125 hover:border-gold">
                      <div className="w-2.5 h-2.5 rounded-full bg-gold group-hover/node:bg-gold-deep transition-colors shadow-xs" />
                      {/* Gentle pulsating ripple */}
                      <span className="absolute inset-0 rounded-full border border-gold/30 animate-ping opacity-30 pointer-events-none" />
                    </div>
                  </div>

                  {/* Main Event Card (Full width on mobile, half width on desktop) */}
                  <div
                    className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                      isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    }`}
                  >
                    <div className="timeline-card group relative p-6 sm:p-7 md:p-8 rounded-2xl bg-white/75 hover:bg-white/95 border border-sage/20 hover:border-gold/45 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(199,162,82,0.14)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1">
                      {/* Top Meta Bar: Time Pill + Event Number */}
                      <div
                        className={`flex items-center gap-3 mb-4 flex-wrap ${
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        {/* Event Index Badge */}
                        <span className="font-['Cinzel',serif] text-xs font-semibold tracking-widest text-gold/60 group-hover:text-gold-deep transition-colors">
                          {meta.num}
                        </span>

                        <span className="text-sage/40 text-xs">•</span>

                        {/* Luxury Time Pill */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F3] border border-gold/30 text-gold-deep shadow-2xs">
                          <Clock className="w-3 h-3 text-gold" />
                          <span className="font-['Cinzel',serif] text-xs tracking-wider font-semibold">
                            {item.time}
                          </span>
                        </div>

                        {/* Location Tag */}
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sage/10 text-olive/70 text-[11px] font-sans font-light">
                          <MapPin className="w-2.5 h-2.5 text-sage" />
                          <span>{meta.location}</span>
                        </div>
                      </div>

                      {/* Title & Icon Header */}
                      <div
                        className={`flex items-start gap-4 mb-3 ${
                          isEven ? 'md:flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        {/* Refined Squircle Icon Badge */}
                        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gold/10 border border-gold/25 group-hover:bg-gold group-hover:text-white text-gold flex items-center justify-center transition-all duration-500 shadow-xs group-hover:rotate-6">
                          <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                        </div>

                        {/* Event Names */}
                        <div className="flex-1">
                          <h4 className="font-['Playfair_Display',serif] text-2xl sm:text-[1.7rem] italic font-medium text-deep-olive group-hover:text-black transition-colors leading-snug">
                            {item.title}
                          </h4>

                          {/* Arabic Poetic Subtitle */}
                          {meta.arabicTitle && (
                            <p
                              dir="rtl"
                              className="font-['Aref_Ruqaa',serif] text-lg sm:text-xl text-gold-deep/90 mt-0.5 tracking-wide leading-none"
                            >
                              {meta.arabicTitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Event Description */}
                      <p className="font-sans text-sm text-olive/80 font-light leading-relaxed mt-2.5 border-t border-sage/10 pt-3">
                        {item.description}
                      </p>

                      {/* Subtle Ambient Hover Bar Accent */}
                      <div
                        className={`absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/50 transition-all duration-700 rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Itinerary Closure / Note */}
        <div className="mt-20 md:mt-28 text-center scroll-reveal">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 border border-sage/25 backdrop-blur-sm text-xs font-sans text-olive/75 shadow-xs">
            <CalendarCheck className="w-3.5 h-3.5 text-gold" />
            <span>Schedule is subject to gentle flow with celebration moments</span>
          </div>
        </div>
      </div>
    </section>
  );
}
