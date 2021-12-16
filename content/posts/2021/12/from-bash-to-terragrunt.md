---
title: "Let's talk terraform: from bash to terragrunt"
date: 2021-12-14T21:50:00+02:00
category: general, terraform, devops
tags: [devops, terraform]
email: luca@lanziani.com
---
We left the previous post of the series with a single Jenkins stack and the task of creating a second service out of it.

<!--more-->

## Multiple instances of the same stack in multiple environments

It seems evident that you would want to use the same terraform stack on multiple environments because you want reproducibility and consistency.

When I first started using Terraform I don't believe there was anything there to solve this problem; the solution that my team found was to write a "simple" bash script that would build a terraform command like this:

```
terraform plan \
    -var-file="${config_dir}/common.tfvars.json" \
    -var-file="${config_dir}/${env}/common.tfvars.json" \
    -var-file="${config_dir}/${env}/${region}/common.tfvars.json" \
    -var-file="${config_dir}/${env}/${region}/${component}/common.tfvars.json" \
    -var-file="${config_dir}/${env}/${region}/${component}/${instance}/config.tfvars.json" \
    ...
```

Every new component and every instance of it would have to follow this pattern when defining variables to use the same pattern everywhere.

It soon became evident that this method wasn't going to scale. We were building a significant sized infrastructure. It wasn't so much the number of unique components to be a problem; it was more the number of instances of the same components.

<details>
  <summary>56 directories, 57 files</summary>

```
terraform-configs > tree
.
├── common.tfvars.json
├── dev
│   ├── ap-southeast-2
│   │   ├── application
│   │   │   ├── common.tfvars.json
│   │   │   ├── test1
│   │   │   │   └── config.tfvars.json
│   │   │   ├── test2
│   │   │   │   └── config.tfvars.json
│   │   ├── common.tfvars.json
│   │   ├── logging
│   │   │   ├── common.tfvars.json
│   │   │   └── default
│   │   │       └── config.tfvars.json
│   │   └── monitoring
│   │       ├── common.tfvars.json
│   │       └── default
│   │           └── config.tfvars.json
│   ├── common.tfvars.json
│   ├── eu-west-1
│   │   ├── application
│   │   │   ├── common.tfvars.json
│   │   │   ├── test1
│   │   │   │   └── config.tfvars.json
│   │   │   ├── test2
│   │   ├── common.tfvars.json
│   │   ├── logging
│   │   │   ├── common.tfvars.json
│   │   │   └── default
│   │   │       └── config.tfvars.json
│   │   └── monitoring
│   │       ├── common.tfvars.json
│   │       └── default
│   │           └── config.tfvars.json
│   └── us-east-1
│       ├── application
...
│       ├── logging
...
│       └── monitoring
└── prd
    ├── ap-southeast-2
    │   ├── application
    │   │   ├── common.tfvars.json
    │   │   ├── test1
    │   │   │   └── config.tfvars.json
    │   │   ├── test2
    │   │   │   └── config.tfvars.json
    │   │   └── test3
    │   │       └── config.tfvars.json
    │   ├── common.tfvars.json
    │   ├── logging
    │   │   ├── common.tfvars.json
    │   │   └── default
    │   │       └── config.tfvars.json
    │   └── monitoring
    │       ├── common.tfvars.json
    │       └── default
    │           └── config.tfvars.json
    ├── common.tfvars.json
    ├── eu-west-1
    │   ├── application
...
    │   ├── logging
...
    │   └── monitoring
...
    └── us-east-1
...
```
</details>
<br/>

Imagine having to maintain all similar files in sync and having to propagate changes per environment in case of:

- variable renaming
- variable addition or removal
- components splitting

Of course, these weren't the only issues that this model was posing:

1. how to init the remote state for each stack using a different S3 path
2. how to know which version of the stack was compatible with variables in each stack/environment
3. how to know how many components and how many instances of the same were present
4. how to know if a stack was dependant on another
5. support of a custom bash script
6. which version of Terraform was ok to run on each stack/environment

