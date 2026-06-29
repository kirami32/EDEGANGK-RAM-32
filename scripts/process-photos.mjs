import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const DESK = "C:/Users/burak/Desktop";
const OUT = path.resolve("public", "img");
await mkdir(OUT, { recursive: true });

const src = (n) => path.join(DESK, n);

// Her crop'u dene; hatada uyar
async function crop(file, region, outName, opts = {}) {
  try {
    let img = sharp(src(file)).extract(region);
    if (opts.resize) img = img.resize(opts.resize, null, { withoutEnlargement: true });
    await img.jpeg({ quality: 90 }).toFile(path.join(OUT, outName));
    console.log("✓", outName);
  } catch (e) {
    console.log("✗", outName, e.message);
  }
}

// === HERO ===
// Oski hero — su kenarı (787x531, yatay): figür + baş üstü boşluk
await crop("oski-1.png", { left: 235, top: 0, width: 400, height: 531 }, "oski.jpg");
// Zuhruf hero — sahne (921x2048): baş üstü boşlukla, orta oranlı dikey kırp
await crop("zuhruf-2.jpeg", { left: 160, top: 850, width: 620, height: 1080 }, "zuhruf.jpg");

// === GALERİ / OG ===
// Stüdyo ikili (637x805): soldaki "<" okunu kırp
await crop("oskivezuhruf.png", { left: 46, top: 0, width: 591, height: 805 }, "duo.jpg", { resize: 1200 });
// Zuhruf mavi (921x2048): üst header ~330, foto ~1150 yük, sağ oku kırp
await crop("zuhruf-1.jpeg", { left: 0, top: 360, width: 884, height: 1120 }, "zuhruf-blue.jpg", { resize: 1000 });
// Oski kedili (636x801): sol "<" oku ve alt noktaları kırp
await crop("oski-2.png", { left: 40, top: 0, width: 596, height: 760 }, "oski-cat.jpg", { resize: 900 });
// Oski su kenarı tam (yatay, galeri için): ok/noktaları kırp
await crop("oski-1.png", { left: 0, top: 0, width: 745, height: 505 }, "oski-water.jpg", { resize: 1000 });

console.log("Fotoğraflar işlendi ->", OUT);
