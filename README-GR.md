# JML (JSON-style Markup Language)

[![PHP](https://img.shields.io/badge/PHP-8.2%2B-blue)](https://www.php.net/) [![Άδεια: AGL](https://img.shields.io/badge/Άδεια-AGL-green)](LICENSE.md) [![UTF-8](https://img.shields.io/badge/UTF--8-Υποστηριζόμενο-brightgreen)](https://el.wikipedia.org/wiki/UTF-8)

Το **JML** είναι ένα ελαφρύ, αναγνώσιμο format markup εμπνευσμένο από JSON και DSLs. Σχεδιασμένο για γρήγορη δημιουργία templates UI στο **Ascoos OS**, επιτρέπει τη δομημένη παραγωγή HTML με ελάχιστη σύνταξη, πλήρη υποστήριξη UTF-8 και εύκολη επεξεργασία μέσω Abstract Syntax Tree (AST).

### Γιατί JML;
- **Ελαφρύ & Αποδοτικό**: Μέχρι και 50% μικρότερο μέγεθος από ισοδύναμο HTML σε σύνθετες σελίδες, ιδανικό για γρήγορες μεταφορές στο web και polyfills στον browser.
- **Φιλικό προς Προγραμματιστές**: Δημιουργική σύνταξη για γρήγορο prototyping – γράψε μία φορά, parse σε AST, render σε HTML/DSL και επικύρωσε σημασιολογικά.
- **Μελλοντοκεντρικό**: Ενσωματώνεται με macros του Ascoos OS, NLP και αποκεντρωμένα UI του Web 5.0.

**Στόχος**: Απλοποίηση της ανάπτυξης web – από απλά tags σε δομημένα layouts, χωρίς περιττό boilerplate.

---

## 🚀 Χαρακτηριστικά
- **Ελάχιστη Σύνταξη**: Tags, attributes (`:attr('value')`) και content (`` `text` ``) σε δομή παρόμοια με JSON.
- **Πλήρης Υποστήριξη UTF-8**: Χειρίζεται ελληνικά, emojis και διεθνές κείμενο χωρίς προβλήματα.
- **Parsing AST**: Μετατρέπει σε ιεραρχικούς κόμβους για εύκολη χειραγώγηση (π.χ. semantic macros).
- **Επικύρωση**: Δομική (π.χ. head μόνο κάτω από html) και σημασιολογική (χωρίς διπλά attributes, void tags).
- **Μετατροπές**: JML ↔ HTML/DSL μέσω εργαλείων βασισμένων σε DOM.
- **Εργαλείο Studio**: Live editor, προεπισκόπηση, προβολή AST και εξαγωγές.

---

## 📦 Γρήγορη Έναρξη

### Προαπαιτούμενα
- **Ascoos OS** ή **[AWES 26](https://awes.ascoos.com)** με ενεργοποιημένη επέκταση DOM.
- Το JML βασίζεται σε κλάσεις του Ascoos Kernel (π.χ. TJmlTokenizer, TUTF8) – δεν λειτουργεί αυτόνομα.

### Χρήση
1. Ενεργοποίησε τις κλάσεις του JML στο Ascoos OS σου μέσω του [Extras Classes Manager](https://www.youtube.com/watch?v=RSuCPGp3RgY).
2. Άνοιξε την εφαρμογή **JML Studio** εντός του windows-like περιβάλλοντος του **Ascoos OS**.
3. Επεξεργάσου JML live – parse, render και validate μέσω Ascoos API.
4. Εναλλακτικά, χρησιμοποίησε την online έκδοση του **JML Studio** μέσω των επίσημων ιστοσελίδων του **Ascoos OS**.

### Παράδειγμα Χρήσης
Εισήγαγε αυτό στο editor του JML Studio:

```jml
html {
  head {
    meta:charset('UTF-8')
    link:rel('stylesheet'),href('https://bootlib.ascoos.com/dist/bootlib-1.0.0a4.min.css')
  }
  body:class('dark-theme') {
    h1{`Καλώς Ήρθατε στο JML!`}
    p{`Ελαφρύ markup για το Ascoos OS.`}
  }
}
```

- **Προεπισκόπηση**: Δες το rendered HTML.
- **AST**: Πρόβλεψη JSON δέντρου.
- **DSL**: Εξαγωγή σε δομημένη μορφή.
- **Εξαγωγή**: Κατέβασε .jml ή .html.

---

## 📖 Πλήρης Προδιαγραφή
Για λεπτομερή σύνταξη, κανόνες, δομή AST και επικύρωση: [JML_SPEC.md](JML_SPEC.md) (Αγγλικά) ή [JML_SPEC-GR.md](JML_SPEC-GR.md) (Ελληνικά).

Κύρια Χαρακτηριστικά:
- **Tags**: `tagName { children }`
- **Attributes**: `:class('value'),id('main')`
- **Content**: `` `Πολλαπλές γραμμές` `` (διατηρεί whitespace).

---

## 🛠 Βασικά Στοιχεία
- **TJmlTokenizer**: Διαχωρίζει JML σε tokens (ασφαλές για UTF-8).
- **TJmlParser**: Χτίζει AST από tokens.
- **TJmlRenderer**: Παράγει HTML ή DSL.
- **TJmlValidator**: Ελέγχει δομή/σημασιολογία.
- **TJmlConverter**: Διπλής κατεύθυνσης μετατροπή HTML ↔ JML.

---

## 🤝 Συνεισφορά
1. Άνοιξε Pull Request.

---

## 📚 Παραπομπές
- [JML Studio](https://www.ascoos.com) – Live εργαλείο.
- [Ascoos OS Web 5.0](https://github.com/ascoos/os/blob/main/WEB5-GR.md)
- [Παραδείγματα Semantic Macros](https://github.com/ascoos/os/tree/main/examples/case-studies)
- [Ascoos OS Glossary](https://github.com/ascoos/os/blob/main/GLOSSARY.md) – Βαθιά ανάλυση τεχνολογιών Ascoos.

## 📄 Άδεια Χρήσης
Αυτό το project αδειοδοτείται με **Ascoos General License (AGL)** – εμπορική, όλα τα δικαιώματα διατηρούνται από AlexSoft Software. Δες [LICENSE.md](LICENSE.md) (Αγγλικά) ή [LICENSE-GR.md](LICENSE-GR.md) (Ελληνικά). Για ανοιχτές συνεισφορές, επικοινώνησε στο support@ascoos.com.

---

*Έκδοση: 1.0 | Ενημέρωση: 07 Οκτωβρίου 2025*
