'use client';

import * as React from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

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

  React.useEffect(() => {
    // If not visible, do not start animation yet
    if (!isInView) return;

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
  }, [isInView, value, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
