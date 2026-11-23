# Documentation SuricateWeb : construction du site statique (Astro Starlight), puis service par nginx.
#
#   docker build -t suricateweb-docs .
#   docker run -d -p 8080:8080 suricateweb-docs        # http://localhost:8080
#
# `SITE_URL` : adresse publique du site (liens canoniques, plan du site, alternatives hreflang). À donner au BUILD :
#   docker build --build-arg SITE_URL=https://docs.exemple.fr -t suricateweb-docs .

# ── 1. Construction ──
FROM node:22-alpine AS build
WORKDIR /app
ENV ASTRO_TELEMETRY_DISABLED=1 CI=1
# Les dépendances d'abord : la couche est réutilisée tant que package-lock.json ne change pas.
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG SITE_URL=https://docs.suricateweb.fr
ENV SITE_URL=${SITE_URL}
# `npm test` = construction + contrôle (pages françaises et anglaises, liens et images) : une image cassée ne se construit pas.
RUN npm test

# ── 2. Service ──
# nginx « unprivileged » : tourne sans être root, écoute sur 8080 (Dokploy / Traefik s'y raccordent par ce port).
FROM nginxinc/nginx-unprivileged:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
