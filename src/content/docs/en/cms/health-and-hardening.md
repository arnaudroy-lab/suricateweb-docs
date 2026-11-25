---
title: Health and hardening
description: Disk, debugging, scheduled tasks, HTTPS, and five security settings you can turn on in one click.
---

<div class="video-embed" data-youtube="4ANPUIwezE4" data-title="Understanding the Health, Security and Hardening tabs of SuricateWeb" data-play="Play video" data-privacy="The video loads from YouTube only after you click.">
<a href="https://youtu.be/4ANPUIwezE4">Open on YouTube: Understanding the Health, Security and Hardening tabs of SuricateWeb</a>
</div>

## Server health

The **Health** tab: **facts read on the server**, judged by SuricateWeb. The thresholds live in SuricateWeb, so they can change without updating the plugin. The plugin only sends sizes, booleans and durations: never content, nor a file name.

| Check | Alert |
|---|---|
| **Disk space** | **warning** below 10% or 500 MB free, **critical** below 3% or 100 MB |
| **Debugging** | **warning** if PHP errors are shown to visitors (`WP_DEBUG_DISPLAY`, PrestaShop development mode) or if `debug.log` exceeds 50 MB |
| **Scheduled tasks** (WP-Cron, WordPress) | **warning** if a task is more than 1 h late, **critical** beyond 3 days |
| **Site hidden from search engines** (WordPress) | **warning**: the “do not index” option was left ticked |
| **HTTPS** | **warning** if the site address is HTTP |
| **Shop in maintenance** (PrestaShop) | **warning**: visitors see the maintenance page |
| **Settings to improve**: PHP memory under 128 MB, script time under 30 s, WordPress options loaded on every page, missing recommended PHP extensions | a single grouped incident, as **info** |

The database size is displayed, with no alert. A fact the host does not let the plugin read is simply absent: never “normal” by default.

:::note
**Backups are not monitored**: there are too many solutions, and a plugin cannot know whether a copy is really restorable.
:::

Monitoring can be turned off per site (*Edit › WordPress / PrestaShop › Monitor site health*).

## One-click hardening

*WordPress, plugin 1.6 or later.* In the **Health** tab, the **Hardening** card applies a few security settings, **one by one** or in one click (**Apply safe settings**). SuricateWeb sends the order to the plugin, then reads back the site's **health state**: the interface never shows what was hoped for, only what the site confirms.

| Measure | Effect | Safe setting |
|---|---|---|
| **File editor disabled** | no more theme and plugin editor in the dashboard | yes |
| **WordPress version hidden** | removed from page and feed code | yes |
| **Neutral login messages** | “Incorrect username or password”, without revealing whether the username exists | yes |
| **Account list not public** | `?author=1` and the REST users API closed to logged-out visitors | yes |
| **XML-RPC disabled** | `xmlrpc.php` closed; avoid with Jetpack, the WordPress mobile app or remote publishing | **no** |

- **No site file is modified** (neither `wp-config.php` nor `.htaccess`): each measure is a filter applied by the plugin on every load. To remove one, untick it.
- A measure **already active on the site** is shown as “Already on in the site” and left untouched.
- No measure blocks a logged-in administrator.
- Applying hardening requires the right to **write to the site**: a read-only guest cannot do it.
- You can **turn on several measures in a row**: the card is locked while an order is being sent, and the orders for one site go out one after the other. Only the health is read back (not a full reading), and if a full reading is in progress, the read-back waits for it to finish.
- If the plugin accepted the order but the read-back fails, the interface says so separately: **“Applied, but the site state could not be read back”**. The measure is applied; **Refresh** reads the state again.
