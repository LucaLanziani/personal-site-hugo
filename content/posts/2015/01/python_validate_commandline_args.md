---
title: "Python - validate command line args"
date: 2015-01-29T15:42:00+02:00
category: Python
tags: [Python, tips, docopt, Schema, libraries]
email: luca@lanziani.com
---

Ok, in the last article I've shown you a [tool][1] to write a nice command line interface, but it doesn't help you on validation.

<!--more-->

	:::python
	try:
		level = int(args['--log-level'])
	except ValueError:
		raise ArgsError('--log-level has to be a valid integer')

Manual validation? There is a much better way to do it, using [Schema][2].

> **schema** is a library for validating Python data structures, such as those obtained from config-files, forms, external services or command-line parsing, converted from JSON/YAML (or something else) to Python data-types.

So **we are not bounded to [docopt][3] validation**, we can actually use this library for many other validation tasks.
I'm not going to present the library itself because it's possible to find all the example on the [github page][2].

However **I'll leave the [docopt][3] validation example**, just to show you something and give you an excuse to read more about it ;).

### Example

Assume you have this usage string:

	:::bash
	Usage: my_program.py [--count=N] <path> <files>...

That correspond to the following output of [docopt][3]:

	:::python
	args = {
		'<files>': ['LICENSE-MIT', 'setup.py'],
		'<path>': '../',
		'--count': '3'
	}

You can validate it using [Schema][2] like this:

	:::python
	from schema import Schema, And, Or, Use
	import os
	s = Schema({'<files>': [Use(open)],
	            '<path>': os.path.exists,
	            '--count': Or(None, And(Use(int), lambda n: 0 < n < 5))})
	args = s.validate(args)

This will raise an exception in case of some args not respecting the specified rules or it will return the args applying the given operations on them (Use(int) and Use(open)_) otherwise.

In this case it will return the following data:

	:::python
	args = {
		'<files>': [<open file 'LICENSE-MIT', mode 'r' at 0x...>, <open file 'setup.py', mode 'r' at 0x...>],
		'<path>': '../',
		'--count': 3
	}

_Note how '--count' now is no more a string but it has been converted via `Use(int)`._

[1]: {filename}/posts/2015/01/python_commandline_interface.md
[2]: https://github.com/keleshev/schema
[3]: http://docopt.org/
