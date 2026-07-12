'use client';

import * as React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { Section, Container } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export interface CtaSectionProps {
  headline?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export function CtaSection({
  headline = "Help Us Restore Hope and Clean Water to Families in Crisis",
  description = "Every second counts in a disaster zone. Your tax-deductible support allows our rapid response teams to set up gravity-powered filtration lines and medical hubs immediately when disaster strikes.",
  primaryCtaText = "Donate Now",
  primaryCtaHref = "/donate",
  secondaryCtaText = "Join Us as a Volunteer",
  secondaryCtaHref = "/volunteer",
}: CtaSectionProps) {
  return (
    <Section padding="xl" background="accent" className="relative overflow-hidden z-10 shadow-inner" id="cta-action">
      {/* Decorative background fluid blur shape */}
      <div className="absolute right-0 bottom-0 translate-x-20 translate-y-20 w-[450px] h-[450px] bg-white/5 rounded-full blur-3xl select-none pointer-events-none" />
      <div className="absolute left-0 top-0 -translate-x-20 -translate-y-20 w-[350px] h-[350px] bg-black/10 rounded-full blur-3xl select-none pointer-events-none" />

      <Container className="text-center space-y-8 relative z-10 max-w-3xl">
        
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-widest text-accent-contrast/80 font-bold font-sans">
            Make A Direct Impact Today
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-accent-contrast tracking-tight leading-tight">
            {headline}
          </h2>
          <p className="text-base md:text-lg text-accent-contrast/90 max-w-2xl mx-auto leading-relaxed font-sans font-light">
            {description}
          </p>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
          <Link href={primaryCtaHref}>
            <Button
              size="lg"
              className="bg-surface text-ink hover:bg-surface-elevated border-none font-bold uppercase tracking-wider px-8 py-3 rounded-lg shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all gap-2"
              iconLeft={<Heart className="w-4 h-4 fill-accent text-accent" />}
            >
              {primaryCtaText}
            </Button>
          </Link>

          <Link
            href={secondaryCtaHref}
            className="text-accent-contrast/85 hover:text-accent-contrast font-bold tracking-wide uppercase text-sm flex items-center gap-1.5 transition-all group/link"
          >
            <span>{secondaryCtaText}</span>
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>

      </Container>
    </Section>
  );
}
