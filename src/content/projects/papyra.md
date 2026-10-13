---
name: Papyra
tagline: A calm, self-hosted home for your notes.
type: app
status: stable
license: GPL-3.0
repo: https://github.com/lyfie-org/papyra
site: https://papyra.app
docs: https://papyra.app/docs/
install: |
  curl -O https://raw.githubusercontent.com/lyfie-org/papyra/main/docker-compose.hub.yml
  docker compose -f docker-compose.hub.yml up -d
accent: "#7aaa8a"
logo: ../../assets/logos/papyra.png
cover: ../../assets/shots/papyra-desk-light.png
coverAlt: "The Papyra desk: colourful note cards in a grid, with a sidebar of collections"
points: [Plain Markdown, Self-hosted, Live collaboration, No telemetry]
order: 1
featured: true
---

Papyra is a note-taking app you run yourself. It is as easy as sticky notes and
as deep as a wiki: search, links and backlinks, version history, live
collaboration, comments, locked notes and offline editing. Every note stays an
ordinary Markdown file in a folder you own.

## Your folder is the storage

There is no database to export from. Open the folder in Obsidian, sync it with
Syncthing, back it up with `rsync` or edit a file by hand — Papyra watches the
folder and picks up whatever changed.

## Nothing phones home

No telemetry, analytics, crash reports or usage pings. The app makes no
third-party requests — even its fonts come from your server. Locked notes are
encrypted on disk, and sign-in supports passkeys, authenticator codes and
single sign-on.

## Moves in tonight

Import a Google Keep Takeout archive or an Obsidian vault, or drag any `.md`
file onto the desk. One Docker container, one volume, on amd64 or arm64 — a NAS,
a Raspberry Pi or a small VPS.

## Built on Luthor

Papyra's editor is [Luthor](/projects/luthor/), Lyfie's open-source rich-text
editor. Every improvement to one lands in the other.
