# personal-site-hugo

This is my personal website and blog.

## Local preview

Run an interactive Hugo preview with drafts:

```sh
make dev
```

Install or update the persistent user-level preview:

```sh
make deploy-local
```

The service watches this checkout, includes draft content, and listens only on
`http://127.0.0.1:8003/`. It starts with the user systemd manager and restarts
after failures. The deploy command validates a complete Hugo build before it
updates the unit, then checks both systemd state and HTTP health. If activation
or health fails, it restores the previous unit.

Preview asset and navigation URLs are root-relative, so they use the same origin
as the address opened in the browser when the service is reached through an SSH
tunnel or reverse proxy.

Useful operations:

```sh
make local-status
make local-logs
./bin/servicectl restart
./bin/servicectl stop
./bin/servicectl start
./bin/servicectl url
./bin/servicectl health
```

The port comes from the central `personal-site-preview` reservation. For initial
setup on this machine, reserve it before installing the service (skip this when
the reservation already exists):

```sh
/home/coding/sites-available/sitesctl site create personal-site-preview --port auto --dependency "$PWD/ops/personal-site-hugo-local.service.in" --no-deploy --no-dns
./bin/servicectl install
```

The unit is installed in `~/.config/systemd/user/`; Hugo caches and generated
resources use the user runtime directory. There are no secret configuration
files. Source edits rebuild automatically; rollback restores the service unit,
and its installed Hugo binary, so correct source edits directly if they introduce
a build error. The pinned binary is `~/.local/lib/personal-site-hugo/hugo`.

For access from another machine, use SSH forwarding and then open
`http://127.0.0.1:8003/` on that machine:

```sh
ssh -L 8003:127.0.0.1:8003 coding@HOST
```

The Nginx source is prepared but remains undeployed. Before using its hostname,
adapt Hugo's base URL and live reload settings and restrict access to drafts.
The separate manual deploy command is:

```sh
cd /home/coding/sites-available && ./sitesctl deploy personal-site-preview
```

The unit is enabled for future user-manager starts. Starting it before login
after a reboot additionally requires lingering, which an administrator can
enable with `loginctl enable-linger "$USER"`.
