---
title: FAQ
description: Answers to common questions and limits to know.
---

## What is the difference between the hosted and the self-hosted version?

The core is the same. The hosted version adds accounts, plans, email, multiple notification channels and hosting. The self-hosted version is free software and belongs to you, with a single account protected by an environment password.

## I receive no alerts.

Check in order: the channel is set up and **tested** ([Telegram](/en/alerts/telegram/), [Slack](/en/alerts/slack/)); notifications are **on**; the **minimum level** is not “Critical only” for a “warning” alert; the site is not **paused** or in **maintenance** (alerts are then held back).

## The “Open in SuricateWeb” button does not show in Telegram.

SuricateWeb needs a **public address** reachable from a phone (Settings). Telegram refuses `localhost` and private networks.

## The widget says “Not linked yet”.

See [Dashboard widget](/en/cms/dashboard-widget/#how-the-widget-gets-linked): click **Refresh** in the site's Updates tab and read the widget card.

## A tab says “plugin too old”.

Replace the plugin with the latest archive, downloadable from the site's settings. The token is kept. See the version table in [Install the plugin](/en/cms/install/#which-version-for-which-feature).

## Are backups monitored?

No. There are too many backup solutions, and a plugin cannot know whether a copy is really restorable.

## What should I do about a critical “content replaced” alert?

Open the site's **screenshot** to see what your visitors see, compare it with the previous one, then check the **Security** tab (modified files, administrator accounts) and the **Activity** log. Change the passwords and restore a clean backup.

## Where do I report a problem?

On the [GitHub](https://github.com/arnaudroy-lab/suricateweb/issues) repository.
