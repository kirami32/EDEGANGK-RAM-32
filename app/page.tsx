"use client";

import { useState, useCallback, useEffect } from "react";
import Background from "@/components/Background";
import SplitHero from "@/components/SplitHero";
import BackgroundBeat from "@/components/BackgroundBeat";
import ScrollEngine from "@/components/ScrollEngine";
import Events from "@/components/Events";
import IntroAnimation from "@/components/IntroAnimation";
import { Icon } from "@/components/Icons";
import { CREW_SOCIALS } from "@/data/crew";

/* ── Kayan şerit için resimler (2 şerit, zıt yönler) ── */
const MARQUEE_ROW_1 = [
  { src: "/img/duo.jpg", cap: "STÜDYO", pos: "center 20%" },
  { src: "/img/oski-water.jpg", cap: "OSKİ", pos: "center 15%" },
  { src: "/img/cherubs.jpg", cap: "CONCEPTUAL [78]", pos: "center 25%" },
  { src: "/img/neon.jpg", cap: "NEON", pos: "center" },
  { src: "/img/mercedes.jpg", cap: "EDEGANG / W123", pos: "center 40%" },
  { src: "/img/nokia.jpg", cap: "OLD SCHOOL", pos: "center" },
];

const MARQUEE_ROW_2 = [
  { src: "/img/zuhruf-blue.jpg", cap: "ZUHRUF", pos: "center 10%" },
  { src: "/img/elevator.jpg", cap: "KAHRAMANMARAŞ", pos: "center 20%" },
  { src: "/img/oski-cat.jpg", cap: "BACKSTAGE", pos: "center 15%" },
  { src: "/img/tattoo.jpg", cap: "FOR LIFE", pos: "center 30%" },
  { src: "/img/oski.jpg", cap: "OSKİ PORTRAIT", pos: "center 10%" },
  { src: "/img/zuhruf.jpg", cap: "ZUHRUF PORTRAIT", pos: "center 10%" },
];

