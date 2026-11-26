---
title: Auto-hébergement
description: Installez SuricateWeb sur votre serveur avec Node.js ou Docker, ou déployez-le sur Dokploy.
---

Le cœur de SuricateWeb est **libre (AGPL-3.0)** : le code est sur [GitHub](https://github.com/arnaudroy-lab/suricateweb). Il fonctionne sans base de données externe (SQLite) et sans dépendance npm.

Le cœur libre surveille la disponibilité, la défiguration, le domaine, le certificat et les captures. Le connecteur [WordPress / PrestaShop](/cms/install/) est une fonction de la version hébergée.

## Avec Node.js

Prérequis : **Node.js 22.13 ou plus** (Chrome ou Chromium pour les [captures d'écran](/monitoring/screenshots/), facultatif).

```bash
git clone https://github.com/arnaudroy-lab/suricateweb.git
cd suricateweb
cp .env.example .env     # puis éditez SURICATE_USER et SURICATE_PASSWORD
npm start
```

Ouvrez `http://localhost:3000`, connectez-vous, cliquez sur **Ajouter un site**, puis configurez [Telegram](/alerts/telegram/) dans **Réglages**.

## Avec Docker

```bash
docker build -t suricateweb .
docker run -d --name suricateweb -p 3000:3000 -v suricate-data:/data \
  -e SURICATE_USER=admin -e SURICATE_PASSWORD='un-mot-de-passe-solide' suricateweb
```

L'image contient Chromium pour les captures. Le volume `/data` contient **tout** (base, historique, jeton Telegram, captures) : sans lui, vous perdez tout à chaque redéploiement.

## Sur Dokploy

1. **Créer l'application** : *Create Application*, source Git, *Build Type* **Dockerfile**.
2. **Variables d'environnement** : `SURICATE_USER`, `SURICATE_PASSWORD` (obligatoire, 8 caractères au moins), `TRUST_PROXY=1` (déjà dans l'image ; `2` si un CDN précède votre reverse proxy).
3. **Volume persistant** (*Advanced › Volumes*) : type **Volume**, chemin de montage `/data`.
4. **Domaine** : votre domaine, **port `3000`**, HTTPS activé (Let's Encrypt).
5. **Déployer.**

## Variables d'environnement

| Variable | Défaut | Rôle |
|---|---|---|
| `SURICATE_USER` | `admin` | Identifiant de connexion |
| `SURICATE_PASSWORD` | — (**obligatoire**) | Mot de passe de connexion |
| `PORT` | `3000` | Port d'écoute |
| `HOST` | `127.0.0.1` | Interface d'écoute (`0.0.0.0` pour exposer sur le réseau) |
| `DATA_DIR` | `./data` | Base SQLite et captures d'écran |
| `TRUST_PROXY` | — | nombre de reverse proxys de confiance : `1` derrière Traefik ou nginx, `2` si un CDN les précède (cookie `Secure`, IP client lue en partant de la fin de `X-Forwarded-For`) |
| `CHROME_PATH` | détecté | Chrome ou Chromium pour les captures |
| `CHROME_WS_URL` | — | Chrome **distant** (conteneur Browserless, par exemple) |
| `SCREENSHOT_KEEP_DEFAULT` | `168` | Captures planifiées conservées par site |
| `SURICATE_DEMO` | — | `1` : mode démo, données fictives |

L'application est **toujours protégée** par un identifiant et un mot de passe définis uniquement dans l'environnement : elle refuse de démarrer sans mot de passe. Changer les identifiants déconnecte toutes les sessions.

## Bonnes pratiques

- **Placez SuricateWeb derrière HTTPS** : sinon le mot de passe transite en clair.
- Ne lancez qu'**une seule instance** : la base et le planificateur ne sont pas conçus pour tourner en double.
- Les contrôles partent de votre serveur : un site restreint par adresse IP doit autoriser celle-ci.
- **Sauvegarde** : le dossier `/data` contient tout. Sinon, *Réglages › Données › Exporter* sauvegarde la liste des sites, leurs groupes et leur configuration (pas l'historique).
- Un utilisateur connecté peut faire requêter des adresses arbitraires par le serveur : **ne partagez pas l'accès**.
