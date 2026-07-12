import { getTemplateRecipe } from '@/lib/templates/registry';
import { TemplateComposition } from '@/components/templates/TemplateComposition';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Clearwater Relief Trust — Emergency Rapid Relief & Clean Water',
  description: 'A rapid-response disaster relief organization deploying water purification, medical aid, and survival support directly to families in crisis zones.',
};

export default async function ClearwaterHomepage() {
  const recipe = getTemplateRecipe('clearwater-relief');
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
