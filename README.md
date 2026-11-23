# Documentation SuricateWeb

La documentation en ligne de [SuricateWeb](https://suricateweb.fr), la surveillance de sites web qui prévient avant vos clients : défiguration, piratage, domaine, disponibilité, WordPress et PrestaShop.

En **français** (racine) et en **anglais** (`/en/`), construite avec [Astro Starlight](https://starlight.astro.build) : recherche intégrée, thème clair et sombre, site statique.

- Produit (cœur libre, AGPL-3.0) : <https://github.com/arnaudroy-lab/suricateweb>
- Site publié : `https://docs.suricateweb.fr`

## Travailler sur la documentation

Node.js 22.12 ou plus.

```bash
npm ci
npm run dev       # http://localhost:4321, rechargement automatique
npm test          # construction + contrôle (liens, images, traductions)
```

### Ajouter une page

1. Créez `src/content/docs/<section>/<page>.md` (français) **et** `src/content/docs/en/<section>/<page>.md` (anglais) : même chemin, avec `title` et `description`.
2. Ajoutez-la au menu dans `astro.config.mjs` (`sidebar`).
3. Lancez `npm test` : il échoue si une traduction manque, si un lien interne est cassé, si un lien renvoie vers l'autre langue ou si une image est introuvable.

Liens internes : `/section/page/` en français, `/en/section/page/` en anglais. Images : `src/assets/fr/` et `src/assets/en/`, importées en relatif dans le Markdown (Astro les optimise).

### Les captures d'écran

Elles viennent du générateur du cœur, avec des **données fictives** :

```bash
# dans le dépôt du cœur
npm run docs:screenshots -- --only=tableau-de-bord,telegram              # français
npm run docs:screenshots -- --lang=en --only=tableau-de-bord,telegram    # anglais
```

Convertissez-les en WebP dans `src/assets/<langue>/` (largeur 1400 px au plus).

## Structure

```
astro.config.mjs        langues, menu, adresse publique (SITE_URL)
src/content/docs/       pages en français ; en/ pour l'anglais (mêmes chemins)
src/content/i18n/       reformulation de quelques textes de l'interface
src/assets/{fr,en}/     captures d'écran (WebP)
src/styles/theme.css    couleurs de SuricateWeb
scripts/check.mjs       contrôle : traductions jumelles, liens, images, ancres
Dockerfile, nginx.conf  construction puis service statique (nginx sans privilèges, port 8080)
docker-compose.yml      déploiement Compose (Dokploy)
DEPLOY.md               guide de déploiement Dokploy
```

## Déploiement

Image Docker (construction `npm test` comprise, puis nginx) sur le port 8080 : voir [DEPLOY.md](DEPLOY.md) pour Dokploy.

```bash
docker build --build-arg SITE_URL=https://docs.suricateweb.fr -t suricateweb-docs .
docker run --rm -p 8080:8080 suricateweb-docs
```

## Licence

Copyright © Arnaud Roy. Voir [LICENSE](LICENSE) (AGPL-3.0, comme le cœur).
