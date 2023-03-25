---
title: "Development Environment"
date: 2023-03-12T23:20:00+02:00
category: PathToProduction, Intro, Release Management
tags: [PathToProduction, Intro, Release Management]
email: luca@lanziani.com
description: "Now that is a challenge..."
series: ["Path to Production"]
images:
  - "https://lanziani.com/static/pathtoproduction/BrainToLaptop.png"
---

The first step of the Path to Production starts from our development environment, as the rest of the stages it changed quite a lot in the last ten years.

I clearly remember how I was [coding during high school](https://lanziani.com/posts/2022/11/coding-during-high-school/), from the Z80 suitcase where we would enter HEX instructions in the Numpad to Pascal, C and Borland Delphi.

Machines had a fraction of the power or memory or storage they have now, and yet the software I was able to build with Delphi was pretty impressive (for the 17 years old me), and I felt very productive.

<!--more-->

Move forward 22 years, and we are in complete different environment.

The machine I’m writing this blog post from is from 2017; specs below:

```bash
                   -`                    lucalanziani@thinarch470 
                  .o+`                   ------------------------ 
                 `ooo/                   OS: Arch Linux x86_64 
                `+oooo:                  Host: 20HDCTO1WW ThinkPad T470 
               `+oooooo:                 Kernel: 6.2.2-arch1-1 
               -+oooooo+:                Uptime: 3 days, 12 hours, 33 mins 
             `/:-:++oooo+:               Packages: 1843 (pacman), 33 (flatpak) 
            `/++++/+++++++:              Shell: zsh 5.9 
           `/++++++++++++++:             Resolution: 1920x1080 
          `/+++ooooooooooooo/`           WM: i3 
         ./ooosssso++osssssso+`          Theme: Breeze [GTK2/3] 
        .oossssso-````/ossssss+`         Icons: breeze [GTK2/3] 
       -osssssso.      :ssssssso.        Terminal: terminator 
      :osssssss/        osssso+++.       CPU: Intel i7-7600U (4) @ 3.900GHz 
     /ossssssss/        +ssssooo/-       GPU: Intel HD Graphics 620 
   `/ossssso+/:-        -:/+osssso+-     Memory: 6019MiB / 31849MiB 
  `+sso+:-`                 `.-/+oso:
 `++:.                           `-/+/                           
 .`                                 `/
```

 

This machine served me well for the past five years, and it still going strong, [but I had to adapt](https://lanziani.com/posts/2022/03/local-remote-workstation-setup/).

# What’s the purpose of a this first stage?

The purpose should be pretty obvious, we need a place to transform our ideas into code.

![Brain To Laptop](/static/pathtoproduction/BrainToLaptop.png)

The image shows exactly that, this environment should allow us to write what we want and “see” if we are getting the expected results.

We want to remove most of the friction from the process to maximize each individual's output.

What matters is the output quality and how long it takes to get from ideation to that output.

## How many tools?

I don’t want to be tricked by my memory, but the amount of tools we need today to develop a 3-tier app has increased significantly and, in general, the complexity of the systems we build has increased too.

These are just some of the tools that I have on my machine right now:

- Node.js®, GoLang, Python, az cli, gcloud cli, aws cli, awsvault, npm, helm, kind, tilt, kubectl, terraform, terragrunt, docker, docker-compose, etc.

![Laptop tools](/static/pathtoproduction/LaptopTools.png)

Each tool should be kept up to date, matching what the system uses, at least on CI.

Each tool might be used in one or more projects and might require different versions for each project.

Each tool is installed through different means (brew, linux package manager, curl 🙈, chocolatey, etc), and each OS might support different versions.

If the same project has different components, the tools need to be kept in sync between components and team members.

## Size of the projects

The size of the projects has also changed significantly; when I was building applications in Delphi, that meant a desktop application with an embedded database and a (decent?) GUI.

Now we are dealing with applications that run on the cloud, are distributed globally, and build with considerably different technologies and approaches.

- Frontend, Backend For Frontend, Backend, etc.
- Monolith or micro services
- Mono-repo or multi-repos

We should be able to move from one to another depending on how many projects we are working on simultaneously.

Now let's assume we are working on the Frontend code. We might need to run the rest of the components to test new functionalities, which implies replicating one of the above environments as much as possible.

But how do we run the other components?

- Serverless framework
- Kubernetes (Kind)
- Containers (docker or docker-compose)
- From code

These are some of the options, and whatever solution brings its challenges, and it is also very well possible that, depending on the project size, we might not be able to run all the components in our machine.

As crazy as it sounds, while in 2001 we were almost ok with 256MB of ram, today's 16GB might not be enough.

## Extra components

And what we discussed above is only part of the system, the part that we are building, we should not forget of all the components we might require to make everything run smoothly things like:

- queues
- load balancers
- databases
- auto-discovery mechanism
- secret management
- authentication and authorisation
- HTTP server or reverse proxy server ([HAProxy](https://www.haproxy.org/), [Nginx](https://nginx.org/en/), [traefik](https://traefik.io/))
- etc

These three sections should have shown how complex developing can be.

## Mimic other environments

Now let's assume that we have the tools to write and run our code, the framework to run the rest of the code, and a way to run the missing components; how do we "see" if we are getting the expected results?

Easy you’ll say, we’ll write some tests and use [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development), once the tests are green we are done.

Are we done?

Can we be sure that what we just did in our workstation will work the same on CI?

How many times have we said, “it works in my machine”?

The closer our local environment is to the environment where we run the tests, the more confident we can be that if our tests pass in local, they will also pass on CI.

Getting close includes the version of the code, tools, extra components, platform, etc.

## Ok then, what do we do?

There is no silver bullet, this post is only here to make us realize that we might spend most of our team's effort setting up the perfect CI/Staging/Production environment. Still, someone joining our team will have to figure out all the above themselves if no one focuses on making local development easy.

Some companies approach the problem with remote development environments like gitpod, github codespaces, etc.
They remove the burden from the developers to keep up to date the environments and shift the responsibility to different teams that will keep these remote environments updated for us.

At the end of the day, though, what matters is what we said at the start “the quality of the output and how long it takes to get from ideation to that output.”

Every person will have their preferred way of building, and "We want to remove most of the friction from the process to maximize each individual's output.”

## Next

In the next post we will explore talk about moving our code from Developer Environment to VCS. Stay tuned.
