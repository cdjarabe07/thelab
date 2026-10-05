---
title: "Pourquoi le simulateur « et si » reste désactivé"
type: "postmortem"
excerpt: "Un SARIMAX reliant prix du pétrole et inflation a été testé. Avec moins de 30 années de données annuelles, le lien n'est pas statistiquement fiable : la fonctionnalité attend."
draft: true
minutes: "3–4"
projects: ["observatoire-uemoa"]
domains: ["time-series", "decision-intelligence"]
order: 5
---

## L'idée

Pour faire de l'observatoire UEMOA un outil d'aide à la décision, il fallait aller au-delà de la prévision et permettre de tester un scénario. Premier candidat, une question simple : *que devient l'inflation si le prix du pétrole augmente ?*

Techniquement, cela revient à ajouter une variable explicative (le prix du pétrole) au modèle de l'inflation : on passe d'un SARIMA à un **SARIMAX**.

## Ce qui a bloqué

Les séries de l'observatoire sont annuelles. Pour l'inflation, l'échantillon disponible compte moins de 30 années. Sur un échantillon aussi court, le lien entre prix du pétrole et inflation n'est pas statistiquement fiable : le simulateur afficherait un effet que les données ne permettent pas d'établir.

## La décision

La fonctionnalité est restée **désactivée**, et la page Méthodologie de l'observatoire explique pourquoi. Dans un outil présenté comme une aide à la décision, afficher un résultat non prouvé aurait été pire que de ne rien afficher.

## Ce que j'en retiens

- Une fonctionnalité séduisante n'est pas une raison suffisante pour publier un résultat fragile.
- La limite vient des données, pas du modèle. La BCEAO et l'ANSD publient des indices de prix mensuels : passer à une fréquence mensuelle multiplierait le nombre d'observations et pourrait rendre le lien mesurable.
