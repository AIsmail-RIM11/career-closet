# Career Closet — Braven × SFSU (Updated MVP + Bolt Merge)

A clickable **student-designed Braven Capstone prototype** built in React, TypeScript, Vite, and React Router. Not an official Braven or SFSU reservation service.

## What's new in this release

- **Original MVP photography restored:** uses the original MVP's eight Unsplash clothing images, plus its original hero and fashion-guide images. Bolt's Pexels photos are no longer used.
- **Expanded catalog:** 24 different mock clothing items. For **each of five occasions**, each of **six clothing categories** has **two or three options**.
- Each product can appear in **multiple occasions** (a single inventory record with a list of occasion tags).
- **Staff check-in starts with manual reservation-code entry**. Confirm a reservation and enter the code on the Staff Demo page to look up its contents and mark it picked up.
- The QR opens the same staff lookup automatically and carries *demo-only* reservation details, so it can also be opened on a separate device for presentations **without a backend**.
- Preserves the Braven × SFSU multi-page visual style, filtering, saved items, outfit builder, size choices, checkout, and GitHub Pages support.

### Sample collection

Each occasion has 2–3 options in each category: **Blazers, Tops, Trousers, Skirts, Shoes, Accessories.** Photos and inventory counts are illustrative; new shoes, skirts, and tote categories use additional free Unsplash photos in a matching style where the original MVP did not have category-specific images. See `PHOTO_SOURCES.md`.

## Local setup (use a new folder; don't unzip over the old project)

```bash
cd ~/Downloads
mkdir -p career-closet-updated-test
unzip Career-Closet-Braven-SFSU-UPDATED.zip -d career-closet-updated-test
cd career-closet-updated-test/career-closet
npm install
npm run typecheck
npm run lint
npm run build
npm run dev
```

The local URL should be `http://localhost:5173/career-closet/`.

## Demo flow

1. Home → select an occasion → Browse.
2. Filter by occasion, type, size, or availability; pick items into the outfit builder.
3. Choose clothing sizes → Reserve → confirm sample pickup window.
4. Confirmation shows a unique `CC-...` code and a QR.
5. **Manual:** Open Staff Demo from the navigation, type the code, and click **Look up**.
6. **QR:** Scan the code to open the same staff lookup, including across devices for this sample-only workflow.
7. Mark the reservation picked up.

No authentication, payments, backend, or real inventory is connected. Manual entry retrieves reservations saved in *that browser*; a QR scan can also bring its sample data into a second browser. The link isn't a secure token, so **never embed real student data**.

## Publish on the existing GitHub repository

Existing GitHub repo: `https://github.com/AIsmail-RIM11/career-closet`

Vite base path: `/career-closet/` | Router: `HashRouter`

**Do not unzip on top of a working Git checkout.** After confirming local testing, use a fresh clone of your current GitHub repository (or copy the updated source into a clean Git working tree) and commit from there.

To build and publish after the updated code is in the Git checkout:

```bash
npm install
npm run build
npm run deploy
```

Live presentation URL: `https://aismail-rim11.github.io/career-closet/`

> **GitHub note:** `npm run deploy` updates the GitHub Pages `gh-pages` branch; it does **not** commit updated source code to `main`. Commit and push updated source to `main` separately with Git before deploying.

## Browser blockers / blank-screen fallback

Some content-blocking extensions may block a JavaScript dependency (Chrome may report `net::ERR_BLOCKED_BY_CLIENT`). This release avoids the previously blocked `lucide-react` `Fingerprint` icon import and adds a small standalone script (`public/browser-help.js`) that shows helpful troubleshooting instructions **only if the React app never renders**. It provides a reload action; it cannot and does not ask the browser to disable security extensions or grant permissions.

If this happens, use your extension's **Allow on this site** / **Pause on this site** option, or try an incognito/private window. You do not need to enable camera/location permissions to browse.
