// Configuration du lab. Le contenu (projets, notes, domaines, travaux, ressources) est dans src/content/.

export const SITE = {
  name: "TheLab",
  author: "Caleb Djarabé",
  description: "TheLab — l'espace de recherche, d'expérimentation et de documentation de Caleb Djarabé, en data et en IA.",
};

export const LINKS = {
  github: "https://github.com/cdjarabe07",
  linkedin: "https://www.linkedin.com/in/caleb-djarabe",
};

export const NAV: [string, string, string][] = [
  ["home", "/", "TheLab"],
  ["projects", "/projects/", "Projects"],
  ["notes", "/notes/", "Notes"],
  ["publications", "/publications/", "Publications"],
  ["resources", "/resources/", "Resources"],
  ["about", "/about/", "About"],
];

export const LEVELS: Record<string, { name: string; desc: string }> = {
  I:   { name: "Fondations",    desc: "Data science, ML, séries temporelles, premiers pas en vision et en NLP." },
  II:  { name: "Deep AI",       desc: "Vision, NLP et LLM, recommandation, Graph ML, forecasting avancé." },
  III: { name: "Systems",       desc: "MLOps, temps réel, data engineering : passer du modèle au système." },
  IV:  { name: "Gros systèmes", desc: "Smart City, multimodal, agents, digital twin." },
  V:   { name: "R&D",           desc: "Reproduire des papiers, les modifier, puis poser ses propres questions." },
};
export const CURRENT_LEVELS: Record<string, string> = { I: "Consolidation", II: "En cours" };

export const STATUS: Record<string, string> = { "en-cours": "En cours", termine: "Terminé", roadmap: "Planifié" };

export const NOTE_TYPES: Record<string, { name: string; desc: string }> = {
  journal:       { name: "Journal",         desc: "L'avancement d'un projet : versions, décisions, changements de cap." },
  experience:    { name: "Expérimentation", desc: "Un essai, son protocole et son résultat, y compris quand il est négatif." },
  apprentissage: { name: "Apprentissage",   desc: "Une notion apprise, réexpliquée avec mes mots et mes exemples." },
  reproduction:  { name: "Reproduction",    desc: "Refaire un papier ou une méthode publiée et comparer aux résultats." },
  postmortem:    { name: "Post-mortem",     desc: "Ce qui n'a pas marché, pourquoi, et ce que je change." },
  reflexion:     { name: "Réflexion",       desc: "Choix techniques, méthode, lectures, questions ouvertes." },
};

/**
 * Commentaires des notes (Giscus) : stockés dans les Discussions GitHub du dépôt, sans base de données.
 * Pour les activer : rendre le dépôt public, activer les Discussions, installer l'app giscus
 * (https://github.com/apps/giscus), puis copier repoId et categoryId depuis https://giscus.app.
 * Tant que ces deux champs sont vides, aucune zone de commentaires n'est affichée.
 */
export const GISCUS = {
  repo: "cdjarabe07/thelab",
  repoId: "R_kgDOU75a7g",
  category: "Notes",
  categoryId: "DIC_kwDOU75a7s4DHDf7",
};
export const giscusEnabled = () => Boolean(GISCUS.repoId && GISCUS.categoryId);
