---
title: "[Ita] Gitosis - server git privato"
date: 2010-04-14T14:10:00+02:00
category: How-to
tags: [git, server, linux, it, gitosis]
email: luca@lanziani.com
lang: it
---

Ho necessita qualche volta di gestire in maniera flessibile lo sviluppo del software che scrivo utilizzando [git] [1].

<!--more-->

> Git is a free & open source, distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

Spesso per fare ciò mi affido a qualche servizio esterno ma avendo a disposizione un server personale mi sono chiesto, perché non sfruttarlo anche a questo scopo?

Cercando ho trovato [gittosis] [2],

> gitosis aims to make hosting git repos easier and safer. It manages multiple repositories under one user account, using SSH keys to identify users. End users do not need shell accounts on the server, they will talk to one shared account that will not let them run arbitrary commands.

Ho distillato qui i passi per la configurazione prendendo spunto da questa [guida][3].

## Installare

### Archlinux way

Per installare il software basterà lanciare sul server il semplice comando:

```bash
yaourt -S gitosis-git gitosis-scripts
```

In questo modo verranno installati il software con alcuni script aggiuntivi e inoltre verrà creato un utente “git” ed un gruppo omonimo.

### Le altre distribuzioni

E' necessario installare il software e creare utente e gruppo a mano (l’utente deve avere una shell e una home ma non una password)

## Configurare

**Sul vostro Client** (il computer da cui sviluppate) create le chiavi ssh per il vostro utente con il comando:

```bash
ssh-keygen -t rsa
```

e copiate il file `~/.ssh/id_rsa.pub`, creato da quel comando, sul server.

**Sul server** tramite l’utente “git” (basterà diventare root e usare il comando su git, oppure usare sudo) lanceremo il comando:

```bash
gitosis-init < /tmp/id_rsa.pub
```

Questo comando creerà le directory "gitosis" e "repositories" nella home dell'utente "git" e aggiungerà la chiave pubblica del client tra quelle autorizzate.

Per una maggiore sicurezza è anche consigliato settare i permessi di esecuzione al file "post-update" con il comando:

```bash
chmod 755 /home/git/repositories/gitosis-admin.git/hooks/post-update
```

basterà ora lanciare sul client il comando:

```bash
git clone git@YOUR_SERVER_HOSTNAME:gitosis-admin.git
```

e dovreste trovarvi la directory "gitosis-admin" sincronizzata in locale.

Probabilmente "tradurrò" anche il resto della guida appena ho tempo, per ora mi fermo qui.

Saluti, Nss

[1]: http://git-scm.com/
[2]: http://www.ohloh.net/p/gitosis
[3]: http://scie.nti.st/2007/11/14/hosting-git-repositories-the-easy-and-secure-way
