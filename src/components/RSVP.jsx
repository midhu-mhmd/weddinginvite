import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { id: 1, title: 'Your Details' },
  { id: 2, title: 'Attendance' },
  { id: 3, title: 'Final Notes' },
];

export default function RSVP() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', attending: '', guests: '1', dietary: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!form.name.trim()) newErrors.name = true;
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = true;
    }
    if (step === 2) {
      if (!form.attending) newErrors.attending = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < 3) {
      animateSlide('left');
      setStep((s) => s + 1);
    }
  };

  const prev = () => {
    if (step > 1) {
      animateSlide('right');
      setStep((s) => s - 1);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    console.log('RSVP submitted:', form);
    setSubmitted(true);
  };

  const animateSlide = (direction) => {
    if (!formRef.current) return;
    const x = direction === 'left' ? -30 : 30;
    gsap.fromTo(formRef.current,
      { opacity: 0, x },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    );
  };

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [step]);

  if (submitted) {
    return (
      <section id="rsvp" className="py-24 md:py-32 bg-olive text-center">
        <div className="max-w-lg mx-auto px-6">
          <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-gold" />
          </div>
          <h2 className="text-fluid-heading font-serif italic text-cream mb-4">Thank You!</h2>
          <p className="font-sans text-sm text-cream/70 leading-relaxed">
            We've received your RSVP. We can't wait to celebrate with you!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="py-24 md:py-32 bg-olive"
    >
      <div className="max-w-lg mx-auto px-6">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-sage text-center mb-4 scroll-reveal">
          Will you join us?
        </p>
        <h2 className="text-fluid-heading font-serif italic text-cream text-center mb-12 scroll-reveal">
          RSVP
        </h2>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((s) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs transition-all duration-300',
                step >= s.id
                  ? 'bg-gold text-deep-olive'
                  : 'bg-deep-olive/30 text-sage'
              )}>
                {step > s.id ? <Check className="w-3.5 h-3.5" /> : s.id}
              </div>
              {s.id < 3 && (
                <div className={cn(
                  'w-8 md:w-12 h-px transition-colors duration-300',
                  step > s.id ? 'bg-gold' : 'bg-sage/30'
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={submit}>
          <div ref={formRef}>
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="rsvp-name" className="block font-sans text-xs uppercase tracking-widest text-sage mb-2">
                    Full Name *
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className={cn('field-olive', errors.name && 'field-error')}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="rsvp-email" className="block font-sans text-xs uppercase tracking-widest text-sage mb-2">
                    Email *
                  </label>
                  <input
                    id="rsvp-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={cn('field-olive', errors.email && 'field-error')}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-sage mb-3">
                    Will you attend? *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Joyfully Accept', 'Regretfully Decline'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => update('attending', option)}
                        className={cn(
                          'py-4 border text-sm font-sans transition-all duration-300 min-h-[44px]',
                          form.attending === option
                            ? 'border-gold bg-gold/10 text-gold'
                            : 'border-sage/30 text-cream/60 hover:border-cream/50'
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {errors.attending && (
                    <p className="text-xs text-red-400 mt-2 font-sans">Please select an option</p>
                  )}
                </div>
                {form.attending === 'Joyfully Accept' && (
                  <div>
                    <label htmlFor="rsvp-guests" className="block font-sans text-xs uppercase tracking-widest text-sage mb-2">
                      Number of Guests
                    </label>
                    <select
                      id="rsvp-guests"
                      value={form.guests}
                      onChange={(e) => update('guests', e.target.value)}
                      className="field-olive"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n} className="bg-olive text-cream">{n}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="rsvp-dietary" className="block font-sans text-xs uppercase tracking-widest text-sage mb-2">
                    Dietary Restrictions
                  </label>
                  <input
                    id="rsvp-dietary"
                    type="text"
                    value={form.dietary}
                    onChange={(e) => update('dietary', e.target.value)}
                    className="field-olive"
                    placeholder="Vegan, gluten-free, allergies..."
                  />
                </div>
                <div>
                  <label htmlFor="rsvp-message" className="block font-sans text-xs uppercase tracking-widest text-sage mb-2">
                    A Note for the Couple
                  </label>
                  <textarea
                    id="rsvp-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className="field-olive resize-none"
                    placeholder="Share your well wishes..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={prev}
                className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-cream/60 hover:text-cream transition-colors py-3 px-4 min-h-[44px]"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={next}
                className="btn-gold flex items-center gap-2 ml-auto"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button type="submit" className="btn-gold ml-auto">
                Send RSVP
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
