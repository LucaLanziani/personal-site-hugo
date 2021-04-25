---
title: "[Ita] Nodejs - Servire un file"
date: 2012-03-10T19:30:00+02:00
category: Tutorial
tags: [Nodejs, it]
email: luca@lanziani.com
series: NodeInPillole
lang: it
---

Leggiamo il contenuto dei file presenti in una specifica directory,  tramite il [modulo fs][1],   ed inviamolo al client.

<!--more-->

{{< youtube GPSetexGMJw >}}
<br/>

Utilizziamo il [modulo mime][2],  installato tramite [npm][3], per indicare al client il tipo del contenuto che gli stiamo inviando.
Nel caso il file richiesto dal client non fosse presente, ritorniamo un 404 risorsa non trovata.

Potete trovare il codice di base del video su [https://github.com/nodeinpillole/fileReader/zipball/base](https://github.com/nodeinpillole/fileReader/zipball/base)

[1]: http://nodejs.org/api/fs.html "modulo fs"
[2]: https://github.com/bentomas/node-mime "modulo mime"
[3]: http://npmjs.org/ "npm"