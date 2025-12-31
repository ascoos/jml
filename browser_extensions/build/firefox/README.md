# Ascoos JML Renderer (Browser Extension)

A lightweight browser extension that enables **client-side rendering of JML (JSON DSL-styled Markup Language)** inside any webpage.  
Supports **full-document JML**, **inline JML blocks**, and **mixed HTML + JML** templates.

---

## Features

- Render `<script type="text/jml">` as full HTML documents  
- Render `<jml> ... </jml>` blocks inside existing HTML  
- Supports nested structures, attributes, inline text, and multiline text  
- Handles void tags (`br`, `hr`, `img`, `input`, etc.)  
- Moves `<head>` and `<body>` content into the real DOM  
- Works on any website (local or remote)  
- Zero dependencies — pure JavaScript  

---

## How It Works

The extension injects a content script that:

1. Scans the page for:
   - `<script type="text/jml">`
   - `<jml> ... </jml>`
2. Extracts raw JML text (UTF‑8 safe)
3. Parses it into DOM nodes
4. Inserts the generated HTML into the page

Full-document JML is merged into the real `<head>` and `<body>`.  
Inline JML blocks are rendered in-place.

---

## Installation (Development Mode)

### Chrome / Edge
1. Open `chrome://extensions/` or `edge://extensions/`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the extension folder

### Firefox
1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select `manifest.json`

---

## File Structure

```
ascoos-jml-extension/
│
├── manifest.json
├── content-script.js
├── README.md
├── README-GR.md
│
└── icons/
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

---

## Compatibility

- Chrome (Manifest V3)
- Edge (Manifest V3)
- Firefox (Manifest V3-compatible)

---

## License

AGL License  
© 2025 Ascoos OS