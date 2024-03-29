---
title: "Control your monitors settings via software"
date: 2022-03-06T14:45:10+02:00
category: general, ddcutil, monitors, software, utils
tags: [ddcutil, linux, monitors]
email: luca@lanziani.com
description: "How to switch monitors settings via a linux software"
---

Did you know that you can control monitor settings on your terminal from Linux?  
How to simplify and automate certain operations like switching inputs or changing brightness.

<!--more-->

I have three monitors attached to my personal Linux laptop via display ports, and one of them is also connected to my work MacBook via the HDMI port.

Every morning before starting to work, I would click the buttons on the monitor to switch the input to HDMI, and the same would happen in the evening when I wanted to work on my projects.

It doesn't seem like much, but as a person striving to automate all I can, I concluded that there should have been a better way to do this.

A quick online search introduced me to [dccutil](https://www.ddcutil.com/)

> ddcutil is a Linux program for managing monitor settings, such as brightness, color levels, and input source. Generally speaking, any setting that can be changed by pressing buttons on the monitor can be modified by ddcutil.

I then created two aliases:

```bash
alias d1dp='sudo ddcutil --display 1 setvcp 60 0x10'
alias d1hdmi='sudo ddcutil --display 1 setvcp 60 0x11'
```

Now every day starts with a `d1hdmi` and ends with a `d1dp`.
