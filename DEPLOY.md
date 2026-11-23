# Déployer la documentation sur Dokploy

La documentation est un site **statique** : l'image Docker construit le site (Astro Starlight) puis le sert avec nginx, sur le port **8080**, sans être root. Aucune base de données, aucun volume, aucun secret.

Adresse prévue : `https://docs.suricateweb.fr` (à adapter).

## Avant de commencer

1. Chez votre registrar : un enregistrement **A** (ou **CNAME**) `docs` vers l'adresse du serveur Dokploy.
2. Le dépôt `arnaudroy-lab/suricateweb-docs` est public : Dokploy peut le cloner sans clé.

## Méthode 1 (recommandée) : application avec Dockerfile

1. **Create Application** → nom `suricateweb-docs`.
2. **Provider** : Git (ou GitHub), dépôt `https://github.com/arnaudroy-lab/suricateweb-docs`, branche `main`.
3. **Build Type** : **Dockerfile** ; *Docker File* : `Dockerfile` ; *Docker Context Path* : `.`
4. **Build Args** (onglet *Environment* ou *Advanced*, selon la version de Dokploy) : `SITE_URL=https://docs.suricateweb.fr`
   C'est l'adresse publique, utilisée pour les liens canoniques, le plan du site et les alternatives de langue. **Elle est lue à la construction** : si vous la changez, il faut redéployer.
5. **Domains** → *Add domain* : `docs.suricateweb.fr`, **port `8080`**, HTTPS activé (Let's Encrypt).
6. **Deploy.**

Redéploiement automatique à chaque `git push` : onglet *Deployments*, activez **Auto Deploy** (webhook GitHub), ou appelez l'adresse de webhook de l'application depuis votre CI.

## Méthode 2 : Compose

1. **Create Compose** → source Git, même dépôt et même branche, *Compose Path* : `./docker-compose.yml`.
2. **Environment** : `SITE_URL=https://docs.suricateweb.fr`
3. **Domains** : service `docs`, port `8080`, domaine, HTTPS.
4. **Deploy.**

Le fichier `docker-compose.yml` n'écrit aucune étiquette Traefik et ne publie aucun port : Dokploy raccorde le domaine. Le conteneur tourne en lecture seule, sans capacité Linux (`read_only`, `cap_drop: ALL`).

## Vérifier

- `https://docs.suricateweb.fr/healthz` répond `ok`.
- `https://docs.suricateweb.fr/` (français) et `https://docs.suricateweb.fr/en/` (anglais).
- Dans les *Logs* de Dokploy : une ligne nginx par requête, sans erreur au démarrage.
- `https://docs.suricateweb.fr/sitemap-index.xml` contient bien l'adresse publique (pas `localhost`).

## En cas de problème

| Symptôme | Cause probable |
|---|---|
| 502 / « Bad Gateway » | le port du domaine n'est pas `8080` |
| Le plan du site ou les liens canoniques pointent vers une mauvaise adresse | `SITE_URL` non défini ou défini après la construction : redéployez |
| La construction échoue à `npm test` | une page française sans sa jumelle anglaise (ou l'inverse), ou un lien interne cassé : le message de `npm run check` dit lequel |
| Les modifications ne se voient pas | le navigateur garde `/_astro/*` un an (fichiers à empreinte, c'est voulu) ; les pages elles-mêmes se revalident à chaque visite |

## Essayer l'image en local

```bash
docker build -t suricateweb-docs .
docker run --rm -p 8080:8080 suricateweb-docs        # http://localhost:8080
# ou
docker compose -f docker-compose.yml -f docker-compose.local.yml up --build
```
