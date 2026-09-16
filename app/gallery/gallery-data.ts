export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  src: string;
  metric?: string;
  description: string;
  details: string;
  type: "memory" | "photo";
}

export const FEATURED_MEMORIES: GalleryItem[] = [
  {
    id: "ganeshotsav-processions",
    title: "Shree Ganeshotsav — Jejuri Gad Dekhava",
    category: "Festival",
    date: "September 2024",
    src: "/events_ganeshotsav_2024_jejuri.jpg",
    metric: "10-Day Festival",
    description: "Our grand Ganeshotsav celebration in Indira Nagar, Nashik featuring historic theme replicas like Jejuri Gad.",
    details: "The annual Ganeshotsav celebration is one of Shree Pratishtan's signature cultural events in Indira Nagar, Nashik. The event features magnificent theme replicas such as Shri Khandoba Maharaj Jejuri Gad, daily spiritual Maha Aartis, traditional Dhol Tasha drummers playing in synchronization, and eco-friendly Shadu Mati clay idols.",
    type: "memory"
  },
  {
    id: "gudipadwa-swagat-yatra",
    title: "Gudipadwa Bhavya Swagat Yatra",
    category: "Festival",
    date: "March 2024",
    src: "/events_swagat_yatra_2022.jpg",
    metric: "Grand Yatra",
    description: "Grand Marathi New Year procession with traditional Lezim, Dhol Tasha, and cultural rallies across Indira Nagar.",
    details: "Commencing the Marathi New Year, the Gudipadwa Swagat Yatra unites thousands of families across Indira Nagar, Nashik in traditional attire. Featuring majestic saffron flags, live Lezim performances, synchronised Dhol Tasha percussion, and decorated floats, this yatra showcases Maharashtra's rich cultural heritage and brotherhood.",
    type: "memory"
  },
  {
    id: "mahashivratri-celebration",
    title: "Mahashivratri — 108-ft Mahamrutyunjay Mandir",
    category: "Festival",
    date: "February 2024",
    src: "/images/mahashivratri.jpg",
    metric: "108-Ft Shivling",
    description: "Grand Mahashivratri celebration featuring monumental 108-ft Mahamrutyunjay Mandir Shivling replica and sacred abhishek.",
    details: "Shree Pratishtan's grand Mahashivratri utsav in Indira Nagar, Nashik features monumental architectural replicas including the sacred 108-foot Mahamrutyunjay Mandir (Assam) Shivling. Tens of thousands of devotees assemble for continuous chanting, sacred bilva patra offerings, and evening light spectacles.",
    type: "memory"
  },
  {
    id: "dahi-handi-utsav",
    title: "Bhavya Dahi Handi Utsav & Govinda Pathaks",
    category: "Festival",
    date: "August 2024",
    src: "/dahihandi_2018.jpg",
    metric: "Multi-Tier Pyramids",
    description: "Thrilling Dahi Handi celebration with top Govinda pathaks competing in towering multi-tier pyramids in Indira Nagar.",
    details: "Our annual Dahi Handi Utsav in Indira Nagar attracts thousands of spectators and premier Govinda pathaks from across Maharashtra. The high-energy festival promotes youth fitness, discipline, and unity with cultural music and celebratory rewards.",
    type: "memory"
  },
  {
    id: "navratri-garba-utsav",
    title: "Navratri Garba & Dandiya Utsav",
    category: "Festival",
    date: "October 2024",
    src: "/gallery_navratri_2022.jpg",
    metric: "9 Nights Garba",
    description: "A lively, colorful 9-night celebration of traditional Raas Garba, community bonding, and cultural devotion in Indira Nagar.",
    details: "The Navratri Garba Utsav organized by Shree Pratishtan in Indira Nagar, Nashik brings together thousands of families for an evening of dance, worship, and vibrant traditional attire. Devotees dance to authentic traditional folk rhythms, reinforcing cultural preservation and harmony. The event concludes each night with a sacred Maha Aarti dedicated to community welfare and peace.",
    type: "memory"
  },
  {
    id: "shiv-jayanti-celebration",
    title: "Shiv Jayanti Grand Rallies & Mardani Khel",
    category: "Festival",
    date: "February 2024",
    src: "/gallery_shiv_jayanti_2024.jpg",
    metric: "Youth Rallies",
    description: "Inspiring youth rallies, historical exhibitions, and traditional martial arts demonstrations in Indira Nagar.",
    details: "Honoring Chhatrapati Shivaji Maharaj, our annual Shiv Jayanti festival features youth processions, historical lectures, and live demonstrations of traditional Marathi Mardani Khel martial arts. The event inspires local youth with Swarajya values, good governance, discipline, and community service.",
    type: "memory"
  },
  {
    id: "dr-ambedkar-jayanti",
    title: "Dr. Ambedkar Jayanti Student Welfare",
    category: "Education",
    date: "April 2024",
    src: "/gallery_ambedkar_jayanti.jpg",
    metric: "2,500+ Kits",
    description: "Social equality seminars, academic merit honors, and free educational study kit distribution for students in Nashik.",
    details: "Celebrating the birth anniversary of Bharat Ratna Dr. Babasaheb Ambedkar, Shree Pratishtan organizes educational aid drives. We distribute comprehensive study kits, school bags, and notebooks to underprivileged students while felicitating top academic achievers from Indira Nagar and municipal schools.",
    type: "memory"
  },
  {
    id: "yoga-wellness-camps",
    title: "International Yoga Day & Wellness Clinics",
    category: "Healthcare",
    date: "June 2024",
    src: "/volunteer_safety.png",
    metric: "500+ Participants",
    description: "Mass guided yoga protocols, breathing workshops, and preventative health screenings for senior citizens and families.",
    details: "Observed on June 21st in Indira Nagar, our mass Yoga Day brings together residents for certified yoga asana practice, pranayama sessions, and holistic wellness consultations. Specialist physicians provide blood pressure, diabetes, and bone density screenings to encourage proactive healthcare.",
    type: "memory"
  }
];

