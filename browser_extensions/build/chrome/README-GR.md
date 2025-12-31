# Ascoos JML Renderer (Επέκταση Browser)

Μια ελαφριά επέκταση browser που επιτρέπει **client-side rendering JML (JSON DSL-styled Markup Language)** σε οποιαδήποτε ιστοσελίδα.  
Υποστηρίζει **πλήρη JML έγγραφα**, **inline JML blocks**, και **μεικτό HTML + JML περιεχόμενο**.

---

## Χαρακτηριστικά

- Απόδοση `<script type="text/jml">` ως πλήρες HTML document  
- Απόδοση `<jml> ... </jml>` μέσα σε υπάρχον HTML  
- Υποστήριξη nested blocks, attributes, inline text, multiline text  
- Υποστήριξη void tags (`br`, `hr`, `img`, `input`, κ.λπ.)  
- Μεταφορά head/body στο πραγματικό DOM  
- Λειτουργεί σε οποιαδήποτε σελίδα (τοπική ή απομακρυσμένη)  
- Χωρίς εξαρτήσεις — καθαρή JavaScript  

---

## Πώς λειτουργεί

Το extension εισάγει ένα content script που:

1. Εντοπίζει:
   - `<script type="text/jml">`
   - `<jml> ... </jml>`
2. Εξάγει raw JML (UTF‑8 ασφαλές)
3. Το μετατρέπει σε DOM nodes
4. Το εισάγει στη σελίδα

Τα full-document JML συγχωνεύονται στο πραγματικό `<head>` και `<body>`.  
Τα inline JML blocks αποδίδονται στη θέση τους.

---

## Εγκατάσταση (Development Mode)

### Chrome / Edge
1. Άνοιξε `chrome://extensions/` ή `edge://extensions/`
2. Ενεργοποίησε **Developer Mode**
3. Πάτησε **Load unpacked**
4. Επίλεξε τον φάκελο της επέκτασης

### Firefox
1. Άνοιξε `about:debugging#/runtime/this-firefox`
2. Πάτησε **Load Temporary Add-on**
3. Επίλεξε το `manifest.json`

---

## Δομή Αρχείων

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

## Συμβατότητα

- Chrome (Manifest V3)
- Edge (Manifest V3)
- Firefox (Manifest V3-compatible)

---

## Άδεια

AGL License  
© 2025 Ascoos OS
