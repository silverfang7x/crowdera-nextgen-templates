'use client';

import * as React from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1.5,
  prefix = "",
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = React.useState("0");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  React.useEffect(() => {
    if (!mounted || !isInView) return;

    // Immediately show final formatted value if user prefers reduced motion
    if (shouldReduceMotion) {
      const frame = requestAnimationFrame(() => {
        setDisplayValue(value.toLocaleString());
      });
      return () => cancelAnimationFrame(frame);
    }

    // Execute standard numeric animation
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.floor(latest).toLocaleString());
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration, shouldReduceMotion, mounted]);

  if (!mounted) {
    return (
      <span className={cn("inline-block h-[1em] min-w-[3rem] bg-border/40 animate-pulse rounded-sm", className)}>
        &nbsp;
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
