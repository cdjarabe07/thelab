---
title: "Une IA qui explique, mais ne décide pas"
type: "journal"
excerpt: "Coupure à 5 secondes, réponses pré-rédigées, refus du hors-sujet, 18 scénarios de test : comment l'assistant de l'observatoire reste utile même quand le modèle de langage ne répond pas."
draft: false
date: 2026-10-06
minutes: "4–6"
projects: ["dakar-risque-inondation"]
domains: ["llm", "web"]
order: 3
---

## Le principe

L'observatoire du risque d'inondation propose deux usages de l'IA générative : un bouton « Expliquer ce risque » sur chaque commune, et un chat pour poser des questions libres. La règle de départ, affichée dans l'appli : **l'IA explique le risque, elle ne le décide pas.** Le score et les chiffres sont calculés en amont ; le modèle les met en mots.

## Les garde-fous

- **Des données fermées.** Le modèle (`openai/gpt-oss-120b`, via Groq) ne reçoit que les données de l'observatoire.
- **Un sens pré-calculé.** Pour chaque indicateur, le fait qu'il « fasse monter » ou « baisser » le risque est calculé à l'avance et transmis au modèle, pour éviter les contresens.
- **Des limites obligatoires.** Chaque explication doit mentionner les limites de fiabilité de la commune.
- **Pas de hors-sujet.** Les questions sans rapport avec l'observatoire sont refusées poliment.
- **La fiche fait foi.** En cas de désaccord, ce sont les chiffres de la fiche qui comptent, et l'appli le dit.

## Toujours répondre

Le compte Groq gratuit limite le nombre de requêtes, et un modèle peut être lent ou indisponible. D'où une règle : l'appli affiche toujours quelque chose.

- chaque appel est coupé au bout de **5 secondes** ;
- en cas de dépassement, d'erreur, de clé absente ou de quota atteint, l'appli affiche une **réponse pré-rédigée** construite à partir des données de la commune ;
- dans la version web, ce secours fonctionne même si le serveur est injoignable ;
- un visiteur est limité à 10 questions par minute, et la clé d'API ne quitte jamais le serveur.

## Les tests

Sans clé d'API, 18 scénarios sont testés : clé absente ou invalide, modèle trop lent, réinitialisation du chat, carte, comparaison, niveaux de confiance. Avec une clé, des appels réels vérifient le refus du hors-sujet, la résistance aux tentatives de détournement et la lecture correcte des rangs. La version web est en plus comparée à l'appli Python par des tests de parité.

## Ce que j'en retiens

- Le plus gros du travail n'est pas l'appel au modèle, mais tout ce qui l'entoure : ce qu'on lui donne, ce qu'on lui interdit, et ce qui se passe quand il ne répond pas.
- Une réponse de secours simple vaut mieux qu'un écran d'erreur, surtout pour un public non technique.
- À tester ensuite : mesurer la qualité des explications sur un ensemble de questions de référence.
