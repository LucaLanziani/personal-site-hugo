---
title: "Let's talk terraform: genesis"
date: 2021-10-19T22:37:27+02:00
category: general, terraform, devops
tags: [devops, terraform]
email: luca@lanziani.com
---

I have used Terraform daily for the past five years, and during this time, I have developed some ideas on how to use it.

- What to use.
- What not to.
- Why.

Here starts a series of posts meant to share how we are using terraform in 2021.

<!--more-->

## Premise

The first time I looked at Terraform, five years ago, it all seemed relatively straightforward.

1. you write some `.tf` files with the resources you want to provision:

```terraform
resource "aws_instance" "iac_in_action" {
  ami               = var.ami_id
  instance_type     = var.instance_type
  availability_zone = var.availability_zone

  // dynamically retrieve SSH Key Name
  key_name = aws_key_pair.iac_in_action.key_name

  // dynamically set Security Group ID (firewall)
  vpc_security_group_ids = [aws_security_group.iac_in_action.id]

  tags = {
    Name = "Terraform-managed EC2 Instance for IaC in Action"
  }
}
```

2. You move into the folder containing the files
3. You run a couple of commands

```bash
terraform init
terraform plan
terraform apply
```

4. *ZAP* your environment is ready...
 
Or so I thought 😂...

Obviously, as usual, that couldn't be further from the truth.
The [terraform.io](https://terraform.io) website, even nowadays, presents you with an oversimplification of what's needed to manage your infrastructure with Terraform.

Don't get me wrong, I liked Terraform back then, and I still like it today, especially given all the improvements Hashicorp has pushed and is still pushing.

But, what I want to do with this series of blog posts is to share what I learned about Terraform during the years and maybe leave you with some valuable patterns.

The idea is to address four main steps (plus a special one if I get around it):

- Manage Infrastructure growth
- Reduce duplication
- Module's dilemma
- Divide and conquer

## Setting the stage

It all started with a simple Jenkins server; it always does, doesn't it?

Easy peasy, I said:


>An ec2 instance here  
An ELB there  
Ah, I need a VPC, right...  
And networking...  
And NACL and SGs...  
Do I need multi AZs?  
How did I forget the EBS volume?  
Wait, volume_attachment? ok 🤷  
AH! The AIM role... obviously  
And the S3 bucket  
And the provider, with the correct region  
Remote state...  I need first an S3 bucket for that state  


I suppose you get my point.  
Yet, after multiple heads scratches, at least I had my stack ready, and I could deploy and destroy it reliably.

That is if Terraform wouldn't fail because of some provider's bug, or the state didn't end up corrupted by a `CTRL^C` at the wrong time 😂.

But hey, it was five years ago, we were using Terraform 0.7.x,  and we felt pretty happy about it.

Then the second request came in, let's build another Jenkins!!!

And the path started...

#### If you want to talk about the content of this post or if you want to know when the next post is coming out, you can find me on Twitter [@lucalanziani](https://twitter.com/lucalanziani).
