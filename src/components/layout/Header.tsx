'use client';

import * as React from 'react';
import Link from 'next/link';
import { useScroll, useMotionValueEvent, motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Search, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderProps {
  orgName: string;
  logoSrc?: string;
  navItems?: NavItem[];
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Get Involved', href: '#volunteer' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
];

export function Header({
  orgName,
  logoSrc,
  navItems = DEFAULT_NAV_ITEMS,
}: HeaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  
  const [isSticky, setIsSticky] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);
  const toggleButtonRef = React.useRef<HTMLButtonElement>(null);

  // Sync scroll state past 80px using Framer Motion scroll hook
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsSticky(latest > 80);
  });

  // Handle Search toggle focus
  const toggleSearch = () => {
    setIsSearchExpanded(prev => {
      const next = !prev;
      if (next) {
        setTimeout(() => searchInputRef.current?.focus(), 150);
      } else {
        setSearchQuery('');
      }
      return next;
    });
  };

  // Keyboard navigation listener (Escape closes search or mobile menu)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        } else if (isSearchExpanded) {
          setIsSearchExpanded(false);
          setSearchQuery('');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, isSearchExpanded]);

  // Lock body scroll when mobile menu is active
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Trap focus inside mobile menu drawer and focus close button on open
  React.useEffect(() => {
    if (!isMobileMenuOpen || !mobileMenuRef.current) return;

    const focusableElements = mobileMenuRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex="0"]'
    );
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTabTrap);

    // Auto-focus Close button inside drawer for accessibility
    const closeBtn = mobileMenuRef.current.querySelector('[aria-label="Close mobile menu"]') as HTMLElement;
    if (closeBtn) {
      closeBtn.focus();
    } else {
      firstElement.focus();
    }

    return () => window.removeEventListener('keydown', handleTabTrap);
  }, [isMobileMenuOpen]);

  // Restore focus to Hamburger Toggle button when mobile menu is closed
  const prevMobileMenuOpen = React.useRef(isMobileMenuOpen);
  React.useEffect(() => {
    if (prevMobileMenuOpen.current && !isMobileMenuOpen) {
      toggleButtonRef.current?.focus();
    }
    prevMobileMenuOpen.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Mock search redirect or action
      console.log(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300",
          isSticky
            ? "bg-surface-elevated/85 backdrop-blur-md border-b border-border shadow-sm py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between gap-4">
          
          {/* Logo Section */}
          <Link 
            href="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm"
          >
            {logoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoSrc} alt={orgName} className="h-8 w-auto object-contain" />
            ) : (
              <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-contrast font-bold text-lg select-none">
                {orgName.charAt(0)}
              </span>
            )}
            <span className="font-serif text-xl font-bold tracking-tight text-ink">
              {orgName}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-3">
            {/* Desktop Inline Search */}
            <div className="relative hidden md:flex items-center">
              <AnimatePresence>
                {isSearchExpanded && (
                  <motion.div
                    initial={shouldReduceMotion ? { opacity: 0 } : { width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { width: 0, opacity: 0 }}
                    className="overflow-hidden mr-2"
                  >
                    <form onSubmit={handleSearchSubmit}>
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search site..."
                        aria-label="Search site"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-surface border border-border text-xs rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-surface text-ink placeholder:text-ink-muted/50 outline-none transition-all duration-200"
                      />
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={toggleSearch}
                aria-label="Toggle search bar"
                className="w-11 h-11 flex items-center justify-center text-ink-muted hover:text-ink rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-surface transition-colors cursor-pointer"
              >
                {isSearchExpanded ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              </button>
            </div>

            {/* Volunteer CTA (lower priority) */}
            <Link href="#volunteer" className="hidden sm:inline-block">
              <Button 
                variant="secondary" 
                size="sm"
                iconLeft={<User className="w-3.5 h-3.5" />}
              >
                Volunteer
              </Button>
            </Link>

            {/* Donate CTA (visually distinct, always visible) */}
            <Link href="#donate" className="relative z-50">
              <Button 
                variant="donate" 
                size="sm"
                iconLeft={<Heart className="w-3.5 h-3.5 fill-current" />}
              >
                Donate
              </Button>
            </Link>

            {/* Mobile Navigation Toggle Button */}
            <button
              ref={toggleButtonRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
              className="w-11 h-11 flex items-center justify-center text-ink md:hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-surface transition-colors cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN MOBILE OVERLAY DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: '100%' }}
            transition={shouldReduceMotion ? { duration: 0.15 } : { type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-0 z-50 w-full h-full bg-surface-elevated/98 backdrop-blur-md flex flex-col justify-between"
          >
            {/* Drawer Header Bar */}
            <div className={cn(
              "w-full flex items-center justify-between gap-4 px-4 transition-all duration-300 border-b border-border/50",
              isSticky ? "py-3 bg-surface-elevated/90" : "py-5 bg-transparent"
            )}>
              {/* Logo section matching the main header */}
              <Link 
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm"
              >
                {logoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoSrc} alt={orgName} className="h-8 w-auto object-contain" />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-contrast font-bold text-lg select-none">
                    {orgName.charAt(0)}
                  </span>
                )}
                <span className="font-serif text-xl font-bold tracking-tight text-ink">
                  {orgName}
                </span>
              </Link>

              {/* Action Area in Drawer Header */}
              <div className="flex items-center gap-3">
                {/* Donate CTA (always visible) */}
                <Link href="#donate" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button 
                    variant="donate" 
                    size="sm"
                    iconLeft={<Heart className="w-3.5 h-3.5 fill-current" />}
                  >
                    Donate
                  </Button>
                </Link>

                {/* Close Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close mobile menu"
                  className="w-11 h-11 flex items-center justify-center text-ink rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-surface transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Scrollable Drawer Content */}
            <div className="flex-grow flex flex-col justify-between py-8 px-6 overflow-y-auto">
              
              {/* Search slot (functional) */}
              <div className="w-full max-w-md mx-auto mb-8">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search initiatives, updates..."
                    aria-label="Search initiatives and updates"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-surface border border-border text-sm rounded-md pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface text-ink outline-none"
                  />
                  <Search className="w-4 h-4 text-ink-muted/50 absolute left-3.5" />
                </form>
              </div>

              {/* Navigation list with staggered animation */}
              <motion.nav 
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
                className="flex-grow flex flex-col justify-center gap-6 text-center max-w-md mx-auto w-full"
                aria-label="Mobile Navigation"
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={{
                      open: { x: 0, opacity: 1 },
                      closed: { x: 50, opacity: 0 }
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-2xl font-serif text-ink hover:text-accent font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Volunteer Button (lower priority) */}
                <motion.div
                  variants={{
                    open: { x: 0, opacity: 1 },
                    closed: { x: 50, opacity: 0 }
                  }}
                  className="mt-6"
                >
                  <Link
                    href="#volunteer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full"
                  >
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="w-full"
                      iconLeft={<User className="w-4 h-4" />}
                    >
                      Volunteer Now
                    </Button>
                  </Link>
                </motion.div>
              </motion.nav>

              {/* Footer indicator inside menu */}
              <div className="text-center text-xs text-ink-muted max-w-md mx-auto w-full border-t border-border/50 pt-6">
                © {new Date().getFullYear()} {orgName} Foundation. NPO License #12-3456789.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
