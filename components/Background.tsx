"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ambient arka plan: DJ pikap (CSS animasyon) + opsiyonel loop video.
 * GÜNCELLEME: Scratch efekti daha ön planda, daha görünür.
 */
export default function Background() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onOk = () => setHasVideo(true);
    v.addEventListener("loadeddata", onOk);
    return () => v.removeEventListener("loadeddata", onOk);
  }, []);

  return (
    <div className="bg" aria-hidden="true">
      {/* Opsiyonel loop video */}
      <video
        ref={videoRef}
        className={`bg-video ${hasVideo ? "is-on" : ""}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/video/dj-loop.mp4" type="video/mp4" />
        <source src="/video/dj-loop.webm" type="video/webm" />
      </video>

      {/* CSS DJ pikap — daha belirgin */}
      <div className="decks">
        <Deck />
        <Deck flip />
      </div>

      {/* Scratch çizgileri efekti */}
      <div className="scratch-lines" />

      {/* Doku katmanları */}
      <div className="bg-grain" />
      <div className="bg-scan" />
      <div className="bg-vignette" />

      {/* Kırmızı ambient glow */}
      <div className="bg-red-glow" />
    </div>
  );
}

function Deck({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`deck ${flip ? "deck--flip" : ""}`}>
      <div className="platter">
        <div className="vinyl">
          <span className="groove g1" />
          <span className="groove g2" />
          <span className="groove g3" />
          <span className="groove g4" />
          <span className="label" />
        </div>
      </div>
      <div className="tonearm">
        <span className="arm" />
        <span className="head" />
      </div>
    </div>
  );
}
