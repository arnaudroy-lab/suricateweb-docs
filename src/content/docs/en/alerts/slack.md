---
title: Slack alerts
description: Send SuricateWeb alerts to a Slack channel with an incoming webhook.
---

Alerts arrive in your team's Slack channel, in addition to (or instead of) Telegram. Nothing to host: an **incoming webhook** is enough. The Slack channel is available on **all plans** of the hosted version.

## Setup

1. At `api.slack.com/apps`, create an app, turn on **Incoming Webhooks**, then *Add New Webhook to Workspace* and pick the channel.
2. Copy the webhook address (`https://hooks.slack.com/services/T…/B…/…`).
3. In SuricateWeb, **Settings › Slack notifications**: paste the address and click **Test** (a real message goes to the channel), then **Save**.

## What a message contains

One message per check: a header with the highest severity and the site name, one section per alert (title, detail, extract of the changes as an option), the site address and an **Open in SuricateWeb** button when the instance's public address is usable. The colour bar follows the severity: red, orange, blue, and green for a recovery.

The options are the same as for Telegram: notifications on, recovery, extract of the changes, minimum level.

## Security

- **The webhook address is a secret**: anyone who has it can post in your channel. SuricateWeb never shows it in full again, and encrypts it in the database when an encryption key is configured.
- Only addresses of the form `https://hooks.slack.com/services/…` are accepted: the field cannot be used to make the server reach an internal address.

## Limits

A webhook can neither upload an image nor receive a click: **no attached screenshot** and **no “Mark as read” button** in Slack. Those two features remain specific to [Telegram](/en/alerts/telegram/).

If Slack answers “too many requests”, SuricateWeb retries once after the requested delay. If the webhook was revoked or the channel archived, the alert is marked as a sending error with an explanation, and Telegram is not affected.
