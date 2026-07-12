'use client';

import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Palette, X, Sun, Moon, Check, Sparkles } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useDemoMode } from '@/components/editor/AIContentSuggest';

interface PresetItem {
  id: string;
  name: string;
  desc: string;
  bgHex: string;
  accentHex: string;
}

const PRESETS: PresetItem[] = [
  {
    id: 'disaster-relief',
    name: 'Disaster Relief',
    desc: 'High-Visibility Emergency Red',
    bgHex: '#ffffff',
    accentHex: '#eb1e1e',
  },
  {
    id: 'humanitarian',
    name: 'Humanitarian',
    desc: 'Grassroots terracotta & warm ink',
    bgHex: '#fcfaf7',
    accentHex: '#bf3e21',
  },
  {
    id: 'environment',
    name: 'Climate & Wildlife',
    desc: 'Forest moss green & charcoal',
    bgHex: '#fdfdf8',
    accentHex: '#2b613e',
  },
  {
    id: 'healthcare',
    name: 'Medical Staging',
    desc: 'Clinical trust blue & slate',
    bgHex: '#f9fbfe',
    accentHex: '#145ee2',
  },
  {
    id: 'animal-welfare',
    name: 'Peacebuilding',
    desc: 'Warm golden amber mutual aid',
    bgHex: '#fefdf9',
    accentHex: '#a8500e',
  },
];

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activePreset, setActivePreset] = React.useState('disaster-relief');
  const [mounted, setMounted] = React.useState(false);
  
  const { theme, setTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const lastActiveElementRef = React.useRef<HTMLElement | null>(null);
  const { demoMode, toggleDemoMode } = useDemoMode();

  // Sync preset from localStorage on client mount
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      const savedPreset = localStorage.getItem('npo-theme-preset') || 'disaster-relief';
      setActivePreset(savedPreset);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Keyboard navigation & accessibility focus trap when drawer open
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        lastActiveElementRef.current?.focus();
        return;
      }

      if (e.key === 'Tab') {
        if (!drawerRef.current) return;
        const focusables = drawerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex="0"]'
        );
        if (focusables.length === 0) return;

        const first = focusables[0] as HTMLElement;
        const last = focusables[focusables.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!mounted) return null;

  const handleOpen = () => {
    lastActiveElementRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
  };

  // Preset Switcher with smooth transition
  const applyPreset = (presetId: string) => {
    document.documentElement.classList.add('theme-transitioning');
    setActivePreset(presetId);
    localStorage.setItem('npo-theme-preset', presetId);
    document.documentElement.setAttribute('data-theme', presetId);

    // Sync any on-page presets console state if exists (dispatch custom event)
    window.dispatchEvent(new CustomEvent('npo-preset-change', { detail: presetId }));

    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 400);
  };

  // Dark/Light Mode Switcher with smooth transition
  const applyThemeMode = (mode: 'light' | 'dark') => {
    document.documentElement.classList.add('theme-transitioning');
    setTheme(mode);
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 400);
  };

  return (
    <>
      {/* Floating Theme Customizer Button */}
      <button
        onClick={handleOpen}
        aria-label="Open design customizer panel"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center bg-accent text-accent-contrast rounded-full shadow-lg hover:scale-110 active:scale-95 border border-border/20 transition-all cursor-pointer group"
      >
        <Palette className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black cursor-pointer"
            />

            {/* Customizer Drawer */}
            <motion.div
              ref={drawerRef}
              initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={shouldReduceMotion ? { duration: 0.15 } : { type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-surface-elevated border-l border-border flex flex-col shadow-2xl overflow-hidden text-ink"
            >
              {/* Header Bar */}
              <div className="p-4 border-b border-border flex items-center justify-between bg-surface">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-accent" />
                  <h2 className="font-serif text-lg font-bold tracking-tight">Theme Customizer</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close customizer"
                  className="w-9 h-9 flex items-center justify-center hover:bg-surface-elevated text-ink-muted hover:text-ink rounded-md transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-grow p-6 overflow-y-auto space-y-8 select-none">
                
                {/* 1. Theme Presets Selector */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-sans font-bold text-sm text-ink uppercase tracking-wider">Cause-Based Presets</h3>
                    <p className="text-3xs text-ink-muted leading-normal mt-1">Switch dynamic design tokens for NPO verticals.</p>
                  </div>
                  
                  <div className="space-y-3">
                    {PRESETS.map((preset) => {
                      const isActive = preset.id === activePreset;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => applyPreset(preset.id)}
                          className={cn(
                            "w-full flex items-center gap-4 p-3.5 rounded-lg border text-left transition-all duration-200 cursor-pointer select-none",
                            isActive 
                              ? "border-accent bg-surface shadow-sm ring-1 ring-accent/25" 
                              : "border-border/60 bg-surface/30 hover:border-border hover:bg-surface/75"
                          )}
                        >
                          {/* Mini Preview Circle */}
                          <div 
                            style={{ backgroundColor: preset.bgHex, borderColor: preset.accentHex }}
                            className="w-7 h-7 rounded-full border-3 flex items-center justify-center shrink-0 shadow-inner"
                          >
                            <div 
                              style={{ backgroundColor: preset.accentHex }}
                              className="w-2.5 h-2.5 rounded-full"
                            />
                          </div>

                          <div className="flex-grow min-w-0">
                            <h4 className="font-sans font-bold text-xs text-ink leading-tight flex items-center justify-between">
                              {preset.name}
                              {isActive && <Check className="w-3.5 h-3.5 text-accent shrink-0" />}
                            </h4>
                            <p className="text-3xs text-ink-muted leading-tight mt-0.5 truncate">{preset.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Light / Dark Mode Toggle */}
                <div className="space-y-4 pt-4 border-t border-border/60">
                  <div>
                    <h3 className="font-sans font-bold text-sm text-ink uppercase tracking-wider">Appearance Mode</h3>
                    <p className="text-3xs text-ink-muted leading-normal mt-1">Toggle light/dark canvas mode styles.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => applyThemeMode('light')}
                      className={cn(
                        "flex flex-col items-center gap-2 p-3 rounded-lg border cursor-pointer select-none transition-all duration-200 font-sans text-xs",
                        theme === 'light'
                          ? "border-accent bg-surface shadow-sm ring-1 ring-accent/25 font-bold"
                          : "border-border/60 bg-surface/30 hover:border-border hover:bg-surface/75"
                      )}
                    >
                      <Sun className="w-4 h-4 text-accent" />
                      <span className="text-3xs">Light Mode</span>
                    </button>
                    <button
                      onClick={() => applyThemeMode('dark')}
                      className={cn(
                        "flex flex-col items-center gap-2 p-3 rounded-lg border cursor-pointer select-none transition-all duration-200 font-sans text-xs",
                        theme === 'dark'
                          ? "border-accent bg-surface shadow-sm ring-1 ring-accent/25 font-bold"
                          : "border-border/60 bg-surface/30 hover:border-border hover:bg-surface/75"
                      )}
                    >
                      <Moon className="w-4 h-4 text-accent" />
                      <span className="text-3xs">Dark Mode</span>
                    </button>
                  </div>
                </div>

                {/* 3. Demo Mode Toggle */}
                <div className="space-y-4 pt-6 border-t border-border/60">
                  <div>
                    <h3 className="font-sans font-bold text-sm text-ink uppercase tracking-wider">Demo Mode Sandbox</h3>
                    <p className="text-3xs text-ink-muted leading-normal mt-1">Enable builder helpers for testing template editing.</p>
                  </div>

                  <button
                    onClick={toggleDemoMode}
                    className={cn(
                      "w-full flex items-center justify-between p-3.5 rounded-lg border cursor-pointer select-none transition-all duration-200 font-sans",
                      demoMode
                        ? "border-accent bg-surface shadow-sm ring-1 ring-accent/25"
                        : "border-border/60 bg-surface/30 hover:border-border hover:bg-surface/75"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className={cn("w-4 h-4", demoMode ? "text-accent" : "text-ink-muted")} />
                      <div className="text-left">
                        <span className="block text-3xs font-bold text-ink">AI Content Assist</span>
                        <span className="block text-4xs text-ink-muted mt-0.5 font-sans">Show sparkles next to copy blocks</span>
                      </div>
                    </div>
                    {/* Toggle Switch Pill */}
                    <div className={cn(
                      "w-8 h-4 rounded-full p-0.5 transition-colors duration-200 shrink-0",
                      demoMode ? "bg-accent" : "bg-border"
                    )}>
                      <div className={cn(
                        "w-3 h-3 rounded-full bg-white transition-transform duration-200",
                        demoMode ? "translate-x-4" : "translate-x-0"
                      )} />
                    </div>
                  </button>
                </div>
              </div>

              {/* Drawer Footer Information */}
              <div className="p-4 border-t border-border bg-surface text-center">
                <span className="text-3xs font-semibold uppercase tracking-widest text-ink-muted/50 font-sans">
                  Crowdera NextGen NPOs
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
