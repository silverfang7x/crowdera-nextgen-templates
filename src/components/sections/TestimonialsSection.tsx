'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Section, Container } from '@/components/ui/Section';
import Image from 'next/image';

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  designation: string;
  organization?: string;
  imageUrl?: string;
  rating?: number;
}

export interface TestimonialsSectionProps {
  sectionHeadline?: string;
  sectionSubtitle?: string;
  testimonials: TestimonialItem[];
}

export function TestimonialsSection({
  sectionHeadline = "Voices From the Ground",
  sectionSubtitle = "Hear from the emergency responders, community leaders, and donors partnering with Clearwater Relief Trust.",
  testimonials,
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeTestimonial = testimonials[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Helper to render star SVGs based on rating
  const renderStars = (rating?: number) => {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg key={i} className="w-4 h-4 fill-accent text-accent" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
            <defs>
              <linearGradient id="halfStarTestimonial">
                <stop offset="50%" stopColor="currentColor"/>
                <stop offset="50%" stopColor="transparent" stopOpacity="1"/>
              </linearGradient>
            </defs>
            <path fill="url(#halfStarTestimonial)" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-border fill-transparent" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      }
    }
    return <div className="flex items-center gap-0.5">{stars}</div>;
  };

  return (
    <Section padding="lg" background="elevated" id="testimonials">
      <Container asymmetric className="space-y-12">
        
        {/* Header Block */}
        <div className="max-w-2xl text-left space-y-3">
          <span className="text-xs uppercase tracking-widest text-accent font-bold">
            Frontline Endorsements
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-ink">
            {sectionHeadline}
          </h2>
          <p className="text-base text-ink-muted font-sans leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Large Featured Testimonial Card */}
          <div className="lg:col-span-8 bg-surface border border-border/80 rounded-xl p-8 md:p-12 shadow-md relative min-h-[380px] flex flex-col justify-between overflow-hidden">
            {/* Soft decorative background quote mark */}
            <div className="absolute right-8 top-8 text-surface-elevated/45 text-9xl font-serif select-none pointer-events-none font-bold">
              ”
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 z-10"
              >
                {/* Optional Star Rating */}
                {activeTestimonial.rating && (
                  <div className="flex items-center gap-2">
                    {renderStars(activeTestimonial.rating)}
                    <span className="text-xs font-semibold text-ink-muted font-sans mt-0.5">
                      ({activeTestimonial.rating}.0 Rating)
                    </span>
                  </div>
                )}

                {/* Big Quote text */}
                <p className="text-lg md:text-xl font-serif italic text-ink leading-relaxed font-semibold">
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </p>

                {/* Author Info row */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/60">
                  {activeTestimonial.imageUrl ? (
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border border-border">
                      <Image
                        src={activeTestimonial.imageUrl}
                        alt={activeTestimonial.author}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-accent/10 border border-border flex items-center justify-center font-bold text-accent font-serif text-lg">
                      {activeTestimonial.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-sans font-bold text-base text-ink leading-tight">
                      {activeTestimonial.author}
                    </h4>
                    <p className="text-xs text-ink-muted font-sans mt-0.5">
                      {activeTestimonial.designation}
                      {activeTestimonial.organization && ` at ${activeTestimonial.organization}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Cycling Navigation controls */}
            <div className="flex items-center justify-between gap-4 mt-8 pt-4 border-t border-border/30">
              <span className="text-xs font-semibold uppercase tracking-widest text-ink-muted/70 font-sans">
                Testimonial {String(activeIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="p-2 border border-border rounded-md text-ink hover:border-accent hover:text-accent transition-colors duration-200 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="p-2 border border-border rounded-md text-ink hover:border-accent hover:text-accent transition-colors duration-200 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Horizontal/Vertical Rail of Preview Cards */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 w-full">
            {testimonials.map((t, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex items-start gap-4 p-4 rounded-lg border text-left transition-all duration-300 w-full cursor-pointer select-none ${
                    isActive
                      ? 'border-accent bg-surface shadow-sm scale-102 opacity-100 ring-1 ring-accent/30'
                      : 'border-border bg-surface-elevated/40 opacity-70 hover:opacity-100 hover:bg-surface-elevated/80'
                  }`}
                >
                  {t.imageUrl ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-border">
                      <Image
                        src={t.imageUrl}
                        alt={t.author}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center font-bold text-accent shrink-0 font-serif">
                      {t.author.charAt(0)}
                    </div>
                  )}
                  <div className="space-y-1 min-w-0">
                    <h5 className="font-sans font-bold text-sm text-ink truncate leading-tight">
                      {t.author}
                    </h5>
                    <p className="text-2xs text-ink-muted truncate font-sans">
                      {t.designation}
                    </p>
                    <p className="text-xs text-ink-muted line-clamp-1 italic font-serif mt-0.5">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </Container>
    </Section>
  );
}
