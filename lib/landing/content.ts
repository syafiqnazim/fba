import type { Locale } from "@/lib/i18n";

export type LandingContent = {
  siteName: string;
  shortName: string;
  tagline: string;
  headline: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  socialProof: {
    title: string;
    items: string[];
  };
  stats: {
    items: { value: number; suffix?: string; label: string }[];
  };
  learn: {
    title: string;
    intro: string;
    items: { title: string; description: string }[];
  };
  programs: {
    title: string;
    intro: string;
    items: { title: string; description: string; href: string }[];
  };
  coaches: {
    title: string;
    intro: string;
    items: { name: string; role: string; bio: string }[];
  };
  owner: {
    eyebrow: string;
    name: string;
    role: string;
    intro: string;
    body: string;
    pullQuote: string;
  };
  dayNight: {
    title: string;
    intro: string;
    day: { title: string; body: string };
    night: { title: string; body: string };
  };
  community: {
    title: string;
    intro: string;
    body: string;
    pullQuote: string;
  };
  howItWorks: {
    title: string;
    intro: string;
    steps: { title: string; description: string }[];
  };
  gallery: {
    title: string;
    intro: string;
  };
  testimonials: {
    title: string;
    intro: string;
    items: { name: string; alt: string }[];
  };
  blog: {
    title: string;
    intro: string;
    viewAll: string;
    readMore: string;
    empty: string;
  };
  faq: {
    title: string;
    intro: string;
    items: { q: string; a: string }[];
  };
  cta: {
    title: string;
    body: string;
    button: string;
  };
  galleryIndex: {
    title: string;
    intro: string;
    openTheme: string;
    backHome: string;
  };
  switcher: {
    label: string;
    gallery: string;
  };
};

