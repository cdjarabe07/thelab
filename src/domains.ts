import { getCollection } from 'astro:content';
import { getActiveProjects, getNotes, getRoadmap, hasDomain, refIds } from './lib';

/** Tout ce que le lab contient pour un domaine, et les domaines qui lui sont le plus souvent associés. */
export async function domainIndex() {
  const [domains, projects, roadmap, notes, works, resources] = await Promise.all([
    getCollection('domains'), getActiveProjects(), getRoadmap(), getNotes(),
    getCollection('works'), getCollection('resources'),
  ]);
  const everything = [...projects, ...roadmap, ...notes, ...works, ...resources];

  return domains.map((d) => {
    const has = <T extends { data: { domains: { id: string }[] } }>(xs: T[]) => xs.filter((x) => hasDomain(x.data.domains, d.id));
    const items = {
      projects: has(projects), roadmap: has(roadmap), notes: has(notes), works: has(works), resources: has(resources),
    };
    // co-occurrence : combien de contenus partagent ce domaine avec chacun des autres
    const co = new Map<string, number>();
    for (const x of has(everything)) for (const id of refIds(x.data.domains)) if (id !== d.id) co.set(id, (co.get(id) ?? 0) + 1);
    const neighbours = [...co].sort((a, b) => b[1] - a[1]).slice(0, 6);
    const total = Object.values(items).reduce((n, xs) => n + xs.length, 0);
    return { domain: d, items, neighbours, total };
  });
}
