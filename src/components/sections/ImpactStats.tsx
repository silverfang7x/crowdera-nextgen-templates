'use client';

import * as React from 'react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Section, Container } from '@/components/ui/Section';

export interface StatItem {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  category: string;
  label: string;
}

export interface ImpactStatsProps {
  sectionHeadline?: string;
  sectionSubtitle?: string;
  heroStat?: StatItem;
  supportingStats?: StatItem[];
}

const DEFAULT_HERO_STAT: StatItem = {
  id: "water",
  value: 142500,
  suffix: "+",
  category: "Water Purification",
  label: "Liters of clean, WHO-standard drinking water purified and distributed during severe droughts and post-hurricane crises this year.",
};

const DEFAULT_SUPPORTING_STATS: StatItem[] = [
  {
    id: "deployment",
    value: 38,
    category: "Deployment Reach",
    label: "Emergency response operations active across 12 countries in 2025.",
  },
  {
    id: "volunteers",
    value: 1850,
    suffix: "+",
    category: "Mobilized Force",
    label: "Trained medical and logistical field volunteers ready for instant dispatch.",
  },
  {
    id: "efficiency",
    value: 96,
    suffix: "%",
    category: "Efficiency Score",
    label: "Direct program allocation ensuring minimal operational overhead.",
  },
];

export function ImpactStats({
  sectionHeadline = "Measuring Our Operational Impact",
  sectionSubtitle = "Behind every deployment is a transparent record of metric-driven relief efforts on the frontlines.",
  heroStat = DEFAULT_HERO_STAT,
  supportingStats = DEFAULT_SUPPORTING_STATS,
}: ImpactStatsProps) {
  return (
    <Section padding="lg" background="elevated" id="impact">
      <Container asymmetric className="space-y-12">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left space-y-3">
          <span className="text-xs uppercase tracking-widest text-accent font-bold">
            Real Impact Metrics
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-ink">
            {sectionHeadline}
          </h2>
          <p className="text-base text-ink-muted font-sans leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        {/* Uneven Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Large Hero Stat Card (spans 2 columns on large screens) */}
          <div className="lg:col-span-2 p-8 md:p-12 bg-accent text-accent-contrast rounded-xl shadow-md flex flex-col justify-between min-h-[340px] relative overflow-hidden group">
            {/* Fluid micro-aesthetic backdrop overlay */}
            <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-72 h-72 bg-white/5 rounded-full select-none pointer-events-none group-hover:scale-110 transition-transform duration-500" />
            
            <div className="space-y-2 z-10 relative">
              <span className="text-xs uppercase tracking-widest text-accent-contrast/75 font-bold font-sans">
                {heroStat.category}
              </span>
              <h3 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-none pt-2">
                <AnimatedCounter
                  value={heroStat.value}
                  prefix={heroStat.prefix}
                  suffix={heroStat.suffix}
                  duration={2}
                />
              </h3>
            </div>

            <div className="z-10 relative pt-8 md:pt-0 max-w-lg">
              <p className="text-lg md:text-xl text-accent-contrast/90 font-serif leading-relaxed italic">
                &ldquo;{heroStat.label}&rdquo;
              </p>
            </div>
          </div>

          {/* Supporting Stats Stack (1 column, 3 rows) */}
          <div className="flex flex-col gap-6 justify-between">
            {supportingStats.map((stat) => (
              <div
                key={stat.id}
                className="p-6 bg-surface border border-border hover:border-accent/25 rounded-lg shadow-sm flex flex-col justify-center gap-1.5 transition-all duration-300 group"
              >
                <span className="text-xs uppercase tracking-wider text-accent font-bold font-sans">
                  {stat.category}
                </span>
                <h4 className="text-3xl font-serif font-bold text-ink group-hover:text-accent transition-colors duration-200">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={1.5}
                  />
                </h4>
                <p className="text-xs text-ink-muted leading-relaxed font-sans">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>

      </Container>
    </Section>
  );
}
