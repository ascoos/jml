# JML Specification (v1.0)

**JML (JSON-style Markup Language)** is a lightweight, readable markup format inspired by JSON and DSLs Designed for rapid UI template creation in **Ascoos OS**, it enables structured HTML generation with minimal syntax, full UTF-8 support, and easy editing via AST.

**Goal**: Simplify web development – write declarative code, parse into AST, render to HTML/DSL, and validate semantics.

---

## 📋 Syntax

### Basic Elements
- **Tags**: Use identifiers (letters, digits, _, -) for HTML tags.
- **Attributes**: `:attrName('value')` – single quotes for strings, comma-separated.
- **Content**: `{ content }` – backticks `` `text` `` for multiline/raw content.
- **Nesting**: `{ }` for children.
- **Whitespace**: Ignored (trimmed), except in content.

### Examples

#### Simple Tag
```jml
div:class('container'){`Hello World`}
```
**Render**: `<div class="container">Hello World</div>`

#### Attributes Multiple
```jml
a:rel('nofollow'),href('https://ascoos.com'){`Link`}
```
**Render**: `<a rel="nofollow" href="https://ascoos.com">Link</a>`

#### Nested Structure
```jml
html {
  head {
    meta:charset('UTF-8')
    link:rel('stylesheet'),href('https://bootlib.ascoos.com/dist/bootlib-1.0.0a4.min.css')
  }
  body:class('dark-theme') {
    nav {
      ul {
        li{`Home`}
        li{`About`}
      }
    }
    main {
      h1{`Welcome!`}  // UTF-8 OK
      p{`Content.`}
    }
  }
}
```
**Render**: Full HTML with head/body separation.

#### Content Multiline
```jml
blockquote {
  `Multiple
  lines
  with backticks.`
}
```
**Render**: `<blockquote>Multiple lines with backticks.</blockquote>` (trims newlines optional).

### Rules
- **Valid Identifiers**: /^[a-zA-Z_][a-zA-Z0-9_-]*$/u (unicode-safe).
- **Strings**: Single quotes only, no escape needed (parser handles).
- **Void Tags**: meta, link, img – no children/{}.
- **Comments**: // single-line (future: /* */).
- **Errors**: Unexpected chars throw pos-based exceptions.

---

## 🏗️ Abstract Syntax Tree (AST)

JML is parsed into a hierarchical AST (TJmlNode objects):
- **Node Types**: `group` (root), `tag` (name), `attribute` (name/value), `content` (value).
- **Properties**: type, name (opt), value (opt), attributes[], children[].

### AST JSON Example
```json
{
  "type": "group",
  "children": [
    {
      "type": "tag",
      "name": "html",
      "attributes": [],
      "children": [
        {
          "type": "tag",
          "name": "head",
          "children": [
            {
              "type": "tag",
              "name": "meta",
              "attributes": [{"type": "attribute", "name": "charset", "value": "UTF-8"}]
            }
          ]
        },
        {
          "type": "tag",
          "name": "body",
          "attributes": [{"type": "attribute", "name": "class", "value": "dark-theme"}],
          "children": [
            {"type": "content", "value": "Welcome!"}
          ]
        }
      ]
    }
  ]
}
```

**Parsing Flow**: Tokenizer → Tokens → Parser → AST → Renderer/Validator.

---

## 🔍 Validation

Uses TJmlValidator:
- **Structural**: head/body only under html; no nesting html.
- **Semantic**: No dup attrs; void tags no children; event attrs (onClick) must be 'macro:...'.
- **Custom**: 'if' attr regex: /^[a-zA-Z0-9_.-]+\s*[><=!]+.*$/u.
- **Issues**: Array of strings (warnings/errors).

Example Output:
```
Issues:
- Root group missing 'html' tag
- Tag 'head' must be direct child of 'html'
```

---

## 🔄 Conversions

- **JML → HTML**: TJmlRenderer::render() – special handling for html/head/body.
- **JML → DSL**: TJmlRenderer::renderDSL() – indented TAG/ATTR/TEXT format.
- **HTML → JML**: TJmlConverter::htmlToJml() – DOM parse, recursive gen with indents.
- **Extensions**: Easy add 'repeat(var, n)' or 'if(cond)' via custom AST nodes.

---

## 🛠 Tools & Integration

- **JML Studio**: Live editor/preview/AST/DSL (index.html).
- **Ascoos OS**: Hook with Macros Engine – parse JML → AST → semantic trigger (e.g., NLP on content).
- **Libs**: UTF-8 via TUTF8, DOM for HTML import.

### Future
- Macro Simulation: Eval AST with vars (e.g., {if: 'user.role == admin' { admin-panel }}).
- Export: JSON/XML/YAML via TArrayHandler.
- AI Gen: NLP → Auto-JML (e.g., "Create responsive nav" → Gen snippet).

---

## 📚 References
- [JML Studio README](README-GR.md)
- [Ascoos OS Web 5.0](https://github.com/ascoos/os/blob/main/WEB5-GR.md)
- [Semantic Macro Examples](https://github.com/ascoos/os/tree/main/examples/case-studies)

**License**: AGL © 2025 Alexsoft Software. Contributions welcome!

---

*Version: 1.0 | Updated: 2025-10-07*