const en: LandingContent = {
  siteName: "Fishing Buddies Academy",
  shortName: "FBA",
  tagline:
    "You will not fish the same again! Learn fishing gear usability and balance so you enjoy fishing more. FBA has helped more than 37,000 anglers at home and abroad with our online modules.",
  headline: "Play the game better.",
  ctaPrimary: "View programs",
  ctaPrimaryHref: "https://fishingbuddiesacademy.com/",
  ctaSecondary: "Facebook",
  ctaSecondaryHref: "https://www.facebook.com/FishingBuddiesAcademy",
  socialProof: {
    title: "Never stop learning",
    items: [
      "37,000+ students",
      "Online modules",
      "Inner Circle Meeting",
      "Reel Master 6.0",
      "Group Support",
    ],
  },
  stats: {
    items: [
      { value: 37000, suffix: "+", label: "Students helped through our online modules" },
      {
        value: 52,
        label: "FBA Pro modules covering gear, technique and strategy, week by week",
      },
      {
        value: 3,
        label: "Core fishing sciences: equipment, technique and strategy",
      },
      {
        value: 12,
        label: "Months of mentoring with coaches, including virtual fishing case studies",
      },
    ],
  },
  learn: {
    title: "What you learn",
    intro:
      "Online modules built around three core fishing sciences, so you understand gear, technique, and strategy before you spend another trip guessing.",
    items: [
      {
        title: "Equipment knowledge",
        description:
          "Build a balanced setup. Know what to buy, what suits your situation, and why gear fails on the water so you stop wasting money on hype.",
      },
      {
        title: "Technique",
        description:
          "Level up casting and jigging with clear principles you can apply on saltwater and freshwater trips.",
      },
      {
        title: "Strategy",
        description:
          "The heart of FBA Pro. Plan before and during the session, read high pressure spots, and choose the right approach including quiet vs noisy lures.",
      },
      {
        title: "Coach case studies",
        description:
          "Weekly modules and virtual fishing sessions with experienced coaches. Watch how they observe and handle real situations, then enjoy your own trips ready.",
      },
    ],
  },
  programs: {
    title: "Programs",
    intro:
      "Choose the FBA path that fits you. Browse every program on our store.",
    items: [
      {
        title: "FBA Pro",
        description:
          "Shorten your fishing journey. Raise your skill in technique and in building strategy on your spots. Master the three core sciences of fishing: equipment, technique and strategy, through 52 weekly modules and 12 months of mentoring with coach case studies and virtual fishing sessions. When you understand, fishing feels much easier.",
        href: "https://fishingbuddiesacademy.com/",
      },
      {
        title: "FBA Circle",
        description:
          "Join the Circle community for saltwater and freshwater events, casting and jigging trips with members, discounted branded fishing gear, networking with anglers across Southeast Asia, competitions, competent reel servicing, and exclusive FBA merchandise.",
        href: "https://fishingbuddiesacademy.com/",
      },
      {
        title: "Reel Master 6.0",
        description:
          "Train competent reel service and repair technicians (pomen reel) to support anglers and Orca Circle. Generate income with your hobby through fast, effective learning. 24 complete modules with guidance from experienced coaches. Register for the waiting list. Starts this September. Contact Team FBA at +6017 659 1614.",
        href: "https://fishingbuddiesacademy.com/",
      },
      {
        title: "FBA Premier Circle",
        description:
          "A mentoring-based premium community alongside FBA Circle and FBA Pro. Guided modules help members build fishing skill and understanding faster, turning years of guesswork into clearer progress.",
        href: "https://fishingbuddiesacademy.com/",
      },
    ],
  },
  coaches: {
    title: "Our coaches",
    intro:
      "Meet the FBA coaching team. More coaches will be added here as the academy grows.",
    items: [
      {
        name: "Syafi'e Abdul Shukor",
        role: "Shimano Pro Staff · FBA Coach",
        bio: "Shimano Pro Staff and one of the coaches at Fishing Buddies Academy.",
      },
      {
        name: "Coach Mahfudz",
        role: "FBA Coach",
        bio: "Bio coming soon.",
      },
      {
        name: "Coach Ariff",
        role: "FBA Coach",
        bio: "Bio coming soon.",
      },
    ],
  },
  owner: {
    eyebrow: "Spotlight",
    name: "Syafi'e Abdul Shukor",
    role: "Shimano Pro Staff · FBA Coach",
    intro:
      "Shimano Pro Staff and one of the coaches at Fishing Buddies Academy.",
    body: "Syafi'e helps anglers build clearer skill and understanding through FBA mentoring modules and community programs.",
    pullQuote: "Play the game better.",
  },
  dayNight: {
    title: "Day vs night",
    intro: "Two rhythms. Same buddy culture.",
    day: {
      title: "Day sessions",
      body: "Sun on the deck, casting practice, and reading clear water with your coach beside you.",
    },
    night: {
      title: "Night sessions",
      body: "Lights, pelagic energy, and crew focus when the water wakes up after dark.",
    },
  },
  community: {
    title: "Inner Circle Meeting",
    intro:
      "In 2024, FBA successfully ran 3 ICM events for FBA Circle members across the region.",
    body: "From jigging in Mersing to casting in Thailand and deep sea fishing at Lucornia, ICM is where the Circle meets, learns, and fishes together. That same community spirit still drives FBA today.",
    pullQuote: "Play the game better.",
  },
  howItWorks: {
    title: "How it works",
    intro: "A simple path from curiosity to confident time on the water.",
    steps: [
      {
        title: "Enquire",
        description: "Tell us your level, goals, and preferred day or night sessions.",
      },
      {
        title: "Join a crew",
        description: "We match you with the right program and coaching style.",
      },
      {
        title: "On the water",
        description: "Show up, learn by doing, and fish with guidance instead of guesswork.",
      },
      {
        title: "Level up",
        description: "Keep improving with the network through workshops, trips, and buddies.",
      },
    ],
  },
  gallery: {
    title: "On the water",
    intro: "Real coaches. Real catches. More photos coming soon.",
  },
  testimonials: {
    title: "Testimoni",
    intro:
      "Real results from FBA Pro mentoring students who put the ilmu to work on the water.",
    items: [
      {
        name: "Mustarry AS",
        alt: "Testimoni Mustarry AS, FBA Pro Mentoring Program",
      },
      {
        name: "Jay Sevenz",
        alt: "Testimoni Jay Sevenz, FBA Pro Mentoring Program",
      },
      {
        name: "Awie Cy",
        alt: "Testimoni Awie Cy, FBA Pro Mentoring Program",
      },
      {
        name: "Jay Sevenz · FBA Circle",
        alt: "Testimoni Jay Sevenz bersama Ezril Ril, FBA Circle",
      },
      {
        name: "Yadiie Yusop",
        alt: "Testimoni Yadiie Yusop, FBA Pro Mentoring Program",
      },
      {
        name: "Ajis Chandra",
        alt: "Testimoni Ajis Chandra, FBA Pro Mentoring Program",
      },
    ],
  },
  blog: {
    title: "From the blog",
    intro: "Tips, program updates, and academy notes. Mock posts for now until real articles are ready.",
    viewAll: "All articles",
    readMore: "Read more",
    empty: "No articles yet.",
  },
  faq: {
    title: "FAQ",
    intro: "Common questions about FBA programs. Mock answers for now. Replace with your final copy later.",
    items: [
      {
        q: "Is FBA an online program?",
        a: "Yes. FBA programs are built around online modules and mentoring. Browse and join through the FBA store.",
      },
      {
        q: "What is the difference between FBA Pro, Circle, and Premier Circle?",
        a: "FBA Pro focuses on mentoring modules for equipment, technique, and strategy. FBA Circle is the community membership with events and trips. FBA Premier Circle is a mentoring-based premium community tier. Full details are on the store.",
      },
      {
        q: "What is Reel Master 6.0?",
        a: "Reel Master trains competent reel service and repair technicians (pomen reel), with 24 modules and coach guidance. Waiting list details are on the store.",
      },
      {
        q: "Do I need fishing experience to join?",
        a: "FBA modules are designed to help anglers build clearer skill and understanding. Pick the program that fits your level on the store, or ask Team FBA on Facebook.",
      },
      {
        q: "Where do I buy a program?",
        a: "All programs are listed at fishingbuddiesacademy.com. You can also follow updates on the official FBA Facebook page.",
      },
    ],
  },
  cta: {
    title: "Ready to get on the water?",
    body: "Send a message and we will help you pick a program that fits.",
    button: "Contact FBA",
  },
  galleryIndex: {
    title: "Landing theme gallery",
    intro: "Preview four directions. Pick a winner and we will promote it to the homepage next.",
    openTheme: "Open preview",
    backHome: "Back to current home",
  },
  switcher: {
    label: "Themes",
    gallery: "All themes",
  },
};

