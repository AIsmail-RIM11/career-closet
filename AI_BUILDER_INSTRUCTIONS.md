# Instructions for an AI website-building assistant

## Mission
Improve the existing **Career Closet** MVP in this ZIP rather than starting from scratch. This is a Braven × SFSU student Capstone concept for a professional clothing borrowing service. The key journey is **browse → choose interview/networking → build outfit → reserve sample pickup → receive QR → staff pickup**. Keep it credible, welcoming, polished, and accessible.

## Required technology and deployment
- Preserve Vite + React + TypeScript + Tailwind CSS and existing npm scripts.
- Keep GitHub Pages compatibility: `base: '/career-closet/'` in `vite.config.ts`, and `HashRouter` for routes.
- Keep `gh-pages` and scripts `predeploy` and `deploy` working.
- Do not require paid services, API keys, Supabase, authentication, or a real backend.
- Do not imply any actual reservation is made. Mark demo data clearly.

## Design brief
Premium editorial fashion aesthetic, not a generic SaaS dashboard: warm off-white, deep charcoal, subtle terracotta accent, high-quality typography, sophisticated whitespace, compelling professional clothing photos, smooth but restrained animations, excellent mobile layout. Make the catalog and outfit builder the hero of the experience. Respect prefers-reduced-motion, keyboard navigation, contrast, and descriptive form labels.

## Functionality improvements in priority order
1. Audit and fix build/runtime errors; ensure `npm run build` passes.
2. Improve clothing photo relevance and reliability; replace mismatched or broken images with appropriate royalty-free clothing images, preferably local assets.
3. Improve outfit builder with separate garment slots (one blazer, one shirt, one pair of pants, optional accessory), selectable sizes, preview cards, and a coherent occasion filter.
4. Add informative product detail modal with sizing, availability, and selection.
5. Improve reservation flow, confirmation ticket, and mobile QR presentation.
6. Improve style guide with clear business professional, business casual, interview, and networking guidance, and direct links into the builder.
7. Improve staff pickup simulation; clearly communicate that cross-device synchronization needs a real backend.
8. Polish responsiveness, accessibility, empty states, and subtle transitions.

## Explicit limitations
All inventory and pickup dates are illustrative. Do not invent a real downtown address, hours, real-time availability, cleaning policy, or Braven/SFSU endorsement. Do not store sensitive student data or create fake account functionality. No payments.

## Presentation acceptance criteria
A presenter can complete the main user journey in 2–3 minutes with no broken navigation, including a real QR code. A separate tab on the same browser can open the staff demo, find the reservation ID, and mark it picked up. The entire site works after `npm run build` and deployment to GitHub Pages.

## Recommended working approach
First inspect the current code. Propose a short change plan. Make changes in small testable increments. Preserve existing behavior. Report every file changed and commands to run. Do not replace the project with a proprietary no-code export.
