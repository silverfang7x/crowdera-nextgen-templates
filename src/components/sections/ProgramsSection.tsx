'use client';

import * as React from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Section, Container } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export interface ProgramItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface ProgramsSectionProps {
  sectionHeadline?: string;
  sectionSubtitle?: string;
  programs: ProgramItem[];
}

export function ProgramsSection({
  sectionHeadline = "Our Core Relief Programs",
  sectionSubtitle = "Providing immediate, evidence-based disaster response and water purification where the need is greatest.",
  programs,
}: ProgramsSectionProps) {
  const isCarousel = programs.length > 3;

  const carouselRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const [maxScrollWidth, setMaxScrollWidth] = React.useState(0);
  const x = useMotionValue(0);

  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(isCarousel);

  React.useEffect(() => {
    if (!isCarousel || !carouselRef.current || !innerRef.current) return;

    const updateMaxScrollWidth = () => {
      const scrollWidth = innerRef.current?.scrollWidth || 0;
      const clientWidth = carouselRef.current?.clientWidth || 0;
      const difference = Math.max(0, scrollWidth - clientWidth);
      setMaxScrollWidth(difference);
    };

    // Delay calculation slightly to allow fonts and images to compute dimensions correctly
    const timer = setTimeout(updateMaxScrollWidth, 150);

    window.addEventListener('resize', updateMaxScrollWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateMaxScrollWidth);
    };
  }, [isCarousel, programs]);

  // Sync chevron enabled/disabled states with motion value x changes
  React.useEffect(() => {
    if (!isCarousel) return;

    const unsubscribe = x.on("change", (latest) => {
      setCanPrev(latest < -10);
      setCanNext(latest > -maxScrollWidth + 10);
    });

    return () => unsubscribe();
  }, [isCarousel, x, maxScrollWidth]);

  const handleNext = () => {
    const currentX = x.get();
    const step = 380; // approximate width of card + gap
    const newX = Math.max(-maxScrollWidth, currentX - step);
    animate(x, newX, { duration: 0.4, ease: "easeOut" });
  };

  const handlePrev = () => {
    const currentX = x.get();
    const step = 380;
    const newX = Math.min(0, currentX + step);
    animate(x, newX, { duration: 0.4, ease: "easeOut" });
  };

  return (
    <Section padding="lg" background="default" id="programs">
      <Container asymmetric className="space-y-12">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl text-left space-y-3">
            <span className="text-xs uppercase tracking-widest text-accent font-bold">
              Immediate Frontline Operations
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-ink">
              {sectionHeadline}
            </h2>
            <p className="text-base text-ink-muted font-sans leading-relaxed">
              {sectionSubtitle}
            </p>
          </div>

          {/* Carousel controls rendered only if programs count > 3 */}
          {isCarousel && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={!canPrev}
                aria-label="Previous programs"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-ink hover:border-accent hover:text-accent disabled:opacity-30 disabled:pointer-events-none transition-colors duration-200 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={!canNext}
                aria-label="Next programs"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-ink hover:border-accent hover:text-accent disabled:opacity-30 disabled:pointer-events-none transition-colors duration-200 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Display Layout */}
        {!isCarousel ? (
          // Grid Layout: <= 3 programs
          <ScrollReveal staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((prog) => (
              <Card
                key={prog.id}
                variant="program-card"
                className="h-full"
                image={
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={prog.imageUrl}
                      alt={prog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                }
                title={prog.title}
                body={prog.description}
                footer={
                  <Link href={prog.ctaHref || "#donate"} className="w-full">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full justify-between transition-all duration-300 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                      iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      {prog.ctaText || "Support Program"}
                    </Button>
                  </Link>
                }
              />
            ))}
          </ScrollReveal>
        ) : (
          // Carousel Layout: > 3 programs
          <div ref={carouselRef} className="overflow-hidden -mx-4 px-4 select-none">
            <motion.div
              ref={innerRef}
              drag="x"
              dragConstraints={{ right: 0, left: -maxScrollWidth }}
              dragElastic={0.15}
              style={{ x }}
              className="flex gap-8 cursor-grab active:cursor-grabbing w-max py-2"
            >
              {programs.map((prog) => (
                <div key={prog.id} className="w-[320px] sm:w-[350px] shrink-0 pointer-events-none select-none">
                  <Card
                    variant="program-card"
                    className="h-full select-none"
                    image={
                      <div className="relative w-full h-full overflow-hidden">
                        <Image
                          src={prog.imageUrl}
                          alt={prog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="350px"
                          draggable={false}
                        />
                      </div>
                    }
                    title={prog.title}
                    body={prog.description}
                    footer={
                      <Link href={prog.ctaHref || "#donate"} className="w-full pointer-events-auto">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full justify-between transition-all duration-300 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                          iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                        >
                          {prog.ctaText || "Support Program"}
                        </Button>
                      </Link>
                    }
                  />
                </div>
              ))}
            </motion.div>
          </div>
        )}

      </Container>
    </Section>
  );
}
