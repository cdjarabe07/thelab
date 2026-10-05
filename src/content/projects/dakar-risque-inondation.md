---
title: "Observatoire du risque d'inondation — Dakar"
summary: "Premier chantier de « Dakar ville intelligente » : classement relatif des 53 communes de la région de Dakar selon leur exposition physique aux inondations (radar Sentinel-1, Copernicus DEM, OpenStreetMap), avec une IA générative qui explique chaque résultat et ses limites."
lede: "Un classement relatif des 53 communes d'arrondissement de la région de Dakar selon leur exposition physique aux inondations, construit à partir de données satellitaires et topographiques ouvertes. Une application web le rend lisible, avec une IA générative qui explique chaque résultat et ses limites. Premier chantier du projet « Dakar ville intelligente »."
status: "en-cours"
version: "Smart City · chantier 1"
level: "II"
order: 1
flag: true
domains: ["geospatial", "earth-observation", "data-science", "llm", "web"]
techniques: ["Sentinel-1 SAR", "Copernicus DEM", "Z-scores", "Test de robustesse", "Gradio", "React", "deck.gl", "Groq"]
links: [["Ouvrir l'appli", "https://web-plum-one-49.vercel.app"], ["Code", "https://github.com/cdjarabe07/dakar-risque-inondation"]]
facts: [["Unité", "53 communes d'arrondissement"], ["Données", "Sentinel-1 · Copernicus DEM · OSM · CHIRPS"], ["Application", "React · deck.gl · Groq · Vercel"]]
band: {"label": "Figure 1", "title": "Score relatif d'exposition, par commune", "text": "Les communes claires sont les plus exposées : Pikine Ouest, Malika, Bargny, Tivaouane Peulh-Niaga. Survolez une commune pour voir son rang."}
parent: "smart-city"
---

## Problème

