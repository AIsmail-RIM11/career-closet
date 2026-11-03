# Career Closet — Braven × SFSU Capstone MVP

An interactive, responsive React + TypeScript + Tailwind CSS prototype demonstrating a **proposed** professional clothing reservation service for SFSU students. This is an independent student project, not an official Braven/SFSU service.

## Features
- Editorial landing page and mobile-friendly navigation
- Clothing catalog with interview/networking occasion filters, garment type filters, and search
- Outfit builder with adjustable sizes and multiple selected pieces
- Professional outfit guide
- Demo pickup-date selection and reservation confirmation
- Real QR code encoding a demo staff lookup URL
- Staff pickup demo to mark locally stored reservations as picked up

**Important demo limitation:** Reservations are stored in browser `localStorage`, not in a shared database. A QR code scanned on another device cannot retrieve the reservation unless you add a backend. For the presentation, demonstrate pickup in the **same browser** as checkout. Inventory, availability, pickup times, images, and item descriptions are illustrative. The proposed location has no confirmed address or operating hours.

## Requirements
Node.js 20.19+ or 22.12+ recommended; npm; VS Code; Git; optional GitHub CLI (`gh`).

## Run locally
```bash
npm install
npm run dev
```
Open the URL printed by Vite. To open the folder in VS Code: `code .`.

## Build and deploy
```bash
npm run build
npm run deploy
```
Set repository GitHub Pages source to `gh-pages` branch / root. The Vite `base` is `/career-closet/`, so the repository must be named **career-closet**. For a different repo name, update `base` in `vite.config.ts`.

## GitHub publishing
Authenticate with GitHub CLI: `gh auth login` (install gh if needed). From the project folder:
```bash
git init
git add .
git commit -m "Build Career Closet MVP"
git branch -M main
gh repo create career-closet --public --source=. --remote=origin --push
npm run deploy
```
If the repo already exists, skip `gh repo create` and connect its remote manually.

## Suggested live demo
1. Browse interview clothes and choose sizes.
2. Build an outfit, then review selected pieces.
3. Select a sample pickup window and confirm.
4. Show the generated QR code and reservation ID.
5. Open Staff Pickup Demo **in the same browser**, enter the ID, and mark as picked up.
6. Open the style guide and discuss why the service reduces uncertainty.

Record a backup screen capture in case the presentation venue loses internet access.

## Stack
Vite, React 19, TypeScript, Tailwind CSS 4, React Router (HashRouter for GitHub Pages), Lucide React, qrcode.react. `motion` and `gh-pages` are installed for future refinement and deployment.
