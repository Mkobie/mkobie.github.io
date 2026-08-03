# mkobie.github.io

A static, hand-written portfolio site. Plain HTML plus a single shared `styles.css` and `scripts.js` at the repo root.
Hosted on GitHub Pages.

```
index.html                       tile grid, newest post first
about.html
styles.css                       every page links to this
scripts.js                       lightbox (open, arrow-key nav, Esc)
YYYY/MM/DD/<slug>/index.html     one post per folder
assets/images/YYYYMMDD_<key>/    one image folder per post
```

## The recurring task: transporting a post from the old portfolio

The user pastes the prose from a post on their old online portfolio. The job is to
recreate it here: a tile on `index.html`, a post page, and an image folder.

### What the user provides

- **The post text, pasted into the chat.** Never fetch the original URL. If a turn
  arrives with only a link and no pasted prose, stop and ask them to paste it.
- **A link**, used for the date and as a reference.
- **Image markers inside the pasted text**, e.g. `[IMAGE: git commit history]` or
  `[GIF: old vs new]`. One marker = one figure, in that position, in that order.
  Don't invent figures the markers don't call for, and don't skip any.

### Naming

| Thing | Rule                                                                                                                           | Example |
|---|--------------------------------------------------------------------------------------------------------------------------------|---|
| Title | Verbatim from the source URL                                                                                                   | `[C#] Unity Virtual Reality Game: Urban Kiz Practice` |
| Date | From the source URL's `/yyyy/mm/dd/`. If neither link nor text gives a date, **ask** — never assume today                      | April 30, 2026 |
| Slug | Title, lowercased, punctuation dropped, spaces → hyphens                                                                       | `unity-virtual-reality-game-urban-kiz-practice` |
| Post path | `YYYY/MM/DD/<slug>/index.html`                                                                                                 | `2026/04/30/unity-virtual-reality-game-urban-kiz-practice/index.html` |
| Image folder | `assets/images/YYYYMMDD_<short_lowercase_keyword>/` — pick a short keyword, not the full slug, and name your choice in the summary | `assets/images/20260430_urban_kiz/` |

The image folder keyword is deliberately short and does not have to match the slug
(`2017/10/09/library/` → `20171009_books/`). Create the folder empty; no `.gitkeep`.

### Placeholders

Images are added later by hand. Emit a **correct relative path with a
`PLACEHOLDER_` filename**, so only the filename needs swapping and `rg PLACEHOLDER`
finds every one:

```html
<img src="../../../../assets/images/20190516_plc/PLACEHOLDER_plc_cover.png"
     alt="RSLogix PLC programming environment">
```

- Banner is `PLACEHOLDER_banner.png`; inline figures take a short keyword from their
  marker. Use `.gif` for `[GIF: ...]` markers, `.png` otherwise.
- **The tile image reuses the banner placeholder** — same path, same file.
- `alt` text is a real, descriptive best guess drawn from the marker and surrounding
  prose. It is never a placeholder. Flag every guess in the summary.

### Prose

Reproduce the pasted text **verbatim** — wording, British/Canadian spellings
(`behaviour`, `socialize`), and curly quotes (`’` `“` `”`). The only transformation
is wrapping it in this site's HTML: `<p>` per paragraph, `<h2>` for section headings,
`<ul>`/`<ol>` for lists, and external links or embeds (itch.io, CodePen iframes)
carried across as-is.

Do not fix typos, tighten sentences, or update stale claims in the file. Collect them
and report them at the end as suggestions.

## Templates

Post page — all asset links are `../../../../` from the four-deep post folder:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PAGE TITLE</title>
  <link rel="stylesheet" href="../../../../styles.css">
</head>
<body>
  <header class="site-header">
    <a class="site-title site-title-link" href="../../../../index.html">Marianne Kobierski</a>
    <a class="about-link" href="../../../../about.html">About me</a>
  </header>

  <main>
    <section
      class="project-banner"
      style="background-image: url('../../../../assets/images/YYYYMMDD_key/PLACEHOLDER_banner.png');"
    >
      <div class="project-banner-overlay">
        <h1>PAGE TITLE</h1>
      </div>
    </section>

    <section class="project-meta">
      <p class="project-date">Month D, YYYY</p>
    </section>

    <section class="page-content">
      <!-- prose, headings, lists, figures -->
    </section>

  </main>

  <script src="../../../../scripts.js"></script>
</body>
</html>
```

`scripts.js` goes on **every** post page, even one with a single image. It builds the
lightbox overlay itself and appends it to `<body>`, so no lightbox markup belongs in
the page — clicking any `.content-figure img` opens it, and images inside an
`.image-collage` become a navigable group.

Figures:

```html
<figure class="content-figure">
  <img src="../../../../assets/images/YYYYMMDD_key/PLACEHOLDER_key.png" alt="...">
  <figcaption>Caption, if the original had one</figcaption>
</figure>
```

Tile, inserted into `index.html`'s `.tile-grid` in reverse-chronological position
(newest first — usually the top, but older posts slot in by date):

```html
    <a class="tile" href="YYYY/MM/DD/slug/">
      <img class="tile-image" src="assets/images/YYYYMMDD_key/PLACEHOLDER_banner.png"
           alt="...">

      <div class="tile-overlay-group">
        <div class="tile-date">Month D, YYYY</div>
        <div class="tile-overlay">
          <span>PAGE TITLE</span>
        </div>
      </div>
    </a>
```

Some tiles carry an inline `style="object-position: ..."` to fix the crop. Leave it
off — it can't be chosen without seeing the image; the user tunes it once the real
file is in place.

## Finish each page by reporting

1. The image folder name chosen, so it can be vetoed.
2. Which `alt` texts were guessed.
3. **Suggested edits** — typos, broken or dead links, awkward phrasing, claims that
   have gone stale since the original was written. Suggestions only; never applied
   without a go-ahead.

Do not commit. Leave changes in the working tree for review. Existing commit messages
follow `Create <X> page` if a commit is later requested.

## Don't

- Don't edit `styles.css` or `scripts.js` while adding a page unless asked — every
  page shares them, so a change there is a change to all 14.
- Don't write content the pasted text doesn't contain, including invented intros,
  conclusions, or figure captions.
- Don't add new nav or index files; `index.html` is the only listing.
