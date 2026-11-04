# Merge notes

This project combines the strongest parts of the original ChatGPT MVP and the later Bolt redesign.

## Kept from Bolt

- Braven × SFSU editorial visual direction and responsive styling.
- Separate `HashRouter` pages for Home, Browse, Outfit Builder, Outfit Guide, Reservation, Confirmation, and Staff Pickup.
- Five occasion categories, richer sample inventory, item details, outfit recommendations, and QR confirmation.
- Stronger mobile layout and accessibility details.

## Restored / improved from the original MVP

- GitHub Pages deployment scripts using `gh-pages`.
- `/career-closet/` Vite base path and `HashRouter` compatibility.
- Browser persistence so outfit choices and demo details survive refreshes.
- Search in the clothing catalog.
- Per-item saved/favorite state instead of one heart toggling every card.
- Selected clothing sizes now persist from the Outfit Builder through reservation and confirmation.
- Each confirmed reservation gets a unique demo ID and is saved in browser storage.
- The QR code now points to the staff lookup route for that reservation.
- Staff pickup can search a reservation ID, show its actual items/sizes, and mark it picked up.
- Removed Bolt-specific social preview metadata and an unused Supabase dependency.

## Before deploying

Run on the Mac:

```bash
npm install
npm run typecheck
npm run lint
npm run build
npm run deploy
```

The sandbox used to produce this merge could not complete `npm install`, so the final dependency-backed build must be verified locally before replacing the live GitHub Pages version.
