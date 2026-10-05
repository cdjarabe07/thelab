---
title: "13 communes sur 53 : tester la robustesse d'un classement"
type: "experience"
excerpt: "Le score combine trois indicateurs à poids égaux. En le recalculant sans le satellite, puis avec l'altitude seule, seules 13 communes gardent un rang stable. Ce que ça dit du score, et comment l'appli l'affiche."
draft: true
minutes: "5–7"
projects: ["dakar-risque-inondation"]
domains: ["data-science", "geospatial"]
order: 2
---

## La question

Le score de l'observatoire est la moyenne, à poids égaux, des z-scores de trois indicateurs : altitude basse, part de surface en cuvette, eau stagnante détectée par radar. Ce choix de poids est raisonnable, mais arbitraire.

Question : si on change la recette, le classement change-t-il ?

## Le protocole

Le rang de chaque commune est recalculé de deux autres façons :

1. sans les données radar (altitude et cuvettes seulement) ;
2. avec l'altitude seule.

Pour chaque commune, on retient l'écart maximal entre ses trois rangs. Le classement est jugé **stable** si cet écart ne dépasse pas 10 rangs.

## Le résultat

> Seules 13 communes sur 53 gardent un rang stable.

<div class="table-wrap"><table class="data">
<thead><tr><th>Commune</th><th>Rang</th><th>Écart maximal</th><th>Stable</th></tr></thead>
<tbody>
<tr><td>Pikine Ouest</td><td>1</td><td>1</td><td>Oui</td></tr>
<tr><td>Malika</td><td>2</td><td>3</td><td>Oui</td></tr>
<tr><td>Bargny</td><td>3</td><td>18</td><td>Non</td></tr>
<tr><td>Yenne</td><td>10</td><td>37</td><td>Non</td></tr>
<tr><td>Mermoz-Sacré-Cœur</td><td>52</td><td>1</td><td>Oui</td></tr>
<tr><td>Sicap-Liberté</td><td>53</td><td>0</td><td>Oui</td></tr>
</tbody>
</table></div>

Les extrêmes tiennent : le haut du classement (Pikine Ouest, Malika, Keur Massar Nord) et le bas (Sicap, Mermoz, Ouakam). Le milieu, lui, dépend des choix de méthode : Bargny, 3e, varie de 18 rangs selon la variante ; Yenne, 10e, de 37 rangs.

## Ce que l'appli en fait

Chaque fiche commune affiche un **badge de confiance** (haute, moyenne ou faible) calculé à partir de cette stabilité et de la détectabilité de l'eau par le radar. Une phrase d'explication apparaît au survol : le lecteur voit le rang, et ce qu'il vaut.

## Ce que j'en retiens

- Un classement sans test de robustesse donne une fausse impression de précision. Le test ne coûte que quelques lignes de code.
- Ici, l'information fiable se trouve surtout aux extrêmes : quelles communes sont nettement plus, ou nettement moins, exposées.
- Prochaines étapes : une analyse de sensibilité plus systématique sur les poids, et une validation sur des inondations observées.
