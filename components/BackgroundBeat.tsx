"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * DJ Plak (Turntable) Widget
 * - Sağ alt köşede fixed bir mini DJ plak
 * - Dönen vinil, tonearm, play/pause, volume knob
 * - YouTube IFrame API ile arka planda beat çalar
 * - Kullanıcı etkileşimi sonrası otomatik başlar
 */

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const VIDEO_ID = "v9MILl7AMLo";
const DEFAULT_VOLUME = 5;

export default function BackgroundBeat() {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const initedRef = useRef(false);
  const draggingRef = useRef(false);

  // YouTube IFrame API'yi yükle
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    const checkAndInit = () => {
      if (window.YT && window.YT.Player && !initedRef.current) {
        initedRef.current = true;
        initPlayer();
      }
    };

    window.onYouTubeIframeAPIReady = checkAndInit;

    const fallback = setInterval(() => {
      if (window.YT && window.YT.Player && !initedRef.current) {
        initedRef.current = true;
        initPlayer();
        clearInterval(fallback);
      }
    }, 300);

    return () => {
      clearInterval(fallback);
      window.onYouTubeIframeAPIReady = () => {};
    };
  }, []);

  // Kullanıcı ilk etkileşimde otomatik başlat
  useEffect(() => {
    const tryPlay = () => {
      if (playerRef.current) {
        try {
          playerRef.current.unMute();
          playerRef.current.setVolume(volume);
          playerRef.current.playVideo();
          setIsPlaying(true);
        } catch {}
      }
    };

    const events = ["click", "touchstart", "scroll", "keydown", "mousemove"];
    events.forEach((ev) => {
      document.addEventListener(ev, tryPlay, { once: true, passive: true });
    });

    return () => {
      events.forEach((ev) => {
        document.removeEventListener(ev, tryPlay);
      });
    };
  }, []);

  function initPlayer() {
    if (!containerRef.current || playerRef.current) return;

    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: VIDEO_ID,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        origin: typeof window !== "undefined" ? window.location.origin : "",
      },
      events: {
        onReady: (e: any) => {
          e.target.setVolume(DEFAULT_VOLUME);
          e.target.playVideo();
          setReady(true);
          setIsPlaying(true);
        },
        onStateChange: (e: any) => {
          if (e.data === 0) {
            e.target.playVideo();
          }
        },
      },
    });
  }

  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.unMute();
      playerRef.current.setVolume(volume);
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  }, [isPlaying, volume]);

  // Spotify modal açıldığında beat'i durdur, kapandığında devam ettir
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    const handlePause = () => {
      if (isPlaying && playerRef.current) {
        wasPlayingRef.current = true;
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      }
    };
    const handleResume = () => {
      if (wasPlayingRef.current && playerRef.current) {
        wasPlayingRef.current = false;
        playerRef.current.unMute();
        playerRef.current.setVolume(volume);
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    };

    window.addEventListener("edegang:pauseBeat", handlePause);
    window.addEventListener("edegang:resumeBeat", handleResume);
    return () => {
      window.removeEventListener("edegang:pauseBeat", handlePause);
      window.removeEventListener("edegang:resumeBeat", handleResume);
    };
  }, [isPlaying, volume]);

  const handleVolumeChange = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(newVol)));
    setVolume(clamped);
    if (playerRef.current) {
      playerRef.current.setVolume(clamped);
      if (clamped === 0) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }
    }
  }, []);

  // Knob drag handler
  const handleKnobInteraction = useCallback(
    (clientY: number) => {
      if (!knobRef.current) return;
      const rect = knobRef.current.getBoundingClientRect();
      const totalHeight = rect.height;
      const relativeY = rect.bottom - clientY;
      const pct = (relativeY / totalHeight) * 100;
      handleVolumeChange(pct);
    },
    [handleVolumeChange]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      handleKnobInteraction(clientY);
    };
    const onUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [handleKnobInteraction]);

  // Volume knob'a tıkla veya kaydır
  const startDrag = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      draggingRef.current = true;
      const clientY =
        "touches" in e ? e.touches[0].clientY : e.clientY;
      handleKnobInteraction(clientY);
    },
    [handleKnobInteraction]
  );

  // Volume knob rotation angle (0 → -135deg, 100 → 135deg)
  const knobAngle = (volume / 100) * 270 - 135;

  return (
    <>
      {/* Gizli YouTube player */}
      <div
        style={{
          position: "fixed",
          top: -9999,
          left: -9999,
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
          zIndex: -100,
        }}
      >
        <div ref={containerRef} />
      </div>

      {/* DJ Plak Widget */}
      <div
        className={`dj-widget ${ready ? "is-visible" : ""} ${expanded ? "is-expanded" : ""}`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => { if (!draggingRef.current) setExpanded(false); }}
      >
        {/* Ana plak — tıkla = play/pause */}
        <button
          className="dj-platter"
          onClick={togglePlay}
          aria-label={isPlaying ? "Beat'i durdur" : "Beat'i çal"}
          title={isPlaying ? "Durdur" : "Çal"}
        >
          <div className={`dj-vinyl ${isPlaying ? "is-spinning" : ""}`}>
            <div className="dj-groove dj-g1" />
            <div className="dj-groove dj-g2" />
            <div className="dj-groove dj-g3" />
            <div className="dj-vinyl-label">
              <span className="dj-vinyl-text">EG</span>
            </div>
          </div>
          {/* Play/Pause overlay icon */}
          <div className={`dj-play-indicator ${isPlaying ? "is-playing" : ""}`}>
            {isPlaying ? (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            )}
          </div>
          {/* Tonearm */}
          <div className={`dj-tonearm ${isPlaying ? "is-on" : ""}`}>
            <div className="dj-arm-bar" />
            <div className="dj-arm-head" />
          </div>
        </button>

        {/* Volume panel — expand'de görünür */}
        <div className="dj-controls">
          <div
            className="dj-volume-track"
            ref={knobRef}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
          >
            <div className="dj-volume-fill" style={{ height: `${volume}%` }} />
            <div className="dj-volume-thumb" style={{ bottom: `${volume}%` }} />
          </div>
          <div className="dj-vol-label">{volume}</div>

          {/* Knob */}
          <div className="dj-knob-wrap">
            <div
              className="dj-knob"
              style={{ transform: `rotate(${knobAngle}deg)` }}
            >
              <div className="dj-knob-dot" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