# Enter Terragrunt 

**Thanks [Gruntwork.io](https://terragrunt.gruntwork.io/) 🙇**

Looking at the first two terragrunt commits this is what you get:

```
commit 493637bc77831a119f3083b9a45f6275d5792fd7
Author: Yevgeniy Brikman <brikis98@gmail.com>
Date:   Tue May 24 00:18:06 2016 +0200

    Initial commit

commit 9e266bebe67d7f659fce5702d0005cec4c1feb77
Author: Yevgeniy Brikman <brikis98@gmail.com>
Date:   Wed May 25 17:01:02 2016 +0200

    RDD: Create Readme to describe how terragrunt will work
```

We probably started using terragrunt one year later, I vaguely remember using terraform `0.8.x` at the time, which would place it around Feb 2017.

The tool brought a breath of fresh air to the team; we could finally use a more appropriate format to manage everything, replacing the instance-specific tfvars files with a `terragrunt.hcl` file.

<details>
  <summary>56 directories, 57 files</summary>

```
terragrunt-config > tree
.
├── common.tfvars.json
├── dev
│   ├── ap-southeast-2
│   │   ├── application
│   │   │   ├── common.tfvars
│   │   │   ├── test1
│   │   │   │   └── terragrunt.hcl
│   │   │   ├── test2
│   │   │   │   └── terragrunt.hcl
│   │   │   └── test3
│   │   │       └── terragrunt.hcl
│   │   ├── common.tfvars
│   │   ├── logging
│   │   │   ├── common.tfvars
│   │   │   └── default
│   │   │       └── terragrunt.hcl
│   │   └── monitoring
│   │       ├── common.tfvars
│   │       └── default
│   │           └── terragrunt.hcl
│   ├── eu-west-1
│   │   ├── application
│   │   │   ├── common.tfvars
│   │   │   ├── test1
│   │   │   │   └── terragrunt.hcl
...
│   │   ├── logging
...
│   │   └── monitoring
...
│   ├── terragrunt.hcl
│   └── us-east-1
...
└── prd
    ├── ap-southeast-2
    │   ├── application
    │   │   ├── common.tfvars
    │   │   ├── test1
    │   │   │   └── terragrunt.hcl
    │   │   ├── test2
    │   │   │   └── terragrunt.hcl
    │   │   └── test3
    │   │       └── terragrunt.hcl
    │   ├── common.tfvars
    │   ├── logging
    │   │   ├── common.tfvars
    │   │   └── default
    │   │       └── terragrunt.hcl
    │   └── monitoring
    │       ├── common.tfvars
    │       └── default
    │           └── terragrunt.hcl
    ├── eu-west-1
...
    └── us-east-1
...
```
</details>
<br/>

The environment `/<env>/terragrunt.hcl` file would contain something like:

```
terragrunt = {  
  remote_state {
    backend = "s3"
    config {
      encrypt = "true"
      bucket = "my-bucket"
      key = "${path_relative_to_include()}/terraform.tfstate"
      region = "eu-west-1"
    }
  }
}
```

And each instance of each component will have something like:

```
terragrunt = {
  terraform {
    source = "git::git@github.com:<org>/<repo>//<stack-folder>?ref=<git-tag>"
  }

  include {
    path = find_in_parent_folders()
  }

  dependencies {
    paths = ["../dep1", "../dep2", "../dep3"]
  }
}
```


This setup solved problems 1, 2, 4, and 5. Variables are imported from relative paths, and we can get rid of the bash tool.

We still had the issue of maintaining the files in sync and propagate changes between environments.

This is precisely the problem we will solve in the next post of the "Let's talk terraform" series.

If you want to talk about the content of this post or if you want to know when the next post is coming out, you can find me on Twitter [@lucalanziani](https://twitter.com/lucalanziani)