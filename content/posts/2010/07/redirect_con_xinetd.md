---
title: "[Ita] Redirect con xinetd"
date: 2010-07-02T11:36:00+02:00
category: Tricks
tags: [xinetd, linux, it, redirect]
email: luca@lanziani.com
lang: it
---

Ho sempre sostenuto che sia cosa buona e giusta avere amici che ne sanno più di te :D.

<!--more-->

Problema:
---------

* Router con pagina di amministrazione sulla porta 8081
* Ip del router settato a 192.168.10.1
* Router con dmz abilitata su ip 192.168.10.90

Come accedo dall’esterno alla porta 8081 del router se quest’ultimo redirige tutte le richieste su 192.168.10.90?

Soluzione…
-----------

*Lorenzo :D*

Basterà aggiungere sulla macchina 192.168.10.90 il file __/etc/xinetd.d/routerwebmin__ e all’interno di questo le seguenti righe:

	service tproxy
	{
	        socket_type = stream
	        protocol = tcp
	        wait = no
	        user = root
	        bind = 192.168.10.90
	        redirect = 192.168.10.1 8081
	        disable = no
	}

a questo punto avviamo xinetd con il comando /etc/rc.d/xinetd start.

Il service name, in questo caso __tproxy__, deve corrispodere al nome del servizio associato alla porta, nel file `/etc/services`, su cui vogliamo ascoltare per il redirect.

PS. ricordiamoci di aggiungere tale demone tra quelli che partono all’avvio…