/* ── Masonry grid galeri ── */
const GALLERY_GRID = [
  { src: "/img/duo.jpg", cap: "STÜDYO", size: "wide", pos: "center 20%" },
  { src: "/img/oski-water.jpg", cap: "OSKİ", size: "tall", pos: "center 15%" },
  { src: "/img/zuhruf-blue.jpg", cap: "ZUHRUF", size: "normal", pos: "center 10%" },
  { src: "/img/cherubs.jpg", cap: "CONCEPTUAL LAYOUT [78]", size: "normal", pos: "center 25%" },
  { src: "/img/oski-cat.jpg", cap: "BACKSTAGE", size: "tall", pos: "center 15%" },
  { src: "/img/elevator.jpg", cap: "KAHRAMANMARAŞ", size: "wide", pos: "center 20%" },
  { src: "/img/mercedes.jpg", cap: "EDEGANG / W123", size: "normal", pos: "center 40%" },
  { src: "/img/neon.jpg", cap: "NEON", size: "normal", pos: "center" },
  { src: "/img/tattoo.jpg", cap: "FOR LIFE", size: "tall", pos: "center 30%" },
  { src: "/img/nokia.jpg", cap: "OLD SCHOOL", size: "normal", pos: "center" },
  { src: "/img/oski.jpg", cap: "OSKİ PORTRAIT", size: "normal", pos: "center 10%" },
  { src: "/img/zuhruf.jpg", cap: "ZUHRUF PORTRAIT", size: "wide", pos: "center 10%" },
];

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; cap: string } | null>(null);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  // Mobil menü kilidi (sadece class ile veya touch-action ile halledeceğiz)
  useEffect(() => {
    // Body overflow iptal edildi çünkü iOS'ta takılmalara neden oluyor.
    // CSS tarafında mobile-nav ve overlay ile çözüldü.
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* Intro animasyonu */}
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

      <div style={{ opacity: introComplete ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <Background />
        <BackgroundBeat />
        <ScrollEngine />

        <header className="topbar">
          <a href="#" className="brand">
            EDE<span>GANG</span>
          </a>
          <nav className="nav">
            <a href="#ekip">EKİP</a>
            <a href="#ses">SES</a>
            <a href="#galeri">GALERİ</a>
            <a href="#etkinlikler">ETKİNLİKLER</a>
            <a href="#iletisim">İLETİŞİM</a>
          </nav>
          <span className="loc">KAHRAMANMARAŞ</span>

          {/* Hamburger butonu — sadece mobilde görünür */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
          >
            <span className={`hamburger-line ${menuOpen ? "is-open" : ""}`} />
            <span className={`hamburger-line ${menuOpen ? "is-open" : ""}`} />
            <span className={`hamburger-line ${menuOpen ? "is-open" : ""}`} />
          </button>
        </header>

        {/* Mobil menü overlay + drawer */}
        <div className={`mobile-overlay ${menuOpen ? "is-open" : ""}`} onClick={closeMenu} />
        <nav className={`mobile-nav ${menuOpen ? "is-open" : ""}`}>
          <a href="#ekip" onClick={closeMenu}>EKİP</a>
          <a href="#ses" onClick={closeMenu}>SES</a>
          <a href="#galeri" onClick={closeMenu}>GALERİ</a>
          <a href="#etkinlikler" onClick={closeMenu}>ETKİNLİKLER</a>
          <a href="#iletisim" onClick={closeMenu}>İLETİŞİM</a>
          <div className="mobile-nav-footer">
            <span className="mobile-nav-loc">KAHRAMANMARAŞ</span>
            <div className="mobile-nav-socials">
              {CREW_SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener" className="soc" aria-label={s.label}>
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </nav>

        <main>
          <SplitHero />

          {/* Manifesto şeridi */}
          <section className="strip" id="ses">
            <div className="marquee">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i}>
                  İKİ İSİM · TEK SES · EDE GANG · OSKİ &amp; ZUHRUF ·&nbsp;
                </span>
              ))}
            </div>
          </section>

          {/* Ses / hikaye */}
          <section className="story">
            <p className="story-kicker">[ MANİFESTO ]</p>
            <h2 className="story-title">
              MARAŞ&apos;TAN ÇIKAN <span>HAM</span> SES.
            </h2>
            <p className="story-text">
              EDE GANG; Oski ve Zuhruf&apos;un bir araya gelip kurmaya çalıştığı bir rap topluluğu.
              Maske, kapüşon, kafiye ve sokak. Süsü yok, filtresi yok. Yüzlerimizi değil sözlerimizi
              tanıyın — gerisi sahada belli olur.
            </p>
            <a className="btn" href="#galeri">
              DÜNYAYA GİR <b>→</b>
            </a>
          </section>

          {/* ═══════ GALERİ — YENİ TASARIM ═══════ */}
          <section className="gallery" id="galeri">
            <p className="events-kicker gallery-kicker">[ GALERİ ]</p>
            <h2 className="events-title gallery-title" style={{ marginBottom: "clamp(20px, 4vw, 40px)" }}>
              KARE<span>LER</span>.
            </h2>
            <p className="gallery-subtitle">
              Sahne arkası, stüdyo ve sokak — filtresiz kareler.
            </p>

            {/* ── 1) Yatay Kayan Sinema Şeritleri ── */}
            <div className="cinema-strips">
              {/* Şerit 1 — Sola kayar */}
              <div className="cinema-row cinema-row--left">
                <div className="cinema-track">
                  {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((img, i) => (
                    <div key={`r1-${i}`} className="cinema-slide" onClick={() => setLightboxImage(img)}>
                      <div className="cinema-img" style={{ backgroundImage: `url(${img.src})`, backgroundPosition: img.pos, cursor: "pointer" }}>
                        <div className="cinema-overlay" />
                        <span className="cinema-cap">{img.cap}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Şerit 2 — Sağa kayar */}
              <div className="cinema-row cinema-row--right">
                <div className="cinema-track">
                  {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((img, i) => (
                    <div key={`r2-${i}`} className="cinema-slide" onClick={() => setLightboxImage(img)}>
                      <div className="cinema-img" style={{ backgroundImage: `url(${img.src})`, backgroundPosition: img.pos, cursor: "pointer" }}>
                        <div className="cinema-overlay" />
                        <span className="cinema-cap">{img.cap}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Etkinlikler */}
          <Events />

          {/* İletişim */}
          <section className="contact" id="iletisim">
            <p className="events-kicker">[ İLETİŞİM ]</p>
            <h2 className="events-title">
              BİZE <span>ULAŞIN</span>.
            </h2>
            <p className="contact-subtitle">
              İş birliği, sahne teklifleri ve her türlü soru için bize ulaşın.
            </p>
            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <polyline points="22,7 12,13 2,7" />
                  </svg>
                </div>
                <h3 className="contact-label">E-POSTA</h3>
                <p className="contact-value"><a href="mailto:edegang46@gmail.com">edegang46@gmail.com</a></p>
              </div>
              <div className="contact-card">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h3 className="contact-label">TELEFON</h3>
                <p className="contact-value"><a href="tel:+905445798390">+90 544 579 83 90</a></p>
              </div>
              <div className="contact-card">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="contact-label">KONUM</h3>
                <p className="contact-value">KAHRAMANMARAŞ, TÜRKİYE</p>
              </div>
              <div className="contact-card">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <h3 className="contact-label">INSTAGRAM DM</h3>
                <p className="contact-value"><a href="https://www.instagram.com/ede.gang/" target="_blank" rel="noreferrer">@ede.gang</a></p>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="footer-top">
            <div className="footer-brand">
              EDE<span>GANG</span>
            </div>
            <div className="footer-socials">
              {CREW_SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener" className="soc" aria-label={s.label}>
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} EDE GANG · KAHRAMANMARAŞ</span>
            <span className="footer-code">PXMM5Q7734518000X0Y4</span>
          </div>
        </footer>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="lightbox" onClick={() => setLightboxImage(null)}>
          <button className="lightbox-close" onClick={() => setLightboxImage(null)}>×</button>
          <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImage.src} alt={lightboxImage.cap} className="lightbox-img" />
            <div className="lightbox-cap">{lightboxImage.cap}</div>
          </div>
        </div>
      )}
    </>
  );
}
