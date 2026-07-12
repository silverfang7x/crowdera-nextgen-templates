'use client';

import * as React from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AIContentSuggestProps {
  sectionKey: string;
  onSelect: (newText: string) => void;
  className?: string;
}

// Hardcoded alternative copy suggestions dataset keyed by sectionKey
const SUGGESTIONS_MAP: Record<string, Array<{ tone: string; text: string }>> = {
  'hero-headline': [
    {
      tone: 'Warm & Personal',
      text: 'Standing Together with Families in Crisis',
    },
    {
      tone: 'Formal & Data-Driven',
      text: 'Deploying 140,000L of WHO-Grade Clean Water Annually',
    },
    {
      tone: 'Urgent & Direct',
      text: 'Disaster Relief Staged and Deployed in 24 Hours',
    },
  ],
  'hero-mission': [
    {
      tone: 'Warm & Personal',
      text: 'We are neighbors helping neighbors. When hurricanes, floods, or conflicts strike, Clearwater Relief is on the ground immediately to deliver safe drinking water and nursing triage.',
    },
    {
      tone: 'Formal & Data-Driven',
      text: 'Clearwater Relief Trust is a registered 501(c)(3) NPO. We deploy mobile purification systems and emergency medical cargo to disaster zones, maintaining a 96% direct staging funding ratio.',
    },
    {
      tone: 'Urgent & Direct',
      text: 'Infrastructure collapses in seconds. Our staging hubs dispatch modular water purification kits and trauma kits within the first critical 72 hours of landfall.',
    },
  ],
  'about-headline': [
    {
      tone: 'Warm & Personal',
      text: 'Restoring Clean Water and Medical Hope for Displaced Families',
    },
    {
      tone: 'Formal & Data-Driven',
      text: 'Fulfilling WHO Water Purification Standards Across 12 Countries',
    },
    {
      tone: 'Urgent & Direct',
      text: 'Immediate Field Dispatch Bypassing Local Grid Collapse',
    },
  ],
  'program-water-desc': [
    {
      tone: 'Warm & Personal',
      text: 'Our teams bring clean water and reassurance directly to schools and shelters, making sure kids stay safe after storm waters rise.',
    },
    {
      tone: 'Formal & Data-Driven',
      text: 'Installing modular gravity-powered purification lines within 24 hours to output WHO-grade safe drinking water.',
    },
    {
      tone: 'Urgent & Direct',
      text: 'Deploying high-yield filtration kits instantly to secure disaster zones and prevent waterborne outbreaks.',
    },
  ],
  'testimonial-1-quote': [
    {
      tone: 'Warm & Personal',
      text: '“When the storm hit, we had no electricity or clear tap water. Clearwater\'s gravity filter was running within three hours, saving our community.”',
    },
    {
      tone: 'Formal & Data-Driven',
      text: '“Clearwater\'s response time was measured at under 18 hours. They installed three gravity lines yielding 30,000 liters daily.”',
    },
    {
      tone: 'Urgent & Direct',
      text: '“No bureaucracy. They arrived, set up the sanitation kits immediately, and secured safe drinking water for our clinics.”',
    },
  ],
};

export function useDemoMode() {
  const [demoMode, setDemoMode] = React.useState(false);

  React.useEffect(() => {
    const checkMode = () => {
      const mode = localStorage.getItem('npo-demo-mode') === 'true';
      setDemoMode(mode);
    };

    checkMode();
    window.addEventListener('npo-demo-mode-changed', checkMode);
    return () => window.removeEventListener('npo-demo-mode-changed', checkMode);
  }, []);

  const toggleDemoMode = () => {
    const nextVal = !demoMode;
    localStorage.setItem('npo-demo-mode', String(nextVal));
    setDemoMode(nextVal);
    window.dispatchEvent(new Event('npo-demo-mode-changed'));
  };

  return { demoMode, toggleDemoMode };
}

export function AIContentSuggest({ sectionKey, onSelect, className }: AIContentSuggestProps) {
  const { demoMode } = useDemoMode();
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const suggestions = SUGGESTIONS_MAP[sectionKey] || [];

  // Close popover on click outside
  React.useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!demoMode || suggestions.length === 0) return null;

  return (
    <div ref={containerRef} className={cn("relative inline-block ml-2 select-none", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-7 h-7 flex items-center justify-center rounded-full bg-accent/10 hover:bg-accent text-accent hover:text-accent-contrast transition-colors cursor-pointer border border-accent/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-sm"
        aria-label="Ask AI for copy suggestions"
        title="AI Copy Assist suggestions"
      >
        <Sparkles className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 z-40 w-72 p-4 bg-surface-elevated border border-border shadow-lg rounded-xl space-y-3 animate-fade-in text-left">
          <div className="flex items-center gap-1.5 text-2xs uppercase tracking-wider text-accent font-bold font-sans">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Content Assist</span>
          </div>

          <div className="space-y-2">
            {suggestions.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSelect(sug.text);
                  setIsOpen(false);
                }}
                className="w-full p-2.5 rounded-lg border border-border bg-surface text-xs text-ink hover:border-accent hover:bg-accent/5 text-left transition-colors font-sans flex flex-col gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                  {sug.tone}
                </span>
                <span className="leading-relaxed line-clamp-3 text-ink-muted group-hover:text-ink">
                  {sug.text}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 text-[10px] text-ink-muted border-t border-border/40 pt-2 font-sans font-semibold">
            <AlertCircle className="w-3 h-3 text-accent" />
            <span>AI-suggested copy — review before publishing</span>
          </div>
        </div>
      )}
    </div>
  );
}
