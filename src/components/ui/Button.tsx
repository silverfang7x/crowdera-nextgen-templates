import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-sans font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-contrast hover:bg-accent/90 shadow-sm",
        secondary: "bg-surface-elevated text-ink border border-border hover:bg-surface hover:border-ink/30",
        ghost: "bg-transparent text-ink hover:bg-surface-elevated",
        donate: "bg-accent text-accent-contrast border-2 border-ink shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all uppercase tracking-wider"
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-sm gap-1.5",
        md: "h-10 px-5 text-base rounded-md gap-2",
        lg: "h-12 px-8 text-lg rounded-lg gap-3"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconLeft, iconRight, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>}
        {children}
        {iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
      </button>
    );
  }
);
Button.displayName = 'Button';
