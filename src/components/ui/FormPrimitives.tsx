import * as React from 'react';
import { cn } from '@/lib/utils';

// 1. LABEL
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn("block text-sm font-semibold text-ink select-none cursor-pointer mb-1.5", className)}
        {...props}
      >
        {children}
        {required && <span className="text-accent ml-1" aria-hidden="true">*</span>}
      </label>
    );
  }
);
Label.displayName = 'Label';

// 2. INPUT
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full bg-surface border rounded-md px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 transition-all duration-200 outline-none",
          "focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface",
          error ? "border-red-500 focus:ring-red-500" : "border-border focus:border-accent/50",
          "disabled:opacity-50 disabled:pointer-events-none",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

// 3. TEXTAREA
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full min-h-[100px] bg-surface border rounded-md px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 transition-all duration-200 outline-none resize-y",
          "focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface",
          error ? "border-red-500 focus:ring-red-500" : "border-border focus:border-accent/50",
          "disabled:opacity-50 disabled:pointer-events-none",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

// 4. SELECT
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full bg-surface border rounded-md px-4 py-2.5 text-sm text-ink transition-all duration-200 outline-none appearance-none cursor-pointer",
          "focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface",
          error ? "border-red-500 focus:ring-red-500" : "border-border focus:border-accent/50",
          "disabled:opacity-50 disabled:pointer-events-none",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';

// 5. HELPER TEXT
export const HelperText = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-xs text-ink-muted mt-1.5 leading-none", className)}
        {...props}
      />
    );
  }
);
HelperText.displayName = 'HelperText';

// 6. ERROR TEXT
export const ErrorText = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-xs text-red-500 font-semibold mt-1.5 leading-none", className)}
        role="alert"
        {...props}
      />
    );
  }
);
ErrorText.displayName = 'ErrorText';
