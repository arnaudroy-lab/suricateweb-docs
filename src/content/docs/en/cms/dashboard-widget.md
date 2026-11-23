---
title: Dashboard widget
description: The site status shown in the WordPress and PrestaShop admin, and the Site data page.
---

The plugin shows the site status **inside the CMS admin**: status, 30-day uptime, open alerts by severity, days left on the certificate and the domain, and buttons to SuricateWeb, the monthly report and the status page. The texts follow the admin language (French or English).

## The plugin page

- **WordPress (1.8 or later)**: *Tools › SuricateWeb* (the old address under Settings redirects there).
- **PrestaShop (1.6 or later)**: *Modules › Module Manager › SuricateWeb › Configure*, or the **Details** button in the dashboard block.

It has two tabs:

- **Site data**: the connection to SuricateWeb (token, **last check**, widget linked or not), the site status shown large, and what the plugin sees on the server (disk, memory, database, debugging, HTTPS…).
- **Settings**: the token, and the widget address to paste by hand **as a last resort**.

## How the widget gets linked

The link is **automatic**: at the next check, SuricateWeb gives the plugin its widget address. For that, SuricateWeb's **public address** must be set (on the hosted version it already is).

If the widget says “Not linked yet”:

1. In SuricateWeb, open the site, **Updates** tab, then click **Refresh**.
2. Look at the **Dashboard widget** card: it says “Linked”, or **why** not (plugin too old, public address missing, site refusal). On failure, SuricateWeb retries within 30 minutes.
3. As a last resort, copy the address shown in that card and paste it into the plugin's **Settings** tab.

## Widget security

- The widget is read **without logging in**, using a random token that is **distinct** from the plugin's: the plugin token does not open the widget, and vice versa.
- It only contains **counters**: never the text of an alert, nor a token, nor an internal address.
- At most 60 requests per minute per address; the response is not cached and not indexable.
- To turn it off, remove the CMS from the site's settings: the widget answers “not found”.
