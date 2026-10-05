import { defineCollection, reference } from 'astro:content';
import { readdirSync } from 'node:fs';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { PUBLICATION_FORMATS, RESOURCE_KINDS } from './data/lab';

const keys = <T extends Record<string, unknown>>(o: T) => Object.keys(o) as [keyof T & string, ...(keyof T & string)[]];

/*
 * Modèle de contenu de TheLab.
 *
 *   domains ◄──────────── projects ◄──── notes (un ou plusieurs projets)
 *      ▲  ▲                  │  ▲
 *      │  └── works          │  └── parent (programme : Dakar → Smart City)
 *      └───── resources ─────┘
 *
 * Toutes les flèches sont des `reference()` : une faute de frappe dans un identifiant
 * fait échouer le build au lieu de produire un lien mort.
 */

const domainRefs = z.array(reference('domains')).default([]);

// Vocabulaire contrôlé : un domaine = une page /domaines/<id>/
const domains = defineCollection({
  loader: file('src/content/domains.yaml'),
  schema: z.object({ name: z.string(), desc: z.string() }),
});

// Un seul modèle pour tout projet, de l'idée à l'étude de cas :
//   roadmap  → piste planifiée, pas commencée (pas de fiche)
//   en-cours → travail commencé, résultats publiés
//   termine  → projet clos
// Une piste devient un projet en changeant `status` et en écrivant la fiche sous le front matter.
const projects = defineCollection({
  // Les fichiers commençant par « _ » (ex. _modele.md) sont des modèles : ils ne sont pas publiés.
  loader: glob({ pattern: '[!_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    lede: z.string().optional(),
    status: z.enum(['roadmap', 'en-cours', 'termine']),
    version: z.string().default(''),
    level: z.enum(['I', 'II', 'III', 'IV', 'V']),
    order: z.number().default(99),
    flag: z.boolean().default(false),   // projet phare
    next: z.boolean().default(false),   // piste affichée parmi les prochains chantiers
    parent: reference('projects').optional(),
    started: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    domains: domainRefs,
    techniques: z.array(z.string()).default([]),
    links: z.array(z.tuple([z.string(), z.url()])).default([]),
    facts: z.array(z.tuple([z.string(), z.string()])).default([]),
    cover: z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() }).optional(),
    band: z.object({ label: z.string(), title: z.string(), text: z.string() }).optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '[!_]*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['journal', 'experience', 'apprentissage', 'reproduction', 'postmortem', 'reflexion']),
    excerpt: z.string(),
    date: z.coerce.date().optional(),   // obligatoire pour publier (voir le contrôle plus bas)
    draft: z.boolean().default(true),
    minutes: z.string(),
    projects: z.array(reference('projects')).default([]),   // une note peut concerner plusieurs projets
    domains: domainRefs,
    order: z.number().default(99),
  }).refine((n) => n.draft || n.date, { message: 'Une note publiée (draft: false) doit avoir une date.' }),
});

const works = defineCollection({
  loader: file('src/content/works.yaml'),
  schema: z.object({ title: z.string(), kind: z.string(), desc: z.string(), url: z.url(), domains: domainRefs }),
});

const resources = defineCollection({
  loader: file('src/content/resources.yaml'),
  schema: z.object({
    title: z.string(), kind: z.enum(keys(RESOURCE_KINDS)), url: z.url(), desc: z.string(),
    format: z.string().optional(), licence: z.string().optional(),
    project: reference('projects').optional(),
    domains: domainRefs,
  }),
});

// Publications : travaux formels (rapport technique, étude de cas, reproduction, article, présentation).
// Vide pour l'instant ; une publication = un fichier Markdown dans src/content/publications/.
// Tant que le dossier ne contient que le modèle, un chargeur vide évite les avertissements d'Astro.
export const publicationFiles = readdirSync('./src/content/publications').filter((f) => f.endsWith('.md') && !f.startsWith('_'));
const publications = defineCollection({
  loader: publicationFiles.length ? glob({ pattern: '[!_]*.md', base: './src/content/publications' }) : async () => [],
  schema: z.object({
    title: z.string(),
    format: z.enum(keys(PUBLICATION_FORMATS)),
    date: z.coerce.date(),
    abstract: z.string(),
    authors: z.array(z.string()).default(['Caleb Djarabé']),
    projects: z.array(reference('projects')).default([]),
    domains: domainRefs,
    links: z.array(z.tuple([z.string(), z.url()])).default([]),   // PDF, DOI, dépôt, support…
    citation: z.string().optional(),
  }),
});

export const collections = { domains, projects, notes, works, resources, publications };
