---
title: Journal d'activité
description: Connexions, comptes et extensions d'un site WordPress, avec adresses IP tronquées et 90 jours de conservation.
---

*WordPress, plugin 1.7 ou plus.* L'onglet **Activité** montre ce qui s'est passé sur le site, relevé par le plugin :

- les **connexions** réussies et échouées ;
- les **comptes** créés, supprimés, changés de rôle ou dont le mot de passe a été réinitialisé ;
- les **extensions** installées, activées, désactivées, supprimées ou mises à jour, un thème changé, WordPress mis à jour.

Un filtre par groupe (Connexions, Comptes, Extensions) et, pour chaque événement, la date, le compte et la source.

## Deux alertes

| Signal | Alerte |
|---|---|
| **30 échecs de connexion ou plus en une heure** (tous comptes et toutes sources) | **attention** : attaque par essais de mots de passe probable |
| **Une connexion réussie dans les 6 dernières heures, précédée d'au moins 10 échecs de la même source dans l'heure** | **critique** : le mot de passe a peut-être été deviné |

## Vie privée

- L'adresse IP n'est **jamais stockée en entier** : le plugin la tronque avant d'écrire (IPv4 au /24, par exemple `203.0.113.0` ; IPv6 au /48) et n'y ajoute qu'une **empreinte salée de 12 caractères**, propre au site, pour reconnaître la même source d'un événement à l'autre. L'adresse complète ne peut pas être retrouvée.
- Un identifiant saisi lors d'un **échec** de connexion n'est gardé que s'il correspond à un compte existant : on tape parfois son mot de passe dans ce champ.
- **90 jours** de conservation (500 événements au plus côté plugin), puis effacement automatique, côté site comme côté SuricateWeb.
- **Activable site par site** (*Modifier › WordPress / PrestaShop › Tenir le journal d'activité*, coché par défaut). Le plugin ne consigne rien tant que SuricateWeb ne le lui a pas demandé. En décochant, SuricateWeb l'éteint et **efface** sa copie et celle du site.
- Pendant une attaque, les échecs au-delà de 50 par 10 minutes sont **regroupés** en un événement unique avec leur compteur, pour ne pas saturer la base du site.

:::caution[Derrière un proxy ou un CDN]
Le plugin lit l'adresse `REMOTE_ADDR`, car les en-têtes `X-Forwarded-For` se falsifient. Derrière un proxy, tous les visiteurs auraient alors la même source. Définissez `SURICATEWEB_TRUST_PROXY` dans `wp-config.php` pour lire cet en-tête, **seulement si le proxy le réécrit**.
:::

Ces événements sont des données personnelles : informez les utilisateurs du site (mentions légales) que les connexions sont journalisées. Sur la version hébergée, ils figurent dans l'export des données du compte et disparaissent avec le site.

PrestaShop n'a pas de journal d'activité pour l'instant.
