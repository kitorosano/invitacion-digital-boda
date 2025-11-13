import fs from "fs/promises";
import path from "path";

const root = path.resolve("./");
const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const res = path.resolve(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(res)));
    else files.push(res);
  }
  return files;
};

// OKLCH -> OKLab -> linear RGB -> sRGB -> HSL
function degToRad(d) {
  return (d * Math.PI) / 180;
}

function oklchToSRGB(L, C, hDeg) {
  const h = degToRad(hDeg);
  const a = Math.cos(h) * C;
  const b = Math.sin(h) * C;

  // OKLab components
  const L_ = L;
  const a_ = a;
  const b_ = b;

  // intermediate
  const l_ = L_ + 0.3963377774 * a_ + 0.2158037573 * b_;
  const m_ = L_ - 0.1055613458 * a_ - 0.0638541728 * b_;
  const s_ = L_ - 0.0894841775 * a_ - 1.291485548 * b_;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let b2 = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  // clamp
  const clamp = (v) => Math.min(1, Math.max(0, v));

  // linear to sRGB
  const linToSrgb = (c) => {
    // handle negatives before gamma
    c = clamp(c);
    if (c <= 0.0031308) return 12.92 * c;
    return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  };

  r = linToSrgb(r);
  g = linToSrgb(g);
  b2 = linToSrgb(b2);

  return [clamp(r), clamp(g), clamp(b2)];
}

function rgbToHsl(r, g, b) {
  // r,g,b in 0..1
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), +(s * 100).toFixed(1), +(l * 100).toFixed(1)];
}

function formatHsl([h, s, l]) {
  // prefer shorthand like hsl(260deg 5% 70%)
  const sStr = `${s}%`;
  const lStr = `${l}%`;
  return `hsl(${h}deg ${sStr} ${lStr})`;
}

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (![".astro", ".css", ".scss", ".sass", ".less"].includes(ext)) return;
  const content = await fs.readFile(file, "utf8");

  // regex to find oklch(L C H) where values can be floats and spaces
  const re =
    /(--[\w-]+:\s*)oklch\(\s*([0-9]*\.?[0-9]+)\s+([0-9]*\.?[0-9]+)\s+([0-9]*\.?[0-9]+)\s*\)\s*;/g;
  let match;
  let out = content;
  const edits = [];
  while ((match = re.exec(content)) !== null) {
    const full = match[0];
    const varPrefix = match[1];
    const L = parseFloat(match[2]);
    const C = parseFloat(match[3]);
    const H = parseFloat(match[4]);
    const startIndex = match.index;

    const [r, g, b] = oklchToSRGB(L, C, H);
    const hsl = formatHsl(rgbToHsl(r, g, b));

    // Build hsl declaration
    const hslDecl = `${varPrefix}${hsl};`;

    // Check if previous non-empty line already contains an hsl fallback for same var
    const before = content.slice(0, startIndex);
    const lastLineBreak = before.lastIndexOf("\n");
    const prevLineStart = lastLineBreak + 1;
    const prevLine = before.slice(prevLineStart).trim();

    if (prevLine.startsWith(varPrefix.trim())) {
      // replace previous line with new hslDecl
      const prevLineRawStart = prevLineStart;
      const nlIndex = content.indexOf("\n", prevLineRawStart);
      const prevLineRawEnd = nlIndex === -1 ? startIndex : nlIndex + 1;
      edits.push({
        type: "replace-prev",
        start: prevLineRawStart,
        end: prevLineRawEnd,
        text: hslDecl + "\n",
      });
    } else {
      // insert hslDecl before the oklch line
      edits.push({
        type: "insert-before",
        pos: startIndex,
        text: hslDecl + "\n",
      });
    }
  }

  if (edits.length === 0) return;

  // Apply edits from end to start to preserve indices
  edits.sort((a, b) => (a.start ?? a.pos) - (b.start ?? b.pos));
  let newContent = content;
  for (let i = edits.length - 1; i >= 0; i--) {
    const e = edits[i];
    if (e.type === "replace-prev") {
      newContent =
        newContent.slice(0, e.start) + e.text + newContent.slice(e.end);
    } else if (e.type === "insert-before") {
      newContent =
        newContent.slice(0, e.pos) + e.text + newContent.slice(e.pos);
    }
  }

  await fs.writeFile(file, newContent, "utf8");
  console.log("Updated", file);
}

(async () => {
  const files = await walk(path.join(root, "src"));
  for (const f of files) {
    try {
      await processFile(f);
    } catch (err) {
      console.error("Error processing", f, err);
    }
  }
  console.log("Done");
})();
