---
title: "Copy an HTML table as CSV"
date: 2024-07-04T11:24:44+02:00
category: automation, general
tags: [html, bookmarklet]
email: luca@lanziani.com
description: "Get an HTML table values as CSV"
series: []
---

I've found myself having to copy some HTML tables repeatedly, and since it was an annoying operation, I decided to create my bookmarklet to automate the process.

How does it work?

1. Select any text in the HTML table 
2. Click the bookmark
3. Paste the CSV result where you want it

<!--more-->

If you don't trust me, use the following code to build the bookmarklet yourself.

```javascript
function download_table_as_csv(separator = ',') {
    // Select rows from table_id
    var s = window.getSelection();
    var table = s.anchorNode.closest("table");
    var rows = table.querySelectorAll('tr');
    // Construct csv
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');
        for (var j = 0; j < cols.length; j++) {
            // Clean innertext to remove multiple spaces and jumpline (break csv)
            var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ');
            // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
            data = data.replace(/"/g, '""');
            // Push escaped string
            row.push('"' + data + '"');
        }
        csv.push(row.join(separator));
    }
    var csv_string = csv.join('\n');
     navigator.clipboard.writeText(csv_string);
}
download_table_as_csv();
```

Here is the code you can copy to the bookmark directly:

```javascript
javascript:(function(){function download_table_as_csv(e=","){for(var l=window.getSelection().anchorNode.closest("table").querySelectorAll("tr"),o=[],r=0;r<l.length;r++){for(var n=[],a=l[r].querySelectorAll("td, th"),t=0;t<a.length;t++){var c=a[t].innerText.replace(/(\r\n|\n|\r)/gm,"").replace(/(\s\s)/gm," ");c=c.replace(/"/g,'""'),n.push('"'+c+'"')}o.push(n.join(e))}var s=o.join("\n"); navigator.clipboard.writeText(s)}download_table_as_csv();}());
```

Here is link you can drag and drop in your bookmarks toolbar.

<a href="javascript:(function(){function download_table_as_csv(e=&quot;,&quot;){for(var l=window.getSelection().anchorNode.closest(&quot;table&quot;).querySelectorAll(&quot;tr&quot;),o=[],r=0;r<l.length;r++){for(var n=[],a=l[r].querySelectorAll(&quot;td, th&quot;),t=0;t<a.length;t++){var c=a[t].innerText.replace(/(\r\n|\n|\r)/gm,&quot;&quot;).replace(/(\s\s)/gm,&quot; &quot;);c=c.replace(/&quot;/g,'&quot;&quot;'),n.push('&quot;'+c+'&quot;')}o.push(n.join(e))}var s=o.join(&quot;\n&quot;); navigator.clipboard.writeText(s)}download_table_as_csv();}());">TableAsCSV</a>
