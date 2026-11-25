---
title: Démarrer
description: Ajoutez votre premier site à SuricateWeb et recevez votre première alerte en quelques minutes.
---

SuricateWeb existe en deux versions qui partagent le même cœur :

- **la version hébergée**, sur [suricateweb.fr](https://suricateweb.fr) : vous créez un compte, rien à installer ;
- **la version auto-hébergée**, libre (AGPL-3.0) : vous l'installez sur votre serveur, voir [Auto-hébergement](/self-hosting/).

Les deux ont la même interface, les mêmes contrôles et les mêmes alertes. Cette documentation vaut pour les deux ; les rares différences sont indiquées.

## 1. Ajouter un site

1. Ouvrez l'application, puis cliquez sur **Ajouter un site**.
2. Saisissez l'adresse du site et cliquez sur **Tester** : SuricateWeb vérifie qu'il répond avant d'enregistrer.
3. Choisissez la fréquence de contrôle (de 1 minute à 24 heures selon votre forfait), un groupe et des étiquettes si vous classez vos sites par client.
4. Enregistrez. Le premier contrôle sert de **référence** : les alertes suivantes parlent de ce qui change par rapport à lui.

La configuration par défaut surveille tout. Si un signal produit trop de bruit sur un site précis (une page qui change tout le temps, par exemple), désactivez-le pour ce site seulement.

<div class="video-embed" data-youtube="gBbZME6zOJY" data-title="Ajouter un nouveau site" data-play="Lire la vidéo" data-privacy="La vidéo est chargée depuis YouTube uniquement après votre clic.">
<a href="https://youtu.be/gBbZME6zOJY">Ouvrir sur YouTube : Ajouter un nouveau site</a>
</div>

## 2. Recevoir les alertes

Sans canal de notification, les alertes restent visibles dans l'onglet **Alertes** mais rien ne vous prévient. Configurez au moins un canal :

- [Telegram](/alerts/telegram/) : alertes avec photo de la page, boutons « Marquer comme lu » et « Ouvrir » ;
- [Slack](/alerts/slack/) : alertes en couleur dans le canal de votre équipe.

## 3. Aller plus loin

- Un site WordPress ou PrestaShop ? [Installez le plugin](/cms/install/) : mises à jour en retard, fichiers modifiés, comptes administrateurs, santé du serveur.
- Plusieurs clients ? Rangez les sites par **groupe** (glisser-déposer) et partagez un **rapport mensuel** ou une **page de statut** publique.
- Un domaine sans site web (messagerie, nom réservé) ? Choisissez le type **Domaine seul** : seuls le DNS et le registre sont surveillés.

:::tip
Pour essayer sans rien configurer, la version auto-hébergée a un **mode démo** (`npm run demo`) avec des sites, des alertes et des captures fictifs.
:::
