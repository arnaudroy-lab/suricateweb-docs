---
title: Questions fréquentes
description: Réponses aux questions courantes et limites à connaître.
---

## Quelle différence entre la version hébergée et l'auto-hébergée ?

Le cœur est le même. La version hébergée ajoute les comptes, les forfaits, l'e-mail, les canaux de notification multiples et l'hébergement. L'auto-hébergée est libre et vous appartient, avec un seul compte protégé par un mot de passe d'environnement.

## Je ne reçois aucune alerte.

Vérifiez dans l'ordre : le canal est configuré et **testé** ([Telegram](/alerts/telegram/), [Slack](/alerts/slack/)) ; les notifications sont **actives** ; le **niveau minimal** n'est pas « Critique uniquement » pour une alerte « attention » ; le site n'est pas **en pause** ni en **maintenance** (les alertes sont alors retenues).

## Le bouton « Ouvrir dans SuricateWeb » n'apparaît pas dans Telegram.

Il faut une **adresse publique** de SuricateWeb joignable depuis un téléphone (Réglages). Telegram refuse `localhost` et les réseaux privés.

## Le widget affiche « Pas encore relié ».

Voir [Widget du tableau de bord](/cms/dashboard-widget/#comment-le-widget-est-relié) : cliquez sur **Actualiser** dans l'onglet Mises à jour du site et lisez la carte du widget.

## Un onglet dit « plugin trop ancien ».

Remplacez le plugin par la dernière archive téléchargeable depuis la fiche du site. Le jeton est conservé. Voir le tableau des versions dans [Installer le plugin](/cms/install/#quelle-version-pour-quelle-fonction).

## Les sauvegardes sont-elles surveillées ?

Non. Il existe trop de solutions de sauvegarde, et un plugin ne peut pas savoir si une copie est réellement restaurable.

## Que faire d'une alerte critique de contenu remplacé ?

Ouvrez la **capture** du site pour voir ce que voient vos visiteurs, comparez-la à la précédente, puis vérifiez l'onglet **Sécurité** (fichiers modifiés, comptes administrateurs) et le journal d'**activité**. Changez les mots de passe et restaurez une sauvegarde saine.

## Où signaler un problème ?

Sur le dépôt [GitHub](https://github.com/arnaudroy-lab/suricateweb/issues).
