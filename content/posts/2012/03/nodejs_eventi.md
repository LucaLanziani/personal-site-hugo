---
title: "[Ita] Nodejs - gli eventi"
date: 2012-03-06T19:20:00+02:00
category: Tutorial
tags: [Nodejs, it]
email: luca@lanziani.com
series: NodeInPillole
lang: it
---

Abbiamo citato il fatto che un punto di forza di nodejs è dato dal suo essere guidato da eventi.
Vediamo quindi come agganciare una callback agli eventi.

<!--more-->

{{< youtube ZF7toA0FLGI >}}
<br/>

Il [sito ufficiale]( http://nodejs.org/about/) ci dice che, nell’esempio del server web “hello world”, node chiede al sistema operativo di notificagli ogni nuova connessione prima di mettersi in sleep.
Quando si verifica una nuova connessione node esegue la callback associata all’evento.

