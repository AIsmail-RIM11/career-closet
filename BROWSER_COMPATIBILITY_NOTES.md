# Browser loading fix

The original normal-Chrome blank screen was accompanied by `net::ERR_BLOCKED_BY_CLIENT` on `lucide-react/dist/esm/icons/fingerprint.js`. It worked in Incognito, so a browser extension or content blocker was the likely cause. This is **not** a standard website permission that `navigator.permissions.request()` can solve.

## This version

- Does not import the `Fingerprint` icon.
- Loads a small, framework-independent `public/browser-help.js` from the same origin.
- If React still has not mounted 4.5 seconds after DOM readiness, displays a clear on-site help message suggesting allowing/pausing a trusted extension *for this site only*.
- Adds a Reload button and takes the message away automatically if React mounts afterward.
- Does not automatically disable a blocker, change user settings, request device access, or bypass security.
- Uses `%BASE_URL%` in `index.html` so the helper works with `/career-closet/` in Vite development and GitHub Pages.

If an extension blocks **all** JavaScript, or the helper itself, the site cannot show an interactive warning. In that scenario the browser must be configured manually.
