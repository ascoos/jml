console.log("JML content script loaded");

// =========================
//  JML -> DOM Parser (v1.3)
// =========================

function parseJML(jmlCode) {
  const lines = jmlCode.split('\n');
  const fragment = document.createDocumentFragment();

  const stack = [{ node: fragment, children: [] }];

  let textMode = false;
  let textBuffer = '';
  let textTargetElement = null;

  const attrRegex = /:([a-zA-Z0-9\-]+)\(\s*(['"])(.*?)\2\s*\)/g;

  const voidTags = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img',
    'input', 'link', 'meta', 'source', 'track', 'wbr'
  ]);

  function flushChildrenToDOM(entry) {
    entry.children.forEach(child => entry.node.appendChild(child));
    entry.children.length = 0;
  }

  function parseTagHeader(header) {
    header = header.trim();
    const parts = header.split(':');
    const baseTag = parts[0];
    const rest = parts.slice(1).join(':');

    if (!rest) {
      return { tagName: baseTag, attrString: '' };
    }

    return { tagName: baseTag, attrString: ':' + rest };
  }

  for (let lineNo = 0; lineNo < lines.length; lineNo++) {
    let rawLine = lines[lineNo];
    let trimmed = rawLine.trim();

    // ============================
    // TEXT MODE
    // ============================
    if (textMode) {
      const closingIndex = trimmed.lastIndexOf('`');

      if (closingIndex !== -1) {
        const before = trimmed.slice(0, closingIndex);
        textBuffer += '\n' + before;

        const textNode = document.createTextNode(textBuffer);
        if (textTargetElement) {
          textTargetElement.appendChild(textNode);
        } else {
          stack[stack.length - 1].children.push(textNode);
        }

        textMode = false;
        textBuffer = '';
        textTargetElement = null;

        const after = trimmed.slice(closingIndex + 1).trim();
        if (after === '}') {
          if (stack.length > 1) {
            const closed = stack.pop();
            flushChildrenToDOM(closed);
          }
        }

        continue;
      } else {
        textBuffer += '\n' + rawLine;
        continue;
      }
    }

    // ============================
    // NORMAL MODE
    // ============================

    if (trimmed === '' || trimmed.startsWith('//') || trimmed.startsWith('#')) {
      continue;
    }

    if (trimmed === '}') {
      if (stack.length > 1) {
        const closed = stack.pop();
        flushChildrenToDOM(closed);
      }
      continue;
    }

    if (trimmed.startsWith('`')) {
      const closingIndex = trimmed.lastIndexOf('`');
      if (closingIndex > 0) {
        const inner = trimmed.slice(1, closingIndex);
        const textNode = document.createTextNode(inner);
        stack[stack.length - 1].children.push(textNode);
      } else {
        textMode = true;
        textBuffer = trimmed.slice(1);
        textTargetElement = null;
      }
      continue;
    }

    // Inline tag + inline text
    let inlineTagMatch = trimmed.match(/^(.+?)\s*\{\s*`([\s\S]*)`\s*\}\s*$/);
    if (inlineTagMatch) {
      const header = inlineTagMatch[1];
      const textContent = inlineTagMatch[2];

      const { tagName, attrString } = parseTagHeader(header);
      const element = document.createElement(tagName);

      if (attrString.trim().startsWith(':')) {
        attrRegex.lastIndex = 0;
        let m;
        while ((m = attrRegex.exec(attrString)) !== null) {
          element.setAttribute(m[1], m[3]);
        }
      }

      element.appendChild(document.createTextNode(textContent));
      stack[stack.length - 1].children.push(element);
      continue;
    }

    // Tag opens block + starts inline text
    let openInlineMatch = trimmed.match(/^(.+?)\s*\{\s*`([\s\S]*)$/);
    if (openInlineMatch) {
      const header = openInlineMatch[1];
      const firstText = openInlineMatch[2];

      const { tagName, attrString } = parseTagHeader(header);
      const element = document.createElement(tagName);

      if (attrString.trim().startsWith(':')) {
        attrRegex.lastIndex = 0;
        let m;
        while ((m = attrRegex.exec(attrString)) !== null) {
          element.setAttribute(m[1], m[3]);
        }
      }

      const entry = { node: element, children: [] };
      stack[stack.length - 1].children.push(element);

      if (!voidTags.has(tagName.toLowerCase())) {
        stack.push(entry);
      }

      const closingBacktickIndex = firstText.lastIndexOf('`');
      if (closingBacktickIndex !== -1) {
        const inner = firstText.slice(0, closingBacktickIndex);
        element.appendChild(document.createTextNode(inner));
      } else {
        textMode = true;
        textTargetElement = element;
        textBuffer = firstText;
      }

      continue;
    }

    // Normal tag
    const tagMatch = trimmed.match(/^(.+?)(\s*\{)?\s*$/);
    if (!tagMatch) {
      console.warn(`JML Parse Warning (line ${lineNo + 1}): Invalid syntax: "${trimmed}"`);
      continue;
    }

    const header = tagMatch[1];
    const hasOpeningBrace = !!tagMatch[2];

    const { tagName, attrString } = parseTagHeader(header);
    const element = document.createElement(tagName);

    if (attrString.trim().startsWith(':')) {
      attrRegex.lastIndex = 0;
      let m;
      while ((m = attrRegex.exec(attrString)) !== null) {
        element.setAttribute(m[1], m[3]);
      }
    }

    stack[stack.length - 1].children.push(element);

    if (hasOpeningBrace && !voidTags.has(tagName.toLowerCase())) {
      stack.push({ node: element, children: [] });
    }
  }

  while (stack.length > 1) {
    const closed = stack.pop();
    flushChildrenToDOM(closed);
  }

  flushChildrenToDOM(stack[0]);

  return fragment;
}

// ===================================================
//  Βοηθητικά για μεταφορά head/body από virtual DOM
// ===================================================

function moveChildren(src, dst) {
  if (!src || !dst) return;
  while (src.firstChild) {
    dst.appendChild(src.firstChild);
  }
}

// =======================================
//  Rendering για <script type="text/jml">
// =======================================

function renderAllJMLScripts() {
  const scripts = document.querySelectorAll('script[type="text/jml"]:not([data-jml-rendered])');

  scripts.forEach(scriptEl => {
    // RAW TEXT extraction (fixes ©, €, ελληνικά)
    let jmlCode = '';
    scriptEl.childNodes.forEach(n => {
      if (n.nodeType === Node.TEXT_NODE) {
        jmlCode += n.nodeValue;
      }
    });

    console.log('JML <script> found, length =', jmlCode.length);

    try {
      const fragment = parseJML(jmlCode);

      const temp = document.createElement('div');
      temp.appendChild(fragment);

      const virtualHtml = temp.querySelector('html');
      let virtualHead = null;
      let virtualBody = null;

      if (virtualHtml) {
        virtualHead = virtualHtml.querySelector('head');
        virtualBody = virtualHtml.querySelector('body');
      } else {
        virtualHead = temp.querySelector('head');
        virtualBody = temp.querySelector('body');
      }

      if (virtualHead) moveChildren(virtualHead, document.head);
      if (virtualBody) moveChildren(virtualBody, document.body);
      else moveChildren(temp, document.body);

      scriptEl.dataset.jmlRendered = 'true';
      scriptEl.remove();

      window.__JML_FULL_DOCUMENT_RENDERED__ = true;

    } catch (err) {
      console.error('JML Render Error (in <script type="text/jml">):', err);
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'background:#fdd;color:red;padding:10px;border:1px solid red;';
      errorDiv.textContent = 'JML Parse Error – check console';
      scriptEl.replaceWith(errorDiv);
    }
  });
}

// ================================
//  Rendering για <jml>...</jml>
// ================================

function renderAllJMLTags() {
  const nodes = document.querySelectorAll('jml:not([data-jml-rendered])');

  nodes.forEach(jmlEl => {
    // RAW TEXT extraction (fixes ©, €, ελληνικά)
    let jmlCode = '';
    jmlEl.childNodes.forEach(n => {
      if (n.nodeType === Node.TEXT_NODE) {
        jmlCode += n.nodeValue;
      }
    });

    console.log('JML <jml> found, length =', jmlCode.length);

    try {
      const fragment = parseJML(jmlCode);

      if (window.__JML_FULL_DOCUMENT_RENDERED__) {
        document.body.appendChild(fragment);
        jmlEl.dataset.jmlRendered = 'true';
        jmlEl.remove();
        return;
      }

      jmlEl.parentNode.insertBefore(fragment, jmlEl);
      jmlEl.dataset.jmlRendered = 'true';
      jmlEl.remove();

    } catch (err) {
      console.error('JML Render Error (in <jml>):', err);
      jmlEl.style.cssText = 'background:#fdd;color:red;padding:10px;border:1px solid red;';
      jmlEl.textContent = 'JML Parse Error – check console';
    }
  });
}

// ================================
//  Ενοποιημένο render
// ================================

function renderAllJML() {
  renderAllJMLScripts();
  renderAllJMLTags();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderAllJML);
} else {
  renderAllJML();
}
