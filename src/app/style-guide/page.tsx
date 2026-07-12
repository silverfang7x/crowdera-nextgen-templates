'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { 
  Palette, Sun, Moon, Check, Heart, ArrowRight, 
  Mail, AlertCircle, Sparkles, 
  Calendar, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Label, Input, Textarea, Select, HelperText, ErrorText } from '@/components/ui/FormPrimitives';
import { Avatar } from '@/components/ui/Avatar';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Section, Container } from '@/components/ui/Section';

const PRESETS = [
  { id: 'humanitarian', name: 'Humanitarian', desc: 'Terracotta & Ink', color: '#d24c2d' },
  { id: 'environment', name: 'Environment', desc: 'Forest Moss & Clay', color: '#25733b' },
  { id: 'healthcare', name: 'Healthcare', desc: 'Trust Blue & Soft White', color: '#1463e1' },
  { id: 'animal-welfare', name: 'Animal Welfare', desc: 'Amber & Charcoal', color: '#e59419' },
  { id: 'disaster-relief', name: 'Disaster Relief', desc: 'Emergency Red & Graphite', color: '#d91d1d' },
];

export default function StyleGuidePage() {
  const { theme, setTheme } = useTheme();
  const [activePreset, setActivePreset] = useState<string>('humanitarian');
  const [mounted, setMounted] = useState(false);
  
  // Form state mock
  const [formInput, setFormInput] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSelect, setFormSelect] = useState('one-time');
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      const savedPreset = localStorage.getItem('npo-theme-preset') || 'humanitarian';
      setActivePreset(savedPreset);
      document.documentElement.setAttribute('data-theme', savedPreset);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const handlePresetChange = (presetId: string) => {
    setActivePreset(presetId);
    localStorage.setItem('npo-theme-preset', presetId);
    document.documentElement.setAttribute('data-theme', presetId);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface text-ink-muted">
        <div className="flex items-center gap-2 animate-pulse">
          <Palette className="w-5 h-5" />
          <span className="font-sans text-base">Loading Style Guide Engine...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-ink transition-colors duration-300 pb-32">
      {/* 1. STICKY DOCK CONTROLLER */}
      <div className="sticky top-0 z-50 w-full bg-surface-elevated/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-accent" />
            <span className="font-semibold text-sm hidden sm:inline">Active Theme Preset:</span>
            <select
              value={activePreset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="bg-surface border border-border text-xs rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-surface font-sans"
            >
              {PRESETS.map((p) => (
                <option key={p.id} value={p.id}>{p.name} Theme</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-ink-muted hidden md:inline">Mode Switcher:</span>
            <button
              onClick={() => setTheme('light')}
              className={`p-2 rounded-md border transition-all text-xs flex items-center gap-1.5 ${
                theme === 'light' ? 'bg-surface border-accent text-accent' : 'bg-surface/50 border-border text-ink-muted hover:bg-surface'
              }`}
              title="Light Mode"
            >
              <Sun className="w-3.5 h-3.5" />
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-2 rounded-md border transition-all text-xs flex items-center gap-1.5 ${
                theme === 'dark' ? 'bg-surface border-accent text-accent' : 'bg-surface/50 border-border text-ink-muted hover:bg-surface'
              }`}
              title="Dark Mode"
            >
              <Moon className="w-3.5 h-3.5" />
              Dark
            </button>
          </div>
        </div>
      </div>

      {/* 2. STYLE GUIDE INTRO */}
      <Section padding="lg" background="elevated">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-2">NPO NextGen Design System</Badge>
            <h1 className="text-4xl md:text-5xl font-semibold mb-3">Style Guide & Visual Deliverable</h1>
            <p className="text-base md:text-lg text-ink-muted">
              Welcome to the component design system sandbox. This page renders all UI primitives, variants, sizes, layouts, and accessibility focus rings, responsive to active preset and dark mode overrides.
            </p>
          </div>
        </Container>
      </Section>

      {/* 3. DESIGN TOKENS IN ACTION */}
      <Section padding="md">
        <Container>
          <div className="border-b border-border pb-3 mb-8">
            <h2 className="text-2xl font-serif">1. Design System Tokens</h2>
            <p className="text-xs text-ink-muted">Verifying font modular scale, radius curves, and shadow depths.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Radius demo */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-accent">Radius Tokens</h3>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-4 bg-surface-elevated border border-border rounded-sm font-mono">
                  sm (4px)
                </div>
                <div className="p-4 bg-surface-elevated border border-border rounded-md font-mono">
                  md (8px)
                </div>
                <div className="p-4 bg-surface-elevated border border-border rounded-lg font-mono col-span-2">
                  lg (16px)
                </div>
              </div>
            </div>

            {/* Shadow demo */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-accent">Shadow Mappings</h3>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-surface shadow-sm border border-border/20 rounded-md font-mono">
                  shadow-sm (cards)
                </div>
                <div className="p-2 bg-surface shadow-md border border-border/10 rounded-md font-mono">
                  shadow-md (donations)
                </div>
                <div className="p-2 bg-surface shadow-lg border border-border/10 rounded-md font-mono">
                  shadow-lg (modals)
                </div>
              </div>
            </div>

            {/* Scale sizes */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-accent">Spacing Constants</h3>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2 py-1 bg-surface-elevated border border-border rounded">0.5 = 2px</span>
                <span className="px-2 py-1 bg-surface-elevated border border-border rounded">1 = 4px</span>
                <span className="px-2 py-1 bg-surface-elevated border border-border rounded">2 = 8px</span>
                <span className="px-2 py-1 bg-surface-elevated border border-border rounded">4 = 16px</span>
                <span className="px-2 py-1 bg-surface-elevated border border-border rounded">6 = 24px</span>
                <span className="px-2 py-1 bg-surface-elevated border border-border rounded">24 = 96px</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. BUTTON VARIANT MATRIX */}
      <Section padding="md">
        <Container>
          <div className="border-b border-border pb-3 mb-8">
            <h2 className="text-2xl font-serif">2. Button Components</h2>
            <p className="text-xs text-ink-muted">Testing all variants, sizing states, and icon configurations.</p>
          </div>

          <div className="space-y-6">
            {/* Sizing & Variants matrix */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 font-semibold w-1/5">Variant</th>
                    <th className="pb-3 font-semibold">Small (`sm`)</th>
                    <th className="pb-3 font-semibold">Medium (`md`)</th>
                    <th className="pb-3 font-semibold">Large (`lg`)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  <tr>
                    <td className="py-4 font-mono font-semibold text-xs">primary</td>
                    <td className="py-4"><Button variant="primary" size="sm">Primary</Button></td>
                    <td className="py-4"><Button variant="primary" size="md">Primary</Button></td>
                    <td className="py-4"><Button variant="primary" size="lg">Primary</Button></td>
                  </tr>
                  <tr>
                    <td className="py-4 font-mono font-semibold text-xs">secondary</td>
                    <td className="py-4"><Button variant="secondary" size="sm">Secondary</Button></td>
                    <td className="py-4"><Button variant="secondary" size="md">Secondary</Button></td>
                    <td className="py-4"><Button variant="secondary" size="lg">Secondary</Button></td>
                  </tr>
                  <tr>
                    <td className="py-4 font-mono font-semibold text-xs">ghost</td>
                    <td className="py-4"><Button variant="ghost" size="sm">Ghost Button</Button></td>
                    <td className="py-4"><Button variant="ghost" size="md">Ghost Button</Button></td>
                    <td className="py-4"><Button variant="ghost" size="lg">Ghost Button</Button></td>
                  </tr>
                  <tr>
                    <td className="py-4 font-mono font-semibold text-xs text-accent">donate</td>
                    <td className="py-4"><Button variant="donate" size="sm" iconLeft={<Heart className="w-3.5 h-3.5 fill-current" />}>Donate</Button></td>
                    <td className="py-4"><Button variant="donate" size="md" iconLeft={<Heart className="w-4 h-4 fill-current" />}>Donate Now</Button></td>
                    <td className="py-4"><Button variant="donate" size="lg" iconLeft={<Heart className="w-5 h-5 fill-current" />}>Give Monthly</Button></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Icon positioning */}
            <div className="p-4 bg-surface-elevated border border-border rounded-md">
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-3">Icon Positioning Details</h3>
              <div className="flex flex-wrap gap-3">
                <Button iconLeft={<Mail className="w-4 h-4" />}>Left Icon</Button>
                <Button iconRight={<ArrowRight className="w-4 h-4" />}>Right Icon</Button>
                <Button iconLeft={<Sparkles className="w-4 h-4" />} iconRight={<Check className="w-4 h-4" />}>Double Icon</Button>
                <Button variant="secondary" disabled>Disabled State</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. BADGES & CATEGORIES */}
      <Section padding="md">
        <Container>
          <div className="border-b border-border pb-3 mb-8">
            <h2 className="text-2xl font-serif">3. Badge & Category Tags</h2>
            <p className="text-xs text-ink-muted">Small tag indicators for programs, status updates, or metadata labels.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="space-y-1">
              <div className="text-xs text-ink-muted">Default (`default`)</div>
              <Badge variant="default">Active Program</Badge>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-ink-muted">Active (`active`)</div>
              <Badge variant="active">Featured</Badge>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-ink-muted">Outline (`outline`)</div>
              <Badge variant="outline">Completed 2026</Badge>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. FORM PRIMITIVES (FOCUS INDICATORS & ACCESSIBILITY) */}
      <Section padding="md">
        <Container>
          <div className="border-b border-border pb-3 mb-8">
            <h2 className="text-2xl font-serif">4. Form Primitives & Accessibility</h2>
            <p className="text-xs text-ink-muted">
              Form controls with helper text, error handling, and high-visibility focus offset rings (Tab into controls to test).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sandbox form elements */}
            <div className="space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-accent mb-1">Interactive Elements</h3>
              
              <div>
                <Label htmlFor="sandbox-name" required>Supporter Name</Label>
                <Input 
                  id="sandbox-name" 
                  value={formInput} 
                  onChange={(e) => setFormInput(e.target.value)}
                  placeholder="e.g. Jane Doe" 
                />
                <HelperText>Enter your full legal name for taxonomic receipt logs.</HelperText>
              </div>

              <div>
                <Label htmlFor="sandbox-donation">Donation Level</Label>
                <Select 
                  id="sandbox-donation"
                  value={formSelect}
                  onChange={(e) => setFormSelect(e.target.value)}
                >
                  <option value="one-time">One-time Support</option>
                  <option value="monthly">Monthly Sustainer</option>
                  <option value="corporate">Corporate Partner Tier</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="sandbox-msg">Supporter Comment</Label>
                <Textarea 
                  id="sandbox-msg" 
                  placeholder="Why do you support CanopyRise?"
                />
              </div>
            </div>

            {/* Error states and testing switches */}
            <div className="space-y-5 bg-surface-elevated p-6 rounded-lg border border-border flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-ink mb-1">State Validation Tester</h3>
                <p className="text-xs text-ink-muted mb-4">Click button to switch inputs between standard and error states.</p>
                
                <div>
                  <Label htmlFor="sandbox-email" required>Billing Email Address</Label>
                  <Input 
                    id="sandbox-email"
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    error={formError}
                    placeholder="e.g. support@canopyrise.org" 
                  />
                  {formError ? (
                    <ErrorText id="email-error">
                      <AlertCircle className="inline w-3 h-3 mr-1" />
                      Please enter a valid billing email address.
                    </ErrorText>
                  ) : (
                    <HelperText>We will never share your private email.</HelperText>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-border mt-6">
                <Button 
                  onClick={() => setFormError(!formError)} 
                  variant="secondary"
                  size="sm"
                  className="w-full"
                >
                  Toggle Form Error State
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. AVATAR VARIANTS */}
      <Section padding="md">
        <Container>
          <div className="border-b border-border pb-3 mb-8">
            <h2 className="text-2xl font-serif">5. Avatar Primitives</h2>
            <p className="text-xs text-ink-muted">Circular photo nodes used inside testimonials and author credits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Source success */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-accent">Active Profile Photo (`src` load success)</h3>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <Avatar size="sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Jane" />
                  <div className="text-2xs text-ink-muted mt-1">sm (32px)</div>
                </div>
                <div className="text-center">
                  <Avatar size="md" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Jane" />
                  <div className="text-2xs text-ink-muted mt-1">md (48px)</div>
                </div>
                <div className="text-center">
                  <Avatar size="lg" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Jane" />
                  <div className="text-2xs text-ink-muted mt-1">lg (64px)</div>
                </div>
              </div>
            </div>

            {/* Error fallbacks */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-accent">Initials Fallbacks (invalid `src` or missing photo)</h3>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <Avatar size="sm" fallback="JD" alt="John Doe" />
                  <div className="text-2xs text-ink-muted mt-1">sm (JD)</div>
                </div>
                <div className="text-center">
                  <Avatar size="md" fallback="MV" alt="Marcus Vance" />
                  <div className="text-2xs text-ink-muted mt-1">md (MV)</div>
                </div>
                <div className="text-center">
                  <Avatar size="lg" fallback="CR" alt="Clearwater Relief" />
                  <div className="text-2xs text-ink-muted mt-1">lg (CR)</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. ANIMATED COUNTER (INTERACTION & ACCESSIBILITY) */}
      <Section padding="md">
        <Container>
          <div className="border-b border-border pb-3 mb-8">
            <h2 className="text-2xl font-serif">6. Animated Impact Counters</h2>
            <p className="text-xs text-ink-muted">Dynamic statistics that animate on view and format numbers with commas.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-surface-elevated border border-border p-6 rounded-md">
              <span className="block text-2xs uppercase tracking-widest text-ink-muted">Trees Planted</span>
              <AnimatedCounter value={12450} suffix=" +" className="text-3xl font-serif font-bold text-accent block mt-1" />
            </div>
            <div className="bg-surface-elevated border border-border p-6 rounded-md">
              <span className="block text-2xs uppercase tracking-widest text-ink-muted">Funds Allocated</span>
              <AnimatedCounter value={85200} prefix="$ " className="text-3xl font-serif font-bold text-accent block mt-1" />
            </div>
            <div className="bg-surface-elevated border border-border p-6 rounded-md">
              <span className="block text-2xs uppercase tracking-widest text-ink-muted">Total Volunteers</span>
              <AnimatedCounter value={1820} className="text-3xl font-serif font-bold text-accent block mt-1" />
            </div>
          </div>
        </Container>
      </Section>

      {/* 9. CARD PRIMITIVES (SLOT COMPOSITION) */}
      <Section padding="md">
        <Container>
          <div className="border-b border-border pb-3 mb-8">
            <h2 className="text-2xl font-serif">7. Card Primitives (4 Variants)</h2>
            <p className="text-xs text-ink-muted">Renders different representations using a single Card layout component with slot inputs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Variant 1: Program Card */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-ink-muted">variant=&quot;program-card&quot;</span>
              <Card
                variant="program-card"
                image={
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80" 
                    alt="Forest Planting" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                }
                eyebrow={<Badge variant="default">Micro-Forests</Badge>}
                title="Heat-Island Initiative"
                body="Planting native micro-forests in under-served metropolitan neighborhoods to lower surface heat temperatures."
                footer={
                  <>
                    <span className="text-xs font-bold text-ink-muted flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-accent" /> Austin Metro
                    </span>
                    <Button size="sm">Learn More</Button>
                  </>
                }
              />
            </div>

            {/* Variant 2: News Card */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-ink-muted">variant=&quot;news-card&quot;</span>
              <Card
                variant="news-card"
                image={
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80" 
                    alt="Trees" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                }
                eyebrow={<span className="text-xs font-bold text-ink-muted flex items-center gap-1"><Calendar className="w-3 h-3" /> July 13, 2026</span>}
                title="Sowing Resilience in East Austin"
                body="How CanopyRise localized volunteer models are generating rapid micro-forest growth results."
                footer={
                  <>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" fallback="ML" alt="Marcus Diaz" />
                      <span className="text-xs text-ink font-semibold">Marcus Diaz</span>
                    </div>
                    <span className="text-xs text-ink-muted">4 min read</span>
                  </>
                }
              />
            </div>

            {/* Variant 3: Testimonial Card */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-ink-muted">variant=&quot;testimonial-card&quot;</span>
              <Card
                variant="testimonial-card"
                body="&ldquo;CanopyRise made it incredibly simple to turn our neighborhood pocket park into a cooling sanctuary. The volunteering process took less than five minutes to coordinate.&rdquo;"
                footer={
                  <>
                    <Avatar size="md" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Jane" />
                    <div>
                      <h4 className="text-sm font-bold text-ink leading-tight">Sarah Lin</h4>
                      <span className="text-xs text-ink-muted">Austin Neighborhood Steward</span>
                    </div>
                  </>
                }
              />
            </div>

            {/* Variant 4: Stat Card */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-ink-muted">variant=&quot;stat-card&quot;</span>
              <Card
                variant="stat-card"
                title={<AnimatedCounter value={14} suffix=" Cities" />}
                body="Urban locations actively deploying canopy templates."
                footer={
                  <Badge variant="outline" className="mt-2">Cumulative Outreach</Badge>
                }
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 10. CONTAINER & LAYOUT PRIMITIVES (ASYMMETRIC GRID) */}
      <Section padding="md" background="elevated">
        <Container>
          <div className="border-b border-border pb-3 mb-8">
            <h2 className="text-2xl font-serif">8. Layout Primitives (Asymmetric Alignments)</h2>
            <p className="text-xs text-ink-muted">Section wrapper demonstrating default max-width padding vs asymmetric spacing offsets.</p>
          </div>
        </Container>

        {/* Asymmetric offset demonstration */}
        <Container asymmetric className="bg-surface border-y border-border py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1 border-r border-border/50 pr-4">
              <span className="text-xs uppercase tracking-widest text-accent font-bold">Asymmetric Alignment</span>
              <h3 className="text-2xl font-serif mt-1">Offsetting focus to prompt action.</h3>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-ink-muted leading-relaxed">
                By setting `asymmetric` on the Container layout primitive, we shift margins to the right (offsetting by 15% padding left on medium screens). This is an editorial design technique that draws the visitor&apos;s eye down the page, separating narrative structures from standard grid templates.
              </p>
              <div className="mt-4 flex gap-3">
                <Button size="sm">Primary Action</Button>
                <Button size="sm" variant="secondary">Secondary Action</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
