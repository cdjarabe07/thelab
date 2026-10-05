import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Note = CollectionEntry<'notes'>;
export type Domain = CollectionEntry<'domains'>;
type Ref = { id: string };

/** Une fiche existe dès que le fichier contient du texte sous le front matter (hors commentaires). */
export const hasPage = (p: Project) => (p.body ?? '').replace(/<!--[\s\S]*?-->/g, '').trim().length > 0;
export const projectUrl = (p: Project) => (hasPage(p) ? `/projects/${p.id}/` : null);
export const noteUrl = (n: Note) => `/notes/${n.id}/`;
export const domainUrl = (id: string) => `/domaines/${id}/`;

// ---- Chargement (Astro met les collections en cache : ces appels sont gratuits)
const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

export async function getProjects() {
  return (await getCollection('projects')).sort(byOrder);
}
/** Projets commencés ou terminés (hors roadmap). */
export async function getActiveProjects() {
  return (await getProjects()).filter((p) => p.data.status !== 'roadmap');
}
export async function getRoadmap() {
  return (await getProjects()).filter((p) => p.data.status === 'roadmap');
}
export async function getNotes() {
  // notes publiées d'abord (plus récentes en tête), puis brouillons selon `order`
  return (await getCollection('notes')).sort((a, b) =>
    (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0) || byOrder(a, b));
}
export async function getDomains() {
  const all = await getCollection('domains');
  return new Map(all.map((d) => [d.id, d]));
}

/** Sous-projets lancés d'un programme (ex. Smart City → Dakar). */
export async function getChildren(p: Project) {
  return (await getActiveProjects()).filter((c) => c.data.parent?.id === p.id);
}

export const refIds = (refs: Ref[] = []) => refs.map((r) => r.id);
export const hasDomain = (refs: Ref[], id: string) => refs.some((r) => r.id === id);

const fmt = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
export const formatDate = (d?: Date) => (d ? fmt.format(d) : '');
export const isoDate = (d?: Date) => (d ? d.toISOString().slice(0, 10) : '');

/**
 * Contrôle d'intégrité du contenu, exécuté une fois par build (appelé depuis Base.astro).
 * Astro signale une référence cassée mais termine quand même le build : ici, on l'arrête.
 */
let integrity: Promise<void> | undefined;
export function assertIntegrity() {
  return (integrity ??= (async () => {
    const cols = ['domains', 'projects', 'notes', 'works', 'resources'] as const;
    const all = Object.fromEntries(await Promise.all(cols.map(async (c) => [c, await getCollection(c)]))) as Record<string, { id: string; data: Record<string, unknown> }[]>;
    const exists = (col: string, id: string) => all[col].some((e) => e.id === id);
    const problems: string[] = [];
    for (const col of cols) for (const e of all[col]) for (const [field, value] of Object.entries(e.data)) {
      const refs = (Array.isArray(value) ? value : [value]).filter((v): v is { collection: string; id: string } =>
        !!v && typeof v === 'object' && 'collection' in v && 'id' in v);
      for (const r of refs) if (!exists(r.collection, r.id)) problems.push(`${col}/${e.id} → ${field} : « ${r.id} » n'existe pas dans ${r.collection}`);
    }
    if (problems.length) throw new Error(`Contenu incohérent (${problems.length}) :\n  ${problems.join('\n  ')}`);
  })());
}
