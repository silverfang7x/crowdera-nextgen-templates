import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// 1. SECTION PRIMITIVE
export const sectionVariants = cva(
  "w-full transition-colors duration-200",
  {
    variants: {
      padding: {
        none: "py-0",
        sm: "py-8",        /* 32px (8) */
        md: "py-16",       /* 64px (16) */
        lg: "py-24",       /* 96px (24) */
        xl: "py-32",       /* 128px (32) */
        '2xl': "py-40"     /* 160px (40) */
      },
      background: {
        default: "bg-surface text-ink",
        elevated: "bg-surface-elevated text-ink",
        accent: "bg-accent text-accent-contrast"
      }
    },
    defaultVariants: {
      padding: "md",
      background: "default"
    }
  }
);

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: React.ElementType;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, padding, background, as: Component = "section", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(sectionVariants({ padding, background, className }))}
        {...props}
      />
    );
  }
);
Section.displayName = 'Section';

// 2. CONTAINER PRIMITIVE
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  asymmetric?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, asymmetric = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full px-4",
          asymmetric 
            ? "pl-4 pr-4 md:pl-[15%] md:pr-8" 
            : "max-w-4xl mx-auto",
          className
        )}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';