const ms: LandingContent = {
  siteName: "Fishing Buddies Academy",
  shortName: "FBA",
  tagline:
    "Anda tidak akan memancing sama seperti dulu! Fahami kegunaan dan imbangan peralatan memancing supaya lebih seronok memancing. FBA telah membantu lebih 37,000 pemancing di dalam & luar negara melalui modul online kami.",
  headline: "Play the game better.",
  ctaPrimary: "Lihat program",
  ctaPrimaryHref: "https://fishingbuddiesacademy.com/",
  ctaSecondary: "Facebook",
  ctaSecondaryHref: "https://www.facebook.com/FishingBuddiesAcademy",
  socialProof: {
    title: "Never stop learning",
    items: [
      "37,000+ pelajar",
      "Modul online",
      "Inner Circle Meeting",
      "Reel Master 6.0",
      "Sokongan berkumpulan",
    ],
  },
  stats: {
    items: [
      { value: 37000, suffix: "+", label: "Pelajar dibantu melalui modul online kami" },
      {
        value: 52,
        label: "Modul FBA Pro meliputi peralatan, teknik dan strategi setiap minggu",
      },
      {
        value: 3,
        label: "Ilmu terpenting memancing: peralatan, teknik dan strategi",
      },
      {
        value: 12,
        label: "Bulan mentoring bersama coach, termasuk case study memancing virtual",
      },
    ],
  },
  learn: {
    title: "Apa yang anda pelajari",
    intro:
      "Modul online berasaskan tiga ilmu terpenting memancing supaya anda faham peralatan, teknik, dan strategi sebelum trip seterusnya jadi teka-teki lagi.",
    items: [
      {
        title: "Ilmu peralatan",
        description:
          "Bina kombinasi seimbang. Tahu apa yang patut dibeli, apa yang sesuai situasi anda, dan kenapa gear gagal di air supaya duit tak terbuang ikut hype.",
      },
      {
        title: "Ilmu teknik",
        description:
          "Naik taraf casting dan jigging dengan prinsip jelas yang boleh digunakan di trip air masin dan air tawar.",
      },
      {
        title: "Ilmu strategi",
        description:
          "Tulang belakang FBA Pro. Rancang sebelum dan semasa sesi, baca spot high pressure, dan pilih pendekatan yang betul termasuk gewang senyap vs bising.",
      },
      {
        title: "Case study bersama coach",
        description:
          "Modul mingguan dan sesi memancing virtual bersama coach berpengalaman. Lihat cara mereka memerhati dan hadapi situasi, kemudian enjoy trip anda dengan lebih ready.",
      },
    ],
  },
  programs: {
    title: "Program",
    intro:
      "Pilih laluan FBA yang sesuai. Lihat semua program di store kami.",
    items: [
      {
        title: "FBA Pro",
        description:
          "Singkatkan journey memancing anda. Tingkatkan kefahaman dan kemahiran dari segi teknik serta prinsip menyusun strategi di spot memancing anda. Kuasai tiga ilmu terpenting memancing iaitu ilmu peralatan, ilmu teknik dan ilmu strategi melalui 52 modul mingguan dan mentoring selama 12 bulan bersama case study coach dan sesi memancing virtual. Bila dah faham, memancing akan terasa sangat mudah.",
        href: "https://fishingbuddiesacademy.com/",
      },
      {
        title: "FBA Circle",
        description:
          "Sertai komuniti Circle untuk event memancing air masin dan air tawar, trip casting dan jigging bersama ahli, jualan peralatan jenama terkenal dengan harga diskaun, networking anglers di seluruh Asia Tenggara, pelbagai pertandingan, khidmat pomen reel yang kompeten, dan merchandise eksklusif FBA.",
        href: "https://fishingbuddiesacademy.com/",
      },
      {
        title: "Reel Master 6.0",
        description:
          "Latih pomen reel yang mahir dan kompeten untuk service dan repair reel bagi membantu pemancing dan Orca Circle. Jana pendapatan dengan hobi melalui pembelajaran cepat dan berkesan. 24 modul lengkap dengan bimbingan daripada coach yang berpengalaman. Daftar waiting list sekarang. Bermula September ini. Hubungi Team FBA di +6017 659 1614.",
        href: "https://fishingbuddiesacademy.com/",
      },
      {
        title: "FBA Premier Circle",
        description:
          "Komuniti premium berasaskan mentoring bersama FBA Circle dan FBA Pro. Modul berpandu membantu ahli bina kemahiran dan kefahaman memancing dengan lebih cepat, dari teka-teki bertahun kepada progress yang lebih jelas.",
        href: "https://fishingbuddiesacademy.com/",
      },
    ],
  },
  coaches: {
    title: "Jurulatih kami",
    intro:
      "Kenali pasukan jurulatih FBA. Lebih ramai jurulatih akan ditambah di sini seiring perkembangan akademi.",
    items: [
      {
        name: "Syafi'e Abdul Shukor",
        role: "Shimano Pro Staff · Jurulatih FBA",
        bio: "Shimano Pro Staff dan salah seorang jurulatih di Fishing Buddies Academy.",
      },
      {
        name: "Coach Mahfudz",
        role: "Jurulatih FBA",
        bio: "Bio akan dikemas kini.",
      },
      {
        name: "Coach Ariff",
        role: "Jurulatih FBA",
        bio: "Bio akan dikemas kini.",
      },
    ],
  },
  owner: {
    eyebrow: "Sorotan",
    name: "Syafi'e Abdul Shukor",
    role: "Shimano Pro Staff · Jurulatih FBA",
    intro:
      "Shimano Pro Staff dan salah seorang jurulatih di Fishing Buddies Academy.",
    body: "Syafi'e membantu pemancing bina kemahiran dan kefahaman yang lebih jelas melalui modul mentoring FBA dan program komuniti.",
    pullQuote: "Play the game better.",
  },
  dayNight: {
    title: "Siang vs malam",
    intro: "Dua rentak. Budaya buddy yang sama.",
    day: {
      title: "Sesi siang",
      body: "Matahari di dek, latihan casting, dan membaca air jernih bersama jurulatih.",
    },
    night: {
      title: "Sesi malam",
      body: "Cahaya, tenaga pelagic, dan fokus krew bila air hidup selepas gelap.",
    },
  },
  community: {
    title: "Inner Circle Meeting",
    intro:
      "Pada 2024, FBA berjaya menjayakan 3 ICM untuk ahli FBA Circle di serata rantau.",
    body: "Dari jigging di Mersing ke casting di Thailand dan deep sea di Lucornia, ICM ialah tempat Circle bertemu, belajar, dan memancing bersama. Semangat komuniti yang sama masih menggerakkan FBA hari ini.",
    pullQuote: "Play the game better.",
  },
  howItWorks: {
    title: "Cara ia berfungsi",
    intro: "Laluan ringkas dari rasa ingin tahu ke masa yakin di air.",
    steps: [
      {
        title: "Bertanya",
        description: "Beritahu tahap, matlamat, dan pilihan sesi siang atau malam.",
      },
      {
        title: "Sertai krew",
        description: "Kami padankan anda dengan program dan gaya bimbingan yang sesuai.",
      },
      {
        title: "Di air",
        description: "Hadir, belajar sambil buat, dan memancing dengan bimbingan.",
      },
      {
        title: "Naik tahap",
        description: "Terus maju bersama rangkaian melalui bengkel, trip, dan buddy.",
      },
    ],
  },
  gallery: {
    title: "Di air",
    intro: "Jurulatih sebenar. Tangkapan sebenar. Lebih banyak foto akan datang.",
  },
  testimonials: {
    title: "Testimoni",
    intro:
      "Hasil sebenar daripada pelajar mentoring FBA Pro yang guna ilmu di air.",
    items: [
      {
        name: "Mustarry AS",
        alt: "Testimoni Mustarry AS, FBA Pro Mentoring Program",
      },
      {
        name: "Jay Sevenz",
        alt: "Testimoni Jay Sevenz, FBA Pro Mentoring Program",
      },
      {
        name: "Awie Cy",
        alt: "Testimoni Awie Cy, FBA Pro Mentoring Program",
      },
      {
        name: "Jay Sevenz · FBA Circle",
        alt: "Testimoni Jay Sevenz bersama Ezril Ril, FBA Circle",
      },
      {
        name: "Yadiie Yusop",
        alt: "Testimoni Yadiie Yusop, FBA Pro Mentoring Program",
      },
      {
        name: "Ajis Chandra",
        alt: "Testimoni Ajis Chandra, FBA Pro Mentoring Program",
      },
    ],
  },
  blog: {
    title: "Dari blog",
    intro: "Tip, kemas kini program, dan nota akademi. Artikel mock buat masa ini sehingga artikel sebenar sedia.",
    viewAll: "Semua artikel",
    readMore: "Baca lanjut",
    empty: "Belum ada artikel lagi.",
  },
  faq: {
    title: "Soalan lazim",
    intro: "Soalan biasa tentang program FBA. Jawapan mock buat masa ini. Ganti dengan copy rasmi kemudian.",
    items: [
      {
        q: "Adakah FBA program online?",
        a: "Ya. Program FBA dibina sekitar modul online dan mentoring. Layari dan sertai melalui store FBA.",
      },
      {
        q: "Apa beza FBA Pro, Circle, dan Premier Circle?",
        a: "FBA Pro fokus modul mentoring untuk peralatan, teknik, dan strategi. FBA Circle ialah keahlian komuniti dengan event dan trip. FBA Premier Circle ialah tier komuniti premium berasaskan mentoring. Butiran penuh ada di store.",
      },
      {
        q: "Apa itu Reel Master 6.0?",
        a: "Reel Master melatih pomen reel yang mahir untuk service dan repair, dengan 24 modul dan bimbingan coach. Butiran waiting list ada di store.",
      },
      {
        q: "Perlukah pengalaman memancing untuk sertai?",
        a: "Modul FBA membantu pemancing bina kemahiran dan kefahaman yang lebih jelas. Pilih program yang sesuai di store, atau tanya Team FBA di Facebook.",
      },
      {
        q: "Di mana saya boleh beli program?",
        a: "Semua program disenaraikan di fishingbuddiesacademy.com. Anda juga boleh follow kemas kini di laman Facebook rasmi FBA.",
      },
    ],
  },
  cta: {
    title: "Sedia ke air?",
    body: "Hantar mesej dan kami bantu pilih program yang sesuai.",
    button: "Hubungi FBA",
  },
  galleryIndex: {
    title: "Galeri tema laman utama",
    intro: "Pratonton empat arah reka bentuk. Pilih pemenang dan kami akan naikkan ke laman utama seterusnya.",
    openTheme: "Buka pratonton",
    backHome: "Kembali ke laman semasa",
  },
  switcher: {
    label: "Tema",
    gallery: "Semua tema",
  },
};

const catalogs: Record<Locale, LandingContent> = { en, ms };

export function getLandingContent(locale: Locale): LandingContent {
  return catalogs[locale];
}
