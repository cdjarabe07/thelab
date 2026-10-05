# TheLab

Le site de TheLab, le laboratoire de Caleb Djarabé en data et en IA. Site statique construit avec [Astro](https://astro.build) : pas de base de données, pas de serveur, hébergement gratuit.

```bash
npm install
npm run dev       # http://localhost:4321, rechargement à chaque modification
npm run build     # site + index de recherche + vérification des liens → dist/
npm run preview   # sert dist/ (la recherche ne fonctionne qu'ici, après un build)
```

## Modèle de contenu

Tout le contenu est dans `src/content/`, validé au build par `src/content.config.ts`.

```
domains.yaml ◄──────────── projects/*.md ◄──── notes/*.md
     ▲  ▲                     │  ▲
     │  └── works.yaml        │  └── parent (programme : Dakar → Smart City)
     └───── resources.yaml ───┘
```

| Collection | Fichier | Rôle |
|---|---|---|
| `domains` | `domains.yaml` | Vocabulaire contrôlé. Chaque domaine a sa page `/domaines/<id>/`. |
| `projects` | `projects/<id>.md` | Tout projet, de l'idée à l'étude de cas. `status` : `roadmap`, `en-cours` ou `termine`. |
| `notes` | `notes/<id>.md` | Le carnet : six types (journal, expérimentation, apprentissage, reproduction, post-mortem, réflexion). |
| `works` | `works.yaml` | Stages, compétitions, analyses, exercices. |
| `resources` | `resources.yaml` | Données, outils, code réutilisables. |

Toutes les flèches sont des références vérifiées : une note qui cite un projet inexistant, ou un domaine mal orthographié, **fait échouer le build** avec un message qui dit quoi corriger. Rien de cassé ne part en ligne.

La configuration (niveaux, types de notes, menu, liens) est dans `src/data/lab.ts`.

## Tâches courantes

### Écrire une note

Créer `src/content/notes/mon-titre.md` (le nom du fichier devient l'adresse `/notes/mon-titre/`) :

```markdown
---
title: "Titre de la note"
type: "experience"
excerpt: "Une ou deux phrases qui résument la note."
draft: true
minutes: "4–6"
project: "dakar-risque-inondation"
domains: ["geospatial", "data-science"]
---

## Première section

Du Markdown. Chaque titre `##` entre dans le sommaire. Les formules s'écrivent en LaTeX :
$y_t = y_{t-1} + \varepsilon_t$ en ligne, ou en bloc entre `$$`.
```

Pour publier : `draft: false` et une `date: 2026-10-12` (le build refuse une note publiée sans date). Une note publiée entre dans le flux RSS et reçoit sa date dans la référence « Citer cette note ».

### Lancer une piste de la roadmap

Ouvrir `src/content/projects/<piste>.md`, passer `status: "roadmap"` à `status: "en-cours"` et écrire la fiche sous le front matter. Le projet quitte la roadmap, apparaît dans Projects et obtient sa page. Les pistes `next: true` sont les « prochains chantiers » de la page Projects.

Un sous-projet déclare son programme avec `parent: "smart-city"` : le programme s'affiche alors « Commencé », avec le lien vers le chantier.

### Ajouter un domaine

Ajouter une ligne dans `src/content/domains.yaml`. Il ne peut pas y avoir de tag hors de cette liste.

### Activer les commentaires (Giscus)

Les discussions sous les notes sont stockées dans les **Discussions GitHub** du dépôt : pas de base de données, et les lecteurs commentent avec leur compte GitHub. Une discussion est créée automatiquement au premier commentaire d'une note.

1. Le dépôt `cdjarabe07/thelab` doit être **public**.
2. *Settings → General → Features* : cocher **Discussions**. Créer une catégorie **Notes** de type *Announcement* (seul toi et Giscus peuvent ouvrir une discussion ; tout le monde peut y répondre).
3. Installer l'app Giscus sur le dépôt : https://github.com/apps/giscus
4. Sur https://giscus.app, saisir `cdjarabe07/thelab`, choisir la catégorie **Notes** et copier `data-repo-id` et `data-category-id`.
5. Les coller dans `GISCUS` (`src/data/lab.ts`) : `repoId` et `categoryId`.

Le thème aux couleurs du site (`public/giscus-theme.css`) s'applique en production, une fois `site` renseigné dans `astro.config.mjs`.

## Ce que le build garantit

1. **Schémas** : champs obligatoires, valeurs autorisées, URL valides.
2. **Intégrité** : aucune référence vers un projet ou un domaine inexistant (`assertIntegrity` dans `src/lib.ts`).
3. **Liens** : `scripts/check-links.mjs` vérifie chaque lien interne et chaque ancre `#section` des pages générées.
4. **Recherche** : Pagefind indexe les fiches, les notes, les domaines et About (pas les listes).

Le site produit aussi un sitemap, un flux RSS (`/notes/rss.xml`), des métadonnées structurées (schema.org) et une image de partage (`public/og.png`, régénérable avec `python scripts/make-og.py`). Les polices sont servies par le site lui-même : aucune requête vers un service tiers.

## Mettre en ligne (gratuit)

1. Créer un dépôt GitHub `thelab` et y pousser ce dossier.
2. Sur [vercel.com/new](https://vercel.com/new), importer le dépôt. Vercel reconnaît Astro : cliquer sur **Deploy**.
3. Le site est en ligne sur https://thelab-beta.vercel.app (adresse reportée dans `site`, `astro.config.mjs`).

Chaque `git push` reconstruit et republie le site ; si le build échoue (contenu incohérent, lien mort), la version en ligne reste inchangée.
