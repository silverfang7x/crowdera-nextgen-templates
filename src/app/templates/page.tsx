import * as React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section, Container } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TEMPLATE_RECIPES } from '@/lib/templates/registry';
import { ArrowRight, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'NPO Website Templates Directory — Crowdera NextGen',
  description: 'Explore our catalog of 10 dynamic, fully responsive, cause-based website templates.',
};

// Swatch preview maps representing hex values for light mode themes
const PRESET_COLORS: Record<string, { accent: string; bg: string; border: string }> = {
  'humanitarian': { accent: '#bf3e21', bg: '#fcfaf7', border: '#e8e2d9' },
  'disaster-relief': { accent: '#eb1e1e', bg: '#ffffff', border: '#e2e8f0' },
  'healthcare': { accent: '#145ee2', bg: '#f9fbfe', border: '#e2eaf8' },
  'animal-welfare': { accent: '#a8500e', bg: '#fefdf9', border: '#e8e5db' },
  'environment': { accent: '#2b613e', bg: '#fdfdf8', border: '#e2ece4' },
  'education': { accent: '#6d1bc5', bg: '#fcfbfe', border: '#eadef9' },
  'faith-based': { accent: '#9c1a53', bg: '#fdfbfa', border: '#fbe9f0' },
  'arts-culture': { accent: '#cc1776', bg: '#fffefa', border: '#faeaf2' },
};

export default function TemplatesDirectoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Configure Healthcare theme preset and Scholarly font pairing for Crowdera surface */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.setAttribute('data-theme', 'healthcare');
            document.documentElement.setAttribute('data-font-pairing', 'scholarly');
          `,
        }}
      />

      <Header orgName="Crowdera Templates" />

      <main className="flex-grow pt-16">
        <Section padding="lg" background="default">
          <Container className="space-y-12">
            
            {/* Header Introductions */}
            <div className="max-w-3xl text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-bold font-sans">
                <BookOpen className="w-3.5 h-3.5" />
                <span>NPO Code-Free Builder Engine</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-ink leading-tight">
                Cause-Based Website Template Repository
              </h1>
              <p className="text-base md:text-lg text-ink-muted leading-relaxed font-sans">
                Explore our catalog of 10 dynamic, fully responsive, cause-based website templates.
                Each template dynamically re-orders page layouts, switches CSS custom variables,
                and overrides typography variables to tailor styling in one click.
              </p>
            </div>

            {/* Template Recipe Cards Grid */}
            <ScrollReveal staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TEMPLATE_RECIPES.map((recipe) => {
                const colors = PRESET_COLORS[recipe.colorPreset] || PRESET_COLORS.humanitarian;
                return (
                  <Card
                    key={recipe.id}
                    variant="program-card"
                    className="h-full flex flex-col justify-between"
                    eyebrow={
                      <div className="flex items-center justify-between w-full">
                        <Badge variant="default" className="bg-accent/10 text-accent font-sans">
                          {recipe.causeCategory}
                        </Badge>
                        <span className="text-[10px] text-ink-muted font-bold font-sans uppercase">
                          {recipe.fontPairing}
                        </span>
                      </div>
                    }
                    title={
                      <div className="space-y-3">
                        <h2 className="font-serif font-bold text-xl leading-tight">
                          {recipe.name}
                        </h2>
                        
                        {/* Live Color Swatch previews */}
                        <div className="flex items-center gap-1.5 py-1">
                          <span className="text-3xs uppercase tracking-widest text-ink-muted font-bold font-sans">
                            Palette Preview:
                          </span>
                          <div className="flex gap-1.5 select-none" aria-hidden="true">
                            <div 
                              style={{ backgroundColor: colors.accent }} 
                              className="w-4 h-4 rounded-full border border-border shadow-sm shrink-0" 
                              title={`Primary Accent: ${colors.accent}`} 
                            />
                            <div 
                              style={{ backgroundColor: colors.bg }} 
                              className="w-4 h-4 rounded-full border border-border shadow-sm shrink-0" 
                              title={`Canvas Background: ${colors.bg}`} 
                            />
                            <div 
                              style={{ backgroundColor: colors.border }} 
                              className="w-4 h-4 rounded-full border border-border shadow-sm shrink-0" 
                              title={`Divider Border: ${colors.border}`} 
                            />
                          </div>
                        </div>
                      </div>
                    }
                    body={recipe.tagline}
                    footer={
                      <Link href={`/t/${recipe.id}`} className="w-full">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full justify-between transition-all duration-200"
                          iconRight={<ArrowRight className="w-4 h-4" />}
                        >
                          Preview Template
                        </Button>
                      </Link>
                    }
                  />
                );
              })}
            </ScrollReveal>

          </Container>
        </Section>
      </main>

      <Footer
        orgName="Crowdera Templates"
        orgTagline="Empowering global non-profits and humanitarian organizations with production-ready cause-based website templates."
        contactAddress="802 Crisis Relief Lane, Suite 100, Washington, DC 20005"
        contactEmail="templates@crowdera.org"
        contactPhone="+1 (202) 555-0144"
        newsletterTagline="Stay updated on new template dispatches, design system variables, and layout tools."
      />
    </div>
  );
}
