import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold font-sans transition-all duration-200 select-none",
  {
    variants: {
      variant: {
        default: "border-accent/20 bg-accent/10 text-accent hover:bg-accent/20",
        active: "border-transparent bg-accent text-accent-contrast shadow-sm",
        outline: "border-border bg-transparent text-ink-muted hover:bg-surface-elevated"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
