import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { NOTE_TYPES } from '../../data/lab';
import { getNotes } from '../../lib';

// Flux RSS du carnet. Les brouillons n'y figurent pas : une note entre dans le flux le jour où elle est publiée.
export async function GET(context: APIContext) {
  const notes = (await getNotes()).filter((n) => !n.data.draft);
  return rss({
    title: 'TheLab · Notes',
    description: "Le carnet de laboratoire de Caleb Djarabé : expérimentations, apprentissages, post-mortems et réflexions en data et en IA.",
    site: context.site!,
    items: notes.map((n) => ({
      title: n.data.title,
      description: n.data.excerpt,
      pubDate: n.data.date,
      link: `/notes/${n.id}/`,
      categories: [NOTE_TYPES[n.data.type].name],
    })),
    customData: '<language>fr-fr</language>',
  });
}
