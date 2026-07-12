export interface TemplateRecipe {
  id: string;
  name: string;
  causeCategory: string;
  orgName: string;
  tagline: string;
  missionStatement: string;
  colorPreset: 'humanitarian' | 'disaster-relief' | 'healthcare' | 'animal-welfare' | 'environment' | 'education' | 'faith-based' | 'arts-culture';
  fontPairing: 'editorial' | 'expressive' | 'scholarly';
  sectionOrder: Array<'hero' | 'about' | 'programs' | 'impactStats' | 'testimonials' | 'gallery' | 'news' | 'cta'>;
  variantConfig: {
    hero: {
      variant: 'image' | 'video' | 'carousel';
      showStatOverlay: boolean;
    };
    gallery: {
      view: 'masonry' | 'grid' | 'carousel';
    };
    testimonial: {
      style: 'featured' | 'rail-only';
    };
    about: {
      layout: 'text-only' | 'text-image' | 'text-video' | 'text-image-video';
    };
  };
  urgencyBanner?: boolean;
}
