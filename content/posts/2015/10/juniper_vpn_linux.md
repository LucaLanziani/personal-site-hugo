---
title: "Juniper vpn on linux!"
date: 2015-10-26T14:05:00+02:00
category: Tricks
tags: [vpn, linux, juniper, 32bit]
email: luca@lanziani.com
---

Are you running a 64bit linux flavor and you are having problem to connect to a Juniper vpn system, even using a 32bit firefox with a 32bit jre plugin as many online pages suggest?

<!--more-->

I have the solution for you, it is [openconnect][1]:

```
sudo openconnect --juniper https://endpoint
```

that is it, wasn't it simple? ;).
 
[1]: http://www.infradead.org/openconnect/index.html
