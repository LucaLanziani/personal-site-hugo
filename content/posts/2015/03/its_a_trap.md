---
title: "It's a Trap!"
date: 2015-03-07T14:05:00+02:00
category: Tricks
tags: [bash, trap, forloop]
email: luca@lanziani.com
---

I do a big use of shell scripts, and many of them contain a for loop, do you know what normally happen when you press `CTRL^C` and the script is executing an action inside the loop?

<!--more-->

```bash
for i in test{6..10}.com; do
    echo "pinging ${i}"; ping -c 10 $i;
done;
```

You will have to press 5 times `CTRL^C` to quit the script.

To solve this problem and let the script terminate on the first `CTRL^C` you can use `trap`:

```bash
trap "echo Exited!; exit;" SIGINT SIGTERM

for i in test{6..10}.com; do
    echo "pinging ${i}"; ping -c 10 $i;
done;
```

Trap will execute the command specified when one of the signal is fired, for more information `man trap`

Enjoy your bash scripting ;).
