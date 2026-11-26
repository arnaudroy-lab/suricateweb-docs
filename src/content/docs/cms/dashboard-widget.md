---
title: Widget du tableau de bord
description: L'état du site affiché dans l'administration de WordPress et de PrestaShop, et la page Données du site.
---

Le plugin affiche l'état du site **dans l'administration du CMS** : statut, disponibilité sur 30 jours, alertes ouvertes par gravité, jours restants du certificat et du domaine, et des boutons vers SuricateWeb, le rapport du mois et la page de statut. Les textes suivent la langue de l'administration (français ou anglais).

## La page du plugin

- **WordPress (1.8 ou plus)** : *Outils › SuricateWeb* (l'ancienne adresse sous Réglages y redirige).
- **PrestaShop (1.6 ou plus)** : *Modules › Gestionnaire de modules › SuricateWeb › Configurer*, ou le bouton **Détail** du bloc de l'accueil.

Elle a deux onglets :

- **Données du site** : la connexion à SuricateWeb (jeton, **dernier relevé**, widget relié ou non), l'état du site en grand, et ce que le plugin voit sur le serveur (disque, mémoire, base de données, débogage, HTTPS…).
- **Réglages** : le jeton, et l'adresse du widget à coller à la main **en dernier recours**.

## Comment le widget est relié

La liaison est **automatique** : au relevé suivant, SuricateWeb donne au plugin l'adresse de son widget. Il faut pour cela que l'**adresse publique de SuricateWeb** soit renseignée (sur la version hébergée, c'est déjà le cas).

Si le widget affiche « Pas encore relié » :

1. Dans SuricateWeb, ouvrez le site, onglet **Mises à jour**, puis cliquez sur **Actualiser**.
2. Regardez la carte **Widget du tableau de bord** : elle dit « Relié », ou **pourquoi** non (plugin trop ancien, adresse publique absente, refus du site). En cas d'échec, SuricateWeb réessaie sous 30 minutes.
3. En dernier recours, copiez l'adresse affichée dans cette carte et collez-la dans l'onglet **Réglages** du plugin.

## Sécurité du widget

- Le widget est lu **sans connexion**, grâce à un jeton aléatoire **distinct** de celui du plugin : le jeton du plugin n'ouvre pas le widget, et inversement.
- Il ne contient que des **compteurs** : jamais le texte d'une alerte, ni jeton, ni adresse interne.
- 60 requêtes par minute et par adresse au plus ; la réponse n'est pas mise en cache et n'est pas indexable.
- Pour le couper, retirez le CMS de la fiche du site : le widget répond « introuvable ».
