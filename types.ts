
export type ColorTheme = 'classic' | 'modern' | 'premium' | 'human' | 'corporate';

export interface LawyerData {
  name: string;
  specialty: string;
  city: string;
  state: string;
  differential: string;
  whatsapp: string;
  email: string;
  oab?: string;
  theme: ColorTheme;
}

export interface GeneratedPage {
  heroImageUrl?: string;
  heroImageKeyword: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    schema: string;
  };
  hero: {
    h1: string;
    subheadline: string;
    cta: string;
  };
  authority: {
    title: string;
    text: string;
    missionStatement: string;
  };
  practiceAreas: {
    title: string;
    areas: {
      name: string;
      description: string;
      slug: string;
      imageKeyword: string;
      generatedImageUrl?: string;
    }[];
  };
  localSeoSection: {
    title: string;
    content: string;
  };
  differentiators: {
    title: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  footer: {
    disclaimer: string;
    address: string;
  };
}

export type AppStep = 'landing' | 'form' | 'generating' | 'preview';
