# JML Specification (v1.0)

Το **JML (JSON-style Markup Language)** είναι ένα ελαφρύ, αναγνώσιμο markup format εμπνευσμένο από JSON και DSLs. Σχεδιασμένο για γρήγορη δημιουργία UI templates στο **Ascoos OS**, επιτρέπει structured HTML gen με minimal syntax, πλήρη UTF-8 support, και εύκολη επεξεργασία μέσω AST.

**Στόχος**: Απλοποίηση web dev – γράψε declarative code, parse σε AST, render σε HTML/DSL, validate semantics.

---

## 📋 Σύνταξη (Syntax)

### Βασικά Στοιχεία
- **Tags**: Χρησιμοποίησε identifiers (letters, digits, _, -) για HTML tags.
- **Attributes**: `:attrName('value')` – single quotes για strings, comma-separated.
- **Content**: `{ content }` – backticks `` `text` `` για multiline/raw content.
- **Nesting**: `{ }` για children.
- **Whitespace**: Ignored (trimmed), εκτός content.

### Παραδείγματα

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
      h1{`Καλώς Ήρθατε!`}  // UTF-8 OK
      p{`Περιεχόμενο.`}
    }
  }
}
```
**Render**: Full HTML με head/body separation.

#### Content Multiline
```jml
blockquote {
  `Πολλαπλές
  γραμμές
  με backticks.`
}
```
**Render**: `<blockquote>Πολλαπλές γραμμές με backticks.</blockquote>` (trims newlines optional).

### Κανόνες
- **Valid Identifiers**: /^[a-zA-Z_][a-zA-Z0-9_-]*$/u (unicode-safe).
- **Strings**: Single quotes only, no escape needed (parser handles).
- **Void Tags**: meta, link, img – no children/{}.
- **Comments**: // single-line (future: /* */).
- **Errors**: Unexpected chars throw pos-based exceptions.

---

## 🏗️ Abstract Syntax Tree (AST)

Το JML parse-άρεται σε hierarchical AST (TJmlNode objects):
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
            {"type": "content", "value": "Καλώς Ήρθατε!"}
          ]
        }
      ]
    }
  ]
}
```

**Parsing Flow**: Tokenizer → Tokens → Parser → AST → Renderer/Validator.

---

## 🔍 Επικύρωση (Validation)

Χρησιμοποιεί TJmlValidator:
- **Structural**: head/body only under html; no nesting html.
- **Semantic**: No dup attrs; void tags no children; event attrs (onClick) must be 'macro:...'.
- **Custom**: 'if' attr regex: /^[a-zA-Z0-9_.-]+\s*[><=!]+.*$/u.
- **Issues**: Array of strings (warnings/errors).

Παράδειγμα Output:
```
Issues:
- Root group missing 'html' tag
- Tag 'head' must be direct child of 'html'
```

---

## 🔄 Μετατροπές

- **JML → HTML**: TJmlRenderer::render() – special handling for html/head/body.
- **JML → DSL**: TJmlRenderer::renderDSL() – indented TAG/ATTR/TEXT format.
- **HTML → JML**: TJmlConverter::htmlToJml() – DOM parse, recursive gen με indents.
- **Extensions**: Easy add 'repeat(var, n)' ή 'if(cond)' via custom AST nodes.

---

## 🛠 Εργαλεία & Integration

- **JML Studio**: Live editor/preview/AST/DSL (index.html).
- **Ascoos OS**: Hook με Macros Engine – parse JML → AST → semantic trigger (π.χ. NLP on content).
- **Libs**: UTF-8 via TUTF8, DOM for HTML import.

### Future
- Macro Simulation: Eval AST with vars (e.g., {if: 'user.role == admin' { admin-panel }}).
- Export: JSON/XML/YAML via TArrayHandler.
- AI Gen: NLP → Auto-JML (e.g., "Create responsive nav" → Gen snippet).

---

## 📚 Παραπομπές
- [JML Studio README](README-GR.md)
- [Ascoos OS Web 5.0](https://github.com/ascoos/os/blob/main/WEB5-GR.md)
- [Semantic Macro Examples](https://github.com/ascoos/os/tree/main/examples/case-studies)

**Άδεια**: AGL © 2025 Alexsoft Software. Contributions welcome!

---
*Version: 1.0 | Updated: 2025-10-07*
