---
title: Alertes Slack
description: Envoyez les alertes de SuricateWeb dans un canal Slack avec un webhook entrant.
---

Les alertes arrivent dans le canal Slack de votre équipe, en plus (ou à la place) de Telegram. Rien à héberger : un **webhook entrant** suffit. Le canal Slack est disponible dans **tous les forfaits** de la version hébergée.

## Configuration

1. Sur `api.slack.com/apps`, créez une application, activez **Incoming Webhooks**, puis *Add New Webhook to Workspace* et choisissez le canal.
2. Copiez l'adresse du webhook (`https://hooks.slack.com/services/T…/B…/…`).
3. Dans SuricateWeb, **Réglages › Notifications Slack** : collez l'adresse et cliquez sur **Tester** (un vrai message part dans le canal), puis **Enregistrer**.

## Ce que contient un message

Un seul message par contrôle : un en-tête avec la gravité la plus haute et le nom du site, une section par alerte (titre, détail, extrait des changements en option), l'adresse du site et un bouton **Ouvrir dans SuricateWeb** si l'adresse publique de l'instance est utilisable. La barre de couleur suit la gravité : rouge, orange, bleu, et vert pour un rétablissement.

Les options sont celles de Telegram : notifications actives, rétablissement, extrait des changements, niveau minimal.

## Sécurité

- **L'adresse du webhook est un secret** : quiconque la possède peut écrire dans votre canal. SuricateWeb ne la réaffiche jamais en entier, et la chiffre en base lorsqu'une clé de chiffrement est configurée.
- Seules les adresses de la forme `https://hooks.slack.com/services/…` sont acceptées : le champ ne peut pas servir à faire joindre une adresse interne par le serveur.

## Limites

Un webhook ne permet ni d'envoyer une image ni de recevoir un clic : **pas de capture d'écran jointe** et **pas de bouton « Marquer comme lu »** dans Slack. Ces deux fonctions restent propres à [Telegram](/alerts/telegram/).

Si Slack répond « trop de requêtes », SuricateWeb réessaie une fois après le délai demandé. Si le webhook a été révoqué ou le canal archivé, l'alerte est marquée en erreur d'envoi avec une explication, et Telegram n'est pas gêné.
