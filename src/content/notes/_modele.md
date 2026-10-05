---
# MODÈLE DE NOTE — ce fichier n'est pas publié (son nom commence par « _»).
# Copier ce fichier sous un nouveau nom (ex. mon-sujet.md) : le nom devient l'adresse /notes/mon-sujet/.
#
# Une note documente un moment précis du travail : un apprentissage, une expérimentation,
# un problème rencontré, un résultat intermédiaire, une limite, une décision technique,
# une réflexion liée à un projet. Ce n'est pas un article de blog généraliste.

title: "Titre court et précis, qui dit ce qu'on a appris ou constaté"

# journal | experience | apprentissage | reproduction | postmortem | reflexion
#   journal       : avancement d'un projet, version, décision, changement de cap
#   experience    : un essai, son protocole et son résultat (même négatif)
#   apprentissage : une notion apprise, réexpliquée avec ses mots
#   reproduction  : refaire un papier ou une méthode publiée et comparer
#   postmortem    : ce qui n'a pas marché, pourquoi, ce qu'on change
#   reflexion     : choix techniques, méthode, lectures, questions ouvertes
type: "experience"

excerpt: "Une ou deux phrases : le constat principal de la note, chiffré si possible."

# Projets concernés : un ou plusieurs identifiants (nom du fichier projet sans .md).
projects: ["observatoire-uemoa"]

# Domaines : identifiants de src/content/domains.yaml.
domains: ["time-series"]

minutes: "4–6"

# Brouillon tant que la note n'est pas relue. Pour publier : draft: false + date.
draft: true
# date: 2026-10-12
---

## Contexte

Où en était le projet, quelle question se posait.

## Ce qui a été fait

Le protocole, les données, le code utilisé. Assez précis pour être refait.

## Résultat

Ce qu'on observe, avec les chiffres. Les formules s'écrivent en LaTeX : $\hat{y}_{t+1} = y_t$.

## Limites

Ce que ce résultat ne permet pas d'affirmer.

## Ce que j'en retiens

La décision prise, ou la prochaine étape.
