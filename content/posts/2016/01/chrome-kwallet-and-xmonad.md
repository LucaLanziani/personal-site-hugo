---
title: "Chrome kwallet and xmonad"
date: 2016-01-19T11:13:00+02:00
category: How-to
Status: draft
tags: [tips, how-to, security]
email: luca@lanziani.com
---

During the last month, after the umpteenth Plasma crash, I'm gradually switching to [xmonad][1]

The hardest part of the switch has for sure been changing my behaviour from floating to a tiling window system. But also missing my configurations and tools is becoming a problem.

<!--more-->

In KDE I had kwallet to store my password and with a couple of click I had chrome configured to use it to store the password, how do I do the same on xmonad?

I've found out that chrome supports kwallet out of the box, you just need to use the `--password-store=kwallet` command line flag, but how do I tell chrome to always run with that flag?

## Solution

On [Archlinux][2] the [google-chrome][3] package's script contains the following lines:

```bash
> $ cat $(which google-chrome) 
#!/bin/bash

# Allow users to override command-line options
if [[ -f ~/.config/chrome-flags.conf ]]; then
   CHROME_USER_FLAGS="$(cat ~/.config/chrome-flags.conf)"
fi

# Launch
exec /opt/google/chrome/google-chrome $CHROME_USER_FLAGS "$@"%   
```

as you can see, the script is loading the `CHROME_USER_FLAG` from the `~/.config/chrome-flags.conf` file, so all we need to do is edit that file and add the following option in it:

```
--password-store=kwallet
```

At the next startup you will have chrome asking for kwallet config/password.


[1]: http://xmonad.org/
[2]: https://www.archlinux.org/
[3]: https://aur.archlinux.org/packages/google-chrome/
