---
# MODÈLE DE FICHE PROJET — ce fichier n'est pas publié (son nom commence par « _»).
# Copier sous un nouveau nom (ex. mon-projet.md) : le nom devient l'adresse /projects/mon-projet/.
#
# Une fiche documente une démarche de recherche, pas seulement un résultat.
# Toutes les sections sont facultatives : ne garder que celles pour lesquelles il existe un contenu réel.
# Ne jamais remplir une section avec un résultat supposé ou espéré.

title: "Nom du projet"
summary: "Une phrase pour les listes : le problème traité et ce que le projet produit."
lede: "Le chapeau de la fiche (2 à 4 phrases)."
status: "en-cours"          # roadmap | en-cours | termine
version: "v1 · en évolution"
level: "II"                 # I à V, voir la trajectoire
order: 10                   # position dans les listes
domains: ["data-science"]   # identifiants de src/content/domains.yaml
techniques: ["SARIMA"]      # libellés libres, affichés dans la colonne de gauche
links: [["Voir le dashboard", "https://exemple.org"], ["Code", "https://github.com/cdjarabe07/depot"]]
facts: [["Données", "…"], ["Méthode", "…"], ["Interface", "…"]]
# cover: {"src": "/img/capture.jpg", "alt": "Description de l'image", "caption": "Légende"}
# parent: "smart-city"      # si le projet est un chantier d'un programme
---

## Question de départ

La question précise à laquelle le projet cherche à répondre.

## Contexte

Pourquoi cette question se pose, pour qui, ce qui existe déjà.

## Données et sources

Sources, couverture, période, fréquence, fraîcheur, licences.

## Méthodologie

Les choix de méthode et leur justification.

## Architecture et pipeline

Comment les données circulent, du téléchargement à l'interface ; technologies utilisées.

## Expérimentations

Ce qui a été comparé ou testé, avec le protocole.

## Résultats

Les résultats obtenus, avec leur incertitude et la date des données.

## Limites

Ce que les résultats ne permettent pas d'affirmer.

## Ce qui n'a pas fonctionné

Les pistes abandonnées, les modèles écartés, les fonctionnalités désactivées, et pourquoi.

## Interprétation

Ce qu'on peut raisonnablement conclure, compte tenu des limites.

## État actuel

Ce qui est en ligne, ce qui est en cours, la date de la dernière mise à jour.

## Prochaines pistes

Les étapes envisagées. Ce ne sont pas des engagements.

<!--
Les deux dernières sections sont générées automatiquement, ne pas les écrire :
  - « Code, dashboard et ressources » : à partir de `links` et des ressources rattachées au projet (resources.yaml)
  - « Notes associées » : toutes les notes dont `projects` contient ce projet
-->
