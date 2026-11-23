---
title: Santé et durcissement
description: Disque, débogage, tâches planifiées, HTTPS, et cinq réglages de sécurité activables en un clic.
---

## Santé du serveur

Onglet **Santé** : des **faits relevés sur le serveur**, jugés par SuricateWeb. Les seuils sont dans SuricateWeb, donc modifiables sans mettre à jour le plugin. Le plugin n'envoie que des tailles, des booléens et des durées : jamais un contenu, ni un nom de fichier.

| Contrôle | Alerte |
|---|---|
| **Espace disque** | **attention** sous 10 % ou 500 Mo libres, **critique** sous 3 % ou 100 Mo |
| **Débogage** | **attention** si les erreurs PHP sont affichées aux visiteurs (`WP_DEBUG_DISPLAY`, mode développement PrestaShop) ou si `debug.log` dépasse 50 Mo |
| **Tâches planifiées** (WP-Cron, WordPress) | **attention** si une tâche a plus d'1 h de retard, **critique** au-delà de 3 jours |
| **Site masqué des moteurs de recherche** (WordPress) | **attention** : l'option « ne pas indexer » est restée cochée |
| **HTTPS** | **attention** si l'adresse du site est en HTTP |
| **Boutique en maintenance** (PrestaShop) | **attention** : les visiteurs voient la page de maintenance |
| **Réglages à améliorer** : mémoire PHP sous 128 Mo, durée de script sous 30 s, options WordPress chargées à chaque page, extensions PHP recommandées manquantes | un seul incident groupé, en **info** |

La taille de la base de données est affichée, sans alerte. Un fait que l'hébergeur ne laisse pas lire est simplement absent : jamais « normal » par défaut.

:::note
**Les sauvegardes ne sont pas surveillées** : il existe trop de solutions, et un plugin ne peut pas savoir si une copie est réellement restaurable.
:::

Le suivi se coupe site par site (*Modifier › WordPress / PrestaShop › Suivre la santé du site*).

## Durcissement en un clic

*WordPress, plugin 1.6 ou plus.* Dans l'onglet **Santé**, la carte **Durcissement** applique quelques réglages de sécurité, **un par un** ou d'un clic (**Appliquer les réglages sûrs**). SuricateWeb envoie l'ordre au plugin, puis relit l'état réel du site : l'interface n'affiche jamais ce qu'on espérait, seulement ce que le site confirme.

| Mesure | Effet | Réglage sûr |
|---|---|---|
| **Éditeur de fichiers désactivé** | plus d'éditeur de thèmes et d'extensions dans le tableau de bord | oui |
| **Version de WordPress masquée** | retirée du code des pages et des flux | oui |
| **Messages de connexion neutres** | « Identifiant ou mot de passe incorrect », sans révéler si l'identifiant existe | oui |
| **Liste des comptes non publique** | `?author=1` et l'API REST des utilisateurs fermés aux visiteurs non connectés | oui |
| **XML-RPC désactivé** | `xmlrpc.php` fermé ; à éviter avec Jetpack, l'application mobile WordPress ou la publication à distance | **non** |

- **Aucun fichier du site n'est modifié** (ni `wp-config.php`, ni `.htaccess`) : chaque mesure est un filtre appliqué par le plugin à chaque chargement. Pour la retirer, décochez-la.
- Une mesure **déjà active sur le site** est signalée « Déjà actif sur le site » et reste intacte.
- Aucune mesure ne bloque un administrateur connecté.
- Appliquer un durcissement demande le droit d'**écrire sur le site** : un invité en lecture seule ne peut pas le faire.
