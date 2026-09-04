export interface EventMetric {
  label: string;
  value: string;
}

export interface EventAgendaItem {
  time: string;
  title: string;
  description: string;
}

export interface EventOrganizationDetail {
  heading: string;
  content: string;
}

export interface EventItem {
  id: string;
  title: string;
  tagline: string;
  category: "cultural" | "sports" | "health" | "eco" | "charity";
  categoryLabel: string;
  status: "upcoming" | "active" | "completed";
  date: string;
  time: string;
  location: string;
  mapUrl: string;
  mainImage: string;
  galleryImages: string[];
  description: string;
  metrics: EventMetric[];
  organizedDetails: EventOrganizationDetail[];
  agenda: EventAgendaItem[];
  organizerName: string;
  organizerPhone: string;
  organizerEmail: string;
  // Dynamic & SEO Fields
  metaTitle?: string;
  metaDescription?: string;
  rawStartDate?: string;
  rawEndDate?: string;
  regStartAt?: string;
  regEndAt?: string;
  mode?: "in-person" | "online" | "hybrid" | string;
  venueName?: string;
  address?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  timezone?: string;
  allDay?: boolean;
  virtualPlatform?: string;
  meetingUrl?: string;
  accessibilityNotes?: string;
  promoVideoUrl?: string;
  capacityNumber?: number;
  waitlistEnabled?: boolean;
  visibility?: string;
  checkInMode?: string;
  coHosts?: string[];
  tags?: string[];
  sponsors?: Array<{ name: string; logo?: string; link?: string; tier?: string }>;
  partners?: Array<{ name: string; logo?: string; link?: string }>;
  isRegistrationOpen?: boolean;
}

