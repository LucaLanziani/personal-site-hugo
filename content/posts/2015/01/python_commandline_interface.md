---
title: "Python - command line interface"
date: 2015-01-05T18:45:00+02:00
category: Python
tags: [Python, tips, docopt, libraries]
email: luca@lanziani.com
---

How to write a better command line interface with python...

Writing the Nth python shell script I found myself looking **again** at the documentation of _argparse_, **A NIGHTMARE**.
After 15 minutes spent trying to understand how to use it I gave up.

<!--more-->

Is in that moment that I've found [docopt][1].

Docopt gives you the possibility to describe the command line interface as a string, following the "man page" format:

    :::python
    # -*- coding: utf-8 -*-
	"""
	Usage: test.py [options] DIRECTORY

	Options:
	    --debug              debug option
	    --log-level=<level>  define the log level
	"""

And parse and use it with a single line:

	:::python
	from __future__ import print_function
	from docopt import docopt

	if __name__ == '__main__':
		args = docopt(__doc__)
		print(args)

Now you just need to call the script as `./test.py . --log-level=3` and it will print out a dictionary containing the options:

	:::python
	{
		'--debug': False,
 	 	'--log-level': '3',
 		'DIRECTORY': '.'
 	}

In the official github repository [https://github.com/docopt][2] you can find the implementation of this library for the most common languages.

Or a list of more exhaustive [examples][3].



[1]: http://docopt.org/			"official site"
[2]: https://github.com/docopt  "github repo"
[3]: https://github.com/docopt/docopt/tree/master/examples  "examples"
