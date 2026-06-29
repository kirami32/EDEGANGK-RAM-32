"use client";

import { useState, useEffect } from "react";

type Event = {
  id: string;
  date: string;       // ISO date string
  title: string;
  venue: string;
  city: string;
  description: string;
  ticketUrl?: string;
  isPast?: boolean;
};

const EVENTS: Event[] = [
  {
    id: "1",
    date: "2026-07-19T21:00:00",
    title: "EDE GANG — İLK SAHNE",
    venue: "Underground Club 46",
    city: "KAHRAMANMARAŞ",
    description: "EDE GANG'in ilk resmi sahne performansı. Oski & Zuhruf, yeni parçalarıyla sahnede.",
    ticketUrl: "#",
  },
  {
    id: "2",
    date: "2026-08-09T22:00:00",
    title: "RAP SAVAŞLARI VOL.3",
    venue: "Sokak Sahnesi",
    city: "GAZİANTEP",
    description: "Güneydoğu'nun en büyük freestyle battle etkinliği. EDE GANG davetli sanatçı.",
    ticketUrl: "#",
  },
  {
    id: "3",
    date: "2026-09-14T20:00:00",
    title: "YERALTI FESTİVALİ",
    venue: "Depo Sahne",
    city: "ANKARA",
    description: "Türkiye underground rap sahnesinin buluşma noktası. 12 saat kesintisiz müzik.",
    ticketUrl: "#",
  },
  {
    id: "4",
    date: "2026-05-10T21:00:00",
    title: "MİKROFON TESTİ",
    venue: "Bodrum Kat",
    city: "KAHRAMANMARAŞ",
    description: "Akustik ve intimate bir gece. Sadece 50 kişilik kapasite.",
    isPast: true,
  },
];

function getCountdown(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff <= 0) return null;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Events() {
  const upcoming = EVENTS.filter((e) => !e.isPast && new Date(e.date).getTime() > Date.now())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = EVENTS.filter((e) => e.isPast || new Date(e.date).getTime() <= Date.now());
  const nextEvent = upcoming[0];

  return (
    <section className="events" id="etkinlikler">
      <p className="events-kicker">[ ETKİNLİKLER ]</p>
      <h2 className="events-title">
        SAHNEYE <span>ÇIKIYORUZ</span>.
      </h2>

      {/* Countdown */}
      {nextEvent && <Countdown dateStr={nextEvent.date} title={nextEvent.title} />}

      {/* Yaklaşan */}
      <div className="events-timeline">
        {upcoming.map((ev) => (
          <article key={ev.id} className="event-card">
            <div className="event-date-block">
              <span className="event-day">
                {new Date(ev.date).getDate()}
              </span>
              <span className="event-month">
                {new Date(ev.date).toLocaleDateString("tr-TR", { month: "short" }).toUpperCase()}
              </span>
            </div>
            <div className="event-body">
              <div className="event-meta">
                <span className="event-badge">YAKLAŞAN</span>
                <span className="event-time">{formatTime(ev.date)}</span>
              </div>
              <h3 className="event-name">{ev.title}</h3>
              <p className="event-venue">
                📍 {ev.venue} — {ev.city}
              </p>
              <p className="event-desc">{ev.description}</p>
              {ev.ticketUrl && (
                <a href={ev.ticketUrl} className="event-ticket" target="_blank" rel="noreferrer">
                  BİLET AL <b>→</b>
                </a>
              )}
            </div>
            <div className="event-line" />
          </article>
        ))}
      </div>

      {/* Geçmiş */}
      {past.length > 0 && (
        <>
          <p className="events-past-label">GEÇMİŞ ETKİNLİKLER</p>
          <div className="events-timeline events-timeline--past">
            {past.map((ev) => (
              <article key={ev.id} className="event-card event-card--past">
                <div className="event-date-block">
                  <span className="event-day">
                    {new Date(ev.date).getDate()}
                  </span>
                  <span className="event-month">
                    {new Date(ev.date).toLocaleDateString("tr-TR", { month: "short" }).toUpperCase()}
                  </span>
                </div>
                <div className="event-body">
                  <div className="event-meta">
                    <span className="event-badge event-badge--past">GEÇMİŞ</span>
                  </div>
                  <h3 className="event-name">{ev.title}</h3>
                  <p className="event-venue">
                    📍 {ev.venue} — {ev.city}
                  </p>
                  <p className="event-desc">{ev.description}</p>
                </div>
                <div className="event-line" />
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function Countdown({ dateStr, title }: { dateStr: string; title: string }) {
  const [cd, setCd] = useState(getCountdown(dateStr));

  useEffect(() => {
    const id = setInterval(() => setCd(getCountdown(dateStr)), 1000);
    return () => clearInterval(id);
  }, [dateStr]);

  if (!cd) return null;

  return (
    <div className="countdown">
      <p className="countdown-label">SONRAKİ SAHNE — {title}</p>
      <div className="countdown-grid">
        {[
          { val: cd.d, label: "GÜN" },
          { val: cd.h, label: "SAAT" },
          { val: cd.m, label: "DAK" },
          { val: cd.s, label: "SAN" },
        ].map((u) => (
          <div key={u.label} className="countdown-unit">
            <span className="countdown-val">{String(u.val).padStart(2, "0")}</span>
            <span className="countdown-lbl">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
