import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const cardVariants = cva(
  "group relative w-full flex flex-col justify-between overflow-hidden bg-surface border border-border shadow-sm transition-all duration-300",
  {
    variants: {
      variant: {
        'program-card': "rounded-lg hover:shadow-md hover:border-ink/20",
        'news-card': "rounded-b-lg border-t-4 border-t-accent hover:shadow-md hover:border-ink/20",
        'stat-card': "rounded-md p-6 text-center bg-surface-elevated hover:shadow-sm",
        'testimonial-card': "rounded-r-lg border-l-4 border-l-accent p-6 bg-surface-elevated hover:shadow-sm"
      }
    },
    defaultVariants: {
      variant: "program-card"
    }
  }
);

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof cardVariants> {
  image?: React.ReactNode;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, image, eyebrow, title, body, footer, ...props }, ref) => {
    const isStat = variant === 'stat-card';
    const isTestimonial = variant === 'testimonial-card';

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      >
        {/* Render image block for program and news card layouts */}
        {!isStat && !isTestimonial && image && (
          <div className="w-full overflow-hidden aspect-[16/10] bg-surface-elevated border-b border-border shrink-0">
            {image}
          </div>
        )}

        {/* Content details block */}
        <div className={cn(
          "flex-grow flex flex-col justify-between",
          isStat || isTestimonial ? "p-3" : "p-5"
        )}>
          <div className="flex flex-col gap-2">
            {/* Eyebrow Label */}
            {eyebrow && (
              <div className="text-xs uppercase tracking-widest text-accent font-bold">
                {eyebrow}
              </div>
            )}
            
            {/* Main Header / Title Slot */}
            {title && (
              <h3 className={cn(
                "font-serif text-ink mt-0.5",
                isStat ? "text-4xl md:text-5xl font-semibold" : "text-xl font-bold"
              )}>
                {title}
              </h3>
            )}

            {/* Description Body Slot */}
            {body && (
              <div className={cn(
                "text-ink-muted leading-relaxed font-sans",
                isTestimonial ? "italic text-lg text-ink font-sans mt-2" : "text-sm mt-1"
              )}>
                {body}
              </div>
            )}
          </div>

          {/* Action / Context Footer Slot */}
          {footer && (
            <div className={cn(
              "mt-5 shrink-0 flex items-center justify-between border-t border-border pt-4",
              isStat && "justify-center border-t-0 pt-2",
              isTestimonial && "justify-start border-t-0 pt-3 gap-3"
            )}>
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
);
Card.displayName = 'Card';
