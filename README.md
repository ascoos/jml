# JML (JSON-style Markup Language)

[![PHP](https://img.shields.io/badge/PHP-8.2%2B-blue)](https://www.php.net/) [![License: AGL](https://img.shields.io/badge/License-AGL-green)](LICENSE.md) [![UTF-8](https://img.shields.io/badge/UTF--8-Supported-brightgreen)](https://en.wikipedia.org/wiki/UTF-8)

**JML** is a lightweight, readable markup format inspired by JSON and DSLs. Designed for rapid UI template creation in **Ascoos OS**, it enables structured HTML generation with minimal syntax, full UTF-8 support, and easy editing via Abstract Syntax Tree (AST).

### Why JML?
- **Lightweight & Efficient**: Up to 50% smaller size than equivalent HTML in complex pages, ideal for fast web transfers and browser polyfills.
- **Developer-Friendly**: Declarative syntax for quick prototyping – write once, parse to AST, render to HTML/DSL, and validate semantically.
- **Future-Proof**: Integrates with Ascoos OS macros, NLP, and decentralized Web 5.0 UIs.

**Goal**: Simplify web development – from simple tags to structured layouts, without unnecessary boilerplate.

---

## 🚀 Features
- **Minimal Syntax**: Tags, attributes (`:attr('value')`) and content (`` `text` ``) in a JSON-like structure.
- **Full UTF-8 Support**: Handles Greek, emojis, and international text without issues.
- **AST Parsing**: Converts to hierarchical nodes for easy manipulation (e.g., semantic macros).
- **Validation**: Structural (e.g., head only under html) and semantic (no duplicate attributes, void tags).
- **Conversions**: JML ↔ HTML/DSL via DOM-based tools.
- **Studio Tool**: Live editor, preview, AST view, and exports.

---

## 📦 Quick Start

### Prerequisites
- **Ascoos OS** or **[AWES 26](https://awes.ascoos.com)** with DOM extension enabled.
- JML relies on Ascoos Kernel classes (e.g., TJmlTokenizer, TUTF8) – it does not work standalone.

### Usage
1. Enable JML classes in your Ascoos OS via the [Extras Classes Manager](https://www.youtube.com/watch?v=RSuCPGp3RgY).
2. Open the **JML Studio** application within the windows-like environment of **Ascoos OS**.
3. Edit JML live – parse, render, and validate via Ascoos API.
4. Alternatively, use the online version of **JML Studio** through the official **Ascoos OS** websites.

### Usage Example
Enter this into the JML Studio editor:

```jml
html {
  head {
    meta:charset('UTF-8')
    link:rel('stylesheet'),href('https://bootlib.ascoos.com/dist/bootlib-1.0.0a4.min.css')
  }
  body:class('dark-theme') {
    h1{`Welcome to JML!`}
    p{`Lightweight markup for Ascoos OS.`}
  }
}
```

- **Preview**: View the rendered HTML.
- **AST**: View the JSON tree.
- **DSL**: Export to structured format.
- **Export**: Download .jml or .html.

---

## 📖 Full Specification
For detailed syntax, rules, AST structure, and validation: [JML_SPEC.md](JML_SPEC.md) (English) or [JML_SPEC-GR.md](JML_SPEC-GR.md) (Greek).

Key Features:
- **Tags**: `tagName { children }`
- **Attributes**: `:class('value'),id('main')`
- **Content**: `` `Multiple lines` `` (preserves whitespace).

---

## 🛠 Core Components
- **TJmlTokenizer**: Breaks JML into tokens (UTF-8 safe).
- **TJmlParser**: Builds AST from tokens.
- **TJmlRenderer**: Outputs HTML or DSL.
- **TJmlValidator**: Checks structure/semantics.
- **TJmlConverter**: Bidirectional HTML ↔ JML conversion.

---

## 🤝 Contributing
1. Open a Pull Request.

---

## 📚 References
- [JML Studio](https://www.ascoos.com) – Live tool.
- [Ascoos OS Web 5.0](https://github.com/ascoos/os/blob/main/WEB5-GR.md)
- [Semantic Macro Examples](https://github.com/ascoos/os/tree/main/examples/case-studies)
- [Ascoos OS Glossary](https://github.com/ascoos/os/blob/main/GLOSSARY.md) – In-depth analysis of Ascoos technologies.

## 📄 License
This project is licensed under the **Ascoos General License (AGL)** – commercial, all rights reserved by AlexSoft Software. See [LICENSE.md](LICENSE.md) (English) or [LICENSE-GR.md](LICENSE-GR.md) (Greek). For open contributions, contact support@ascoos.com.

---

*Version: 1.0 | Updated: October 07, 2025*
