# Doctor Insite - Nature Junior

Static design preview for Dr. Jeong Woo Beom, Nature Junior Dental Clinic.

- Entry point: `index.html` (also available at `doctor-insite-home.html`).
- Hosting: GitHub Pages, `main` branch, repository root.
- No build step, backend, forms, secrets, or analytics.
- Preview pages are marked `noindex, nofollow`.

The original doctor portraits are supplied project assets. Award images are
clearly labelled fictional samples, not scans of the actual certificates.
Review copy, article copy, film covers and social posts retain preview notices.
Newsletter and research thumbnails link to their original public documents.

Only approved site files are included. Local proposals, pricing materials,
historical drafts and source-document archives are not published.

## Local Updates

In the original NatureJunior_Local workspace, run:

```powershell
node tools/build-github-pages.mjs
```

Review the resulting changes in `publish`, commit them, and push `main`.
GitHub Pages then publishes that revision.
