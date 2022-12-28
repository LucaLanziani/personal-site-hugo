---
title: "[Ita] cgit - web interface per gitosis"
date: 2010-04-15T17:40:00+02:00
category: How-to
tags: [git, server, linux, it, gitosis, cgit]
email: luca@lanziani.com
lang: it
---

Dopo aver [configurato il mio server git]({filename}/posts/2010/04/gitosis_server_git_privato.md) mi sono chiesto quale fosse il modo migliore per navigare i progetti, sempre con l’aiuto di google ho scovato [cgit][1]

<!--more-->

> cgit is an attempt to create a fast web interface for the git scm, using a builtin cache to decrease server io-pressure.

**Questa interfaccia è basata su: un “semplice” script cgi scritto in c**, un file di configurazione `/etc/cgitrc`, un foglio di stile css e un logo.

Per installare cgit su Archlinux basterà il comando:

```bash
yaourt -S cgit
```

che oltre a installare il man e a creare alcune cartelle utili, fornirà i seguenti file:

```bash
    /etc/cgitrc
    /srv/http/cgit/cgit.cgi
    /srv/http/cgit/cgit.css
    /srv/http/cgit/cgit.png
```

**Nella configurazione di Apache** di Archlinux, esiste un alias che specifica che **all’url `/cgi-bin/` corrisponde il percorso fisico `/srv/http/cgi-bin`** dobbiamo quindi creare la directory in questione e copiarci all’interno il file `cgit.cgi`:

```bash
mkdir /srv/http/cgi-bin
cp /srv/http/cgit/cgit.cgi /srv/http/cgi-bin/
```

**diciamo** quindi **al software dove trovare il logo e il foglio di stile** modificando **nel file di configurazione `/etc/cgitrc`** le variabili `css` e `logo` come segue:

```bash
css=/cgit/cgit.css
logo=/cgit/cgit.png
```

**in fondo allo stesso file trovate le righe** di esempio **per configurare i repository da monitorare,**

```bash
repo.url=saetta
repo.path=/tmp/saetta.git
repo.desc=the master foo repository
repo.owner=fooman@foobar.com
repo.readme=info/web/about.html
```

Inseriamo quindi un alias **nel file `/etc/httpd/conf/httpd.conf`** che richiami lo script cgit.cgi quando visitiamo l’indirizzo “http://dominio-git/git”:

```bash
ScriptAlias /git "/srv/http/cgi-bin/cgit.cgi"
```

**e riavviamo il server apache.**

Per vedere il risultato visitate _http://vostrodominio/git_ e dovreste trovarvi un’interfaccia simile a quella del [progetto stesso][1] :D

[1]: http://hjemli.net/git/cgit/tree/README