export const PHOTO_ITEMS: GalleryItem[] = [
  {
    id: "ganeshotsav-processions",
    title: "Ganeshotsav Jejuri Gad Theme Dekhava",
    category: "festival",
    date: "September 2024",
    src: "/events_ganeshotsav_2024_jejuri.jpg",
    description: "Grand Jejuri Gad Khandoba Maharaj replica during Ganeshotsav festival in Indira Nagar, Nashik.",
    details: "Every evening during the 10-day Ganeshotsav festival, community members gather for the twilight prayers (Maha Aarti) in Indira Nagar, Nashik. The event is characterized by historic architectural replicas, traditional hymns, and musical accompaniment.",
    type: "photo"
  },
  {
    id: "gudipadwa-swagat-yatra",
    title: "Gudipadwa Swagat Yatra & Lezim Troupe",
    category: "festival",
    date: "March 2024",
    src: "/events_swagat_yatra_2022.jpg",
    description: "Traditional drum ensembles, saffron flags, and cultural floats during Swagat Yatra in Indira Nagar.",
    details: "The rhythmic beats of the Dhol Tasha ensemble and saffron flag pageantry are the heartbeat of Maharashtra's cultural festivals. Our youth lead cultural floats honoring national icons across Indira Nagar.",
    type: "photo"
  },
  {
    id: "mahashivratri-utsav",
    title: "108-Ft Mahamrutyunjay Mandir Pratikruti",
    category: "festival",
    date: "February 2024",
    src: "/images/mahashivratri.jpg",
    description: "Spectacular 108-foot Mahamrutyunjay Shivling replica during Mahashivratri in Indira Nagar, Nashik.",
    details: "A monumental 108-foot architectural replica welcoming thousands of devotees for darshan, continuous Vedic chanting, and community aarti.",
    type: "photo"
  },
  {
    id: "dahi-handi-celebration",
    title: "Dahi Handi Govinda Human Pyramids",
    category: "festival",
    date: "August 2024",
    src: "/dahihandi_2018.jpg",
    description: "Electrifying crowd and multi-tier human pyramids during Dahi Handi in Indira Nagar.",
    details: "Over 10,000 citizens gather to cheer youth Govinda pathaks forming high pyramids in devotion and sportsmanship.",
    type: "photo"
  },
  {
    id: "dr-ambedkar-jayanti",
    title: "Student Study Kits & Notebooks Distribution",
    category: "education",
    date: "June 2024",
    src: "/gallery_ambedkar_jayanti.jpg",
    description: "Supplying notebooks, stationery, and backpacks to local primary school children across Nashik.",
    details: "Ahead of the academic year, Shree Pratishtan organizes annual school supply drives to support primary school children across Nashik. We distribute quality backpacks, notebooks, stationery sets, and mathematical kits. This initiative supports families who struggle with educational costs and motivates young students to attend school regularly.",
    type: "photo"
  },
  {
    id: "navratri-garba-utsav",
    title: "Navratri Garba & Raas Dandiya Nights",
    category: "festival",
    date: "October 2024",
    src: "/gallery_navratri_2022.jpg",
    description: "Nine nights of devotional folk dances, live music, and family community integration in Indira Nagar.",
    details: "Navratri is celebrated with vibrant energy and cultural devotion in Indira Nagar, Nashik. Our community grounds host public Garba and Dandiya nights that emphasize safe, family-friendly celebrations where neighbors connect and celebrate Marathi and Gujarati folk heritage together.",
    type: "photo"
  },
  {
    id: "eco-preservation",
    title: "Vasundhara Tree Plantation Drive",
    category: "education",
    date: "July 2024",
    src: "/volunteer_eco.png",
    description: "Afforestation, native sapling plantation, and soil conservation drives across Nashik.",
    details: "To enhance urban green cover and improve biodiversity, our Vasundhara Tree Plantation Drive leads regular campaigns across Indira Nagar and Nashik open spaces. Volunteers plant indigenous shade and fruit saplings, nurture them with weekly watering rounds, and organize eco-awareness sessions for schoolchildren.",
    type: "photo"
  },
  {
    id: "yoga-wellness-camps",
    title: "International Yoga Day Mass Session",
    category: "healthcare",
    date: "June 2024",
    src: "/volunteer_safety.png",
    description: "Mass guided yoga protocols and holistic lifestyle counseling for citizens in Indira Nagar.",
    details: "Celebrating International Yoga Day in Indira Nagar, Nashik with guided asanas, meditation, and healthy lifestyle counseling led by certified yoga masters.",
    type: "photo"
  },
  {
    id: "shiv-jayanti-celebration",
    title: "Shiv Jayanti Grand Historical Procession",
    category: "festival",
    date: "February 2024",
    src: "/gallery_shiv_jayanti_2024.jpg",
    description: "Grand historical procession honoring Chhatrapati Shivaji Maharaj in Indira Nagar, Nashik.",
    details: "The birth anniversary of Chhatrapati Shivaji Maharaj is marked by a majestic historical procession in Indira Nagar, Nashik. Featuring traditional costumes, Mardani Khel martial arts demonstrations, and history recitals, the rally inspires youth with the ideals of Swarajya, courage, and social harmony.",
    type: "photo"
  },
  {
    id: "diagnostics-camp",
    title: "Free Specialist Health Checkup Camp",
    category: "healthcare",
    date: "December 2024",
    src: "/volunteer_medical.png",
    description: "Medical checkups, doctor consultations, and basic diagnostics for families in Nashik.",
    details: "The Community Diagnostics Camp is a healthcare drive organized by Shree Pratishtan in Indira Nagar, Nashik. Our team, along with qualified doctors, conducts primary health screenings, blood sugar and pressure testing, and distributes free prescription medicines. By diagnosing common ailments early, we help reduce the long-term healthcare burden on local families.",
    type: "photo"
  },
  {
    id: "disaster-relief",
    title: "Community Relief & Winter Aid Drives",
    category: "education",
    date: "November 2024",
    src: "/volunteer_disaster.png",
    description: "Distributing warm blankets, food rations, and essential supplies to vulnerable families in Nashik.",
    details: "During seasonal cold waves and hardships in Nashik, Shree Pratishtan's volunteer unit is swiftly deployed. Our volunteers pack and distribute warm blankets, clothing, dry rations, and basic medicines to support vulnerable citizens.",
    type: "photo"
  },
  {
    id: "sports-athletics",
    title: "Youth Athletics Meet & Awards",
    category: "sports",
    date: "January 2025",
    src: "/about_showcase.png",
    metric: "Youth Sports",
    description: "Annual athletics events, running races, and youth sportsmanship trophies in Indira Nagar.",
    details: "Promoting physical fitness and healthy habits among school and college students in Indira Nagar, Nashik with competitive running and athletics meets.",
    type: "photo"
  }
];

export function getGalleryItem(id: string): GalleryItem | undefined {
  const allItems = [...FEATURED_MEMORIES, ...PHOTO_ITEMS];
  return allItems.find(item => item.id === id);
}
