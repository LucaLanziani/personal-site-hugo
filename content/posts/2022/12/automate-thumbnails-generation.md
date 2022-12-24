---
title: "Automate thumbnails generation"
date: 2022-12-24T18:12:00+02:00
category: Streaming, Youtube, Twitch
tags: [Streaming, Youtube, Twitch]
email: luca@lanziani.com
description: "How I automate the thumbnails generation for my youtube videos"
images:
  - "https://lanziani.com/static/kubectl.png"
---

In my [latest post](https://lanziani.com/posts/2022/12/adventures-in-kubeland/) I told you I was starting a video series on Kubernetes and its ecosystem.

As part of the process, I uploaded all the streams on Youtube. I uploaded the first video without thinking it through. Still, for the second, I decided that it would be good to have a thumbnail for the video, and **why would I do it manually if there is a way to automate it**?

<!--more-->

I first designed the thumbnail using Inkscape and saved it as `thumbnail.svg`, the output is the image below:

![thumbnail.svg](/static/thumbnail.svg)

The rest is simple; the SVG format is just text, so every time I want to generate a new thumbnail, I can run:

```bash
export TOPIC=kubectl;
sed "s/topic/$TOPIC/" thumbnail.svg | convert -size 2560x1440 svg:- "$TOPIC.png"
```

To get:

![kubectl.png](/static/kubectl.png)

This process will also help if I change the template slightly and want to regenerate the thumbnails for all the videos.
