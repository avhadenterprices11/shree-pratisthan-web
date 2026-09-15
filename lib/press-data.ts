export type PressCategory = 
  | "All"
  | "Press Releases"
  | "Events"
  | "Social Work"
  | "Community Updates"
  | "Announcements";

export interface PressRelease {
  id: string;
  slug: string;
  title: string;
  category: "Press Releases" | "Events" | "Social Work" | "Community Updates" | "Announcements";
  date: string;
  year: number;
  summary: string;
  content: string[];
  image: string;
  imageAlt: string;
  isFeatured?: boolean;
  officialBadge?: string;
  location: string;
  spokesperson: string;
  keyFacts?: string[];
}

export interface OfficialAnnouncement {
  id: string;
  date: string;
  monthDay: string;
  year: number;
  category: "ANNOUNCEMENT" | "EVENT" | "PUBLIC NOTICE" | "SOCIAL WORK";
  title: string;
  summary: string;
  priority: "high" | "normal" | "urgent";
  details: string;
}

export interface CommunityHighlight {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
  actionUrl: string;
  actionLabel: string;
  statsLabel?: string;
  statsValue?: string;
}

export interface PressKitAsset {
  id: string;
  title: string;
  category: string;
  description: string;
  fileFormat: string;
  fileSize: string;
  downloadUrl: string;
  previewUrl?: string;
  isExternal?: boolean;
}

export const PRESS_CATEGORIES: PressCategory[] = [
  "All",
  "Press Releases",
  "Events",
  "Social Work",
  "Community Updates",
  "Announcements",
];

