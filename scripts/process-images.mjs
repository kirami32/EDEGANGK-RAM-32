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

// 1) Oski & Zuhruf hero portreleri — yüksek çözünürlüklü kaynaklardan,
//    Instagram ekran görüntüsü UI'ı (status bar/başlık/altyazı/carousel ikonları) kırpılarak.
await sharp(path.join(SRC, "oski-1.png"))
  .extract({ left: 0, top: 0, width: 787 - 40, height: 531 - 16 }) // sağdaki ok ikonu + alt nokta göstergesi kırpıldı
  .jpeg({ quality: 92 })
  .toFile(path.join(OUT, "oski.jpg"));

await sharp(path.join(SRC, "zuhruf-2.jpeg"))
  .extract({ left: 0, top: 232, width: 921, height: 2048 - 232 - 253 }) // üst status bar/başlık + alt altyazı kırpıldı
  .jpeg({ quality: 92 })
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
