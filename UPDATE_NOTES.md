# Changes in updated release

1. Brought back every original MVP clothing photo and the original hero / guide imagery. Removed all Bolt Pexels photography from site data.
2. Expanded mock inventory to 24 distinct items across 6 categories and 5 occasions. Each occasion offers 2–3 items for each category; items intentionally reappear in multiple occasions.
3. Staff Demo begins blank, asking for a reservation code. Press Look up to reveal the reservation and selected sizes; QR scan launches this same lookup automatically.
4. QR encodes only sample reservation details, so scanning with a separate phone can demonstrate a no-backend pickup lookup.
5. Prevented direct empty-outfit checkout from completing; removed fixed fake default reservation ID and placeholder items.
6. Fixed occasion dropdown becoming stuck after navigating via occasion-link query string, expanded sizes filter to include shoe sizes and one-size accessories.
7. Retained GitHub Pages base `/career-closet/`, HashRouter, build/deploy scripts; removed explicit lucide-react optimizeDeps exclusion which made browser-extension blocking of a single icon module more likely.

**Testing note:** Static TypeScript parser checks pass. Re-run `npm install && npm run typecheck && npm run lint && npm run build` on your Mac before pushing. Actual product photos are illustrative remote URLs.
