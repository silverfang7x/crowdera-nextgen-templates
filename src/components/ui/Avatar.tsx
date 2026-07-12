import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full bg-surface-elevated border border-border select-none",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-12 w-12 text-sm",
        lg: "h-16 w-16 text-base"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
}

export function Avatar({ className, size, src, alt, fallback, ...props }: AvatarProps) {
  const [hasError, setHasError] = React.useState(false);

  const [prevSrc, setPrevSrc] = React.useState(src);
  if (src !== prevSrc) {
    setPrevSrc(src);
    setHasError(false);
  }

  return (
    <div
      className={cn(avatarVariants({ size, className }))}
      {...props}
    >
      {src && !hasError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt || "User Profile"}
          className="h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-accent/15 text-accent font-bold uppercase tracking-wider font-sans">
          {fallback || alt?.substring(0, 2) || "NP"}
        </div>
      )}
    </div>
  );
}
