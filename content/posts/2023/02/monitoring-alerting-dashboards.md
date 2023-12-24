---
title: "Monitoring - Alerting Dashboards"
date: 2023-02-26T23:50:00+02:00
category: Alerting, Dashboards, Monitoring, Observability
tags: [Alerting, Dashboards, Monitoring, Observability, SRE]
email: luca@lanziani.com
description: "Alerting Dashboards, stay on top of your alerts"
series: [Monitoring, Dashboards,]
images:
  - "https://lanziani.com/static/monitoring/dashboards.jpg"
---

This is the third and last blog post of the Monitoring series.

In the past two blog posts, I wrote about the following:

- Status Dashboards ([https://lanziani.com/posts/2023/02/monitoring-status-dashboards/](https://lanziani.com/posts/2023/02/monitoring-status-dashboards/))
- T&T Dashboards ([https://lanziani.com/posts/2023/02/monitoring-tandt-dashboards/](https://lanziani.com/posts/2023/02/monitoring-tandt-dashboards/))

This time around, we will look at Alert Dashboards.

<!--more-->

Alerts are quite an exciting part of your system too; there are different aspects to consider, but we are here to talk about dashboards, we might get to the Alerts themselves in a different blog post.

## Dashboards

The typical way to discover new alerts for a team is via push notifications via Slack, Teams, IRC or SMS.

This is probably the most effective way because, assuming that we don’t have false positives or at least we don’t have too many of them and assuming that every alert is an actionable alert, we want the person/people in support to receive them ASAP.

> We will expand on false positives, and the right time to send a push notification on a future post about alerts, some issues can be predicted based on trends and for some alerts, we might wait before sending the notifications.

Many teams then move from the alert to either [Status Dashboards](https://lanziani.com/posts/2023/02/monitoring-status-dashboards/) or [T&T Dashboards](https://lanziani.com/posts/2023/02/monitoring-tandt-dashboards/) and start the investigation from there while trying to keep the rest of the team updated, maybe adding the incident on a separate system and leaving updates and/or creating a dedicated channel in the internal chat system where to invite all the people needed to resolve the incident (war room).

So do we need the Dashboards, you say? You know my answer since I’m writing this blog post; let me tell you why I believe Alerting dashboards are very important for your team.

My view for Alerting Dashboards is the following; they should:

- Show all Active alerts.
- Show all Active alerts matching a given filter.
- Allow people to subscribe to all alerts that will match the above filter.
- Allow people to augment alerts with comments, reactions and tags.
- Show the frequency of each alert for the past X days, with X configurable.
- Show a counter for the alerts in Critical, Warning, and Silenced state.
- Allow people with a given role to:
  - Assign alerts to a specific incident (even just adding tags)
  - Silence the alerts for a given amount of time.
    - Alerts notifications should trigger periodically if not silenced.
  - Prioritize alerts.
  - Assign alerts or incidents to people.
- (BONUS) Allow notifications to be customizable per role.
- (BONUS) Allow smart notifications.
- (BONUS) Integrate with external systems and keep track of all the actions happening.

Should I include something else in the above list? Let me know via [Twitter](https://twitter.com/lucalanziani/status/1629978419885752322), [LinkedIn](https://www.linkedin.com/posts/lucalanziani_bloggingatmidnight-activity-7035744111638814720-lUgF) and [Mastodon](https://mastodon.uno/@lucalanziani/109933501753792579).

## Why?

I know the process starts with an alert notification. Still, In some instances, you may receive multiple alert notifications at once, and creating an investigation for each Alert will be pretty challenging.

Even if you receive a single alert notification, it's possible that others will be triggered while investigating the first or that a second alert might have a higher priority than the first one.

Having all the alerts in a central place will allow you to assess the situation better and properly plan subsequent actions. You could prioritize and tag alerts and assign them to incidents or people while watching everything happening.

EVERY stakeholder should use the same Dashboard to stay up to date so that the person assigned to the incident can focus solely on solving the issue without distraction.

You could also temporarily silence one Alert or its notifications while you work on it; the same should be for all alerts related to an incident. This is extremely useful if, like me, you believe a notification for an alert should re-trigger periodically if no actions are taken to avoid so.

Allowing people to interact with the alerts or the incidents will simplify the triaging process, and having the full context in one place will speed up actions and simplify collaboration. It will also help maintain historical data; you could easily find comments from previous occurrences of the same Alert and couple that with the frequency feature I proposed above to surface recurring issues.

I mentioned notifications multiple times in this post; the monitoring system often drives notifications, but there could be merit in delegating these to Alert Dashboards.

Imagine for a second you have a dashboard with the above capabilities. Wouldn't it be nice to have it use all the data to drive smart notifications? What if you want to trigger a notification only if the same alert trigger twice in a given amount of time? What if you want to customize notifications based on people role? What if you escalate notifications if the alert is not acknowledged in a given amount of time or not closed/solved in a given amount of time?

I’ll leave you with a question, should alerts disappear if the condition that triggered them is not met anymore, or should they stay visible until an operator decides to remove them?

> if you want to talk more about Alerts you can find me on [Twitter](https://twitter.com/lucalanziani/status/1629978419885752322), [LinkedIn](https://www.linkedin.com/posts/lucalanziani_bloggingatmidnight-activity-7035744111638814720-lUgF) and [Mastodon](https://mastodon.uno/@lucalanziani/109933501753792579).
