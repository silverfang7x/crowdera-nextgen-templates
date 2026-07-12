'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  MapPin, Mail, Phone, ArrowRight, Heart, Check
} from 'lucide-react';
import { Input, Label, ErrorText } from '@/components/ui/FormPrimitives';

export interface FooterProps {
  orgName: string;
  orgTagline?: string;
  contactAddress?: string;
  contactEmail?: string;
  contactPhone?: string;
  newsletterTagline?: string;
}

export function Footer({
  orgName,
  orgTagline = "Sowing resilience, lowering metropolitan temperatures, and restoring urban ecology one micro-forest at a time.",
  contactAddress = "1206 Canopy Way, East Austin, TX 78702",
  contactEmail = "hello@canopyrise.org",
  contactPhone = "+1 (512) 555-0199",
  newsletterTagline = "Stay updated on next planting dates, temperature metrics, and impact achievements.",
}: FooterProps) {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = React.useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email.');
      return;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Invalid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    // Simulate server submission API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Subscribed successfully!');
      setEmail('');
    }, 1200);
  };

  return (
    <footer className="w-full bg-surface-elevated text-ink border-t border-border pt-24 pb-12 font-sans transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-contrast font-bold text-lg select-none">
                {orgName.charAt(0)}
              </span>
              <span className="font-serif text-xl font-bold tracking-tight text-ink">{orgName}</span>
            </Link>
            <p className="text-sm text-ink-muted leading-relaxed">
              {orgTagline}
            </p>
            {/* Social Icons row (Inline SVGs to prevent dependency breaks) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="p-2 bg-surface hover:bg-surface-elevated border border-border text-ink-muted hover:text-accent rounded-md transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2 bg-surface hover:bg-surface-elevated border border-border text-ink-muted hover:text-accent rounded-md transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="p-2 bg-surface hover:bg-surface-elevated border border-border text-ink-muted hover:text-accent rounded-md transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Youtube"
                className="p-2 bg-surface hover:bg-surface-elevated border border-border text-ink-muted hover:text-accent rounded-md transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.033 0 12 0 12s0 3.967.502 5.837a3.002 3.002 0 0 0 2.11 2.107C4.482 20.455 12 20.455 12 20.455s7.518 0 9.388-.511a3.002 3.002 0 0 0 2.11-2.107C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent font-sans">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#about" className="inline-block text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated rounded-sm px-1 -mx-1">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link href="/programs" className="inline-block text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated rounded-sm px-1 -mx-1">
                  Active Programs
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="inline-block text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated rounded-sm px-1 -mx-1">
                  Get Involved / Volunteer
                </Link>
              </li>
              <li>
                <Link href="/donate" className="inline-block text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated rounded-sm px-1 -mx-1">
                  Make a Donation
                </Link>
              </li>
              <li>
                <Link href="/news" className="inline-block text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated rounded-sm px-1 -mx-1">
                  Latest Blog & Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent font-sans">Contact Details</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-ink-muted">{contactAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href={`mailto:${contactEmail}`} className="inline-block text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated rounded-sm px-1 -mx-1">
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href={`tel:${contactPhone}`} className="inline-block text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated rounded-sm px-1 -mx-1">
                  {contactPhone}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Sign-up */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent font-sans">Newsletter Signup</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              {newsletterTagline}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex flex-col gap-1">
                <Label htmlFor="footer-newsletter-email" className="sr-only">Email Address</Label>
                <div className="relative flex items-center w-full">
                  <Input
                    id="footer-newsletter-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    error={status === 'error'}
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full text-xs pr-10 py-2.5 bg-surface border border-border rounded-md text-ink placeholder:text-ink-muted/50 focus:ring-offset-surface-elevated"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    aria-label="Subscribe"
                    className="absolute right-1 p-2 text-accent hover:text-accent/80 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Status Alert Messages */}
              {status === 'success' && (
                <div className="flex items-center gap-1.5 text-xs text-accent font-semibold bg-accent/10 border border-accent/20 rounded p-2 mt-1">
                  <Check className="w-3.5 h-3.5" />
                  <span className="leading-tight">{message}</span>
                </div>
              )}

              {status === 'error' && (
                <ErrorText className="text-xs font-semibold">{message}</ErrorText>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <div>
            © {new Date().getFullYear()} {orgName} Foundation. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="#privacy" className="hover:text-ink transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="#terms" className="hover:text-ink transition-colors">Terms of Service</Link>
            <span>•</span>
            <span className="flex items-center gap-1">
              Registered 501(c)(3) NPO <Heart className="w-3 h-3 text-accent fill-current" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
