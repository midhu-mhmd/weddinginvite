import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Calendar, ExternalLink } from 'lucide-react';
import { WEDDING } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

function generateICS(event) {
  const start = WEDDING.date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const end = new Date(WEDDING.date.getTime() + 6 * 60 * 60 * 1000)
    .toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${start}
DTEND:${end}
SUMMARY:${WEDDING.groomFirst} & ${WEDDING.brideFirst}'s Wedding
LOCATION:${event.name}, ${event.address}, ${event.city}
DESCRIPTION:Join us to celebrate!
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wedding.ics';
  a.click();
  URL.revokeObjectURL(url);
}

function EventCard({ title, event, delay = 0 }) {
  return (
    <div className="gsap-reveal bg-olive/40 backdrop-blur-sm border border-sage/20 rounded-sm p-8 md:p-10 flex flex-col items-center text-center">
      <h3 className="font-serif text-2xl md:text-3xl italic text-cream mb-6">{title}</h3>

      <div className="space-y-4 mb-8 w-full">
        <div className="flex items-center justify-center gap-3 text-cream/80">
          <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
          <span className="font-sans text-sm">{WEDDING.dateDisplay}</span>
        </div>
        <div className="flex items-center justify-center gap-3 text-cream/80">
          <Clock className="w-4 h-4 text-gold flex-shrink-0" />
          <span className="font-sans text-sm">{event.time}</span>
        </div>
        <div className="flex items-center justify-center gap-3 text-cream/80">
          <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
          <div className="font-sans text-sm">
            <p className="font-medium text-cream">{event.name}</p>
            <p>{event.address}</p>
            <p>{event.city}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          onClick={() => generateICS(event)}
          className="btn-gold flex-1 flex items-center justify-center gap-2 min-h-[44px]"
        >
          <Calendar className="w-3.5 h-3.5" />
          Add to Calendar
        </button>
        <a
          href={event.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 border border-sage/40 text-cream/80 hover:border-gold hover:text-gold transition-colors py-3 px-4 text-xs uppercase tracking-widest font-sans min-h-[44px]"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Map
        </a>
      </div>
    </div>
  );
}

export default function EventDetails() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.gsap-reveal');
      if (!cards?.length) return;

      gsap.set(cards, { opacity: 0, y: 30 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="details"
      className="py-24 md:py-32 bg-deep-olive"
    >
      <div className="max-w-5xl mx-auto px-6">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-sage text-center mb-4 scroll-reveal">
          Join us on our special day
        </p>
        <h2 className="text-fluid-heading font-serif italic text-cream text-center mb-16 md:mb-20 scroll-reveal">
          The Details
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <EventCard title="Ceremony" event={WEDDING.venue.ceremony} />
          <EventCard title="Reception" event={WEDDING.venue.reception} />
        </div>
      </div>
    </section>
  );
}
