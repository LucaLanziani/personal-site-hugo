---
title: "My home setup"
date: 2023-02-05T22:25:00+02:00
category: Language, Home, Setup, SSL, Synology, pi-hole
tags: [Language, Setup, SSL, Synology, Pi-hole]
email: luca@lanziani.com
description: "How do I serve everything inside my house using SSL on a lanziani.com subdomain"
images:
  - "https://lanziani.com/static/MyHomeSetup.jpg"
---

I'm a nerd; I'll not deny it.
I love to explore new things, run experiments and learn from them.

I want a stable system to backup my data, be it pictures, videos, documents etc. I want a place to install and run software that I want to test and possibly have it at hand reach when needed.

I want everything in my network to work over SSL, and I want to have the ability to serve different services on different subdomains of a well-known domain so that my family can reach them without having to know an IP address.

After a couple of years of experimenting, I finally found something that works.

<!--more-->

## The components

1. Router - FRITZ!Box 7490
2. DNS - **Raspberry Pi** with Pi-hole installed
3. Backup Server - Synology NAS (4 bays - ~5TB of space)
4. Experimentation - Custom Built PC (AMD Ryzen 5 3600 - 64GB ram - 6.7TB raid5)

## The setup

### Routing

The FRITZ!Box it's the default DHCP server in the house; it connects directly to my internet provider (Vodafone) and provides mostly dynamic IPs to the devices in the network; I said mostly because all the components above are instead set to have fixed IPs.

### DNS

The other important thing that the router does is to [tell every device in the network to use the Raspberry Pi](https://docs.pi-hole.net/routers/fritzbox/) as the default DNS server where, we already know, Pi-hole is installed.

If you don't know what Pi-hole is, the [website](https://pi-hole.net/) describes it as **Network-wide Ad Blocking** providing the followings.

![PiHole](/static/Pihole.png)

The Pi-hole does a fantastic job at the above, and it can do more for me; I said above I wanted all my services to be reachable with a well know domain; Pi-hole can do precisely this for us.

If you are reading this, you already know that I own the domain lanziani.com; why not use it to serve internal services as well?

Pi-hole has a `Local DNS` functionality that allows you to serve DNS responses for manually defined records.
I've added subdomains to [lanziani.com](http://lanziani.com) and serve the static IPs of the devices in my network. eg:

| nas.lanziani.com     | 10.0.0.2 |
| -------------------- | -------- |
| photos.lanziani.com  | 10.0.0.2 |
| jenkins.lanziani.com | 10.0.0.3 |

### NAS

The Synology NAS, as you can see below, supports subdomains for running services.

![Synology](/static/Synology.png)

With this setup, my family knows that they have to enter [photos.lanziani.com](http://photos.lanziani.com) to view all family photos, [drive.lanziani.com](http://drive.lanziani.com) to access their documents etc.

The NAS has 4 Disks in Raid6 that, in theory, should give me enough peace of mind, considering that I'm also backing everything up encrypted in the cloud. Still, the issue is that I'm using the Synology cloud, and the NAS encryption system that would not allow me to access the files in case of a system failure.

### Enter the Custom PC build

Last year once I decided that I needed some place where to experiment with the various DevOps tools.

I tried using the NAS since it supports Docker containers but quickly found its limits, so I reached a local PC shop (buy local if you can) and asked them if they could build me a complete PC.

The things I needed were:

1. Powerful enough to run experiments.
2. Enough ram to support multiple services running.
3. Enough space to backup the NAS content.
4. Silent, since it will sit in my office (I might move it soon).

As I said the first thing I decided to do is to backup my NAS to the PC; I used `mdraid` to build a RAID5 out of the 4 (**3.64 TiB)** disk and create a task to rsync files over**.**

But what about running experiments and hosting things? The first thing I moved is my custom-built KNX home automation dashboard (more details in a future blog post).

I added multiple services like Jenkins, Grafana, Unifi controller, and Postgres.

Some are installed directly in the system, others in docker via docker-compose.

I also wanted these services to be available via an FQDN, so I installed NGINX and set it up as a reverse proxy. Check this digital ocean service to bootstrap your NGINX config [https://www.digitalocean.com/community/tools/nginx](https://www.digitalocean.com/community/tools/nginx?domains.1.server.domain=example2.com)

What about the SSL part, then? Let's Encrypt to the rescue. As I said above, I own [lanziani.com](http://lanziani.com), and "Let's Encrypt" offers you free SSL certificates.

> Let's Encrypt is a free, automated, and open certificate authority
> (CA), run for the public's benefit. It is a service provided by the [Internet Security Research Group (ISRG)](https://www.abetterinternet.org/).
>
> We give people the digital certificates they need in order to enable
> HTTPS (SSL/TLS) for websites, for free, in the most user-friendly way we
> can. We do this because we want to create a more secure and
> privacy-respecting Web.

All I had to do was install [https://certbot.eff.org/](https://certbot.eff.org/) add the DNS plugin to verify that I own the domain, and let it generate a certificate for \*.lanziani.com.

The certificate is used by NGINX and by the Synology NAS and everything in the network is served over HTTPS with a valid SSL certificate 🎉
