---
title: "Observatoire économique UEMOA"
summary: "Un observatoire macroéconomique public : 14 séries BCEAO, prévisions 2026–2027 avec intervalles de confiance à 95 %, comparaison régionale et méthodologie documentée."
lede: "Un observatoire macroéconomique public pour suivre l'économie sénégalaise et ouest-africaine : séries officielles de la BCEAO, prévisions 2026–2027 avec intervalles de confiance à 95 %, comparaison régionale et une méthodologie qui affiche ses limites. L'objectif à terme : un véritable outil d'analyse et d'aide à la décision."
status: "en-cours"
version: "v1 · en évolution"
level: "I"
order: 2
flag: true
domains: ["data-science", "time-series", "decision-intelligence", "data-engineering", "web"]
techniques: ["SARIMA", "Walk-forward validation", "Modèle naïf", "React", "Vite", "Recharts"]
links: [["Voir l'observatoire", "https://uemoa-dashboard.vercel.app/"], ["Code · pipeline", "https://github.com/cdjarabe07/Pr-vision-macro-conomique-automatis-e-UEMOA-Afrique-de-l-Ouest"], ["Code · dashboard", "https://github.com/cdjarabe07/UEMOA-Dashboard"]]
facts: [["Données", "14 séries · BCEAO via DBnomics"], ["Modèles", "SARIMA par indicateur · naïf si marche aléatoire"], ["Interface", "React · Vite · Recharts · FR / EN"]]
cover: {"src": "/img/uemoa-accueil.jpg", "alt": "Page d'accueil de l'observatoire économique UEMOA : titre, accès aux données et aux prévisions 2026–2027.", "caption": "Page d'accueil de l'observatoire. Données mises à jour le 20/09/2026."}
---

## Problème

Les données macroéconomiques de l'UEMOA existent, mais elles sont dispersées entre bases officielles, formats et fréquences. Pour un étudiant, un analyste ou un décideur, obtenir une vue claire de l'inflation, du PIB ou de la masse monétaire, avec une idée de leur évolution probable, demande beaucoup de travail manuel.

L'observatoire répond à une question simple : **où en est l'économie, et où va-t-elle probablement ?** Il le fait en publiant des prévisions accompagnées de leur incertitude, et en disant clairement quand un modèle ne fait pas mieux qu'une simple projection de la dernière valeur.

## Données

