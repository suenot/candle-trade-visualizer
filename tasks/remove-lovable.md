# Task: Remove Lovable Branding, Update Author, Add GitHub Repo Link, and Update OG Image

## Summary
Remove all mentions of "Lovable" from the project, update the author to Eugen Soloviov (@suenot), add a visible link to the GitHub repo (https://github.com/suenot/candle-trade-visualizer) on the website, and generate a new og-image.png for Vercel Open Graph with project branding. Update all relevant meta tags and documentation.

## Reasoning
- The project should reflect the correct author and repository for transparency and branding.
- Removing "Lovable" ensures no confusion about project ownership or origin.
- Adding the GitHub repo link increases visibility and trust.
- A custom og-image improves sharing and professionalism.

## Checklist
- [ ] Remove "Lovable" from index.html meta tags
- [ ] Remove "Lovable" from README.md
- [ ] Remove "Lovable" from package.json, vite.config.ts, and dependencies if not needed
- [ ] Update author to Eugen Soloviov (@suenot) in meta tags and documentation
- [ ] Add GitHub repo link to the website (footer or header)
- [ ] Generate and add a new og-image.png with project branding
- [ ] Update og:image and twitter:image meta tags
- [ ] Document all changes here

## Paths to Check/Update
- index.html
- README.md
- package.json
- vite.config.ts
- src/pages/Index.tsx or src/App.tsx (for repo link)
- public/og-image.png (to be created)

## Automated OG Image Pipeline

- The SVG OG image is stored at `public/og-image.svg`.
- The PNG OG image for Open Graph is generated at `public/og-image.png`.
- To update the PNG after editing the SVG, run:

```sh
npm run og:build
```

This uses [sharp-cli](https://github.com/lovell/sharp-cli) for reliable, headless conversion:

```json
"og:build": "sharp -i public/og-image.svg -o public/og-image.png resize 1200 630"
```

This ensures the OG image is always up-to-date and the process is fully automated for CI/CD and local development. 