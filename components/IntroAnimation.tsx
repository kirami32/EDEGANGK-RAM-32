"use client";

import { useState, useEffect } from "react";

/**
 * Intro animasyonu: mikrofon 0'dan 100'e doğru ilerliyor,
 * 100'e ulaşınca site açılıyor.
 */
export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 1800; // 1.8 saniye
    const steps = 100;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= 100) {
        clearInterval(timer);
        // Kısa bir bekleme sonra fade out
        setTimeout(() => setFadeOut(true), 200);
        setTimeout(() => onComplete(), 700);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`intro ${fadeOut ? "intro--out" : ""}`}>
      {/* Arka plan grain */}
      <div className="intro-grain" />

      {/* Orta içerik */}
      <div className="intro-center">
        <div className="intro-brand">
          EDE<span>GANG</span>
        </div>

        {/* Progress track */}
        <div className="intro-track">
          {/* Mikrofon ikonu */}
          <div className="intro-mic" style={{ left: `${progress}%` }}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="1" width="6" height="12" rx="3" />
              <path d="M5 10a7 7 0 0 0 14 0" />
              <line x1="12" y1="17" x2="12" y2="21" />
              <line x1="8" y1="21" x2="16" y2="21" />
            </svg>
          </div>
          {/* Çizgi */}
          <div className="intro-line">
            <div className="intro-fill" style={{ width: `${progress}%` }} />
          </div>
          {/* İşaretler */}
          <div className="intro-markers">
            <span>0</span>
            <span>100</span>
          </div>
        </div>

        {/* Yüzde */}
        <div className="intro-percent">{progress}%</div>
        <div className="intro-sub">KAHRAMANMARAŞ</div>
      </div>
    </div>
  );
}
