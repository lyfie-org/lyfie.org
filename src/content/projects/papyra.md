---
name: Papyra
tagline: A calm, self-hosted home for your notes.
type: app
status: beta
license: GPL-3.0
repo: https://github.com/lyfie-org/papyra
site: https://papyra.app
docs: https://papyra.app/docs/
install: |
  curl -O https://raw.githubusercontent.com/lyfie-org/papyra/main/docker-compose.hub.yml
  docker compose -f docker-compose.hub.yml up -d
accent: "#7aaa8a"
logo: ../../assets/logos/papyra.png
points: [Plain Markdown, Self-hosted, Offline, Docker]
order: 2
featured: true
---

Papyra is a note-taking app you run yourself. Every note is an ordinary
Markdown file in a folder you own; Papyra gives that folder a fast, beautiful
place to live — search, wiki links, sharing and offline editing — without ever
locking a word of it away.

## Your folder is the storage

There is no database to export from. Open the folder in Obsidian, sync it with
Syncthing, back it up with `rsync` or edit a file by hand — Papyra watches the
folder and picks up whatever changed.

## Honestly: young software

Papyra is under active development and releases often. It is tested hard, but
if you adopt it today, keep the backups it makes for you. Worst case, you keep
the folder and walk away.