export const PRESS_RELEASES: PressRelease[] = [
  {
    id: "pr-ganeshotsav-2024",
    slug: "ganeshotsav-2024-jejuri-gad-concludes",
    title: "Shree Pratishtan Concludes Grand Ganeshotsav 2024 with Historic Jejuri Gad Replica in Indira Nagar",
    category: "Press Releases",
    date: "September 18, 2024",
    year: 2024,
    isFeatured: true,
    officialBadge: "Official Release",
    location: "Indira Nagar, Nashik",
    spokesperson: "Adv. Shyam Dharmaraj Badode, Founder & President",
    image: "/events_ganeshotsav_2024_jejuri.jpg",
    imageAlt: "Shree Pratishtan Grand Ganeshotsav 2024 Jejuri Gad Replica Celebration in Indira Nagar",
    summary: "The 10-day cultural festival united tens of thousands of devotees with an elaborate replica of Shri Martand Bhairav Jejuri Gad, evening Maha Aartis, and youth-led crowd coordination.",
    keyFacts: [
      "Over 75,000 devotees visited the celebration over 10 festival days",
      "Traditional eco-friendly Shadu Mati idol worshipped with strict environmental care",
      "Zero-noise pollution adherence and youth volunteer safety protocol deployed",
      "Organized under registered public trust (Reg: nashik/0000153/2018)"
    ],
    content: [
      "INDIRA NAGAR, NASHIK — Shree Pratishtan (Late Dharmaraj Badode Bahuuddeshiya Sevabhavi Sanstha) has successfully concluded its signature 10-day Shree Ganeshotsav celebration for 2024, highlighted by an architectural theme replica of the revered Shri Kshetra Jejuri Gad.",
      "The annual festival serves as one of the most prominent cultural congregations in Nashik, drawing families, youth, and cultural patrons from across the district. The replica captured the iconic stone arches and yellow turmeric (bhandara) grandeur of Jejuri, honoring Maharashtra's profound spiritual heritage.",
      "Speaking on the successful culmination, Trust Founder Adv. Shyam Dharmaraj Badode stated: 'Since our founding in 2006 on the cricket grounds of Indira Nagar, our motto has been culture in motion and service in action. This celebration was powered by over 100 dedicated youth volunteers who worked relentlessly to maintain public safety, manage citizen queues, and ensure an eco-conscious festival.'",
      "Beyond spiritual rituals, the pandal hosted daily community engagement, including youth felicitation, traditional Dhol-Tasha recitals, and health awareness kiosks. The trust extended sincere gratitude to local police authorities, municipal officials, and the citizens of Indira Nagar for their collaborative support."
    ]
  },
  {
    id: "pr-blood-donation-50th",
    slug: "50th-mega-blood-donation-drive",
    title: "Annual Mega Blood Donation Drive Reaches Milestone with Over 350 Units Collected for Nashik Hospitals",
    category: "Social Work",
    date: "August 15, 2024",
    year: 2024,
    officialBadge: "Healthcare Seva",
    location: "Indira Nagar Community Ground, Nashik",
    spokesperson: "Healthcare & Social Seva Cell",
    image: "/images/blood-donation-camp.jpg",
    imageAlt: "Shree Pratishtan Blood Donation Camp in Indira Nagar",
    summary: "Marking over 50 life-saving blood donation drives organized since 2006, citizens and local youth gathered to address seasonal blood bank shortages across government and civil hospitals.",
    keyFacts: [
      "350+ voluntary units collected in single-day camp",
      "Organized in partnership with prominent regional blood banks",
      "Free medical checkup and hemoglobin screening provided to 500+ attendees",
      "Recognized by regional civic bodies for consistent social healthcare contributions"
    ],
    content: [
      "NASHIK — Addressing emergency shortages across blood banks during monsoon season, Shree Pratishtan organized its 50th milestone Mega Blood Donation Camp in Indira Nagar, collecting over 350 units of blood in a single day.",
      "Qualified phlebotomists and medical specialists from partner hospitals oversaw the strict screening, counseling, and collection protocol. In addition to blood donation, attendees received complimentary primary health diagnostics, including blood pressure monitoring, random blood sugar testing, and general physician consultations.",
      "'Every unit of blood donated has the potential to save up to three lives in trauma, surgical procedures, and pediatric thalassemia care,' remarked the medical coordinator. 'We express our deepest respect to the donors who stepped forward voluntarily.'",
      "Shree Pratishtan maintains an emergency 24/7 donor helpline to assist Indira Nagar residents requiring emergency blood and platelet units."
    ]
  },
  {
    id: "pr-swagat-yatra-2024",
    slug: "gudipadwa-swagat-yatra-grand-procession",
    title: "Gudipadwa Swagat Yatra 2024 Unites Thousands in Vibrant Marathi New Year Cultural Procession",
    category: "Events",
    date: "April 09, 2024",
    year: 2024,
    officialBadge: "Cultural Heritage",
    location: "Indira Nagar Main Route, Nashik",
    spokesperson: "Cultural Committee",
    image: "/swagat_yatra_2022.jpg",
    imageAlt: "Gudipadwa Swagat Yatra procession by Shree Pratishtan",
    summary: "Traditional Lezim, synchronized Dhol-Tasha, saffron flags, and heritage floats celebrated Chaitra Shuddha Pratipada, fostering community unity across generations.",
    keyFacts: [
      "Procession spanned over 3 kilometers across Indira Nagar",
      "Over 400 women and young girls led traditional Lezim and Dhol performances in Nauvari sarees",
      "Community water kiosks and safety volunteers deployed along the route"
    ],
    content: [
      "NASHIK — The arrival of the Marathi New Year was marked with immense cultural pride as Shree Pratishtan presented the annual Gudipadwa Bhavya Swagat Yatra across the heart of Indira Nagar.",
      "The procession featured grand floats honoring Chhatrapati Shivaji Maharaj, traditional martial arts displays, live folk music, and synchronized percussion by local youth troupes. The atmosphere was charged with traditional festive spirit, welcoming thousands of families in traditional Maharashtrian attire.",
      "The initiative underscores Shree Pratishtan's unwavering pledge to preserve and celebrate indigenous Maharashtrian culture while bringing neighbors, families, and youngsters together."
    ]
  },
  {
    id: "pr-youth-cricket-league",
    slug: "youth-cricket-tournament-2024",
    title: "Shree Pratishtan Youth Cricket League Honors 2006 Founding Roots with 32 Local Teams",
    category: "Community Updates",
    date: "February 24, 2024",
    year: 2024,
    officialBadge: "Youth Sports",
    location: "Indira Nagar Sports Ground",
    spokesperson: "Sports Organizing Committee",
    image: "/founding_members.jpg",
    imageAlt: "Founding members and sports organizers of Shree Pratishtan",
    summary: "Remembering the trust's beginnings as a neighborhood cricket team in 2006, the annual tournament provided competitive athletic exposure to over 450 young athletes.",
    keyFacts: [
      "32 competitive teams participated from across Nashik",
      "Professional umpiring and digital live scoring deployed",
      "Felicitation of emerging grassroots athletes and veteran sports mentors"
    ],
    content: [
      "NASHIK — Shree Pratishtan's story began in 2006 when a group of 20 close friends met every day to play cricket in Indira Nagar, eventually transforming their camaraderie into a registered public service organization.",
      "The 2024 Youth Cricket League brought this heritage to life, gathering 32 squads over a four-day competitive championship. The event encourages positive youth channelization, sportsmanship, and physical fitness.",
      "Winners were felicitated with trophies, equipment sponsorships, and mentorship guidance by senior civic leaders and sports luminaries."
    ]
  },
  {
    id: "pr-yoga-day-wellness",
    slug: "international-yoga-day-community-health",
    title: "International Yoga Day & Preventive Health Diagnostic Camp Organized for Indira Nagar Residents",
    category: "Social Work",
    date: "June 21, 2024",
    year: 2024,
    officialBadge: "Wellness Initiative",
    location: "Indira Nagar Open Assembly Grounds",
    spokesperson: "Healthcare Cell",
    image: "/community_assembly.png",
    imageAlt: "Community yoga and wellness camp in Indira Nagar",
    summary: "Certified yogacharyas led morning asanas and pranayama, followed by comprehensive preventive health screenings for senior citizens and homemakers.",
    keyFacts: [
      "Over 600 participants gathered at sunrise for guided yoga sessions",
      "Free distribution of wellness kits and dietary guidance brochures",
      "On-site bone mineral density (BMD) and cardiac screening stations"
    ],
    content: [
      "NASHIK — Celebrating the 10th International Day of Yoga, Shree Pratishtan gathered over 600 citizens, students, and seniors for a mass morning yoga demonstration in Indira Nagar.",
      "Certified instructors guided participants through Common Yoga Protocol (CYP) asanas, breathing techniques, and guided meditation, emphasizing lifestyle disease prevention.",
      "Following the physical demonstration, specialized medical practitioners conducted complimentary preventive health assessments for lifestyle ailments including hypertension, diabetes, and musculoskeletal wellness."
    ]
  },
  {
    id: "pr-shiv-jayanti-rally",
    slug: "shiv-jayanti-51ft-rajmudra-rally",
    title: "Chhatrapati Shivaji Maharaj Jayanti Celebrated with Grand 51-Foot Rajmudra Display",
    category: "Events",
    date: "February 19, 2024",
    year: 2024,
    officialBadge: "Historic Tribute",
    location: "Indira Nagar, Nashik",
    spokesperson: "Adv. Shyam Dharmaraj Badode",
    image: "/events_rajmudra_51ft.jpg",
    imageAlt: "51ft Rajmudra and Shiv Jayanti celebrations by Shree Pratishtan",
    summary: "A grand historic tribute commemorating the visionary founder of Swarajya, featuring an imposing 51-foot Rajmudra replica, historical lectures, and youth felicitations.",
    keyFacts: [
      "51-foot authentic replica of Chhatrapati Shivaji Maharaj's Royal Seal",
      "Educational book distribution and student merit awards",
      "Civic oath ceremony for community service and cleanliness"
    ],
    content: [
      "NASHIK — On the auspicious occasion of Chhatrapati Shivaji Maharaj Jayanti, Shree Pratishtan organized an inspiring cultural tribute in Indira Nagar, highlighted by a majestic 51-foot reproduction of the Shiv Rajmudra.",
      "The gathering honored the governance ethics, inclusive development, and civic vision of the great Maratha ruler. Students from local schools participated in elocution contests and received educational reference books.",
      "Trust leadership emphasized that Shivaji Maharaj's governance philosophy of protecting the vulnerable, preserving natural resources, and prioritizing public welfare remains the guiding compass for Shree Pratishtan's grassroots social initiatives."
    ]
  }
];

