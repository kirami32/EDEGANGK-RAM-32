export type Social = {
  label: string;
  href: string;
  icon: "instagram" | "youtube" | "spotify" | "soundcloud" | "tiktok";
};

export type Rapper = {
  slug: string;
  name: string;
  alias: string;
  tagline: string;
  image: string;
  bio: string[];
  // Klip için YouTube video ID'si (youtube.com/watch?v=XXXX -> XXXX)
  youtubeId: string;
  youtubeTitle: string;
  // Spotify embed adresi (Share -> Embed -> src) — sanatçı/parça/albüm olabilir
  spotifyEmbed: string;
  socials: Social[];
};

// NOT: Linkler demo amaçlı placeholder. Gerçek hesap/parça linkleriyle değiştir.
export const CREW: Rapper[] = [
  {
    slug: "oski",
    name: "OSKI",
    alias: "Oski",
    tagline: "Maraş sokaklarından çıkan ham ses.",
    image: "/img/oski.jpg",
    bio: [
      "Kahramanmaraş sokaklarında büyüyen Oski, EDE GANG'in kurucu yarısı. Ham, dolambaçsız sözler ve karanlık trap dokularıyla kendi sesini kuruyor.",
      "Gecenin içinden yazıyor; her barı sahaya inmiş gibi. Maraş'ın enerjisini ülke geneline taşıma derdinde.",
    ],
    youtubeId: "dQw4w9WgXcQ",
    youtubeTitle: "OSKI — Son Klip",
    spotifyEmbed: "https://open.spotify.com/embed/artist/5xtHt6EI9ijZ30ZCCEAAFF?utm_source=generator&theme=0",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/oskingram/", icon: "instagram" },
      { label: "Spotify", href: "https://open.spotify.com/artist/5xtHt6EI9ijZ30ZCCEAAFF", icon: "spotify" },
    ],
  },
  {
    slug: "zuhruf",
    name: "ZUHRUF",
    alias: "Zuhruf",
    tagline: "Soğukkanlı akış, keskin bir kalem.",
    image: "/img/zuhruf.jpg",
    bio: [
      "EDE GANG'in diğer yarısı Zuhruf, çok katmanlı kafiyeleri ve ağır oturan akışıyla öne çıkıyor. Beat seçiminde cesur, kaleminde keskin.",
      "Sahnede ağırbaşlı, sözlerinde sert. Oski ile birlikte Maraş yeraltını büyütmeye ve sahnelere taşımaya çalışıyor.",
    ],
    youtubeId: "dQw4w9WgXcQ",
    youtubeTitle: "ZUHRUF — Son Klip",
    spotifyEmbed: "https://open.spotify.com/embed/artist/4koSvjCuKVcCrOZlKvWfZo?utm_source=generator&theme=0",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/zuhruf.rap/", icon: "instagram" },
      { label: "Spotify", href: "https://open.spotify.com/artist/4koSvjCuKVcCrOZlKvWfZo", icon: "spotify" },
    ],
  },
];

export const CREW_SOCIALS: Social[] = [
  { label: "Instagram", href: "https://www.instagram.com/ede.gang/", icon: "instagram" },
  { label: "YouTube", href: "https://youtube.com/@edegang", icon: "youtube" },
  { label: "Spotify", href: "https://open.spotify.com", icon: "spotify" },
];
