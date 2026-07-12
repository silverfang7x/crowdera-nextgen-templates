import { TemplateRecipe } from './types';

export const TEMPLATE_RECIPES: TemplateRecipe[] = [
  {
    id: 'clearwater-relief',
    name: 'Clearwater Relief Trust',
    causeCategory: 'Humanitarian',
    orgName: 'Clearwater Relief',
    tagline: 'Deploying pure water and medical triage directly to remote disaster zones.',
    missionStatement: 'Providing immediate, evidence-based disaster response and water purification where institutional supply lines collapse.',
    colorPreset: 'humanitarian',
    fontPairing: 'editorial',
    sectionOrder: ['hero', 'about', 'impactStats', 'programs', 'testimonials', 'gallery', 'news', 'cta'],
    variantConfig: {
      hero: {
        variant: 'video',
        showStatOverlay: true,
      },
      gallery: {
        view: 'carousel',
      },
      testimonial: {
        style: 'featured',
      },
      about: {
        layout: 'text-video',
      },
    },
  },
  {
    id: 'rapid-response',
    name: 'Rapid Response Network',
    causeCategory: 'Disaster Relief',
    orgName: 'Rapid Response',
    tagline: 'Dispatching emergency relief cargo and logistics within hours of disaster strike.',
    missionStatement: 'Deploying vital resources, emergency shelter structures, and rescue coordinators to frontline disaster zones globally.',
    colorPreset: 'disaster-relief',
    fontPairing: 'expressive',
    sectionOrder: ['hero', 'about', 'programs', 'impactStats', 'gallery', 'testimonials', 'news', 'cta'],
    urgencyBanner: true,
    variantConfig: {
      hero: {
        variant: 'carousel',
        showStatOverlay: false,
      },
      gallery: {
        view: 'masonry',
      },
      testimonial: {
        style: 'featured',
      },
      about: {
        layout: 'text-image',
      },
    },
  },
  {
    id: 'sunrise-health',
    name: 'Sunrise Health Initiative',
    causeCategory: 'Healthcare',
    orgName: 'Sunrise Health',
    tagline: 'Delivering primary medical diagnostics and triage cargo to vulnerable field clinics.',
    missionStatement: 'Bringing healthcare access, sterile equipment, and clinical support directly to underserved community regions.',
    colorPreset: 'healthcare',
    fontPairing: 'scholarly',
    sectionOrder: ['hero', 'about', 'impactStats', 'programs', 'testimonials', 'news', 'gallery', 'cta'],
    variantConfig: {
      hero: {
        variant: 'image',
        showStatOverlay: true,
      },
      gallery: {
        view: 'grid',
      },
      testimonial: {
        style: 'featured',
      },
      about: {
        layout: 'text-image-video',
      },
    },
  },
  {
    id: 'paws-refuge',
    name: 'Paws & Refuge Sanctuary',
    causeCategory: 'Animal Welfare',
    orgName: 'Paws & Refuge',
    tagline: 'Providing safe shelters, veterinary healing, and forever homes for displaced animals.',
    missionStatement: 'Rescuing vulnerable, abandoned animals from crisis states and providing long-term sanctuary and rehabilitation.',
    colorPreset: 'animal-welfare',
    fontPairing: 'expressive',
    sectionOrder: ['hero', 'about', 'programs', 'gallery', 'testimonials', 'news', 'cta'],
    variantConfig: {
      hero: {
        variant: 'carousel',
        showStatOverlay: false,
      },
      gallery: {
        view: 'masonry',
      },
      testimonial: {
        style: 'rail-only',
      },
      about: {
        layout: 'text-image',
      },
    },
  },
  {
    id: 'rootline-conservancy',
    name: 'Rootline Conservancy',
    causeCategory: 'Environment',
    orgName: 'Rootline',
    tagline: 'Restoring native woodlands, protecting water source wetlands, and training forest guides.',
    missionStatement: 'Preserving critical local forest biomes and restoring wetland ecosystems through direct community stewardship.',
    colorPreset: 'environment',
    fontPairing: 'editorial',
    sectionOrder: ['hero', 'about', 'programs', 'impactStats', 'gallery', 'news', 'cta'],
    variantConfig: {
      hero: {
        variant: 'image',
        showStatOverlay: false,
      },
      gallery: {
        view: 'masonry',
      },
      testimonial: {
        style: 'featured',
      },
      about: {
        layout: 'text-image-video',
      },
    },
  },
  {
    id: 'brightpath-learning',
    name: 'Brightpath Learning Trust',
    causeCategory: 'Education',
    orgName: 'Brightpath',
    tagline: 'Empowering rural youth with digital learning kits, library cards, and literacy circles.',
    missionStatement: 'Bridging the academic equity divide by delivering adaptive learning resources to rural classrooms.',
    colorPreset: 'education',
    fontPairing: 'scholarly',
    sectionOrder: ['hero', 'about', 'programs', 'testimonials', 'news', 'cta'],
    variantConfig: {
      hero: {
        variant: 'image',
        showStatOverlay: true,
      },
      gallery: {
        view: 'grid',
      },
      testimonial: {
        style: 'featured',
      },
      about: {
        layout: 'text-only',
      },
    },
  },
  {
    id: 'sacred-grove',
    name: 'Sacred Grove Fellowship',
    causeCategory: 'Faith-Based',
    orgName: 'Sacred Grove',
    tagline: 'Cultivating spiritual sanctuary, reflective retreats, and grassroots food pantries.',
    missionStatement: 'Nurturing deep spiritual renewal, interfaith dialog, and local food assistance across neighborhoods.',
    colorPreset: 'faith-based',
    fontPairing: 'editorial',
    sectionOrder: ['hero', 'about', 'testimonials', 'gallery', 'cta'],
    variantConfig: {
      hero: {
        variant: 'image',
        showStatOverlay: false,
      },
      gallery: {
        view: 'masonry',
      },
      testimonial: {
        style: 'featured',
      },
      about: {
        layout: 'text-only',
      },
    },
  },
  {
    id: 'groundwork-collective',
    name: 'Groundwork Community Collective',
    causeCategory: 'Community Development',
    orgName: 'Groundwork',
    tagline: 'Organizing urban agriculture plots, tool-sharing sheds, and local leadership paths.',
    missionStatement: 'Fostering community resilience by backing local leadership and sustainable neighborhood tools.',
    colorPreset: 'humanitarian',
    fontPairing: 'expressive',
    sectionOrder: ['hero', 'about', 'programs', 'impactStats', 'testimonials', 'gallery', 'news', 'cta'],
    variantConfig: {
      hero: {
        variant: 'carousel',
        showStatOverlay: true,
      },
      gallery: {
        view: 'grid',
      },
      testimonial: {
        style: 'featured',
      },
      about: {
        layout: 'text-image',
      },
    },
  },
  {
    id: 'openframe-arts',
    name: 'Openframe Arts Trust',
    causeCategory: 'Arts & Culture',
    orgName: 'Openframe',
    tagline: 'Backing underrepresented muralists, community studios, and public sculpture.',
    missionStatement: 'Amplifying public creative access and supporting independent artists through workshops and spaces.',
    colorPreset: 'arts-culture',
    fontPairing: 'expressive',
    sectionOrder: ['hero', 'about', 'programs', 'gallery', 'news', 'cta'],
    variantConfig: {
      hero: {
        variant: 'carousel',
        showStatOverlay: false,
      },
      gallery: {
        view: 'masonry',
      },
      testimonial: {
        style: 'rail-only',
      },
      about: {
        layout: 'text-image-video',
      },
    },
  },
  {
    id: 'common-ground',
    name: 'Common Ground Foundation',
    causeCategory: 'Social Impact/General',
    orgName: 'Common Ground',
    tagline: 'Funding grassroots social impact startups and local micro-grants.',
    missionStatement: 'Empowering social innovators to build equitable solutions for local neighborhood challenges.',
    colorPreset: 'healthcare',
    fontPairing: 'scholarly',
    sectionOrder: ['hero', 'about', 'impactStats', 'programs', 'testimonials', 'cta'],
    variantConfig: {
      hero: {
        variant: 'image',
        showStatOverlay: true,
      },
      gallery: {
        view: 'grid',
      },
      testimonial: {
        style: 'featured',
      },
      about: {
        layout: 'text-only',
      },
    },
  },
];

export function getTemplateRecipe(id: string): TemplateRecipe | undefined {
  return TEMPLATE_RECIPES.find((recipe) => recipe.id === id);
}