export const OFFICIAL_ANNOUNCEMENTS: OfficialAnnouncement[] = [
  {
    id: "ann-01",
    date: "2024-09-12",
    monthDay: "12 SEP",
    year: 2024,
    category: "ANNOUNCEMENT",
    priority: "urgent",
    title: "Ganeshotsav 2024 Volunteer Debrief & Community Cleanliness Drive",
    summary: "Post-immersion cleanliness campaign across Indira Nagar immersion tanks and volunteer appreciation meet.",
    details: "All youth members and volunteers are requested to assemble at the Indira Nagar Central Ground for the scheduled post-festival civic cleanliness drive. Shree Pratishtan remains dedicated to zero plastic residue and leaving public spaces clean."
  },
  {
    id: "ann-02",
    date: "2024-08-28",
    monthDay: "28 AUG",
    year: 2024,
    category: "PUBLIC NOTICE",
    priority: "high",
    title: "Helpline Active for Emergency Monsoon Blood & Medical Requisitions",
    summary: "24/7 dedicated helpline activated in coordination with Nashik civil hospitals for emergency donor matching.",
    details: "In view of seasonal viral fever and emergency blood requirements across district hospitals, our Healthcare Cell helpline (+91 9922786608) is operational 24/7 to connect verified blood donors with patients in critical need."
  },
  {
    id: "ann-03",
    date: "2024-07-15",
    monthDay: "15 JUL",
    year: 2024,
    category: "SOCIAL WORK",
    priority: "normal",
    title: "Annual Youth Sports Coaching & Fitness Registration Opened",
    summary: "Free grassroots cricket and fitness training batches for youth aged 12-22 in Indira Nagar.",
    details: "Registration is now open for our annual grassroots athletics and cricket coaching camps. Aspiring youth athletes can register at the trust coordination office. Equipment and coaching are provided free of cost."
  },
  {
    id: "ann-04",
    date: "2024-06-02",
    monthDay: "02 JUN",
    year: 2024,
    category: "EVENT",
    priority: "normal",
    title: "Pre-Monsoon Tree Plantation & Civic Sanitation Schedule Announced",
    summary: "Target to plant 500 indigenous saplings across Indira Nagar public gardens and residential avenues.",
    details: "Shree Pratishtan's green initiative invites neighborhood residents and environmental enthusiasts to participate in planting native banyan, neem, and peepal saplings before the onset of the monsoon."
  }
];

