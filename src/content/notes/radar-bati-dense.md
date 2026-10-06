---
title: "Le radar ne voit pas l'eau en ville"
type: "apprentissage"
excerpt: "Pikine, Thiaroye, Guinaw Rail et Médina ressortent à 0 % d'eau stagnante après les fortes pluies. Ce n'est pas une absence d'inondation : c'est une limite physique du radar Sentinel-1 en bâti dense."
draft: false
date: 2026-10-06
minutes: "5–6"
projects: ["dakar-risque-inondation"]
domains: ["earth-observation", "geospatial"]
order: 1
---

## Le constat

Pour mesurer l'eau stagnante dans chaque commune de Dakar, l'observatoire compare des images radar Sentinel-1 prises juste après de fortes pluies (22/08/2024, 27/09/2024, 29/08/2025) à une image de référence de saison sèche (mai).

Résultat surprenant : plusieurs communes connues pour être inondées chaque année, comme Pikine, Thiaroye, Guinaw Rail ou Médina, ressortent à **0 %**. Au total, 21 communes sur 53 n'ont aucune eau détectée.

## Comment le radar voit l'eau

Un radar à synthèse d'ouverture (SAR) envoie une onde vers le sol et mesure ce qui lui revient. Une surface d'eau calme agit comme un miroir : l'onde est renvoyée loin du satellite, et l'eau apparaît **sombre** sur l'image.

La détection repose donc sur deux règles : un pixel est considéré comme de l'eau s'il est assez sombre (seuils entre −15 et −22 dB) et s'il s'est nettement assombri par rapport à la saison sèche (baisse d'au moins 3 dB).

<figure class="figure">
<img alt="Image radar de référence en saison sèche, image après la pluie du 27 septembre 2024, et carte de l'eau détectée." src="/img/dakar-verification-s1.jpg"/>
<figcaption>Référence sèche (mai), image après la pluie du 27/09/2024, et eau détectée (rouge : stagnante, bleu : permanente).</figcaption>
</figure>

## Pourquoi la ville l'aveugle

En bâti dense, l'onde touche l'eau, rebondit sur la façade d'un bâtiment, puis repart vers le satellite. C'est l'effet de **double rebond** : au lieu de s'assombrir, la zone inondée devient brillante. Les deux règles de détection échouent.

D'autres facteurs s'ajoutent :

- le satellite ne repasse que tous les 12 jours : il voit l'eau qui persiste 1 à 5 jours après la pluie, pas le pic de l'inondation ;
- une bande côtière de 100 m est exclue, à cause du sable mouillé et du ressac ;
- les surfaces détectées restent faibles (0,1 à 0,3 % de la terre ferme), donc les écarts entre communes sont bruités.

## Ce que l'appli en fait

Les communes sans eau détectée portent une **alerte satellite** dans leur fiche, et leur badge de confiance en tient compte. Le score ne repose pas que sur le radar : l'altitude et les cuvettes, calculées à partir du modèle d'altitude, comptent autant.

<div class="callout"><span class="label">À retenir</span>Une absence de détection n'est pas une absence d'eau. Elle doit être signalée comme telle, jamais affichée comme un zéro rassurant.</div>

## Ce que j'en retiens

- Connaître la physique du capteur compte autant que l'algorithme : un seuil bien choisi ne corrige pas un capteur aveugle.
- Les zones parmi les plus exposées sont aussi celles que la méthode voit le moins bien. Sans précaution, le score aurait sous-estimé une partie des quartiers prioritaires.
- Pistes à explorer : des images à plus haute résolution, des signalements d'inondations observées pour valider, et des méthodes de détection adaptées au milieu urbain.
