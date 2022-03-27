---
title: "My new remote-local workstation setup"
date: 2022-03-27T11:48:00+02:00
category: general, development, remote, homelab,
tags: [development, homelab, remote]
email: luca@lanziani.com

twitter:
  card: "summary"
  site: "lanziani.com"
  title: "My new remote-local workstation setup"
  description: "Use my laptops as a light interface to a local workstation"
  image: "https://lanziani.com/static/remote_local_setup.png"
---

I always wanted to solve the problem of moving from laptop 1 to laptop X while continuing working on a taks

The perfect example is this blog post, I'm writing this from laptop 1 but I would love to keep going from where I left when switching to a different laptop.

This should work not just for text editing but also for webpages, that's because before publishing this I always use grammarly and google translate to refine the writing.

<!--more-->

# Previous workflow

## Code editing

Text editing was the easier to solve, in the past my usual workflow on each laptop was:

1. cd into personal-site-hugo repo
2. switch to branch
3. git pull
4. make changes
5. git commit
6. git push

This is suboptimal, I often forgot to push the changes, or forgot to set the post in draft causing it to be erroneusly published.

It also meant every laptop had to have the same set of tools, not just the language runtime but also any other tool needed to debug/test etc etc.

## Remote desktop

The GUI applications where always an issue, for the browser I tried syncing the tabs but that's not enought some pages won't keep the context.

Other application cannot even be ported to all the OSes I use (Linux/OSX/Windows).

In any case I don't want to enter my service's credentials in all the laptops.

# New workflow

## Remote editing

I use visual studio code for pretty much all my developmen, this made the change a lot easier.

For the one of you that don't know this, visual studio code has a function called [Remote Development](https://code.visualstudio.com/docs/remote/remote-overview):

> Visual Studio Code Remote Development allows you to use a container, remote machine, or the Windows Subsystem for Linux (WSL) as a full-featured development environment. You can:
>
> - Develop on the same operating system you deploy to or use larger or more specialized hardware.
> - Separate your development environment to avoid impacting your local machine configuration.
> - Use tools or runtimes not available on your local OS or manage multiple versions of them.
> - Access an existing development environment from multiple machines or locations.

![image](/static/vscode-remote-development-architecture.png)

All you have to do is to use the [SSH extension](https://code.visualstudio.com/docs/remote/ssh) and you will get access to the remote filesystem, you'll get a remote shell and you can even forward ports directly from VS Code.

## Remote desktop

Now we have to solve the GUI applications issues, for that I've decided to go with [tigervnc](https://tigervnc.org/).

This example is based on Archlinux, in the local server:

### Install the package

```bash
pacman -S tigervnc
```

### Setup a password

```bash
vncpasswd
```

### Assign user to a display

```bash
echo ":1=lucalanziani" | sudo tee -a /etc/tigervnc/vncserver.users
```

### List available Desktop Environments

```bash
ls /usr/share/xsessions/
```

### Create basic configuration

```bash
cat >> ~/.vnc/config <<EOF
session=<ONE OF THE ABOVE DE>eg:gnome
geometry=1920x1080
localhost
alwaysshared
```

### Start the service

```bash
sudo systemctl start vncserver@:1
sudo systemctl enable vncserver@:1
```

### Connect to it

The vnc server is only exposed in localhost so in order to connect to it we have to first forward the port:

```bash
ssh <localserver> -L 9901:localhost:5901
```

Then with any vnc client you can connect to `localhost:9901` to have the remote session.

#### In OSX

Open Finder, press `⌘+k` and enter `localhost:9901`

---

Doing this I can easily switch from one laptop to another and keep going from where I left.
