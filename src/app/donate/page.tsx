'use client';

import * as React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section, Container } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Input, Label } from '@/components/ui/FormPrimitives';
import { Heart, Lock, ShieldCheck, Award, Info, Sparkles } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function DonateForm() {
  const searchParams = useSearchParams();
  const programSlug = searchParams.get('program');

  // Donation state
  const [frequency, setFrequency] = React.useState<'once' | 'monthly'>('once');
  const [amount, setAmount] = React.useState<number>(100);
  const [customAmount, setCustomAmount] = React.useState('');
  const [isCustom, setIsCustom] = React.useState(false);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // CC form mock details
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardExpiry, setCardExpiry] = React.useState('');
  const [cardCVC, setCardCVC] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // Preset Options
  const PRESETS = [25, 50, 100, 250];

  // Dynamic Impact Description
  const getImpact = (val: number) => {
    if (val <= 0) return "Please choose or enter a support amount.";
    if (val < 25) {
      return `Every $1 purifies 200 liters of water. Your $${val} gift provides ${val * 200} liters of safe drinking water for displaced individuals.`;
    }
    if (val >= 25 && val < 50) {
      return `Your $${val} gift provides hygiene survival packages (soap, sanitizers, dental kits) for 2 displaced families.`;
    }
    if (val >= 50 && val < 100) {
      return `Your $${val} gift supplies gravity-powered water filtration membranes to sustain 10 survivors for a year.`;
    }
    if (val >= 100 && val < 250) {
      return `Your $${val} gift funds critical surgical tool sterilization and basic field pharmacy logistics for 1 response clinic.`;
    }
    return `Your $${val} gift funds 1 complete modular, gravity-powered water line installation, supplying clean water to a school or shelter.`;
  };

  const handlePresetSelect = (val: number) => {
    setIsCustom(false);
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (val: string) => {
    setIsCustom(true);
    setCustomAmount(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    } else {
      setAmount(0);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (amount <= 0) {
      newErrors.amount = "Please select or enter a donation amount.";
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number.";
    }
    if (!cardExpiry.match(/^\d{2}\/\d{2}$/)) {
      newErrors.cardExpiry = "Expiry format must be MM/YY.";
    }
    if (!cardCVC.match(/^\d{3,4}$/)) {
      newErrors.cardCVC = "CVC must be 3 or 4 digits.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      // Reset payment fields
      setCardNumber('');
      setCardExpiry('');
      setCardCVC('');
      setEmail('');
    }, 1800);
  };

  const getProgramTitle = (slug: string) => {
    if (slug === 'water') return "Clean Water Deployment";
    if (slug === 'medical') return "Mobile Medical Triage";
    if (slug === 'supply') return "Survival Resource Packs";
    if (slug === 'education') return "Community Water Safety";
    return "";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      {/* Left side: Donation Selection and Details (7 cols) */}
      <ScrollReveal className="lg:col-span-7 space-y-8">
        
        {/* URL Param Program Notice */}
        {programSlug && getProgramTitle(programSlug) && (
          <div className="p-4 bg-accent/5 border border-accent/15 rounded-lg flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-accent shrink-0" />
            <span className="text-xs font-semibold text-ink leading-normal font-sans">
              Operational Focus: Your gift will directly support our <span className="text-accent underline font-bold">{getProgramTitle(programSlug)}</span>.
            </span>
          </div>
        )}

        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-ink">
            1. Select Contribution Amount
          </h2>

          {/* One-time vs Monthly Frequency toggle */}
          <div className="flex bg-surface-elevated border border-border p-1.5 rounded-lg w-full max-w-xs">
            <button
              type="button"
              onClick={() => setFrequency('once')}
              className={`flex-1 text-center py-2 text-xs font-bold uppercase tracking-wider rounded-md font-sans transition-all duration-200 cursor-pointer ${
                frequency === 'once'
                  ? 'bg-surface text-ink shadow-sm'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              One-Time Gift
            </button>
            <button
              type="button"
              onClick={() => setFrequency('monthly')}
              className={`flex-1 text-center py-2 text-xs font-bold uppercase tracking-wider rounded-md font-sans transition-all duration-200 cursor-pointer ${
                frequency === 'monthly'
                  ? 'bg-surface text-ink shadow-sm'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Monthly Support
            </button>
          </div>

          {/* Preset Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {PRESETS.map((val) => {
              const isActive = amount === val && !isCustom;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => handlePresetSelect(val)}
                  className={`py-3.5 border rounded-lg text-base font-bold transition-all duration-200 cursor-pointer font-sans ${
                    isActive
                      ? 'bg-accent border-transparent text-accent-contrast shadow-md scale-[1.02]'
                      : 'bg-surface border-border text-ink hover:bg-surface-elevated'
                  }`}
                >
                  ${val}
                </button>
              );
            })}
          </div>

          {/* Custom input */}
          <div className="space-y-2">
            <Label htmlFor="custom-gift-amount">Or Enter Custom Amount ($)</Label>
            <Input
              id="custom-gift-amount"
              type="number"
              min="1"
              placeholder="e.g. 75"
              value={customAmount}
              onChange={(e) => handleCustomChange(e.target.value)}
              className="text-base"
              error={!!errors.amount}
            />
            {errors.amount && <p className="text-xs text-red-500 font-semibold">{errors.amount}</p>}
          </div>
        </div>

        {/* Dynamic impact progress breakdown */}
        <div className="p-6 bg-surface-elevated/40 border border-border rounded-xl space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-accent shrink-0" />
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-ink">
              Direct Impact Assessment
            </h4>
          </div>

          <p className="text-xs text-ink-muted leading-relaxed font-sans min-h-[3.5rem]">
            {getImpact(amount)}
          </p>

          {/* Horizontal custom impact indicator progress chart */}
          {amount > 0 && (
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-3xs uppercase font-bold text-ink-muted tracking-wider font-sans">
                <span>Deployment Efficiency Score</span>
                <span>96% Direct Staging</span>
              </div>
              <div className="w-full h-3 bg-border rounded-full overflow-hidden relative border border-border">
                <div 
                  className="h-full bg-accent transition-all duration-500 rounded-full" 
                  style={{ width: `${Math.min(100, Math.max(10, (amount / 250) * 100))}%` }}
                />
              </div>
            </div>
          )}
        </div>

      </ScrollReveal>

      {/* Right side: Mock Payment processing form (5 cols) */}
      <ScrollReveal className="lg:col-span-5">
        <div className="bg-surface p-8 border border-border rounded-2xl shadow-md space-y-6">
          
          {paymentSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Heart className="w-6 h-6 fill-accent text-accent" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold text-ink">Gift Received</h3>
                <p className="text-xs text-ink-muted leading-relaxed font-sans">
                  Your donation of **${amount}** has been processed successfully. A tax-compliant receipt has been sent to your email. Thank you for standing with Clearwater.
                </p>
              </div>
              <Button
                onClick={() => setPaymentSuccess(false)}
                variant="secondary"
                size="sm"
                className="mx-auto border-border bg-surface-elevated"
              >
                Make Another Gift
              </Button>
            </div>
          ) : (
            <form onSubmit={handlePayment} className="space-y-5">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h3 className="text-lg font-serif font-bold text-ink">2. Secure Checkout</h3>
                <div className="flex items-center gap-1 text-3xs text-ink-muted font-bold uppercase tracking-wider font-sans">
                  <Lock className="w-3.5 h-3.5 text-accent" />
                  <span>256-Bit SSL Secured</span>
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="checkout-email">Receipt Email Address</Label>
                <Input
                  id="checkout-email"
                  type="email"
                  placeholder="e.g. janesmith@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                />
                {errors.email && <p className="text-2xs text-red-500 font-semibold mt-1">{errors.email}</p>}
              </div>

              {/* Card Number */}
              <div>
                <Label htmlFor="checkout-card">Credit Card Number</Label>
                <Input
                  id="checkout-card"
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  error={!!errors.cardNumber}
                />
                {errors.cardNumber && <p className="text-2xs text-red-500 font-semibold mt-1">{errors.cardNumber}</p>}
              </div>

              {/* Expiry and CVC Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checkout-expiry">Expiration</Label>
                  <Input
                    id="checkout-expiry"
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    error={!!errors.cardExpiry}
                  />
                  {errors.cardExpiry && <p className="text-2xs text-red-500 font-semibold mt-1">{errors.cardExpiry}</p>}
                </div>
                <div>
                  <Label htmlFor="checkout-cvc">CVC Code</Label>
                  <Input
                    id="checkout-cvc"
                    type="text"
                    placeholder="123"
                    maxLength={4}
                    value={cardCVC}
                    onChange={(e) => setCardCVC(e.target.value.replace(/[^0-9]/g, ''))}
                    error={!!errors.cardCVC}
                  />
                  {errors.cardCVC && <p className="text-2xs text-red-500 font-semibold mt-1">{errors.cardCVC}</p>}
                </div>
              </div>

              {/* Action Submit */}
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full justify-center bg-accent text-accent-contrast hover:bg-accent/95 shadow-md py-3 text-base"
                iconLeft={<Heart className="w-4 h-4 fill-accent-contrast text-accent-contrast" />}
              >
                {isProcessing ? "Verifying Transaction..." : `Submit Gift of $${amount}`}
              </Button>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/50 text-center select-none">
                <div className="space-y-1.5">
                  <ShieldCheck className="w-5 h-5 text-accent mx-auto" />
                  <span className="text-[10px] leading-tight text-ink-muted font-sans font-semibold block">
                    501(c)(3) Tax Exempt
                  </span>
                </div>
                <div className="space-y-1.5 border-x border-border/60">
                  <Award className="w-5 h-5 text-accent mx-auto" />
                  <span className="text-[10px] leading-tight text-ink-muted font-sans font-semibold block">
                    Guidestar Platinum
                  </span>
                </div>
                <div className="space-y-1.5">
                  <Lock className="w-5 h-5 text-accent mx-auto" />
                  <span className="text-[10px] leading-tight text-ink-muted font-sans font-semibold block">
                    PCI Compliant
                  </span>
                </div>
              </div>
            </form>
          )}

        </div>
      </ScrollReveal>

    </div>
  );
}

export default function DonatePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header orgName="Clearwater Relief" />

      <main className="flex-grow pt-24 pb-16">
        {/* Header Block */}
        <Section padding="lg" background="elevated" className="border-b border-border/50">
          <Container className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-accent font-bold font-sans">
              Fuel Our Missions
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-ink leading-tight">
              Frontline Emergency Staging
            </h1>
            <p className="text-lg text-ink-muted font-sans leading-relaxed max-w-2xl">
              Logistics staging requires active liquid reserves. By supporting our missions today, you directly fund water purification, clinic modules, and cargo dispatches that save lives.
            </p>
          </Container>
        </Section>

        {/* Form area wrapped in Suspense */}
        <Section padding="lg">
          <Container>
            <React.Suspense fallback={
              <div className="text-center py-12 text-ink-muted font-sans">
                Loading secure checkout system...
              </div>
            }>
              <DonateForm />
            </React.Suspense>
          </Container>
        </Section>
      </main>

      <Footer 
        orgName="Clearwater Relief" 
        orgTagline="Deploying medical-grade water purification and rapid survival resources directly to natural disaster zones and conflict areas worldwide."
        contactAddress="802 Crisis Relief Lane, Suite 100, Washington, DC 20005"
        contactEmail="response@clearwaterrelief.org"
        contactPhone="+1 (202) 555-0144"
        newsletterTagline="Stay updated on emergency deployments, frontline operations, and impact reports."
      />
    </div>
  );
}
