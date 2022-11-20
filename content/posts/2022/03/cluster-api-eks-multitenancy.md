---
title: "Cluster Api - multi-tenancy EKS implementation"
date: 2022-03-12T20:54:00+02:00
category: general, kubernetes, EKS, Multi-tenancy, AWS
tags: [AWS, Kubernetes, cluster-api, K8S]
email: luca@lanziani.com
description: "How to manage multiple EKS clusters on different accounts with Cluster Api"
---

[Cluster API](https://cluster-api.sigs.k8s.io) in case you don't know it is:

> a Kubernetes sub-project focused on providing declarative APIs and tooling to simplify provisioning, upgrading, and operating multiple Kubernetes clusters.

Multi-tenancy is defined by the project itself:

> Starting from v0.6.5, single controller multi-tenancy is supported that allows using a different AWS Identity for each workload cluster. For details, see the [multi-tenancy proposal](https://github.com/kubernetes-sigs/cluster-api-provider-aws/blob/main/docs/proposal/20200506-single-controller-multitenancy.md).

That is exactly what we are going to see in this post.

<!--more-->

Cluster API supports multiple Providers, and the one we want to focus on today is the [Provider AWS](https://cluster-api-aws.sigs.k8s.io/).

Specifically, we want to use it to provision EKS clusters with managed nodes.

## Prerequisites

- A bootstrap cluster
- AWS cli installed
- 2 AWS accounts with relative credentials
  - manager account
  - managed account
- [clusterawsadm](https://github.com/kubernetes-sigs/cluster-api-provider-aws/releases)
  - https://cluster-api-aws.sigs.k8s.io/topics/eks/prerequisites.html
- [clusterctl](https://github.com/kubernetes-sigs/cluster-api/releases)

### Set variables

We want to export some environment variables

- AWS_REGION
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_SESSION_TOKEN (if you are using Multi-factor authentication)
- AWS_MANAGER_ACCOUNT_ID
- AWS_MANAGED_ACCOUNT_ID
- OIDC_PROVIDER_ID="weresetthislater"

### Prepare the manager account

As Cluster API EKS prerequisites [page](https://cluster-api-aws.sigs.k8s.io/topics/eks/prerequisites.html) explains, we need a couple of roles in the account to build the cluster and this can be done with `clusterawsadm` cli.

In order to allow for cross account assume role we are going to change the clusterawsadm configuration to add an extra inline policy to the `controllers.cluster-api-provider-aws.sigs.k8s.io` role.

```bash
envsubst > bootstrap-manager-account.yaml << EOL
apiVersion: bootstrap.aws.infrastructure.cluster.x-k8s.io/v1beta1
kind: AWSIAMConfiguration
spec:
  eks:
    iamRoleCreation: false # Set to true if you plan to use the EKSEnableIAM feature flag to enable automatic creation of IAM roles
    managedMachinePool:
      disable: true # Set to false to enable creation of the default node role for managed machine pools
    fargate:
      disable: false # Set to false to enable creation of the default role for the fargate profiles
  clusterAPIControllers:
    disabled: false
    extraStatements:
    - Action:
      - "sts:AssumeRole"
      Effect: "Allow"
      Resource: ["arn:aws:iam::${AWS_MANAGED_ACCOUNT_ID}:role/controllers.cluster-api-provider-aws.sigs.k8s.io"]
    trustStatements:
    - Action:
      - "sts:AssumeRoleWithWebIdentity"
      Effect: "Allow"
      Principal:
        Federated:
        - "arn:aws:iam::${AWS_MANAGER_ACCOUNT_ID}:oidc-provider/oidc.eks.${AWS_REGION}.amazonaws.com/id/${OIDC_PROVIDER_ID}"
      Condition:
        "ForAnyValue:StringEquals":
          "oidc.eks.${AWS_REGION}.amazonaws.com/id/${OIDC_PROVIDER_ID}:sub":
            - system:serviceaccount:capa-system:capa-controller-manager
            - system:serviceaccount:capa-eks-control-plane-system:capa-eks-control-plane-controller-manager # Include if also using EKS
EOL
```

We can then use the above configuration to bootstrap the Manager cluster

```bash
clusterawsadm bootstrap iam create-cloudformation-stack --config bootstrap-manager-account.yaml
```

### Install cluster API provider in the bootstrap cluster

```bash
export AWS_B64ENCODED_CREDENTIALS=$(clusterawsadm bootstrap credentials encode-as-profile)
export EKS=true
export EXP_MACHINE_POOL=true
clusterctl init --infrastructure aws --target-namespace capi-providers
```

### Generate the manager cluster

```bash
export AWS_SSH_KEY_NAME=default
export VPC_ADDON_VERSION="v1.10.2-eksbuild.1"
clusterctl generate cluster manager --flavor eks-managedmachinepool-vpccni --kubernetes-version v1.20.2 --worker-machine-count=3 > manager-cluster.yaml
```

Apply the cluster to the bootstrap cluster

```bash
kubectl apply -f manager-cluster.yaml
```

### Create an IAM OIDC identity provider for your cluster with the AWS Management Console

You can follow the instruction on this page to create an OIDC provider https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html

### Update the IAM role to use this OIDC ID

```bash
export OIDC_PROVIDER_ID=<OIDC_ID_OF_THE_CLUSTER>
```

run the `Prepare the manager account` step again.

This will update the `controllers.cluster-api-provider-aws.sigs.k8s.io` role.

### Get the manager cluster credentials

```bash
kubectl --namespace=default get secret manager-user-kubeconfig \
   -o jsonpath={.data.value} | base64 --decode \
   > manager.kubeconfig
```

### Install the Cluster API provider in the manager cluster

This will install the Cluster API providers into the manager cluster and create a service account to use the `controllers.cluster-api-provider-aws.sigs.k8s.io` role for the Management Components.

```bash
export AWS_B64ENCODED_CREDENTIALS=$(clusterawsadm bootstrap credentials encode-as-profile)
export EKS=true
export EXP_MACHINE_POOL=true
export AWS_CONTROLLER_IAM_ROLE=arn:aws:iam::${AWS_MANAGER_ACCOUNT_ID}:role/controllers.cluster-api-provider-aws.sigs.k8s.io
clusterctl init --kubeconfig manager.kubeconfig --infrastructure aws --target-namespace capi-providers
```

### Generate the managed cluster

```bash
export AWS_SSH_KEY_NAME=default
export VPC_ADDON_VERSION="v1.10.2-eksbuild.1"
clusterctl generate cluster manager --flavor eks-managedmachinepool-vpccni --kubernetes-version v1.20.2 --worker-machine-count=3 > managed-cluster.yaml
```

In order for the cluster to be created in a different account we need to add the following to the `AWSManagedControlPlane` resource spec:

```yaml
identityRef:
  kind: AWSClusterRoleIdentity
  name: managed-account
```

And the following resources:

```bash
envsubst > cluster-role-identity.yaml << EOL
apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
kind: AWSClusterRoleIdentity
metadata:
  name: managed-account
spec:
  allowedNamespaces: {} # This is unsafe since every namespace is allowed to use the role identity
  roleARN: arn:aws:iam::${AWS_MANAGED_ACCOUNT_ID}:role/controllers.cluster-api-provider-aws.sigs.k8s.io
  sourceidentityRef:
    kind: AWSClusterControllerIdentity
    name: default
---
apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
kind: AWSClusterControllerIdentity
metadata:
  name: default
spec:
  allowedNamespaces:{}
EOL
```

### Prepare the managed account

**With the managed aws account credentials**

```bash
envsubst > bootstrap-managed-account.yaml << EOL
apiVersion: bootstrap.aws.infrastructure.cluster.x-k8s.io/v1beta1
kind: AWSIAMConfiguration
spec:
  eks:
    iamRoleCreation: false # Set to true if you plan to use the EKSEnableIAM feature flag to enable automatic creation of IAM roles
    managedMachinePool:
      disable: true # Set to false to enable creation of the default node role for managed machine pools
    fargate:
      disable: false # Set to false to enable creation of the default role for the fargate profiles
  clusterAPIControllers:
    disabled: false
    trustStatements:
    - Action:
      - "sts:AssumeRole"
      Effect: "Allow"
      Principal:
        AWS:
        - "arn:aws:iam::${AWS_MANAGER_ACCOUNT_ID}:role/controllers.cluster-api-provider-aws.sigs.k8s.io"
EOL
```

```bash
clusterawsadm bootstrap iam create-cloudformation-stack --config bootstrap-managed-account.yaml
```

### Deploy the managed cluster

**Back to the manager account credentials**

```bash
kubectl --kubeconfig manager.kubeconfig apply -f cluster-role-identity.yaml
kubectl --kubeconfig manager.kubeconfig apply -f managed-cluster.yaml
```

Wait whatever time needed to provision the cluster and enjoy the multi-tenancy setup.
