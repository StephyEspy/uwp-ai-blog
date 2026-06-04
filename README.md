# UWP AI Blog

A self-coded static UWP research blog about AI preparedness in undergraduate computer science education.

## Project Structure

- `index.html` - homepage with research overview and About Me section
- `styles/main.css` - shared site styles
- `scripts/main.js` - small JavaScript enhancements
- `posts/index.html` - post listing page
- `posts/ai-preparedness.html` - complete research blog argument
- `posts/curriculum-gap.html` - curriculum-to-industry gap section
- `posts/student-response.html` - AI literacy and student response section
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
