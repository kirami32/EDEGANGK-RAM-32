"use client";

import { useEffect, useState } from "react";
import { CREW, type Rapper } from "@/data/crew";
import { Icon } from "./Icons";
import gsap from "gsap";

export default function SplitHero() {
  const [active, setActive] = useState<string | null>(null); // hover edilen panel
  const [open, setOpen] = useState<Rapper | null>(null); // açık modal

  return (
    <section className="hero" id="ekip">
      <div className={`split ${active ? "split--focus" : ""}`}>
        {CREW.map((r) => (
          <article
            key={r.slug}
            className={`panel panel--${r.slug} ${active === r.slug ? "is-active" : ""} ${
              active && active !== r.slug ? "is-dim" : ""
            }`}
            onMouseEnter={() => setActive(r.slug)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setOpen(r)}
          >
            <div className="panel-img" style={{ backgroundImage: `url(${r.image})` }} />
            <div className="panel-grade" />
            <div className="panel-tint" />
            <div className="panel-content">
              <p className="panel-kicker">EDE GANG</p>
              <h2 className="panel-name">{r.name}</h2>
              <p className="panel-tagline">{r.tagline}</p>

              <div className="panel-reveal">
                <div className="panel-bio">
                  {r.bio.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="panel-socials">
                  {r.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={s.label}
                      className="soc"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon name={s.icon} />
                    </a>
                  ))}
                </div>
                <span className="panel-cta">
                  PROFİLİ AÇ <b>→</b>
                </span>
              </div>
            </div>
          </article>
        ))}

        <div className="split-emblem">
          <span>EDE</span>
          <i className="dot" />
          <span>GANG</span>
        </div>
      </div>

      {open && <RapperModal rapper={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

function RapperModal({ rapper, onClose }: { rapper: Rapper; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    // Arka plan beat'ini durdur (Spotify ile çakışmasın)
    window.dispatchEvent(new CustomEvent("edegang:pauseBeat"));

    // GSAP Modal Animation
    gsap.fromTo(
      ".modal-card",
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
    );

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      // Modal kapandığında arka plan beat'ini devam ettir
      window.dispatchEvent(new CustomEvent("edegang:resumeBeat"));
    };
  }, [onClose]);

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Kapat">
          ✕
        </button>

        <div className="modal-head">
          <div className="modal-photo" style={{ backgroundImage: `url(${rapper.image})` }} />
          <div>
            <p className="modal-kicker">EDE GANG — KAHRAMANMARAŞ</p>
            <h3 className="modal-name">{rapper.name}</h3>
            <div className="modal-socials">
              {rapper.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener" className="soc soc--pill">
                  <Icon name={s.icon} />
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-bio">
          {rapper.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="modal-media">
          {/* Spotify gömme */}
          <div className="media-block">
            <p className="media-label">
              <Icon name="spotify" /> DİNLE
            </p>
            <iframe
              className="spotify"
              src={rapper.spotifyEmbed}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={`${rapper.name} Spotify`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
