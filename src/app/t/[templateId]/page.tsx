import { TEMPLATE_RECIPES, getTemplateRecipe } from '@/lib/templates/registry';
import { TemplateComposition } from '@/components/templates/TemplateComposition';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ templateId: string }>;
}

export async function generateStaticParams() {
  return TEMPLATE_RECIPES.map((recipe) => ({
    templateId: recipe.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { templateId } = await params;
  const recipe = getTemplateRecipe(templateId);
  if (!recipe) return {};

  return {
    title: `${recipe.name} — ${recipe.causeCategory} Template`,
    description: recipe.tagline,
  };
}

export default async function TemplatePage({ params }: PageProps) {
  const { templateId } = await params;
  const recipe = getTemplateRecipe(templateId);

  if (!recipe) {
    notFound();
  }

  return (
    <>
      {/* Set theme and font pairing during SSR parse to eliminate layout shift */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.setAttribute('data-theme', '${recipe.colorPreset}');
            document.documentElement.setAttribute('data-font-pairing', '${recipe.fontPairing}');
          `,
        }}
      />
      <TemplateComposition recipe={recipe} />
    </>
  );
}