export const ALL_EVENTS: EventItem[] = [
  {
    id: "ganesh-utsav-2026",
    title: "Shree Ganeshotsav Grand Celebration 2026 (श्री गणेशोत्सव)",
    tagline: "10 Days of Devotion, Cultural Unity, and Grand Maha Aarti",
    category: "cultural",
    categoryLabel: "Cultural Festival",
    status: "upcoming",
    date: "Aug 27 – Sep 06, 2026",
    time: "06:00 AM – 11:00 PM Daily",
    location: "Shree Pratishtan Mandal, Indira Nagar Ground, Nashik",
    mapUrl: "https://maps.google.com/?q=Indira+Nagar+Nashik+Maharashtra",
    mainImage: "/images/ganesh-utsav.jpg",
    galleryImages: [
      "/images/ganesh-utsav.jpg",
      "/gallery_ganeshotsav_aarthi.png",
      "/hero_ganesh.png",
      "/ganeshotsav_backdrop.png",
      "/gallery_gauri_ganpati_decor.png",
    ],
    description:
      "Shree Pratishtan's signature annual festival uniting thousands of devotees across Indira Nagar and Nashik in traditional celebration, eco-friendly clay idol immersion, daily grand aarti, cultural plays, and hygienic Maha Prasad distribution.",
    metrics: [
      { label: "Expected Devotees", value: "50,000+" },
      { label: "Volunteer Marshals", value: "100+ Organizers" },
      { label: "Cultural Programs", value: "10 Days Drama & Music" },
      { label: "Prasad Distributed", value: "25,000 Meals" },
    ],
    organizedDetails: [
      {
        heading: "Community Planning & Municipal Approvals",
        content:
          "Full planning coordinated with Nashik Municipal Corporation, police clearances, fire safety audits, and structural inspections of the central Pandal with backup generators.",
      },
      {
        heading: "Eco-Friendly Shadu Clay Idol & Green Visarjan",
        content:
          "Continuing our environmental pledge, the central Bappa idol is sculpted using 100% natural eco-friendly clay (Shadu Mati) with organic colors, supported by artificial immersion tanks.",
      },
      {
        heading: "Crowd Safety, CCTV Surveillance & Medical Booths",
        content:
          "24/7 CCTV surveillance connected to our Indira Nagar coordination desk ensures safety for senior citizens and families alongside first-aid stations staffed by doctors.",
      },
      {
        heading: "Cultural Stages & Daily Maha Prasad Management",
        content:
          "Evenings feature traditional Maharashtrian devotional bhajans, Dhol Tasha rhythm, and youth performances with nutritious Maha Prasad served daily.",
      },
    ],
    agenda: [
      { time: "06:00 AM", title: "Prabhat Aarti & Morning Prayers", description: "Traditional morning prayers to commence the festival day." },
      { time: "11:00 AM", title: "Eco-Workshop & Children's Activity", description: "Interactive clay modeling and cultural sessions for local school students." },
      { time: "07:30 PM", title: "Grand Evening Maha Aarti", description: "Resonant 108-lamp aarti attended by community elders and youth." },
      { time: "09:00 PM", title: "Cultural Drama & Dhol Tasha Recital", description: "Live stage performances celebrating Maharashtra's rich legacy." },
    ],
    organizerName: "Shree Pratishtan Utsav Samiti",
    organizerPhone: "+91 9922786608",
    organizerEmail: "Info@shreepratishthan.com",
    venueName: "Shree Pratishtan Grand Pandal Arena, Nashik",
    rawStartDate: "2026-08-27T06:00:00Z",
    rawEndDate: "2026-09-06T23:00:00Z",
    regStartAt: "2026-08-01T00:00:00Z",
    regEndAt: "2026-08-25T23:59:59Z",
    capacityNumber: 50000,
    waitlistEnabled: true,
  },

  {
    id: "gudipadwa-swagat-yatra-2026",
    title: "Gudipadwa Bhavya Swagat Yatra (गुढीपाडवा भव्य स्वागत यात्रा)",
    tagline: "Grand Marathi New Year Procession, Traditional Attire & Lezim Beats",
    category: "cultural",
    categoryLabel: "Cultural Festival",
    status: "upcoming",
    date: "Mar 19, 2026",
    time: "06:30 AM – 12:30 PM",
    location: "Indira Nagar Main Avenue to Rane Nagar, Nashik",
    mapUrl: "https://maps.google.com/?q=Indira+Nagar+Nashik+Maharashtra",
    mainImage: "/images/swagat-yatra.jpg",
    galleryImages: [
      "/images/swagat-yatra.jpg",
      "/gallery_dhol_tasha_camps.png",
      "/hero_ganesh.png",
      "/community_assembly.png",
    ],
    description:
      "A magnificent cultural procession celebrating the Marathi New Year (Chaitra Pratipada) with traditional Pheta headgear, colorful Rangoli along the entire route, women bike rallies, dynamic Lezim troupes, and resounding Dhol Tasha beats across Indira Nagar.",
    metrics: [
      { label: "Procession Route", value: "3.5 km" },
      { label: "Participating Citizens", value: "15,000+" },
      { label: "Dhol Tasha & Lezim", value: "200+ Artists" },
      { label: "Traditional Floats", value: "12 Tableaux" },
    ],
    organizedDetails: [
      {
        heading: "Route Coordination & Traffic Management",
        content:
          "Planned in close coordination with Nashik Traffic Police to provide seamless procession movement, water stations, and safety corridors for all participating families.",
      },
      {
        heading: "Traditional Floats & Historical Tableaux",
        content:
          "Live floats portraying Chhatrapati Shivaji Maharaj's Swarajya, saint poets of Maharashtra, and social icons to inspire the younger generation.",
      },
    ],
    agenda: [
      { time: "06:30 AM", title: "Gudhi Pujan & Auspicious Flag-Off", description: "Traditional pujan at Shree Pratishtan Seva Kendra." },
      { time: "07:30 AM", title: "Grand Swagat Yatra Procession Commences", description: "Women in Nauvari sarees, youth in traditional kurta pheta leading the yatra." },
      { time: "10:30 AM", title: "Lezim & Dhol Tasha Grand Finale", description: "High-energy synchronized performance at the main junction." },
      { time: "12:00 PM", title: "Prasad & Neem-Jaggery Distribution", description: "Traditional prasad served to all participants." },
    ],
    organizerName: "Shree Pratishtan Swagat Yatra Committee",
    organizerPhone: "+91 9922786608",
    organizerEmail: "Info@shreepratishthan.com",
  },

  {
    id: "navratri-garba-2026",
    title: "Navratri Utsav & Dandiya Nights (नवरात्रौत्सव)",
    tagline: "Nine Nights of Tradition, Devotion, and Traditional Folk Dance",
    category: "cultural",
    categoryLabel: "Cultural Festival",
    status: "upcoming",
    date: "Sep 22 – Oct 02, 2026",
    time: "07:30 PM – 11:30 PM Daily",
    location: "Indira Nagar Sports Complex, Nashik",
    mapUrl: "https://maps.google.com/?q=Indira+Nagar+Nashik+Maharashtra",
    mainImage: "/gallery_navratri_garba.png",
    galleryImages: [
      "/gallery_navratri_garba.png",
      "/hero_navratri.png",
      "/community_assembly.png",
    ],
    description:
      "A vibrant celebration of Goddess Durga featuring authentic traditional Garba and Raas Dandiya, live traditional folk singers, ethnic dress competitions, safe family-friendly arenas, and social felicitation programs.",
    metrics: [
      { label: "Nightly Dancers", value: "5,000+" },
      { label: "Live Folk Orchestra", value: "Traditional Troupe" },
      { label: "Family Safety", value: "100% CCTV & Marshals" },
      { label: "Daily Best Attire", value: "Community Awards" },
    ],
    organizedDetails: [
      {
        heading: "Family Safety & Dedicated Women Security",
        content:
          "Women marshals, well-lit entry avenues, and token verification ensure absolute safety and a joyful family atmosphere every night.",
      },
      {
        heading: "Smooth Wooden & Anti-Skid Dance Flooring",
        content:
          "Over 20,000 sq. ft. of clean anti-skid wooden flooring laid out to allow uninterrupted and injury-free folk dancing for all age groups.",
      },
    ],
    agenda: [
      { time: "07:30 PM", title: "Goddess Durga Aarti & Lamp Lighting", description: "Daily evening aarti to invoke blessings." },
      { time: "08:15 PM", title: "Traditional Raas & Garba Round", description: "Graceful folk dances accompanied by live percussion." },
      { time: "09:45 PM", title: "High-Energy Dandiya Round", description: "Synchronized stick dance celebrations." },
      { time: "11:15 PM", title: "Daily Traditional Attire Felicitation", description: "Prizes awarded for authentic traditional costumes." },
    ],
    organizerName: "Shree Pratishtan Cultural Wing",
    organizerPhone: "+91 9922786608",
    organizerEmail: "Info@shreepratishthan.com",
  },

  {
    id: "shiv-jayanti-2026",
    title: "Chhatrapati Shivaji Maharaj Jayanti (शिवजयंती)",
    tagline: "Inspiring Youth Rallies, Tribute to Swarajya & Historical Exhibitions",
    category: "cultural",
    categoryLabel: "Historical & Youth",
    status: "upcoming",
    date: "Feb 19, 2026",
    time: "07:00 AM – 09:30 PM",
    location: "Shivaji Statue Chowk, Indira Nagar, Nashik",
    mapUrl: "https://maps.google.com/?q=Indira+Nagar+Nashik+Maharashtra",
    mainImage: "/community_assembly.png",
    galleryImages: [
      "/community_assembly.png",
      "/hero_ganesh.png",
      "/gallery_dhol_tasha_camps.png",
    ],
    description:
      "A grand youth commemoration honoring Chhatrapati Shivaji Maharaj with morning Rajyabhishek re-enactments, inspiring speeches on Shivaji Maharaj's administrative governance, weapon display demonstrations (Mardani Khel), and blood donation drives.",
    metrics: [
      { label: "Youth Participants", value: "8,000+" },
      { label: "Historical Exhibitions", value: "Forts of Swarajya" },
      { label: "Mardani Khel Artists", value: "50+ Demonstrators" },
      { label: "Public Lecture Attendance", value: "3,000+ Citizens" },
    ],
    organizedDetails: [
      {
        heading: "Mardani Khel Martial Arts Demonstrations",
        content:
          "Trained youth performers demonstrate traditional lathi-kathi, sword fighting (talwarbaji), and shield defense arts to preserve Maratha martial heritage.",
      },
      {
        heading: "Historical Book Stalls & Student Quiz",
        content:
          "History book distribution and student inter-school quiz competitions on Swarajya forts and naval history.",
      },
    ],
    agenda: [
      { time: "07:00 AM", title: "Shivaji Maharaj Statue Pujan & Garlanding", description: "Solemn floral tribute with traditional Tutari and Dhol beats." },
      { time: "10:00 AM", title: "Mardani Khel Martial Arts Showcase", description: "Demonstration of traditional Maratha martial weapons." },
      { time: "06:00 PM", title: "Public Keynote Lecture on Shivaji's Governance", description: "Eminent historian address for youth." },
      { time: "08:00 PM", title: "Torch Rally (Mashaal Yatra)", description: "Inspirational youth march through Indira Nagar." },
    ],
    organizerName: "Shree Pratishtan Shiv Jayanti Samiti",
    organizerPhone: "+91 9922786608",
    organizerEmail: "Info@shreepratishthan.com",
  },

  {
    id: "dr-ambedkar-jayanti-2026",
    title: "Dr. Babasaheb Ambedkar Jayanti (डॉ. बाबासाहेब आंबेडकर जयंती)",
    tagline: "Social Equality Seminars, Book Distribution & Academic Honors",
    category: "charity",
    categoryLabel: "Social Harmony & Education",
    status: "upcoming",
    date: "Apr 14, 2026",
    time: "08:30 AM – 06:00 PM",
    location: "Pratishtan Seva Bhavan, Indira Nagar, Nashik",
    mapUrl: "https://maps.google.com/?q=Indira+Nagar+Nashik+Maharashtra",
    mainImage: "/volunteer_coordinator.png",
    galleryImages: [
      "/volunteer_coordinator.png",
      "/community_assembly.png",
      "/portrait_volunteer.png",
    ],
    description:
      "Celebrating the birth anniversary of Bharat Ratna Dr. B. R. Ambedkar through social harmony symposiums, distribution of free school books to underprivileged students, blood donation drives, and academic excellence felicitation for local students.",
    metrics: [
      { label: "Students Honored", value: "300+ Meritorious Students" },
      { label: "Books & Kits Distributed", value: "1,500+ Notebooks" },
      { label: "Health Consultations", value: "500+ Free Checkups" },
      { label: "Community Harmony Reach", value: "Whole Indira Nagar" },
    ],
    organizedDetails: [
      {
        heading: "Educational Kit Distribution Drive",
        content:
          "Free distribution of complete notebook sets, geometry boxes, and bags to primary and secondary school students from low-income families.",
      },
      {
        heading: "Merit Felicitation Program",
        content:
          "Annual award ceremony honoring 10th and 12th board high scorers from the Indira Nagar locality.",
      },
    ],
    agenda: [
      { time: "08:30 AM", title: "Floral Tribute & Constitution Reading", description: "Reading the Preamble of the Constitution of India." },
      { time: "11:00 AM", title: "Educational Kits Distribution", description: "Handing over study materials to school students." },
      { time: "03:00 PM", title: "Academic Merit Felicitation Ceremony", description: "Awards and certificates presented to top students." },
      { time: "05:00 PM", title: "Social Equality Seminar", description: "Discussions on youth education and community upliftment." },
    ],
    organizerName: "Shree Pratishtan Social Wing",
    organizerPhone: "+91 9922786608",
    organizerEmail: "Info@shreepratishthan.com",
  },

  {
    id: "blood-donation-camp-2026",
    title: "Bhavya Blood Donation & Health Camp (भव्य रक्तदान शिबिर)",
    tagline: "50+ Camp Legacy: Saving Lives in Partnership with Nashik Civil Hospital",
    category: "health",
    categoryLabel: "Healthcare & Life Drive",
    status: "upcoming",
    date: "Aug 30, 2026",
    time: "08:00 AM – 04:00 PM",
    location: "Indira Nagar Community Hall, Nashik",
    mapUrl: "https://maps.google.com/?q=Indira+Nagar+Nashik+Maharashtra",
    mainImage: "/volunteer_medical.png",
    galleryImages: [
      "/volunteer_medical.png",
      "/community_assembly.png",
      "/volunteer_coordinator.png",
    ],
    description:
      "Continuing Shree Pratishtan's landmark legacy of 50+ blood donation camps, organized in direct collaboration with Nashik Civil Hospital Blood Bank, Red Cross Blood Center, and Arpan Blood Bank to maintain critical emergency blood supplies.",
    metrics: [
      { label: "Target Blood Units", value: "250+ Units" },
      { label: "Past Camps Legacy", value: "50+ Camps Held" },
      { label: "Donor Volunteers", value: "1,500+ Registered" },
      { label: "Free Diagnostic Screenings", value: "Blood Sugar & BP" },
    ],
    organizedDetails: [
      {
        heading: "Hospital Collaboration & Certified Phlebotomists",
        content:
          "Medical officers and phlebotomists from Nashik Civil Hospital and Red Cross ensure 100% sterile single-use equipment and rapid donor recovery care.",
      },
      {
        heading: "Emergency Blood Donor Registry",
        content:
          "Every donor is cataloged in Shree Pratishtan's 24/7 Indira Nagar donor helpline to facilitate urgent transfusions during emergency hospital calls.",
      },
    ],
    agenda: [
      { time: "08:00 AM", title: "Camp Inauguration & Medical Briefing", description: "Inauguration by medical superintendents and team leads." },
      { time: "08:30 AM", title: "Donor Registration & Screening Starts", description: "Hemoglobin test, blood pressure, and donor fitness check." },
      { time: "01:00 PM", title: "Donor Refreshment & Certificate Handover", description: "Nutritious refreshments, juice, and official trust certificate." },
      { time: "04:00 PM", title: "Cold-Chain Blood Transport to Civil Hospital", description: "Safe transfer of blood units to regional hospital reserves." },
    ],
    organizerName: "Shree Pratishtan Arogya Seva Wing",
    organizerPhone: "+91 9922786608",
    organizerEmail: "Info@shreepratishthan.com",
  },

  {
    id: "yoga-day-health-camp-2026",
    title: "International Yoga Day & Free Health Checkup (योग दिन व आरोग्य शिबिर)",
    tagline: "Holistic Wellness, Guided Asanas & Specialized Doctor Diagnostics",
    category: "health",
    categoryLabel: "Wellness & Health",
    status: "upcoming",
    date: "Jun 21, 2026",
    time: "06:00 AM – 02:00 PM",
    location: "Indira Nagar Public Sports Ground, Nashik",
    mapUrl: "https://maps.google.com/?q=Indira+Nagar+Nashik+Maharashtra",
    mainImage: "/portrait_volunteer.png",
    galleryImages: [
      "/portrait_volunteer.png",
      "/volunteer_medical.png",
      "/community_assembly.png",
    ],
    description:
      "A mass community health morning combining guided Common Yoga Protocol asanas with specialized medical consultations in orthopedics, cardiology, ophthalmology, and free medicine distribution for senior citizens.",
    metrics: [
      { label: "Yoga Participants", value: "1,200+ Citizens" },
      { label: "Visiting Specialist Doctors", value: "15 Doctors" },
      { label: "Free Eye Checkups", value: "400+ Screenings" },
      { label: "Free Medicines Provided", value: "600+ Patients" },
    ],
    organizedDetails: [
      {
        heading: "Expert Yoga Instructors & Certified Asanas",
        content:
          "Experienced yoga teachers lead Suryanamaskar, Pranayama, and meditation sessions tailored for beginners, women, and seniors.",
      },
      {
        heading: "Multi-Speciality Diagnostic Desks",
        content:
          "Desks for blood pressure, blood glucose, ECG, vision testing, and dietary consultation with free basic medicines.",
      },
    ],
    agenda: [
      { time: "06:00 AM", title: "Mass Community Yoga & Pranayama", description: "Guided 60-minute yoga and breathing session." },
      { time: "07:30 AM", title: "Health & Nutrition Talk by Cardiologist", description: "Preventative heart health guidance for families." },
      { time: "08:30 AM", title: "Specialist Health Checkup Counters Open", description: "Free consultations across general medicine, eye, and ortho." },
      { time: "01:30 PM", title: "Free Prescription Medicine Distribution", description: "Dispensing prescribed basic medicines to patients in need." },
    ],
    organizerName: "Shree Pratishtan Health Wing",
    organizerPhone: "+91 9922786608",
    organizerEmail: "Info@shreepratishthan.com",
  },

  {
    id: "cricket-tournament-2026",
    title: "Annual Sports & Cricket Tournament (क्रीडा स्पर्धा व क्रिकेट महोत्सव)",
    tagline: "Celebrating 2006 Founding Sports Roots with High-Energy Competitive Leagues",
    category: "sports",
    categoryLabel: "Sports & Youth Tournament",
    status: "upcoming",
    date: "Dec 18 – Dec 25, 2026",
    time: "08:00 AM – 06:00 PM Daily",
    location: "Indira Nagar Cricket Arena, Nashik",
    mapUrl: "https://maps.google.com/?q=Indira+Nagar+Nashik+Maharashtra",
    mainImage: "/hero_dahihandi.png",
    galleryImages: [
      "/hero_dahihandi.png",
      "/community_assembly.png",
      "/gallery_dahi_handi_pyramids.png",
    ],
    description:
      "Honoring Shree Pratishtan's 2006 founding origin—where 20 friends playing cricket transformed sports bonding into social service. A premier annual tennis-ball cricket championship attracting top youth teams from across Nashik district with grand trophies and player felicitation.",
    metrics: [
      { label: "Participating Teams", value: "32 Teams" },
      { label: "Youth Players", value: "450+ Cricketers" },
      { label: "Championship Prize Pool", value: "₹1,50,000" },
      { label: "Legacy Years", value: "19+ Years Heritage" },
    ],
    organizedDetails: [
      {
        heading: "Professional Tournament Infrastructure",
        content:
          "Matting pitch, certified leather/tennis balls, professional umpires, electronic live scoreboards, and commentary setup.",
      },
      {
        heading: "Youth Sportsmanship & Player Health Support",
        content:
          "First-aid medical corner, sports physiotherapists on site, energy drinks, and certificates for all participating athletes.",
      },
    ],
    agenda: [
      { time: "08:00 AM", title: "Tournament Inauguration & Toss", description: "Opening match flag-off with founding cricket veterans." },
      { time: "10:00 AM", title: "League Stage Fixtures", description: "8 matches daily on simultaneous marked grounds." },
      { time: "03:30 PM", title: "Quarter-Finals & Semi-Final Clashes", description: "Knockout rounds with live commentary." },
      { time: "05:00 PM", title: "Grand Final & Trophy Presentation", description: "Felicitation of winners, best batsman, and best bowler." },
    ],
    organizerName: "Shree Pratishtan Sports Committee",
    organizerPhone: "+91 9922786608",
    organizerEmail: "Info@shreepratishthan.com",
  },

  {
    id: "civic-welfare-relief-2026",
    title: "Student Study Kits & Community Welfare Drive (सेवाभावी उपक्रम)",
    tagline: "Educational Support, Winter Clothing Distribution & Community Aid",
    category: "charity",
    categoryLabel: "Social Welfare",
    status: "completed",
    date: "Jul 15, 2026",
    time: "09:00 AM – 05:00 PM",
    location: "Indira Nagar & Nashik District Municipal Schools",
    mapUrl: "https://maps.google.com/?q=Indira+Nagar+Nashik+Maharashtra",
    mainImage: "/volunteer_disaster.png",
    galleryImages: [
      "/volunteer_disaster.png",
      "/portrait_volunteer.png",
      "/community_assembly.png",
    ],
    description:
      "A dedicated community outreach initiative distributing study kits, school bags, notebooks, and winter clothing to students and vulnerable families in Indira Nagar and nearby rural schools across Nashik district.",
    metrics: [
      { label: "Study Kits Distributed", value: "2,500+ Kits" },
      { label: "Families Supported", value: "1,500+ Families" },
      { label: "Warm Blankets Donated", value: "3,000+ Blankets" },
      { label: "Schools Covered", value: "15 Schools" },
    ],
    organizedDetails: [
      {
        heading: "Direct School Outreach & Survey",
        content:
          "Volunteers partnered with municipal and rural teachers to identify students in need of educational stationery, bags, and shoes.",
      },
    ],
    agenda: [
      { time: "09:00 AM", title: "Relief Team Assembly & Kit Packing", description: "Sorting notebooks and study kits at Mandal office." },
      { time: "11:00 AM", title: "School Distribution Phase 1", description: "Handover of educational kits to primary school students." },
      { time: "02:00 PM", title: "Family Ration & Blanket Handover", description: "Distribution of relief supplies to senior citizens." },
      { time: "05:00 PM", title: "Volunteer Debrief & Next Phase Planning", description: "Reviewing distribution logs and community feedback." },
    ],
    organizerName: "Shree Pratishtan Seva Cell",
    organizerPhone: "+91 9922786608",
    organizerEmail: "Info@shreepratishthan.com",
  },
];

export function getEventById(id: string): EventItem | undefined {
  return ALL_EVENTS.find((e) => e.id === id);
}

export function getAllEvents(): EventItem[] {
  return ALL_EVENTS;
}

export function getUpcomingEvents(): EventItem[] {
  return ALL_EVENTS.filter((e) => e.status === "upcoming");
}

export function getFeaturedEvents(): EventItem[] {
  return ALL_EVENTS.slice(0, 4);
}
