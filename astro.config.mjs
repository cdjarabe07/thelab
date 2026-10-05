// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  // Adresse publique du site (sitemap, RSS, liens de partage). À mettre à jour après la mise en ligne.
  site: 'https://thelab.vercel.app',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/recherche/') })],
  markdown: {
    // $…$ et $$…$$ dans les notes et les fiches sont rendus en formules (KaTeX)
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
    shikiConfig: { theme: 'vitesse-dark' },
  },
});
