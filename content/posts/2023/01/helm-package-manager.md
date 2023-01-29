---
title: "Is Helm really a package manager?"
date: 2023-01-29T18:18:20+02:00
category: Kubernetes, Helm, packages
tags: [Kubernetes, Helm, packages]
email: luca@lanziani.com
description: "Helm define itself The package manager for Kubernets, is it true?"
images:
  - "https://lanziani.com/static/Helm_package_manager.jpg"
---

Helm ([helm.sh](http://helm.sh)) defines itself as **The package manager for Kubernetes**, at first I thought that was a bold statement, but after thinking about it for a moment, I don’t think I know any other real package manager.

Let's look together at the functionalities that make Helm a package manager.

<!--more-->

## Registries

[Artifacthub](https://artifacthub.io/) is the central hub where one can find most Charts.

![artifacthub](/static/artifacthub.png)

Everyone can virtually publish charts to the registry, search charts, see which ORG published the Chart, and even get more information with the labels at the bottom of each chart. eg. “Verified Publisher”

![helm-packages](/static/helm-packages.png)

But that’s just a Hub, the Charts are hosted in their registries. eg.

```yaml
argocd: https://argoproj.github.io/argo-helm
cert-manager: https://charts.jetstack.io
dex: https://charts.dexidp.io
istio: https://istio-release.storage.googleapis.com/charts
prometheus: https://prometheus-community.github.io/helm-charts
opentelemetry: https://open-telemetry.github.io/opentelemetry-helm-charts
zot: https://zotregistry.io/helm-charts/
```

## Dependencies

[https://helm.sh/docs/helm/helm_dependency/#helm](https://helm.sh/docs/helm/helm_dependency/#helm)

Helm allows you to define dependencies between charts, the dependencies can be listed in the `Chart.yaml` file, and you can manage them via `helm dependecy <command>` .

The dependencies follow semantic release and can reference different registries.

```yaml
# Chart.yaml
dependencies:
  - name: nginx
    version: "1.2.3"
    repository: "https://example.com/charts"
  - name: memcached
    version: "3.2.1"
    repository: "https://another.example.com/charts"
```

I like to use this functionality to wrap external charts when using ArgoCD.
For this particular use case, it’s useful to know that an [alias](https://helm.sh/docs/topics/charts/#alias-field-in-dependencies) can be defined for the dependencies.

## Versioning

[https://helm.sh/docs/topics/charts/#charts-and-versioning](https://helm.sh/docs/topics/charts/#charts-and-versioning)

Each Chart Must have a version specified in the `Chart.yaml` file, the version is verified when using packages as defined in the official documentation 👇

> The `version` field inside of the `Chart.yaml` is used by many of the Helm tools, including the CLI. When generating a package, the `helm package` command will use the version that it finds in the `Chart.yaml` as a token in the package name. The system assumes that the version number in the chart package name matches the version number in the `Chart.yaml`
> . Failure to meet this assumption will cause an error.

## **appVersion field**

The `appVersion` should not be confused with the `version` field above.

> `appVersion` refers to the version of the application the chart is installing, suppose you are installing the nginx Chart in the image above, you can see that the `Chart` version is `13.2.21` but `appVersion` and so nginx version is `1.23.3` .

## Helm IS more than a package manager

Given the above seems fair to me to say that Helm IS a package manager, but we can also say that Helm is way more than JUST a package manager since it also offers functionalities like:

### Templates

Helm allows you to template your Kubernetes resources and via the go templates engine implement complex logic to manipulate values and resources using the embedded functions ([https://helm.sh/docs/chart_template_guide/function_list/](https://helm.sh/docs/chart_template_guide/function_list/)).

### Tests

Helm supports tests ([https://helm.sh/docs/topics/chart_tests/](https://helm.sh/docs/topics/chart_tests/)) to validate that your chart works as expected when it is installed.

### Hooks

Hooks ([https://helm.sh/docs/topics/charts_hooks/](https://helm.sh/docs/topics/charts_hooks/)) are a mechanism to allow chart developers to intervene at certain points in a release's life cycle.

## More

Library Charts: [https://helm.sh/docs/topics/library_charts/](https://helm.sh/docs/topics/library_charts/)

Helm Provenance and Integrity: [https://helm.sh/docs/topics/provenance/](https://helm.sh/docs/topics/provenance/)

Storage Backends: [https://helm.sh/docs/topics/advanced/#storage-backends](https://helm.sh/docs/topics/advanced/#storage-backends)

Best Practices: [https://helm.sh/docs/chart_best_practices/](https://helm.sh/docs/chart_best_practices/)
