import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("arsiv");
const OUT = path.resolve("public", "img");

const files = {
  duo: "WhatsApp Image 2026-06-22 at 14.07.24 (1).jpeg", // iki figür / beyaz zemin
  neon: "WhatsApp Image 2026-06-22 at 14.07.24 (2).jpeg", // neon "degang" script
  tattoo: "WhatsApp Image 2026-06-22 at 14.07.24 (3).jpeg", // dövme
  nokia: "WhatsApp Image 2026-06-22 at 14.07.24.jpeg", // retro telefon ekranı
  cherubs: "WhatsApp Image 2026-06-22 at 14.07.25 (1).jpeg", // tuğla duvar / bank / melekler
  elevator: "WhatsApp Image 2026-06-22 at 14.07.25 (2).jpeg", // asansör EDE GANG KAHRAMANMARAS
  mercedes: "WhatsApp Image 2026-06-22 at 14.07.25.jpeg", // mercedes kaput
};

const src = (k) => path.join(SRC, files[k]);

await mkdir(OUT, { recursive: true });

// 1) İkili görseli iki figüre böl: sol = Oski, sağ = Zuhruf (her figür kendi karesinde ortalı)
const duoMeta = await sharp(src("duo")).metadata();
const W = duoMeta.width;
const H = duoMeta.height;
const win = Math.round(W * 0.5); // pencere genişliği
const clamp = (v, max) => Math.max(0, Math.min(v, max));

// Oski (soldaki kapüşonlu figür ~ x merkez %36)
const oskiLeft = clamp(Math.round(W * 0.36 - win / 2), W - win);
await sharp(src("duo"))
  .extract({ left: oskiLeft, top: 0, width: win, height: H })
  .jpeg({ quality: 90 })
  .toFile(path.join(OUT, "oski.jpg"));

// Zuhruf (sağdaki maskeli figür ~ x merkez %60, "edegang" yazısı da kadrajda)
const zuhrufLeft = clamp(Math.round(W * 0.62 - win / 2), W - win);
await sharp(src("duo"))
  .extract({ left: zuhrufLeft, top: 0, width: win, height: H })
  .jpeg({ quality: 90 })
  .toFile(path.join(OUT, "zuhruf.jpg"));

// Tam ikili (hero/og için)
await sharp(src("duo")).resize(1200).jpeg({ quality: 88 }).toFile(path.join(OUT, "duo.jpg"));

// 2) Diğer görselleri optimize edip kopyala
const passthrough = ["neon", "tattoo", "nokia", "cherubs", "elevator", "mercedes"];
for (const k of passthrough) {
  await sharp(src(k))
    .resize(1400, null, { withoutEnlargement: true })
    .jpeg({ quality: 86 })
    .toFile(path.join(OUT, `${k}.jpg`));
}

console.log("Görseller işlendi ->", OUT);
