---
title: Activity log
description: Logins, accounts and plugins on a WordPress site, with truncated IP addresses and 90 days of retention.
---

:::note[Hosted version]
This feature is part of the WordPress / PrestaShop connector, included in the hosted version. When self-hosting, turn it on with `SURICATE_CMS=1` (see [Install the plugin](/en/cms/install/)).
:::

*WordPress, plugin 1.7 or later.* The **Activity** tab shows what happened on the site, as read by the plugin:

- successful and failed **logins**;
- **accounts** created, deleted, changed role or with a password reset;
- **plugins** installed, activated, deactivated, deleted or updated, a theme switched, WordPress updated.

A filter by group (Logins, Accounts, Extensions) and, for each event, the date, the account and the source.

## Two alerts

| Signal | Alert |
|---|---|
| **30 failed logins or more in an hour** (all accounts and sources) | **warning**: a password-guessing attack is probably under way |
| **A successful login in the last 6 hours, preceded by at least 10 failures from the same source within the hour** | **critical**: the password may have been guessed |

## Privacy

- The IP address is **never stored in full**: the plugin truncates it before writing (IPv4 to /24, for example `203.0.113.0`; IPv6 to /48) and only adds a **12-character salted fingerprint**, specific to the site, to recognise the same source from one event to the next. The full address cannot be recovered.
- A username typed in a **failed** login is only kept if it matches an existing account: people sometimes type their password in that field.
- **90 days** of retention (500 events at most on the plugin side), then automatic erasure, on the site and in SuricateWeb.
- **Can be turned on per site** (*Edit › WordPress / PrestaShop › Keep an activity log*, ticked by default). The plugin records nothing until SuricateWeb asks it to. Unticking turns it off and **erases** SuricateWeb's copy and the site's.
- During an attack, failures beyond 50 per 10 minutes are **grouped** into one event with its counter, so the site's database is not flooded.

:::caution[Behind a proxy or a CDN]
The plugin reads the `REMOTE_ADDR` address, because `X-Forwarded-For` headers can be forged. Behind a proxy, all visitors would then share the same source. Define `SURICATEWEB_TRUST_PROXY` in `wp-config.php` to read that header, **only if the proxy rewrites it**.
:::

These events are personal data: tell the site's users (legal notice) that logins are logged. On the hosted version they appear in the account's data export and disappear with the site.

PrestaShop has no activity log for now.
