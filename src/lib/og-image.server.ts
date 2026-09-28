// Pure-JS PNG renderer for result share cards (no native deps; runs on the edge).
import type { Outcome } from "@/lib/scoring";

const W = 1200;
const H = 630;
type RGB = [number, number, number];
const BG: RGB = [17, 17, 20];
const FG: RGB = [245, 245, 247];
const MUTED: RGB = [150, 150, 158];
const ACCENT: RGB = [255, 106, 48];
const LINE: RGB = [48, 48, 54];

// 5x7 bitmap font, each row is 5 bits.
const F: Record<string, string> = {
  A: "01110,10001,10001,11111,10001,10001,10001",
  B: "11110,10001,10001,11110,10001,10001,11110",
  C: "01110,10001,10000,10000,10000,10001,01110",
  D: "11110,10001,10001,10001,10001,10001,11110",
  E: "11111,10000,10000,11110,10000,10000,11111",
  F: "11111,10000,10000,11110,10000,10000,10000",
  G: "01110,10001,10000,10111,10001,10001,01111",
  H: "10001,10001,10001,11111,10001,10001,10001",
  I: "01110,00100,00100,00100,00100,00100,01110",
  J: "00111,00010,00010,00010,00010,10010,01100",
  K: "10001,10010,10100,11000,10100,10010,10001",
  L: "10000,10000,10000,10000,10000,10000,11111",
  M: "10001,11011,10101,10101,10001,10001,10001",
  N: "10001,10001,11001,10101,10011,10001,10001",
  O: "01110,10001,10001,10001,10001,10001,01110",
  P: "11110,10001,10001,11110,10000,10000,10000",
  Q: "01110,10001,10001,10001,10101,10010,01101",
  R: "11110,10001,10001,11110,10100,10010,10001",
  S: "01111,10000,10000,01110,00001,00001,11110",
  T: "11111,00100,00100,00100,00100,00100,00100",
  U: "10001,10001,10001,10001,10001,10001,01110",
  V: "10001,10001,10001,10001,10001,01010,00100",
  W: "10001,10001,10001,10101,10101,10101,01010",
  X: "10001,10001,01010,00100,01010,10001,10001",
  Y: "10001,10001,01010,00100,00100,00100,00100",
  Z: "11111,00001,00010,00100,01000,10000,11111",
  "0": "01110,10001,10011,10101,11001,10001,01110",
  "1": "00100,01100,00100,00100,00100,00100,01110",
  "2": "01110,10001,00001,00010,00100,01000,11111",
  "3": "11111,00010,00100,00010,00001,10001,01110",
  "4": "00010,00110,01010,10010,11111,00010,00010",
  "5": "11111,10000,11110,00001,00001,10001,01110",
  "6": "00110,01000,10000,11110,10001,10001,01110",
  "7": "11111,00001,00010,00100,01000,01000,01000",
  "8": "01110,10001,10001,01110,10001,10001,01110",
  "9": "01110,10001,10001,01111,00001,00010,01100",
  "%": "11000,11001,00010,00100,01000,10011,00011",
  "-": "00000,00000,00000,11111,00000,00000,00000",
  ":": "00000,01100,01100,00000,01100,01100,00000",
  ".": "00000,00000,00000,00000,00000,01100,01100",
  "!": "00100,00100,00100,00100,00100,00000,00100",
  "?": "01110,10001,00001,00010,00100,00000,00100",
  "'": "00100,00100,01000,00000,00000,00000,00000",
  "\"": "01010,01010,01000,00000,00000,00000,00000",
  ",": "00000,00000,00000,00000,00100,00100,01000",
  "(": "00010,00100,01000,01000,01000,00100,00010",
  ")": "01000,00100,00010,00010,00010,00100,01000",
  "/": "00001,00010,00100,00100,01000,10000,00000",
  "&": "01100,10010,01100,01010,10001,10010,01101",
  "+": "00000,00100,00100,11111,00100,00100,00000",
  "|": "00100,00100,00100,00100,00100,00100,00100",
  "*": "00000,10101,01110,11111,01110,10101,00000",
  "#": "01010,01010,11111,01010,11111,01010,01010",
  " ": "00000,00000,00000,00000,00000,00000,00000",
};

class Canvas {
  px = new Uint8Array(W * H * 3);
  rect(x: number, y: number, w: number, h: number, c: RGB) {
    for (let j = Math.max(0, y); j < Math.min(H, y + h); j++)
      for (let i = Math.max(0, x); i < Math.min(W, x + w); i++) {
        const o = (j * W + i) * 3;
        this.px[o] = c[0];
        this.px[o + 1] = c[1];
        this.px[o + 2] = c[2];
      }
  }
  text(s: string, x: number, y: number, scale: number, c: RGB, spacing = 1) {
    let cx = x;
    for (const ch of clean(s)) {
      const g = F[ch] ?? F[" "] ?? "";
      g.split(",").forEach((row, ry) => {
        for (let rx = 0; rx < 5; rx++)
          if (row[rx] === "1") this.rect(cx + rx * scale, y + ry * scale, scale, scale, c);
      });
      cx += (5 + spacing) * scale;
    }
  }
}

