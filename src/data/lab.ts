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

/** Types de ressources (page Resources), dans l'ordre d'affichage. */
export const RESOURCE_KINDS: Record<string, { name: string; desc: string }> = {
  donnees:   { name: "Données",   desc: "Jeux de données nettoyés ou exportés, avec leur source et leur licence." },
  notebooks: { name: "Notebooks", desc: "Analyses reproductibles, prêtes à être exécutées." },
  code:      { name: "Code",      desc: "Dépôts et pipelines issus des projets." },
  outils:    { name: "Outils",    desc: "Applications et dashboards utilisables en ligne." },
  lectures:  { name: "Lectures",  desc: "Papiers, livres et cours qui ont nourri le travail du lab." },
};

/** Formats de publication (page Publications). */
export const PUBLICATION_FORMATS: Record<string, { name: string; desc: string }> = {
  rapport:        { name: "Rapport technique",  desc: "La synthèse complète d'un projet : données, méthode, résultats, limites." },
  "etude-de-cas": { name: "Étude de cas",       desc: "Un problème appliqué traité de bout en bout, rédigé pour être lu hors du lab." },
  reproduction:   { name: "Reproduction",       desc: "Le compte rendu formel d'un papier reproduit, avec les écarts observés." },
  article:        { name: "Article / preprint", desc: "Un travail de recherche original, soumis ou déposé." },
  presentation:   { name: "Présentation",       desc: "Supports de talks, séminaires ou meetups." },
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

/**
 * Formulaire de contact (Web3Forms) : les messages arrivent par e-mail, sans serveur.
 * Clé gratuite sur https://web3forms.com (saisir l'adresse de réception, la clé arrive par e-mail).
 * Cette clé est faite pour être publique : elle ne permet que d'envoyer un message vers cette adresse.
 * Tant qu'elle est vide, la page About affiche seulement les liens LinkedIn et GitHub.
 */
export const CONTACT = { web3formsKey: "a02567b5-8e6f-4617-9ffa-d367864d9286" };

/**
 * Newsletter (Buttondown) : les abonnés reçoivent les nouvelles notes par e-mail.
 * Compte gratuit sur https://buttondown.com ; indiquer ici le nom d'utilisateur.
 * L'envoi automatique se règle dans Buttondown (Automations → RSS-to-email) avec le flux /notes/rss.xml.
 * Tant que ce champ est vide, aucun formulaire d'abonnement n'est affiché.
 */
export const NEWSLETTER = { buttondown: "" };

/**
 * Statistiques de visite (Vercel Web Analytics) : sans cookies, sans bandeau de consentement.
 * Le script n'existe sur le site qu'une fois l'option activée dans le tableau de bord Vercel
 * (projet thelab → Analytics → Enable). Passer à false pour le retirer.
 */
export const ANALYTICS = { vercel: true };
