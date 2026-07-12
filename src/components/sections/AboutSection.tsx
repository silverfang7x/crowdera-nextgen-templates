'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Droplet, Flame, Eye, Users } from 'lucide-react';
import { FlexibleSection } from './FlexibleSection';

export interface ValueItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface AboutSectionProps {
  headline: string;
  paragraphs: string[];
  quoteText: string;
  quoteAuthor: string;
  quoteAuthorTitle: string;
  imageUrl: string;
  videoUrl?: string;
  values?: ValueItem[];
}

const DEFAULT_VALUES: ValueItem[] = [
  {
    icon: <Flame className="w-5 h-5 text-accent" />,
    title: "Rapid Deployment",
    description: "Emergency teams on the ground in under 24 hours.",
  },
  {
    icon: <Droplet className="w-5 h-5 text-accent" />,
    title: "Clean Water First",
    description: "Installing purification units yielding 10,000L daily.",
  },
  {
    icon: <Eye className="w-5 h-5 text-accent" />,
    title: "Radical Transparency",
    description: "96% of all funding goes directly to field operations.",
  },
  {
    icon: <Users className="w-5 h-5 text-accent" />,
    title: "Community Resilience",
    description: "Training local leaders to maintain systems long-term.",
  },
];

export function AboutSection({
  headline,
  paragraphs,
  quoteText,
  quoteAuthor,
  quoteAuthorTitle,
  imageUrl,
  videoUrl,
  values = DEFAULT_VALUES,
}: AboutSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <FlexibleSection
      id="about"
      layout={videoUrl ? "text-video" : "text-image"}
      align="right"
      eyebrow="Who We Are"
      heading={headline}
      imageUrl={imageUrl}
      videoUrl={videoUrl}
      background="default"
      padding="lg"
      content={
        <div className="space-y-6">
          <div className="space-y-4 text-base text-ink-muted leading-relaxed font-sans">
            {paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
          {/* Stylized Founder Pull-Quote */}
          <div className="relative pl-6 py-2 border-l-4 border-accent bg-surface-elevated/40 rounded-r-md text-left">
            <span className="absolute left-0 top-0 translate-x-2 -translate-y-4 text-7xl font-serif text-accent/15 select-none font-bold">
              “
            </span>
            <p className="text-base md:text-lg font-serif italic text-ink leading-relaxed z-10 relative">
              {quoteText}
            </p>
            <div className="mt-3 text-xs tracking-wide">
              <strong className="text-ink font-semibold">{quoteAuthor}</strong>
              <span className="text-ink-muted"> — {quoteAuthorTitle}</span>
            </div>
          </div>
        </div>
      }
    >
      {/* Core Values Row */}
      <div className="border-t border-border pt-12">
        <div className="mb-6">
          <h3 className="text-xs uppercase tracking-widest text-accent font-bold">
            Our Operational Pillars
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => (
            <motion.div
              key={val.title}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: idx * 0.1 }}
              className="p-5 bg-surface-elevated border border-border/60 hover:border-accent/30 rounded-lg shadow-sm transition-all duration-300 flex flex-col gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-contrast transition-colors duration-300">
                {val.icon}
              </div>
              <div>
                <h4 className="font-sans font-bold text-base text-ink group-hover:text-accent transition-colors duration-200">
                  {val.title}
                </h4>
                <p className="text-xs text-ink-muted leading-relaxed mt-1 font-sans">
                  {val.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </FlexibleSection>
  );
}
