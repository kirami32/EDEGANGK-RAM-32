"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollEngine — GSAP ScrollTrigger (YENİLENMİŞ GALERİ ANİMASYONLARI)
 */
export default function ScrollEngine() {
  useEffect(() => {
    // ── Scroll Animasyonları ──

    // 1. Topbar — scroll'da glassmorphism
    ScrollTrigger.create({
      start: "top -80",
      onEnter: () => document.querySelector(".topbar")?.classList.add("scrolled"),
      onLeaveBack: () => document.querySelector(".topbar")?.classList.remove("scrolled"),
    });

    // 2. Story bölümü — fade in + slide up
    const storyEl = document.querySelector(".story");
    if (storyEl) {
      gsap.fromTo(
        storyEl.querySelector(".story-kicker"),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: storyEl, start: "top 80%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        storyEl.querySelector(".story-title"),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1, ease: "power4.out", delay: 0.1,
          scrollTrigger: { trigger: storyEl, start: "top 78%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        storyEl.querySelector(".story-text"),
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0,
          duration: 0.8, ease: "power2.out", delay: 0.2,
          scrollTrigger: { trigger: storyEl, start: "top 75%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        storyEl.querySelector(".btn"),
        { opacity: 0, y: 15 },
        {
          opacity: 1, y: 0,
          duration: 0.6, ease: "back.out(1.7)", delay: 0.3,
          scrollTrigger: { trigger: storyEl, start: "top 70%", toggleActions: "play none none none" },
        }
      );
    }

    // 3. GALERİ — Cinema Strips parallax + reveal
    const cinemaStrips = document.querySelector(".cinema-strips");
    if (cinemaStrips) {
      // Cinema strips fade in
      gsap.fromTo(
        cinemaStrips,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: cinemaStrips,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Her şeride hafif parallax efekti
      const row1 = cinemaStrips.querySelector(".cinema-row--left");
      const row2 = cinemaStrips.querySelector(".cinema-row--right");
      if (row1) {
        gsap.to(row1, {
          x: -30,
          ease: "none",
          scrollTrigger: {
            trigger: cinemaStrips,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
      if (row2) {
        gsap.to(row2, {
          x: 30,
          ease: "none",
          scrollTrigger: {
            trigger: cinemaStrips,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }

    // 4. GALERİ — Grid heading reveal
    const gridHeading = document.querySelector(".gallery-grid-heading");
    if (gridHeading) {
      gsap.fromTo(
        gridHeading,
        { opacity: 0, scaleX: 0.3 },
        {
          opacity: 1, scaleX: 1,
          duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: gridHeading,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // 5. GALERİ — Masonry kartları staggered reveal
    const masonryCards = gsap.utils.toArray<HTMLElement>(".masonry-card");
    masonryCards.forEach((card, i) => {
      // Farklı yönlerden gelsinler — daha dinamik
      const directions = [
        { x: -50, y: 30, rotation: -3 },
        { x: 0, y: 60, rotation: 0 },
        { x: 50, y: 30, rotation: 3 },
        { x: 0, y: 40, rotation: -2 },
      ];
      const dir = directions[i % directions.length];

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: dir.y,
          x: dir.x,
          scale: 0.88,
          rotation: dir.rotation,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: (i % 4) * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 6. Marquee strip
    const strip = document.querySelector(".strip");
    if (strip) {
      gsap.fromTo(
        strip,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: strip, start: "top 90%", toggleActions: "play none none none" },
        }
      );
    }

    // 7. Footer — slide up
    const footer = document.querySelector(".footer");
    if (footer) {
      gsap.fromTo(
        footer,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: footer, start: "top 92%", toggleActions: "play none none none" },
        }
      );
    }

    // 8. Events kartları — sağdan/soldan giriş
    const eventCards = gsap.utils.toArray<HTMLElement>(".event-card");
    eventCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 9. Section başlıkları
    const sectionHeaders = gsap.utils.toArray<HTMLElement>(".events-kicker, .events-title, .gallery-kicker, .gallery-title, .gallery-subtitle");
    sectionHeaders.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    });

    // 10. Contact kartları — stagger
    const contactCards = gsap.utils.toArray<HTMLElement>(".contact-card");
    contactCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}

