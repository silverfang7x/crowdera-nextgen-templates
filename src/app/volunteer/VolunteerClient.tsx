'use client';

import * as React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section, Container } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Label,
  Input,
  Textarea,
  Select,
  ErrorText,
  HelperText
} from '@/components/ui/FormPrimitives';
import { Check, Send, MapPin } from 'lucide-react';

const ROLES = [
  {
    title: "Emergency Logistics Coordinator",
    location: "Crisis Staging Base (Field)",
    commitment: "2-4 Weeks Deployment",
    description: "Support on-the-ground cargo receiving, inventories routing, and coordination with vehicle operators to transport filtration units into active zones."
  },
  {
    title: "Water Quality Technician",
    location: "Emergency Hubs (Field / Remote)",
    commitment: "Flexible Deployment",
    description: "Assist engineers with installing modular water filtration lines, run regular purity tests, and train local community operators on pump maintenance."
  },
  {
    title: "Warehouse Staging Assembler",
    location: "Miami, Dubai, or Nairobi Warehouses",
    commitment: "4 Hours/Week Minimum",
    description: "Pack modular survival resource kits, assemble water filtration spare-parts cases, and prep logistics boxes for global air cargo dispatches."
  }
];

export default function VolunteerClient() {
  // Form State
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('');
  const [experience, setExperience] = React.useState('');
  const [agree, setAgree] = React.useState(false);

  // Error States
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Full name is required.";
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!role) newErrors.role = "Please select an operational role.";
    if (!experience.trim()) newErrors.experience = "Please briefly summarize your relevant background.";
    if (!agree) newErrors.agree = "You must acknowledge operational safety protocols.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and show mock submitting state
    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form fields
      setName('');
      setEmail('');
      setRole('');
      setExperience('');
      setAgree(false);
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
              Get Involved
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-ink leading-tight">
              Join the Frontline Response
            </h1>
            <p className="text-lg text-ink-muted font-sans leading-relaxed max-w-2xl">
              Volunteers are the backbone of Clearwater. Whether deploying as a logistics technician in active zones or staging survival kits at our global hubs, your service impacts lives immediately.
            </p>
          </Container>
        </Section>

        {/* Roles Section */}
        <Section padding="lg">
          <Container className="space-y-12">
            <div className="text-left space-y-3">
              <span className="text-xs uppercase tracking-widest text-accent font-bold font-sans">
                Open Positions
              </span>
              <h2 className="text-3xl font-serif font-bold text-ink">
                Volunteer Operational Roles
              </h2>
            </div>

            <ScrollReveal staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ROLES.map((role, idx) => (
                <div key={idx} className="p-6 bg-surface-elevated/35 border border-border rounded-xl shadow-sm flex flex-col justify-between space-y-4 h-full hover:border-accent/35 transition-colors">
                  <div className="space-y-3">
                    <Badge variant="outline" className="text-[10px] font-bold rounded-md bg-accent/5">
                      {role.commitment}
                    </Badge>
                    <h3 className="font-sans font-bold text-base text-ink leading-tight pt-1">
                      {role.title}
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed font-sans">
                      {role.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-3xs text-ink-muted font-bold font-sans pt-2 border-t border-border/40">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>{role.location}</span>
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </Container>
        </Section>

        {/* Application Form Section */}
        <Section padding="lg" background="elevated" className="border-t border-border/50">
          <Container className="max-w-xl">
            <div className="text-center space-y-3 pb-8">
              <span className="text-xs uppercase tracking-widest text-accent font-bold font-sans">
                Apply Today
              </span>
              <h2 className="text-3xl font-serif font-bold text-ink">
                Operational Application Form
              </h2>
              <p className="text-xs text-ink-muted font-sans max-w-sm mx-auto">
                Submit your credentials and operational experience to initiate our background clearing sequence.
              </p>
            </div>

            <ScrollReveal className="bg-surface p-8 border border-border rounded-2xl shadow-md">
              {isSubmitted ? (
                // Success State View
                <div className="text-center py-10 space-y-6 animate-fade-in">
                  <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-ink">Application Submitted</h3>
                    <p className="text-xs text-ink-muted leading-relaxed font-sans max-w-sm mx-auto">
                      Thank you for volunteering. Our Field Liaison team has received your details and will contact you via email within 48 hours to schedule a clearing call.
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="secondary"
                    size="sm"
                    className="mx-auto border-border bg-surface-elevated"
                  >
                    Submit Another Application
                  </Button>
                </div>
              ) : (
                // Form View
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name field */}
                  <div>
                    <Label htmlFor="volunteer-name" required>Full Name</Label>
                    <Input
                      id="volunteer-name"
                      type="text"
                      placeholder="e.g. Sarah Lin"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={!!errors.name}
                    />
                    {errors.name && <ErrorText>{errors.name}</ErrorText>}
                  </div>

                  {/* Email field */}
                  <div>
                    <Label htmlFor="volunteer-email" required>Email Address</Label>
                    <Input
                      id="volunteer-email"
                      type="email"
                      placeholder="e.g. sarah.lin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={!!errors.email}
                    />
                    {errors.email && <ErrorText>{errors.email}</ErrorText>}
                  </div>

                  {/* Role select */}
                  <div>
                    <Label htmlFor="volunteer-role" required>Select Operational Role</Label>
                    <div className="relative">
                      <Select
                        id="volunteer-role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        error={!!errors.role}
                      >
                        <option value="">-- Choose a position --</option>
                        <option value="logistics">Emergency Logistics Coordinator</option>
                        <option value="technician">Water Quality Technician</option>
                        <option value="assembler">Warehouse Staging Assembler</option>
                      </Select>
                    </div>
                    {errors.role && <ErrorText>{errors.role}</ErrorText>}
                  </div>

                  {/* Experience description */}
                  <div>
                    <Label htmlFor="volunteer-exp" required>Relevant Background & Skills</Label>
                    <Textarea
                      id="volunteer-exp"
                      placeholder="Detail any previous disaster relief, logistics operations, medical clinic, or plumbing experience..."
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      error={!!errors.experience}
                    />
                    <HelperText>Include licenses, certifications (e.g. EMT, CDL), or languages spoken.</HelperText>
                    {errors.experience && <ErrorText>{errors.experience}</ErrorText>}
                  </div>

                  {/* Terms Acknowledge checkbox */}
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-border text-accent focus:ring-accent accent-accent cursor-pointer"
                      />
                      <span className="text-xs text-ink-muted leading-relaxed font-sans">
                        I acknowledge that deployment roles require a background clearing process, and I agree to follow operational safety protocols.
                      </span>
                    </label>
                    {errors.agree && <ErrorText>{errors.agree}</ErrorText>}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full justify-center bg-accent text-accent-contrast hover:bg-accent/90 font-sans"
                    iconRight={<Send className="w-4 h-4" />}
                  >
                    {isSubmitting ? "Processing Application..." : "Submit Application"}
                  </Button>
                </form>
              )}
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
