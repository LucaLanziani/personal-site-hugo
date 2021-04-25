---
title: "Read file in chunks in bash"
date: 2018-10-18T11:28:00+02:00
category: general
tags: [bash, file, chunk]
email: luca@lanziani.com
---

How to read a file in chunks.
You can optionally specify the starting point and the chunk size.

<!--more--> 

```bash
#!/bin/bash

function read_file_in_chunks { # FILENAME [START_FROM_LINE] [CHUNK_SIZE]
   FILENAME="$1" && shift
   START_FROM_LINE="$1" && shift || START_FROM_LINE=1
   CHUNK_SIZE="$1" && shift || CHUNK_SIZE=10

   FILE_LINES=$(wc -l < "${FILENAME}")
   FILE_LINE=${START_FROM_LINE}

   while [[ ${FILE_LINE} -le ${FILE_LINES} ]]; do
       CHUNK=$(tail -n +"${FILE_LINE}" "${FILENAME}" | head -${CHUNK_SIZE})

       echo "${FILE_LINE} of ${FILE_LINES}"
       echo $"${CHUNK}"  # https://www.gnu.org/software/bash/manual/html_node/ANSI_002dC-Quoting.html

       ((FILE_LINE+=CHUNK_SIZE))
   done
}

read_file_in_chunks "${@}"
```