const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const translations = {
  ...JSON.parse(fs.readFileSync(path.join(__dirname, "translations-vi.json"), "utf8")),
  ...JSON.parse(fs.readFileSync(path.join(__dirname, "translations-vi-extended.json"), "utf8")),
};

const EXTENSIONS = new Set([".tsx", ".ts", ".java", ".html"]);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === "node_modules" || name === "target" || name === "build") continue;
      walk(full, files);
    } else if (EXTENSIONS.has(path.extname(name))) {
      files.push(full);
    }
  }
  return files;
}

function replaceQuotedStrings(content) {
  return content.replace(/"([^"\\]|\\.)*"/g, (match) => {
    const inner = match.slice(1, -1);
    if (Object.prototype.hasOwnProperty.call(translations, inner)) {
      return `"${translations[inner].replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    }
    return match;
  });
}

function replaceJsxText(content) {
  let result = content.replace(/>([^<>{}\n]+)</g, (match, text) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.includes("{") || trimmed.includes("}")) {
      return match;
    }
    if (Object.prototype.hasOwnProperty.call(translations, trimmed)) {
      return `>${text.replace(trimmed, translations[trimmed])}<`;
    }
    return match;
  });

  result = result.replace(/>\s*\n\s*([^<{}]+?)\s*\n\s*</g, (match, text) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.includes("{") || trimmed.includes("}")) {
      return match;
    }
    if (Object.prototype.hasOwnProperty.call(translations, trimmed)) {
      const leading = match.match(/^>\s*\n\s*/)[0];
      const trailing = match.match(/\s*\n\s*<$/)[0];
      return `${leading}${translations[trimmed]}${trailing}`;
    }
    const normalized = trimmed.replace(/\s+/g, " ");
    if (Object.prototype.hasOwnProperty.call(translations, normalized)) {
      const leading = match.match(/^>\s*\n\s*/)[0];
      const trailing = match.match(/\s*\n\s*<$/)[0];
      return `${leading}${translations[normalized]}${trailing}`;
    }
    return match;
  });

  return result;
}

const targets = [
  path.join(ROOT, "client", "src"),
  path.join(ROOT, "src", "main", "java"),
  path.join(ROOT, "src", "main", "resources", "mail-templates"),
  path.join(ROOT, "src", "test", "java"),
];

let changed = 0;
for (const dir of targets) {
  for (const file of walk(dir)) {
    const original = fs.readFileSync(file, "utf8");
    let updated = replaceQuotedStrings(original);
    if (file.endsWith(".tsx") || file.endsWith(".html")) {
      updated = replaceJsxText(updated);
    }
    if (updated !== original) {
      fs.writeFileSync(file, updated);
      changed++;
    }
  }
}

console.log(`Updated ${changed} files.`);
