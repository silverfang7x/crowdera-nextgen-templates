'use client';

import * as React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section, Container } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import {
  Label,
  Input,
  Textarea,
  ErrorText
} from '@/components/ui/FormPrimitives';
import { Check, Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  // Form State
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');

  // Status States
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Your name is required.";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "A valid email address is required.";
    }
    if (!subject.trim()) newErrors.subject = "Please enter a subject.";
    if (!message.trim()) newErrors.message = "Message body cannot be empty.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header orgName="Clearwater Relief" />

      <main className="flex-grow pt-24 pb-16">
        {/* Page Hero Banner */}
        <Section padding="lg" background="elevated" className="border-b border-border/50">
          <Container className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-accent font-bold font-sans">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-ink leading-tight">
              Contact Operations Command
            </h1>
            <p className="text-lg text-ink-muted font-sans leading-relaxed max-w-2xl">
              Have questions about our water staging hubs, donor transparency audits, or active operational deployments? Connect directly with our liaison officers.
            </p>
          </Container>
        </Section>

        {/* Form and Contact Detail Split */}
        <Section padding="lg">
          <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Form Application (7 cols) */}
            <ScrollReveal className="lg:col-span-7 space-y-6">
              <div className="space-y-2 text-left">
                <span className="text-2xs uppercase tracking-widest text-accent font-bold font-sans">
                  Send A Message
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink">
                  Liaison Dispatch Center
                </h2>
              </div>

              <div className="bg-surface-elevated/20 p-8 border border-border rounded-2xl shadow-sm">
                {isSubmitted ? (
                  // Success State
                  <div className="text-center py-8 space-y-4">
                    <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <Check className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-serif font-bold text-ink">Dispatch Transmitted</h3>
                      <p className="text-xs text-ink-muted leading-relaxed font-sans max-w-sm mx-auto">
                        Thank you for reaching out. Your message has been logged, and an operational coordinator will follow up with you via email within 24 hours.
                      </p>
                    </div>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="secondary"
                      size="sm"
                      className="mx-auto border-border bg-surface"
                    >
                      Send Another Dispatch
                    </Button>
                  </div>
                ) : (
                  // Form fields
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contact-name">Full Name</Label>
                        <Input
                          id="contact-name"
                          type="text"
                          placeholder="e.g. Sarah Lin"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          error={!!errors.name}
                        />
                        {errors.name && <ErrorText>{errors.name}</ErrorText>}
                      </div>
                      <div>
                        <Label htmlFor="contact-email">Email Address</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="e.g. sarah@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          error={!!errors.email}
                        />
                        {errors.email && <ErrorText>{errors.email}</ErrorText>}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <Label htmlFor="contact-subject">Subject</Label>
                      <Input
                        id="contact-subject"
                        type="text"
                        placeholder="e.g. Partnership inquiry, Staging details..."
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        error={!!errors.subject}
                      />
                      {errors.subject && <ErrorText>{errors.subject}</ErrorText>}
                    </div>

                    {/* Message Body */}
                    <div>
                      <Label htmlFor="contact-msg">Message</Label>
                      <Textarea
                        id="contact-msg"
                        placeholder="Detail your request or inquiry..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        error={!!errors.message}
                      />
                      {errors.message && <ErrorText>{errors.message}</ErrorText>}
                    </div>

                    {/* Submit button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full justify-center bg-accent text-accent-contrast hover:bg-accent/90"
                      iconRight={<Send className="w-4 h-4" />}
                    >
                      {isSubmitting ? "Transmitting..." : "Send Dispatch"}
                    </Button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Right Column: Address and Map (5 cols) */}
            <ScrollReveal className="lg:col-span-5 space-y-6">
              
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl text-ink">Headquarters Address</h3>
                
                {/* Contact info repeated */}
                <div className="p-6 bg-surface-elevated/45 border border-border rounded-xl space-y-4 font-sans text-xs">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-ink leading-tight">Mailing Address</h4>
                      <p className="text-ink-muted mt-1 leading-normal">
                        802 Crisis Relief Lane, Suite 100<br />Washington, DC 20005
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-t border-border/40 pt-4">
                    <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-ink leading-tight">General Operations</h4>
                      <a href="mailto:response@clearwaterrelief.org" className="text-accent hover:underline block mt-1">
                        response@clearwaterrelief.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-t border-border/40 pt-4">
                    <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-ink leading-tight">Helpline</h4>
                      <a href="tel:+12025550144" className="text-ink-muted hover:text-ink block mt-1">
                        +1 (202) 555-0144
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder Block */}
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-base text-ink">Location Map</h3>
                <div className="overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-sm aspect-[16/10] relative flex items-center justify-center text-center p-6">
                  {/* Decorative background grids */}
                  <div className="absolute inset-0 opacity-10 select-none bg-[radial-gradient(#d24c2d_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                  <div className="relative z-10 space-y-2">
                    <MessageSquare className="w-8 h-8 text-accent mx-auto" />
                    <h4 className="font-sans font-bold text-xs text-ink uppercase tracking-wider">
                      Operations Map Staging
                    </h4>
                    <p className="text-[10px] text-ink-muted font-sans max-w-[200px] mx-auto leading-relaxed">
                      Liaison Command Staged at Washington, DC operations grid coordinates.
                    </p>
                  </div>
                </div>
              </div>

            </ScrollReveal>

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
