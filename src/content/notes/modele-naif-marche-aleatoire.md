---
title: "Quand le modèle naïf gagne : prévoir une série en marche aléatoire"
type: "experience"
excerpt: "Sur le taux de change, le meilleur SARIMA obtient une MAE de 28,45 contre 28,47 pour la dernière valeur connue : aucun gain réel. L'observatoire affiche donc le modèle naïf, et le dit."
draft: true
minutes: "5–7"
projects: ["observatoire-uemoa"]
domains: ["time-series", "data-science"]
order: 4
---

## Contexte

Dans l'[observatoire UEMOA](/projects/observatoire-uemoa/), chaque indicateur reçoit son propre modèle. Le pipeline teste plusieurs ordres SARIMA (p, d, q) et garde celui qui obtient la plus petite erreur moyenne absolue (MAE) en validation glissante : on entraîne sur le passé, on prévoit l'année suivante, on avance d'un pas, et on recommence.

Pour le PIB nominal ou l'inflation, cette procédure retient un modèle : SARIMA (2,1,0) pour le PIB, SARIMA (1,1,2) pour l'inflation. Pour deux séries, en revanche, rien ne fonctionne.

## Le constat

Sur le taux de change XOF/USD (et la balance commerciale), aucun modèle candidat ne fait réellement mieux qu'une projection de la dernière valeur connue, le *modèle naïf* :

$$
\hat{y}_{t+1} = y_t
$$

<div class="table-wrap"><table class="data">
<thead><tr><th>Indicateur</th><th>MAE naïf</th><th>MAE SARIMA optimal</th></tr></thead>
<tbody>
<tr><td>Inflation</td><td>2,37</td><td>1,42</td></tr>
<tr><td>PIB nominal</td><td>1 059,06</td><td>361,61</td></tr>
<tr><td><strong>Taux de change</strong></td><td><strong>28,47</strong></td><td><strong>28,45</strong></td></tr>
</tbody>
</table></div>

Pour l'inflation et le PIB, le SARIMA réduit nettement l'erreur. Pour le taux de change, l'écart est de 0,02 : rien.

## Pourquoi

C'est le comportement attendu d'une **marche aléatoire** : chaque valeur est la précédente plus un choc imprévisible.

$$
y_t = y_{t-1} + \varepsilon_t, \qquad \mathbb{E}[\varepsilon_t \mid y_{t-1}, y_{t-2}, \dots] = 0
$$

Si les chocs $\varepsilon_t$ sont vraiment imprévisibles, la meilleure prévision possible de $y_{t+1}$ (au sens de l'erreur quadratique) est $y_t$ : $\mathbb{E}[y_{t+1} \mid y_t, y_{t-1}, \dots] = y_t$. Un modèle plus complexe ne peut qu'ajouter du bruit en essayant d'apprendre une structure qui n'existe pas. Les taux de change sont l'exemple classique de ce phénomène en économie.

> Un modèle qui ne fait pas mieux que le naïf n'apporte aucune information supplémentaire.

## La décision

Deux options se présentaient : publier quand même la prévision du « meilleur » SARIMA, ou l'assumer. L'observatoire a choisi la seconde :

- le pipeline utilise le modèle naïf pour ces séries et ne publie **pas** de valeur prévue ;
- la page d'accueil affiche un signal « aucune prévision publiée (marche aléatoire) » ;
- la méthodologie explique pourquoi, au lieu de masquer la limite.

<div class="callout"><span class="label">À retenir</span>Toujours inclure le modèle naïf parmi les candidats de la validation. C'est le seuil minimal qu'un modèle doit franchir pour mériter d'être publié.</div>

## Ce que j'en retiens

Trois choses :

- **La référence naïve vient en premier.** Sans elle, j'aurais publié un SARIMA pour le taux de change en le croyant utile. C'est maintenant le premier candidat de chaque comparaison.
- **« Pas de prévision » est un résultat.** L'afficher clairement est plus utile au lecteur qu'une courbe qui donne une fausse impression de précision.
- **Le problème vient peut-être des données, pas du modèle.** Avec des séries annuelles, on dispose de quelques dizaines de points. La prochaine étape est de tester des données mensuelles ou trimestrielles, puis des variables explicatives (prix des matières premières, taux de l'euro, puisque le franc CFA y est arrimé) quand l'échantillon le permettra.
