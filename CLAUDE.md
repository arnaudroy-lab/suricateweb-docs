# Documentation SuricateWeb — consignes pour Claude

Dépôt PUBLIC de la documentation en ligne (Astro Starlight, français + anglais). Le produit est dans `arnaudroy-lab/suricateweb` (cœur libre) ; la version hébergée, privée, n'est jamais décrite ici dans ses détails d'implémentation.

## Langue et style

Le français est la langue de référence ; l'anglais est une traduction complète. Phrases courtes, à l'impératif pour les procédures, et le POURQUOI avant le comment. Aucun nom de société : le titulaire est Arnaud Roy.

## Règles

- **Deux langues, toujours** : une page `src/content/docs/<chemin>.md` a sa jumelle `src/content/docs/en/<chemin>.md` (même chemin). `npm run check` échoue sinon.
- **Liens internes** : `/chemin/` en français, `/en/chemin/` en anglais. Une page ne renvoie jamais à l'autre langue.
- **Menu** : `astro.config.mjs` (`sidebar`), avec la traduction du libellé des groupes.
- **Captures** : produites par le générateur du cœur (`npm run docs:screenshots -- --lang=en --only=…`), jamais d'image avec de vraies données. Elles vont dans `src/assets/fr/` et `src/assets/en/` (WebP).
- **Ne documentez que ce qui existe** : vérifiez dans le cœur (`README.md`, code) avant d'écrire un seuil, un nom de bouton ou une version de plugin.
- Aucun secret, aucune adresse interne, aucun jeton réel dans les exemples.

## Tests

```bash
npm test          # construction + contrôle (parité des langues, liens, images, ancres)
```

Node 22.12 minimum. Le `Dockerfile` lance `npm test` : une documentation cassée ne produit pas d'image.

## Version

Incrémenter `version` dans `package.json` à chaque changement publié (correction `x.y.Z`, nouvelle section ou nouvelle page `x.Y.0`), dans le même commit.
