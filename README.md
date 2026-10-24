# Yazan Nazzal - Portfolio

Personal portfolio built with React, TypeScript, Vite, and Tailwind CSS.

## Development

- Install dependencies: npm install
- Start the local server: npm run dev
- Build for production: npm run build
- Check code: npm run lint
- Preview the production build: npm run preview

Portfolio content is in src/data/portfolio.ts. The hero photo and favicon are in public/.

## CV

The downloadable CV is `public/Yazan_Nazzal_CV.pdf`. Rebuild it after content changes with
`python scripts/generate_cv.py` (requires `reportlab` and the original Calibri fonts in
`C:/Windows/Fonts`, or a directory supplied through `CV_FONT_DIR`). The script also writes
`output/pdf/Yazan_Nazzal_CV.pdf` and preserves the existing white, navy, and blue design.
