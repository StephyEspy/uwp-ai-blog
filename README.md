# The New Compiler

A self-coded static UWP research blog about AI preparedness in undergraduate computer science education.

## Project Structure

- `index.html` - homepage
- `styles/main.css` - shared site styles
- `scripts/main.js` - small JavaScript enhancements
- `posts/index.html` - post listing page
- `posts/ai-preparedness.html` - featured article draft
- `posts/curriculum-gap.html` - article draft
- `posts/student-response.html` - article draft
- `assets/` - local visual assets

## Edit Locally

Open `index.html` in a browser to preview the homepage. Because the site uses only static HTML, CSS, and JavaScript, there is no build step and no dependency installation.

## Deploy to GitHub Pages

1. Create a GitHub repository, for example `uwp-ai-blog`.
2. Commit and push these files to the `main` branch.
3. On GitHub, go to Settings > Pages.
4. Under Source, choose Deploy from branch.
5. Select `main` and `/root`.
6. Save.

After GitHub publishes the site, it should be available at a URL like:

```text
https://YOUR-USERNAME.github.io/uwp-ai-blog/
```

All internal links use relative paths, so the site will work under a repository path such as `/uwp-ai-blog/`.