- **Source :** la BCEAO (Banque Centrale des États de l'Afrique de l'Ouest), consultée via DBnomics, qui agrège les données officielles des banques centrales et instituts statistiques.
- **Couverture :** environ 14 séries, dont l'inflation (IPC, depuis 1998), le PIB nominal (depuis 1960) et sa décomposition agriculture / industrie / services, la masse monétaire M2, le taux de change, la balance commerciale et les réserves de change.
- **Pays :** 4 pays de l'UEMOA sur 8 pour l'instant : Sénégal, Côte d'Ivoire, Burkina Faso, Mali. Les séries détaillées et les prévisions portent sur le Sénégal.
- **Fréquence :** principalement annuelle, ce qui limite la taille des échantillons (voir [Limites](#limites)).
- **Fraîcheur :** certaines séries ne sont plus mises à jour dans la base consultée (les réserves de change s'arrêtent en 2015). Elles sont affichées avec leur date d'origine plutôt que masquées.

Toutes les séries sont exportables depuis l'observatoire en CSV, JSON et PDF.

## Approche

### Un pipeline, un modèle par indicateur

Un pipeline récupère les séries via l'API DBnomics, construit des variables dérivées (retards, moyennes mobiles), entraîne un modèle de prévision pour chaque indicateur et exporte les résultats que l'interface affiche. La mise à jour est automatisée chaque mois. Pour chaque série, un **SARIMA** est entraîné avec une recherche automatique du meilleur ordre (p, d, q) : les candidats sont comparés sur leur erreur moyenne absolue (MAE) en **validation glissante** (walk-forward).

### Accepter le modèle naïf

Certaines séries, comme le taux de change XOF/USD ou la balance commerciale, se comportent comme une marche aléatoire : aucun modèle statistique ne fait mieux que la dernière valeur connue. Dans ce cas, le pipeline utilise le modèle naïf, l'affiche comme tel et ne publie pas de prévision artificielle.

### Des signaux calculés, pas des opinions

La page d'accueil affiche des alertes produites par des règles déterministes appliquées aux prévisions :

- l'intervalle de confiance à 95 % traverse zéro : le signe de la variation n'est pas établi ;
- la valeur centrale varie de plus de 25 % entre les deux années prévues ;
- un indicateur suivi n'a pas de prévision exportée (marche aléatoire).

## Résultats

<figure class="figure">
<img alt="Inflation au Sénégal de 1998 à 2024, puis prévisions 2026 et 2027 avec un intervalle de confiance qui traverse zéro." src="/img/uemoa-inflation.svg" style="border:0"/>
<figcaption>Inflation au Sénégal, 1998–2024, et prévisions 2026–2027 avec IC 95 %. 2025 n'est pas encore publiée dans la source.</figcaption>
</figure>

Extrait des prévisions publiées (Sénégal, mise à jour du 20/09/2026) :

<div class="table-wrap">
<table class="data">
<thead><tr><th>Indicateur</th><th>2026</th><th>IC 95 %</th><th>2027</th><th>Modèle · MAE</th></tr></thead>
<tbody>
<tr><td>PIB nominal</td><td class="num">21 920 Mds FCFA</td><td class="num">21 437 – 22 403</td><td class="num">23 476 Mds FCFA</td><td>SARIMA (2,1,0) · 361,61</td></tr>
<tr><td>Inflation</td><td class="num">2,9 %</td><td class="num">-1,3 % – 7 %</td><td class="num">1,7 %</td><td>SARIMA (1,1,2) · 1,42</td></tr>
<tr><td>Masse monétaire (M2)</td><td class="num">10 477 Mds FCFA</td><td class="num">9 948 – 11 007</td><td class="num">10 654 Mds FCFA</td><td>SARIMA</td></tr>
<tr><td>Taux de change</td><td colspan="3">Pas de prévision publiée : marche aléatoire</td><td>Naïf · 28,47</td></tr>
</tbody>
</table>
</div>

### Le SARIMA face au modèle naïf

Chaque modèle retenu est comparé à la prévision naïve (répéter la dernière valeur connue), en MAE sur validation glissante :

<div class="table-wrap">
<table class="data">
<thead><tr><th>Indicateur</th><th>MAE naïf</th><th>MAE SARIMA optimal</th><th>Gain</th></tr></thead>
<tbody>
<tr><td>Inflation</td><td class="num">2,37</td><td class="num">1,42</td><td class="num">−40 %</td></tr>
<tr><td>PIB nominal</td><td class="num">1 059,06</td><td class="num">361,61</td><td class="num">−66 %</td></tr>
<tr><td>Taux de change</td><td class="num">28,47</td><td class="num">28,45</td><td class="num">≈ 0 : marche aléatoire confirmée</td></tr>
</tbody>
</table>
</div>

À noter : l'intervalle de confiance de l'inflation traverse zéro en 2026 comme en 2027. Le modèle ne permet donc pas de dire si l'inflation sera positive ou négative, et l'observatoire le signale.

<figure class="figure">
<img alt="Page Prévisions de l'observatoire : prévisions 2026–2027 du PIB nominal avec intervalle de confiance." src="/img/uemoa-previsions.jpg"/>
<figcaption>Page Prévisions : observations, prévisions et intervalle de confiance à 95 %.</figcaption>
</figure>

## Limites

- **Échantillons courts.** Les séries sont annuelles : même les plus longues ne comptent que quelques dizaines de points, et l'inflation commence en 1998. Les intervalles de confiance restent donc larges.
- **Simulateur « et si » non activé.** Un SARIMAX reliant le prix du pétrole à l'inflation a été testé, mais l'échantillon annuel disponible (moins de 30 années) est trop court pour établir un lien statistiquement fiable. La fonctionnalité reste désactivée plutôt que d'afficher un résultat non prouvé.
- **Marches aléatoires.** Taux de change et balance commerciale ne sont pas prévisibles avec ces méthodes.
- **Couverture régionale partielle.** 4 pays sur 8 sont couverts (Sénégal, Côte d'Ivoire, Burkina Faso, Mali).
- **Séries figées.** Certaines séries ne sont plus mises à jour à la source.

## Technologies

- **Pipeline :** Python, pandas, statsmodels (SARIMA), client `dbnomics` ; exploration et modélisation dans Jupyter ; premier prototype de dashboard en Streamlit.
- **Interface :** React, Vite, Recharts (graphiques), React Router, i18next (FR / EN), jsPDF (exports PDF).
- **Données :** API DBnomics.
- **Hébergement :** Vercel.

## Étapes

<ol class="steps">
<li><span class="meta">Juillet 2026</span><div><strong>Pipeline de prévision</strong>Collecte automatique de 3 indicateurs (inflation, taux de change, PIB), feature engineering, comparaison naïf vs SARIMA, prototype Streamlit. <a href="https://github.com/cdjarabe07/Pr-vision-macro-conomique-automatis-e-UEMOA-Afrique-de-l-Ouest">Dépôt ↗</a></div></li>
<li><span class="meta">v1 · en ligne</span><div><strong>Observatoire public</strong>Passage à une interface React (pages Accueil, Données, Prévisions, Comparaison, Méthodologie) et à environ 14 séries : prévisions 2026–2027 avec IC 95 %, comparaison régionale sur 4 pays et étude des corrélations entre indicateurs, signaux calculés, méthodologie, exports CSV / JSON / PDF, mise à jour mensuelle automatisée.</div></li>
<li><span class="meta">Piste</span><div><strong>Élargir la couverture</strong>Les 4 pays de l'UEMOA restants (Bénin, Guinée-Bissau, Niger, Togo), et des séries trimestrielles ou mensuelles pour allonger les échantillons.</div></li>
<li><span class="meta">Piste</span><div><strong>Scénarios et aide à la décision</strong>Réactiver le simulateur « et si » si des séries plus longues ou plus fréquentes rendent le lien pétrole–inflation mesurable, pour passer de la prévision à l'analyse de scénarios.</div></li>
<li><span class="meta">Piste</span><div><strong>Plateforme éditoriale</strong>Accompagner les chiffres d'analyses rédigées : notes de conjoncture, explications des indicateurs, lecture des prévisions.</div></li>
</ol>