const clean = (s: string) =>
  s
    .toUpperCase()
    .replace(/\u2122/g, "")
    .replace(/[^A-Z0-9%\-:.!?' ",()/&+*#|]/g, " ");
const width = (s: string, scale: number, spacing = 1) => clean(s).length * (5 + spacing) * scale - spacing * scale;
const fit = (s: string, max: number, maxW: number) => {
  let sc = max;
  while (sc > 2 && width(s, sc) > maxW) sc--;
  return sc;
};

const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf: Uint8Array) {
  let c = 0xffffffff;
  for (const b of buf) c = (CRC[(c ^ b) & 0xff] ?? 0) ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type: string, data: Uint8Array) {
  const out = new Uint8Array(12 + data.length);
  const dv = new DataView(out.buffer);
  dv.setUint32(0, data.length);
  for (let i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
  out.set(data, 8);
  dv.setUint32(8 + data.length, crc32(out.subarray(4, 8 + data.length)));
  return out;
}
async function deflate(data: Uint8Array) {
  const stream = new Blob([data as BlobPart]).stream().pipeThrough(new CompressionStream("deflate"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

export async function renderResultPng(o: Outcome): Promise<Uint8Array> {
  const cv = new Canvas();
  // Fill background
  cv.rect(0, 0, W, H, BG);

  // Outer border & top accent line
  cv.rect(0, 0, W, 12, ACCENT);
  cv.rect(28, 28, W - 56, H - 56, [32, 32, 38]);
  cv.rect(30, 30, W - 60, H - 60, BG);

  const left = 75;
  const contentWidth = W - 2 * left;

  // Header: Pixel Flask Icon (🧪)
  const FLASK = [
    "00111100",
    "00011000",
    "00011000",
    "00111100",
    "01100110",
    "11000011",
    "11011011",
    "11111111",
  ];
  const flaskScale = 4;
  FLASK.forEach((row, ry) => {
    for (let rx = 0; rx < 8; rx++) {
      if (row[rx] === "1") {
        cv.rect(left + rx * flaskScale, 56 + ry * flaskScale, flaskScale, flaskScale, ACCENT);
      }
    }
  });

  // Header branding
  cv.text("CHUMTIYA DETECTOR", left + 45, 58, 5, FG);
  cv.text("PERSONALITY DIAGNOSIS", left + 620, 64, 3, MUTED);

  // Top separator
  cv.rect(left, 110, contentWidth, 2, LINE);

  // Section 1: Chumtiya Level
  cv.text("CHUMTIYA LEVEL", left, 140, 4, MUTED);
  cv.text(`${o.percentage}%`, left, 180, 18, ACCENT);

  // Visual Gauge / Progress Bar
  const meterY = 320;
  const meterH = 10;
  cv.rect(left, meterY, contentWidth, meterH, [36, 36, 44]);
  const fillW = Math.max(10, Math.min(contentWidth, Math.round((contentWidth * o.percentage) / 100)));
  cv.rect(left, meterY, fillW, meterH, ACCENT);

  // Section 2: Verdict
  cv.text("VERDICT", left, 355, 3, MUTED);
  cv.text(o.band, left, 380, fit(o.band, 8, contentWidth), FG);

  // Section 3: Primary Trait
  cv.rect(left, 455, contentWidth, 2, LINE);
  cv.text("PRIMARY TRAIT", left, 475, 3, MUTED);
  cv.text(o.traitName, left, 505, fit(o.traitName, 7, contentWidth), ACCENT);

  // Footer branding
  cv.text("THINK YOU'RE LESS OF A CHUMTIYA? PROVE IT.", left, 570, 3, MUTED);

  return encodePng(cv);
}

async function encodePng(cv: Canvas): Promise<Uint8Array> {
  const raw = new Uint8Array((W * 3 + 1) * H);
  for (let y = 0; y < H; y++) raw.set(cv.px.subarray(y * W * 3, (y + 1) * W * 3), y * (W * 3 + 1) + 1);
  const ihdr = new Uint8Array(13);
  const dv = new DataView(ihdr.buffer);
  dv.setUint32(0, W);
  dv.setUint32(4, H);
  ihdr.set([8, 2, 0, 0, 0], 8);
  const parts = [
    new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", await deflate(raw)),
    chunk("IEND", new Uint8Array()),
  ];
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let off = 0;
  for (const p of parts) (out.set(p, off), (off += p.length));
  return out;
}
