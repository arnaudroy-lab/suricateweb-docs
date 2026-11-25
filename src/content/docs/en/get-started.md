---
title: Get started
description: Add your first site to SuricateWeb and receive your first alert in a few minutes.
---

SuricateWeb comes in two versions that share the same core:

- **the hosted version**, at [suricateweb.fr](https://suricateweb.fr): create an account, nothing to install;
- **the self-hosted version**, free software (AGPL-3.0): you install it on your own server, see [Self-hosting](/en/self-hosting/).

Both have the same interface, the same checks and the same alerts. This documentation applies to both; the few differences are pointed out.

## 1. Add a site

1. Open the application and click **Add a site**.
2. Enter the site address and click **Test**: SuricateWeb checks that it responds before saving.
3. Choose the check frequency (from 1 minute to 24 hours depending on your plan), a group and tags if you sort your sites by client.
4. Save. The first check is the **baseline**: later alerts describe what changes compared to it.

The default configuration monitors everything. If a signal is noisy on one particular site (a page that changes all the time, for instance), turn it off for that site only.

<div class="video-embed" data-youtube="gBbZME6zOJY" data-title="SuricateWeb: add a site to monitor, step by step (in French)" data-play="Play video" data-privacy="The video is in French. It loads from YouTube only after you click.">
<a href="https://youtu.be/gBbZME6zOJY">Open on YouTube: SuricateWeb: add a site to monitor, step by step (in French)</a>
</div>

## 2. Receive alerts

Without a notification channel, alerts stay visible in the **Alerts** tab but nothing warns you. Set up at least one channel:

- [Telegram](/en/alerts/telegram/): alerts with a photo of the page, “Mark as read” and “Open” buttons;
- [Slack](/en/alerts/slack/): colour-coded alerts in your team's channel.

## 3. Go further

- A WordPress or PrestaShop site? [Install the plugin](/en/cms/install/): late updates, modified files, administrator accounts, server health.
- Several clients? Sort sites into **groups** (drag and drop) and share a **monthly report** or a public **status page**.
- A domain with no website (email, reserved name)? Pick the **Domain only** type: only DNS and the registry are monitored.

:::tip
To try it with nothing to configure, the self-hosted version has a **demo mode** (`npm run demo`) with fictional sites, alerts and screenshots.
:::
