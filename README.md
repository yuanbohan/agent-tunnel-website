# Agent Tunnel Website

Private-preview landing page for Agent Tunnel. Shared with a small group of invited friends so they can install the `tunnel` CLI and ask for the mobile APK.

## Local development

```bash
npm install
npm run dev
```

The default local URL is `http://127.0.0.1:4173`.

## Build

```bash
npm run build
```

## Browser smoke tests

```bash
npm test
```

## Content model

All page copy lives in `src/site-content.js`. Markup is rendered from it in `src/main.js`. Edit the content module first; the structural markup rarely needs changes.

The install command points at the real `tunnel` installer:

```sh
curl -fsSL https://raw.githubusercontent.com/yuanbohan/tunnel/main/install.sh | sh
```

## Mobile app

The mobile build is invite-only. There is no app-store listing. The contact card on the page points friends at email and GitHub to request the build directly.

A walkthrough video section will be re-introduced when a real video exists.

## First-party screenshots

Screenshots in `public/images/` are rendered inside the hero's single-image viewer and are intended as first-party product proof.
