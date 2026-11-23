import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  // Textes de l'interface de Starlight que l'on veut reformuler (src/content/i18n/<langue>.json).
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
