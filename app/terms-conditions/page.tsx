import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Scale, Users, HeartHandshake, ShieldAlert, Award, FileCheck, MapPin, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Shree Pratishtan (श्री प्रतिष्ठान)",
  description:
    "Terms and Conditions governing the use of the Shree Pratishtan portal, event participation, donations, and volunteer conduct for Late Dharmaraj Badode Bahuuddeshiya Sevabhavi Sanstha, Indira Nagar, Nashik.",
  openGraph: {
    title: "Terms & Conditions | Shree Pratishtan (श्री प्रतिष्ठान)",
    description:
      "Terms & Conditions and community guidelines of Shree Pratishtan, Indira Nagar, Nashik.",
    url: "https://www.shreepratishthan.com/terms-conditions",
    images: [{ url: "/hero_ganesh.png", width: 1200, height: 630, alt: "Shree Pratishtan Terms & Conditions" }],
  },
  twitter: {
    title: "Terms & Conditions | Shree Pratishtan (श्री प्रतिष्ठान)",
    description: "Terms of service and event guidelines for Shree Pratishtan, Nashik.",
    images: ["/hero_ganesh.png"],
  },
  alternates: { canonical: "https://www.shreepratishthan.com/terms-conditions" },
};

export default function TermsConditionsPage() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-background text-foreground">
      {/* 1. Full-Width Hero Header */}
      <section className="relative pt-36 pb-20 px-6 md:px-12 lg:px-16 overflow-hidden bg-background border-b border-saffron/10">
        <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-60" />
        <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 translate-y-10" />

        <div className="max-w-[1600px] w-full mx-auto relative z-10">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-saffron/10 text-saffron font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-saffron/20">
              <Scale className="w-4 h-4" />
              <span>Community Governance &amp; Terms</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight font-heading leading-tight">
              Terms &amp; <span className="text-saffron text-outline-festive">Conditions</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-grey leading-relaxed">
              Rules, community expectations, sportsmanship standards, and legal guidelines governing our events, volunteer engagement, and online portal.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-semibold">
              <span className="bg-white/80 border border-slate-200 px-3 py-1.5 rounded-lg">Last Updated: August 2026</span>
              <span className="bg-white/80 border border-slate-200 px-3 py-1.5 rounded-lg">Entity: कै.धर्मराज बडोदे बहुउद्देशिय सेवाभावी संस्था (Reg: nashik/0000153/2018)</span>
              <span className="bg-white/80 border border-slate-200 px-3 py-1.5 rounded-lg">Jurisdiction: Nashik, Maharashtra</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Expansive Full-Width Content Grid */}
      <section className="py-20 px-6 md:px-12 lg:px-16 relative z-10 max-w-[1600px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Left Column: Summary Card */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel p-8 rounded-block bg-white border border-saffron/20 shadow-xl space-y-6 sticky top-28">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-saffron bg-saffron/10 border border-saffron/20 px-3 py-1 rounded-full">
                  Terms Summary
                </span>
                <h3 className="text-xl font-extrabold text-foreground font-heading mt-4">
                  Key Principles
                </h3>
              </div>

              <div className="space-y-4 text-sm text-slate-grey">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <FileCheck className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                  <span><strong>Cultural Harmony:</strong> Strict adherence to peaceful conduct, marshal instructions, and eco-friendly celebrations.</span>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <Award className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                  <span><strong>Sportsmanship:</strong> Fair play and mutual respect in our annual 32-team cricket tournaments.</span>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <HeartHandshake className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                  <span><strong>Honorary Seva:</strong> All volunteer contributions are strictly selfless and dedicated to public welfare.</span>
                </div>
              </div>

              <div className="pt-4 border-t border-saffron/15 space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-foreground">Official Inquiries</h4>
                <div className="space-y-2 text-xs text-slate-grey">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-saffron shrink-0" />
                    <a href="mailto:Info@shreepratishthan.com" className="text-saffron font-bold hover:underline">
                      Info@shreepratishthan.com
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-saffron shrink-0" />
                    <a href="tel:+919922786608" className="text-saffron font-bold hover:underline">
                      +91 9922786608
                    </a>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
                    <span>Indira Nagar, Nashik, Maharashtra 422009</span>
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="w-full bg-saffron hover:bg-saffron/90 text-white font-extrabold text-xs uppercase tracking-widest py-3 rounded-full transition-all duration-300 active:scale-95 text-center block shadow-md shadow-saffron/20"
                >
                  Contact Administration
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Full-Width Detailed Articles */}
          <div className="lg:col-span-8 space-y-8">

            {/* Section 1: Acceptance */}
            <div className="glass-panel p-8 sm:p-10 rounded-block bg-white border border-saffron/15 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-saffron/10 border border-saffron/20 flex items-center justify-center text-saffron">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground font-heading">
                    1. Acceptance of Terms
                  </h2>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Binding Agreement</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-grey leading-relaxed">
                By accessing the website of <strong>Shree Pratishtan (श्री प्रतिष्ठान)</strong> or participating in any community drives, festival celebrations, sports leagues, or voluntary blood donation camps organized by <strong>कै.धर्मराज बडोदे बहुउद्देशिय सेवाभावी संस्था इंदिरानगर नाशिक</strong> (Reg No: <code>nashik/0000153/2018</code>), you agree to be bound by these Terms and Conditions.
              </p>
              <p className="text-sm sm:text-base text-slate-grey leading-relaxed">
                If you do not agree with these terms, please refrain from using our online portal or registering for our public programs.
              </p>
            </div>

            {/* Section 2: Cultural Events */}
            <div className="glass-panel p-8 sm:p-10 rounded-block bg-white border border-saffron/15 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-saffron/10 border border-saffron/20 flex items-center justify-center text-saffron">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground font-heading">
                    2. Cultural &amp; Festival Event Guidelines
                  </h2>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Festival Discipline</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-grey leading-relaxed">
                When attending our events in Indira Nagar and Nashik (including Gudipadwa Swagat Yatra, Shree Ganeshotsav, Shiv Jayanti, and Navratri Garba):
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-extrabold text-foreground text-sm font-heading flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-saffron" />
                    Public Harmony
                  </h3>
                  <p className="text-xs text-slate-grey leading-relaxed">
                    All participants must uphold peace, communal harmony, mutual respect, and cultural dignity at all times.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-extrabold text-foreground text-sm font-heading flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-saffron" />
                    Marshal Directives
                  </h3>
                  <p className="text-xs text-slate-grey leading-relaxed">
                    Attendees must follow the instructions of our 100+ active volunteer marshals and police authorities.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-extrabold text-foreground text-sm font-heading flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-saffron" />
                    Eco Preservation
                  </h3>
                  <p className="text-xs text-slate-grey leading-relaxed">
                    100% Shadu Mati clay idols, zero plastic littering, and post-event ground cleaning are strictly enforced.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Annual Sports */}
            <div className="glass-panel p-8 sm:p-10 rounded-block bg-white border border-saffron/15 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-saffron/10 border border-saffron/20 flex items-center justify-center text-saffron">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground font-heading">
                    3. Annual Sports Tournaments &amp; Fair Play
                  </h2>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Athletic Brotherhood</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-grey leading-relaxed">
                Our sports roots began in 2006 with daily cricket among 20 childhood friends in Indira Nagar. Teams participating in our annual 32-team cricket championship must adhere to strict sportsmanship:
              </p>
              <ul className="space-y-2 pt-2 text-sm sm:text-base text-slate-grey list-disc pl-5">
                <li>All players must abide by umpire and referee decisions as final and binding.</li>
                <li>Unsporting conduct, foul language, or altercations result in immediate tournament disqualification.</li>
                <li>Roster verification and age eligibility must be submitted accurately prior to match fixtures.</li>
              </ul>
            </div>

            {/* Section 4: Volunteer Conduct */}
            <div className="glass-panel p-8 sm:p-10 rounded-block bg-white border border-saffron/15 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-saffron/10 border border-saffron/20 flex items-center justify-center text-saffron">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground font-heading">
                    4. Volunteer Code of Conduct
                  </h2>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Ethics of Seva</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-grey leading-relaxed">
                Volunteers representing Shree Pratishtan act as ambassadors of selfless social service (*वारसा संस्कृतीचा, ध्यास समाजसेवेचा*):
              </p>
              <ul className="space-y-2 pt-2 text-sm sm:text-base text-slate-grey list-disc pl-5">
                <li>Volunteering is honorary, voluntary, and non-remunerative.</li>
                <li>Volunteers must treat all citizens, beneficiaries, and blood donors with empathy, dignity, and fairness.</li>
                <li>No volunteer is authorized to collect personal donations or misrepresent the organization.</li>
              </ul>
            </div>

            {/* Section 5: Donations & Governance */}
            <div className="glass-panel p-8 sm:p-10 rounded-block bg-white border border-saffron/15 shadow-xl space-y-4">
              <h2 className="text-2xl font-extrabold text-foreground font-heading">
                5. Donations, Banking &amp; Financial Governance
              </h2>
              <p className="text-sm sm:text-base text-slate-grey leading-relaxed">
                All voluntary contributions to Shree Pratishtan are managed with absolute transparency under official trust accounts:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-slate-grey list-disc pl-5">
                <li><strong>Banking Partner:</strong> Official transactions are processed through <strong>Samarth Sahakari Bank (समर्थ बँक)</strong>.</li>
                <li><strong>Official Receipts:</strong> Valid receipts bearing trust registration <code>nashik/0000153/2018</code> are issued for all contributions.</li>
                <li><strong>Charitable Application:</strong> Funds are deployed directly towards health camps, student study kits, tree planting, and cultural festivals.</li>
              </ul>
            </div>

            {/* Section 6: Jurisdiction */}
            <div className="glass-panel p-8 sm:p-10 rounded-block bg-white border border-saffron/15 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-saffron/10 border border-saffron/20 flex items-center justify-center text-saffron">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground font-heading">
                    6. Governing Law &amp; Jurisdiction
                  </h2>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Legal Framework</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-grey leading-relaxed">
                These Terms and Conditions are governed by the laws of India and the Maharashtra Public Trusts Act. Any legal disputes arising in connection with the trust or portal are subject exclusively to the jurisdiction of the competent courts of <strong>Nashik, Maharashtra</strong>.
              </p>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}
