---
title: "[Ita] Nodejs - log eccezioni inattese"
date: 2012-03-15T20:35:00+02:00
category: Tutorial
tags: [Nodejs, it]
email: luca@lanziani.com
series: [NodeInPillole]
lang: it
---

Nella pillola precedente [(uncaught exception)]({filename}/posts/2012/03/nodejs_uncaughtExceptions.md) abbiamo visto come evitare interruzioni inaspettate del servizio.

<!--more-->

E’ opportuno tenere un log di questi eventi in modo da correggere gli errori che li hanno scatenati, sostituendo il console.log dell’esempio precedente con qualcosa di simile a:

    :::javascript
    var date = new Date();
    console.error("Eccezione inattesa: il %s\n %s", date.toLocaleString(), err.stack);

magari re-direzionando lo stderr in un file.

Unix tip:

    :::bash
    node app.js 2> error.log
