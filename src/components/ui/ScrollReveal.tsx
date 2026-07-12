'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  staggerChildren?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  yOffset = 24,
  staggerChildren,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, render static layout instantly without wrapper delays
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren || 0.12,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  // Stagger wrapper mode: maps children into animated motion wrappers
  if (staggerChildren !== undefined) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
        className={className}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return (
              <motion.div variants={itemVariants} className="h-full">
                {child}
              </motion.div>
            );
          }
          return child;
        })}
      </motion.div>
    );
  }

  // Single element mode
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
