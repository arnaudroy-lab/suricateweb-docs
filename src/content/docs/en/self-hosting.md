---
title: Self-hosting
description: Install SuricateWeb on your server with Node.js or Docker, or deploy it on Dokploy.
---

The SuricateWeb core is **free software (AGPL-3.0)**: the code is on [GitHub](https://github.com/arnaudroy-lab/suricateweb). It runs with no external database (SQLite) and no npm dependency.

The free core monitors availability, defacement, the domain, the certificate and screenshots. The [WordPress / PrestaShop](/en/cms/install/) connector is a feature of the hosted version (Standard and Agency plans).

## With Node.js

Prerequisite: **Node.js 22.13 or later** (Chrome or Chromium for [screenshots](/en/monitoring/screenshots/), optional).

```bash
git clone https://github.com/arnaudroy-lab/suricateweb.git
cd suricateweb
cp .env.example .env     # then edit SURICATE_USER and SURICATE_PASSWORD
npm start
```

Open `http://localhost:3000`, log in, click **Add a site**, then set up [Telegram](/en/alerts/telegram/) in **Settings**.

## With Docker

```bash
docker build -t suricateweb .
docker run -d --name suricateweb -p 3000:3000 -v suricate-data:/data \
  -e SURICATE_USER=admin -e SURICATE_PASSWORD='a-strong-password' suricateweb
```

The image includes Chromium for screenshots. The `/data` volume holds **everything** (database, history, Telegram token, screenshots): without it you lose everything on each redeploy.

## On Dokploy

1. **Create the application**: *Create Application*, Git source, *Build Type* **Dockerfile**.
2. **Environment variables**: `SURICATE_USER`, `SURICATE_PASSWORD` (required, at least 8 characters), `TRUST_PROXY=1` (already in the image; `2` if a CDN sits in front of your reverse proxy).
3. **Persistent volume** (*Advanced › Volumes*): type **Volume**, mount path `/data`.
4. **Domain**: your domain, **port `3000`**, HTTPS on (Let's Encrypt).
5. **Deploy.**

## Environment variables

| Variable | Default | Role |
|---|---|---|
| `SURICATE_USER` | `admin` | Login name |
| `SURICATE_PASSWORD` | — (**required**) | Login password |
| `PORT` | `3000` | Listening port |
| `HOST` | `127.0.0.1` | Listening interface (`0.0.0.0` to expose on the network) |
| `DATA_DIR` | `./data` | SQLite database and screenshots |
| `TRUST_PROXY` | — | number of trusted reverse proxies: `1` behind Traefik or nginx, `2` if a CDN sits in front of them (`Secure` cookie, client IP read from the end of `X-Forwarded-For`) |
| `CHROME_PATH` | detected | Chrome or Chromium for screenshots |
| `CHROME_WS_URL` | — | **Remote** Chrome (a Browserless container, for example) |
| `SCREENSHOT_KEEP_DEFAULT` | `168` | Scheduled screenshots kept per site |
| `SURICATE_DEMO` | — | `1`: demo mode, fictional data |

The application is **always protected** by a login and password defined only in the environment: it refuses to start without a password. Changing the credentials signs out every session.

## Good practice

- **Put SuricateWeb behind HTTPS**: otherwise the password travels in clear text.
- Run **a single instance**: the database and the scheduler are not designed to run twice.
- Checks start from your server: a site restricted by IP address must allow this one.
- **Backup**: the `/data` folder holds everything. Otherwise, *Settings › Data › Export* saves the list of sites, their groups and their configuration (not the history).
- A logged-in user can make the server request arbitrary addresses: **do not share access**.