Chaque saison des pluies, une partie de l'agglomération dakaroise est inondée. Mais quelles communes sont physiquement les plus exposées, et sur quelles données peut-on l'affirmer ? Les informations existent (images satellites, modèles d'altitude, cartes collaboratives), mais elles sont brutes, techniques et dispersées.

Le projet construit un indicateur comparable entre les 53 communes de la région, et le rend consultable par des non-spécialistes, sans cacher ce que l'indicateur ne mesure pas.

Zones prioritaires de l'étude : Pikine, Guédiawaye, Médina, Yeumbeul et Grand Yoff.

## Données

<div class="table-wrap">
<table class="data">
<thead><tr><th>Source</th><th>Usage</th><th>Résolution · période</th></tr></thead>
<tbody>
<tr><td>OpenStreetMap (Overpass)</td><td>Contours des 53 communes, découpés sur le trait de côte</td><td>—</td></tr>
<tr><td>Copernicus Sentinel-1 (radar)</td><td>Eau stagnante après fortes pluies</td><td>3 dates : 22/08/2024, 27/09/2024, 29/08/2025</td></tr>
<tr><td>Copernicus DEM GLO-30</td><td>Altitude du sol et cuvettes</td><td>30 m</td></tr>
<tr><td>CHIRPS v2.0</td><td>Dater les épisodes de fortes pluies</td><td>≈ 5,5 km · 2023–2026</td></tr>
</tbody>
</table>
</div>

Environ 200 Mo d'images et de données brutes sont retéléchargés par les notebooks ; seuls les résultats sont versionnés dans le dépôt.

## Méthode

Trois indicateurs sont calculés pour chaque commune :

1. **Altitude médiane du sol**, à partir du modèle d'altitude dont les bâtiments sont retirés par un filtre morphologique (ouverture de 150 m).
2. **Part de surface en cuvette** : zones au moins 1 m plus basses que leur voisinage, dans un rayon d'environ 1 km.
3. **Part de surface en eau stagnante** détectée par le radar juste après de fortes pluies, comparée à une référence de saison sèche (mai). Les plans d'eau permanents sont exclus.

Le score est la moyenne, à poids égaux, des z-scores des trois indicateurs, ramenée sur une échelle de 0 à 100, puis découpée en 5 classes de taille égale. La pluie (CHIRPS) et la pente sont volontairement exclues du score.

<figure class="figure">
<img alt="Trois panneaux : image radar de référence en saison sèche, image radar après la pluie du 27 septembre 2024, et carte de l'eau détectée (rouge : eau stagnante, bleu : eau permanente)." src="/img/dakar-verification-s1.jpg"/>
<figcaption>Figure 2 · Vérification de la détection radar : référence sèche (mai), image après la pluie du 27/09/2024, et eau détectée (rouge : stagnante, bleu : permanente).</figcaption>
</figure>

## Résultats

Les communes en tête et en queue du classement :

<div class="table-wrap">
<table class="data">
<thead><tr><th>Rang</th><th>Commune</th><th>Score</th><th>Altitude médiane</th><th>Surface en cuvette</th><th>Rang stable</th></tr></thead>
<tbody>
<tr><td>1</td><td>Pikine Ouest</td><td class="num">100</td><td class="num">2,3 m</td><td class="num">44 %</td><td>Oui</td></tr>
<tr><td>2</td><td>Malika</td><td class="num">95,1</td><td class="num">5,3 m</td><td class="num">35 %</td><td>Oui</td></tr>
<tr><td>3</td><td>Bargny</td><td class="num">94,1</td><td class="num">7,7 m</td><td class="num">33 %</td><td>Non</td></tr>
<tr><td>4</td><td>Tivaouane Peulh-Niaga</td><td class="num">91,1</td><td class="num">5,9 m</td><td class="num">24 %</td><td>Oui</td></tr>
<tr><td>5</td><td>Médina Gounass</td><td class="num">86,6</td><td class="num">6,8 m</td><td class="num">58 %</td><td>Non</td></tr>
<tr><td class="muted" colspan="6">…</td></tr>
<tr><td>50</td><td>Ouakam</td><td class="num">18,8</td><td class="num">32,1 m</td><td class="num">34 %</td><td>Oui</td></tr>
<tr><td>52</td><td>Mermoz-Sacré-Cœur</td><td class="num">13,1</td><td class="num">29,5 m</td><td class="num">26 %</td><td>Oui</td></tr>
<tr><td>53</td><td>Sicap-Liberté</td><td class="num">0</td><td class="num">32,8 m</td><td class="num">25 %</td><td>Oui</td></tr>
</tbody>
</table>
</div>

Le haut du classement (Pikine Ouest, Malika, Keur Massar Nord) et le bas (Sicap, Mermoz, Ouakam) restent stables quelle que soit la combinaison d'indicateurs. Le milieu du classement dépend des choix de méthode.

<figure class="figure">
<img alt="Application web : carte des communes à gauche, fiche de Pikine Ouest à droite avec son score de 100 sur 100, son badge de confiance haute et ses indicateurs." src="/img/dakar-appli.jpg"/>
<figcaption>Figure 3 · L'application web : carte, fiche commune avec badge de confiance, bouton « Expliquer ce risque » et chat.</figcaption>
</figure>

## Robustesse

Le rang de chaque commune est recalculé de deux autres façons : sans les données radar, puis avec l'altitude seule. Un classement est jugé stable si l'écart ne dépasse pas 10 rangs.

> Seules 13 communes sur 53 gardent un rang stable.

Plutôt que de le cacher, l'appli affiche pour chaque commune un **badge de confiance** (haute, moyenne ou faible), calculé à partir de cette stabilité et de la capacité du radar à voir l'eau dans la commune. 21 communes portent en plus une alerte : aucune eau n'y a été détectée par satellite, ce qui peut venir du bâti dense plutôt que d'une absence d'inondation.

## L'IA dans l'appli

Le principe affiché par l'appli : **l'IA explique le risque, elle ne le décide pas.**

- Un bouton « Expliquer ce risque » et un chat, servis par un modèle de langage via Groq (`openai/gpt-oss-120b`).
- Le modèle ne reçoit que les données de l'observatoire. Le sens de chaque indicateur (« fait monter / baisser le risque ») est calculé à l'avance pour éviter les contresens, et chaque réponse doit mentionner les limites de fiabilité de la commune.
- Les questions hors sujet sont refusées. Les tentatives de détournement sont testées.
- Chaque appel est coupé au bout de 5 secondes. En cas d'erreur, de clé absente ou de quota atteint, l'appli affiche une réponse pré-rédigée à partir des données : elle affiche toujours quelque chose.
- La clé d'API ne quitte jamais le serveur ; un visiteur est limité à 10 questions par minute.

## Limites

- **Un classement, pas une probabilité.** Le score compare les communes entre elles et n'a pas été validé sur des inondations observées.
- **L'aléa, pas la vulnérabilité.** Il manque des facteurs majeurs : drainage, nappe phréatique affleurante, imperméabilisation des sols, population.
- **Le radar ne voit pas l'eau en bâti dense** (effet de double rebond entre l'eau et les façades). Pikine, Thiaroye, Guinaw Rail et Médina ressortent à 0 %.
- **Peu de dates radar.** Trois images, un passage tous les 12 jours : on voit l'eau qui persiste 1 à 5 jours après la pluie, pas le pic.
- **Altitude imprécise.** Précision verticale d'environ 2 m : des écarts de 1 à 2 m entre communes ne sont pas significatifs.
- **Pluie inutilisable par commune.** CHIRPS n'a aucun pixel valide pour 13 communes sur 53, dont 11 prioritaires.
- **Échelle de la commune.** Les communes vont de 0,2 à 70 km² ; un résultat ne dit rien des différences entre quartiers. Les contours OSM ne sont pas officiels.

## Technologies

- **Analyse :** Python, 4 notebooks Jupyter (collecte des contours, pluie, satellite et topographie, calcul du score), Copernicus Data Space (client sentinelhub).
- **Première appli :** Gradio, cartes pydeck (3D) et Plotly (2D).
- **Version web :** React, TypeScript, Vite, deck.gl sur fond MapLibre, deux fonctions serveur Vercel pour l'IA.
- **Tests :** 18 scénarios sans clé d'API (délai, erreurs, carte, comparaison, confiance), plus des appels réels avec clé ; tests de parité entre la version web et l'appli Python.

## Étapes

<ol class="steps">
<li><span class="meta">Analyse</span><div><strong>Notebooks 00 → 03</strong>Contours des communes, pluie, radar et altitude, score composite et contrôle de robustesse.</div></li>
<li><span class="meta">Appli</span><div><strong>Appli Gradio</strong>Carte 3D / 2D, fiche commune, badge de confiance, comparaison, explication et chat par IA avec réponses de secours.</div></li>
<li><span class="meta">En ligne</span><div><strong>Version web</strong>Réécriture en React et deck.gl, mêmes données et mêmes calculs, vérifiés par des tests de parité. Carte cliquable, recherche de commune, déploiement sur Vercel.</div></li>
<li><span class="meta">Piste</span><div><strong>Vers la vulnérabilité</strong>Ajouter drainage, imperméabilisation et population, et confronter le score à des inondations observées.</div></li>
<li><span class="meta">Piste</span><div><strong>Chantiers suivants de la Smart City</strong>Mobilité, qualité de l'air, énergie : voir la <a href="/roadmap/">roadmap</a>.</div></li>
</ol>