export const COMMUNITY_HIGHLIGHTS: CommunityHighlight[] = [
  {
    id: "ch-ganesh",
    title: "Shree Ganeshotsav Celebrations",
    category: "Cultural Landmark",
    date: "Annual • Bhadrapada",
    description: "Ten days of cultural harmony, historic theme replicas, evening aartis, and youth volunteerism in Indira Nagar.",
    image: "/events_ganeshotsav_2024_jejuri.jpg",
    actionUrl: "/events",
    actionLabel: "View Festival Details",
    statsLabel: "Devotees Engaged",
    statsValue: "75,000+"
  },
  {
    id: "ch-swagat-yatra",
    title: "Gudipadwa Swagat Yatra",
    category: "New Year Heritage",
    date: "Annual • Chaitra",
    description: "Grand traditional procession uniting families with Lezim troupes, saffron flags, and Dhol-Tasha percussion.",
    image: "/swagat_yatra_2022.jpg",
    actionUrl: "/gallery",
    actionLabel: "Explore Procession Media",
    statsLabel: "Procession Route",
    statsValue: "3+ Kilometers"
  },
  {
    id: "ch-blood-drives",
    title: "50+ Blood Donation Camps",
    category: "Life-Saving Healthcare",
    date: "Continuous Seva Since 2006",
    description: "Regularly organized mass donation camps supporting civil and charitable hospitals across Nashik district.",
    image: "/images/blood-donation-camp.jpg",
    actionUrl: "/community",
    actionLabel: "View Healthcare Drives",
    statsLabel: "Milestone Drives",
    statsValue: "50+ Camps"
  },
  {
    id: "ch-youth-cricket",
    title: "Sports & Youth Development",
    category: "Foundation Legacy",
    date: "Annual Tournament",
    description: "Honoring our 2006 cricket pitch origin by empowering neighborhood youth through competitive leagues.",
    image: "/founding_members.jpg",
    actionUrl: "/about",
    actionLabel: "Read Origin Story",
    statsLabel: "Athletes Engaged",
    statsValue: "450+ Players"
  }
];

export const PRESS_KIT_ASSETS: PressKitAsset[] = [
  {
    id: "pk-logo",
    title: "Official Shree Pratisthan Logo",
    category: "Brand Identity",
    description: "High-resolution circular emblem with traditional saffron typography and trust symbol.",
    fileFormat: "PNG (Raster)",
    fileSize: "442 KB",
    downloadUrl: "/logo.png",
    previewUrl: "/logo.png"
  },
  {
    id: "pk-trust-seal",
    title: "Official Trust Verification Seal",
    category: "Legal & Credentials",
    description: "Official emblem of Late Dharmaraj Badode Bahuuddeshiya Sevabhavi Sanstha (Reg: nashik/0000153/2018).",
    fileFormat: "PNG (Raster)",
    fileSize: "442 KB",
    downloadUrl: "/trust_seal.png",
    previewUrl: "/trust_seal.png"
  },
  {
    id: "pk-leadership-photo",
    title: "Adv. Shyam Dharmaraj Badode Portrait",
    category: "Leadership Media",
    description: "Official high-resolution portrait of Founder & President Adv. Shyam Dharmaraj Badode for press usage.",
    fileFormat: "PNG (High Res)",
    fileSize: "127 KB",
    downloadUrl: "/shyam_badode.png",
    previewUrl: "/shyam_badode.png"
  },
  {
    id: "pk-factsheet",
    title: "Shree Pratisthan Official Factsheet & Profile",
    category: "Organizational Data",
    description: "Verified summary of organizational history (Est. 2006), 20 founding members, registration credentials, and key initiatives.",
    fileFormat: "Reference Document",
    fileSize: "Digital Factsheet",
    downloadUrl: "/about",
    isExternal: false
  }
];
