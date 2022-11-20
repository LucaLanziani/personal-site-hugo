---
title: "[Ita] Nodejs - uncaught exceptions"
date: 2012-03-14T19:35:00+02:00
category: Tutorial
tags: [Nodejs, it]
email: luca@lanziani.com
series: [NodeInPillole]
lang: it
---

**Le interruzioni di servizio potrebbe essere problematiche?**

Meglio non dimenticarsi un:

<!--more-->

    :::javascript
    process.on('uncaughtException', function (err) {
      console.log('Caught exception: ' + err);
    });

questo garantisce che il vostro sistema continui a funzionare anche in caso di eventi inattesi.
Potrebbe salvarvi la vita diverse volte, soprattutto in produzione.

PS. Continuate a gestire in maniera corretta le eccezioni, il codice sopra è utile solo come paracadute di emergenza ;).
