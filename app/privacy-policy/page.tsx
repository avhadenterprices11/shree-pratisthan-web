import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Shree Pratishtan (श्री प्रतिष्ठान)",
  description:
    "Privacy Policy for Shree Pratishtan (कै.धर्मराज बडोदे बहुउद्देशिय सेवाभावी संस्था), Indira Nagar, Nashik. Learn how we handle volunteer data, donations, and event communications with utmost confidentiality.",
  openGraph: {
    title: "Privacy Policy | Shree Pratishtan (श्री प्रतिष्ठान)",
    description:
      "Confidentiality, security, and privacy practices of Shree Pratishtan in Indira Nagar, Nashik.",
    url: "https://www.shreepratishthan.com/privacy-policy",
    images: [{ url: "/hero_ganesh.png", width: 1200, height: 630, alt: "Shree Pratishtan Privacy Policy" }],
  },
  twitter: {
    title: "Privacy Policy | Shree Pratishtan (श्री प्रतिष्ठान)",
    description: "Confidentiality and data privacy policy of Shree Pratishtan, Nashik.",
    images: ["/hero_ganesh.png"],
  },
  alternates: { canonical: "https://www.shreepratishthan.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-background text-foreground">
      {/* 1. Full-Width Hero Header */}
      <section className="relative pt-36 pb-20 px-6 md:px-12 lg:px-16 overflow-hidden bg-background border-b border-saffron/10">
        <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-60" />
        <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 translate-y-10" />

        <div className="max-w-[1600px] w-full mx-auto relative z-10">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-saffron/10 text-saffron font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-saffron/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Transparency Policy</span>
            </div>

            <h1 className="text-[32px] sm:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight font-heading leading-tight">
              Privacy <span className="text-saffron text-outline-festive">Policy</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-grey dark:text-neutral-300 leading-relaxed">
              Transparency, devotion, and community trust form the foundation of Shree Pratishtan. Learn how we safeguard your personal data across all seva drives and festivals.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-neutral-400 font-semibold">
              <span className="bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg">Last Updated: August 2026</span>
              <span className="bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg">Entity: कै.धर्मराज बडोदे बहुउद्देशिय सेवाभावी संस्था (Reg: nashik/0000153/2018)</span>
              <span className="bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg">President: Adv. Shyam Dharmaraj Badode</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Expansive Full-Width Content Grid */}
      <section className="py-20 px-6 md:px-12 lg:px-16 relative z-10 max-w-[1600px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Left Column: Key Highlights & Quick Contact Card */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel p-8 rounded-block bg-white dark:bg-[#121214] border border-saffron/20 dark:border-white/10 shadow-xl space-y-6 sticky top-28">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-saffron bg-saffron/10 border border-saffron/20 px-3 py-1 rounded-full">
                  Policy Summary
                </span>
                <h3 className="text-xl font-extrabold text-foreground font-heading mt-4">
                  Our Privacy Commitments
                </h3>
              </div>

              <div className="space-y-4 text-sm text-slate-grey dark:text-neutral-300">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                  <span><strong>Zero Commercial Sale:</strong> We never sell, rent, or trade your data to third-party marketers.</span>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                  <span><strong>Dedicated Seva Purpose:</strong> Data is used strictly for festival coordination, emergency blood donor alerts, and receipts.</span>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                  <span><strong>Audited Institutions:</strong> Only shared with Nashik Civil Hospital and Samarth Sahakari Bank for official records.</span>
                </div>
              </div>

              <div className="pt-4 border-t border-saffron/15 dark:border-white/10 space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-foreground">Have Questions?</h4>
                <div className="space-y-2 text-xs text-slate-grey dark:text-neutral-400">
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
                  Contact Desk
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Full-Width Detailed Articles */}
          <div className="lg:col-span-8 space-y-8">

            {/* Section 1: Overview */}
            <div className="glass-panel p-8 sm:p-10 rounded-block bg-white dark:bg-[#121214] border border-saffron/15 dark:border-white/10 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-saffron/10 border border-saffron/20 flex items-center justify-center text-saffron">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground font-heading">
                    1. Introduction &amp; Trust Identity
                  </h2>
                  <span className="text-xs text-slate-400 dark:text-neutral-400 font-bold uppercase tracking-wider">Governing Framework</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-grey dark:text-neutral-300 leading-relaxed">
                This Privacy Policy applies to the official web portal and services of <strong>Shree Pratishtan (श्री प्रतिष्ठान)</strong>, registered under the Maharashtra Public Trusts framework as <strong>कै.धर्मराज बडोदे बहुउद्देशिय सेवाभावी संस्था इंदिरानगर नाशिक</strong> (Registration No: <code>nashik/0000153/2018</code>), founded in 2006 under the presidency of <strong>Adv. Shyam Dharmaraj Badode</strong>.
              </p>
              <p className="text-sm sm:text-base text-slate-grey dark:text-neutral-300 leading-relaxed">
                We respect your privacy and are committed to protecting the personal information you share with us when registering as a volunteer, submitting inquiries, booking event slots, or donating towards social, cultural, and sports initiatives in Indira Nagar, Nashik.
              </p>
            </div>

            {/* Section 2: Information We Collect */}
            <div className="glass-panel p-8 sm:p-10 rounded-block bg-white dark:bg-[#121214] border border-saffron/15 dark:border-white/10 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-saffron/10 border border-saffron/20 flex items-center justify-center text-saffron">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground font-heading">
                    2. Information We Collect
                  </h2>
                  <span className="text-xs text-slate-400 dark:text-neutral-400 font-bold uppercase tracking-wider">Data Categories</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-grey dark:text-neutral-300 leading-relaxed">
                We only collect information that is strictly necessary for organizing social drives, coordinating festival safety corridors, and managing community assistance:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-white/10 space-y-2">
                  <h3 className="font-extrabold text-foreground text-sm font-heading flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-saffron" />
                    Contact Inquiries
                  </h3>
                  <p className="text-xs text-slate-grey dark:text-neutral-400 leading-relaxed">
                    Full name, email address, phone number, and message contents submitted via our contact desk.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-white/10 space-y-2">
                  <h3 className="font-extrabold text-foreground text-sm font-heading flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-saffron" />
                    Volunteer Registration
                  </h3>
                  <p className="text-xs text-slate-grey dark:text-neutral-400 leading-relaxed">
                    Name, age, contact details, preferred seva area (festivals, 50+ blood camps, tree drives, sports), emergency contact, and availability.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-white/10 space-y-2">
                  <h3 className="font-extrabold text-foreground text-sm font-heading flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-saffron" />
                    Event &amp; Festival Bookings
                  </h3>
                  <p className="text-xs text-slate-grey dark:text-neutral-400 leading-relaxed">
                    Participant name, phone number, residential address/zone in Nashik, and festival slot details.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-white/10 space-y-2">
                  <h3 className="font-extrabold text-foreground text-sm font-heading flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-saffron" />
                    Blood Donation Drives
                  </h3>
                  <p className="text-xs text-slate-grey dark:text-neutral-400 leading-relaxed">
                    Blood group, voluntary consent, and donor contact details maintained in coordination with Nashik Civil Hospital Blood Bank.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: How We Use Your Information */}
            <div className="glass-panel p-8 sm:p-10 rounded-block bg-white dark:bg-[#121214] border border-saffron/15 dark:border-white/10 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-saffron/10 border border-saffron/20 flex items-center justify-center text-saffron">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground font-heading">
                    3. How We Use Your Information
                  </h2>
                  <span className="text-xs text-slate-400 dark:text-neutral-400 font-bold uppercase tracking-wider">Purpose &amp; Processing</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-grey dark:text-neutral-300 leading-relaxed">
                Your personal information is used exclusively for legitimate non-profit, cultural preservation, and charitable community purposes:
              </p>
              <ul className="space-y-2.5 pt-2 text-sm sm:text-base text-slate-grey dark:text-neutral-300 list-disc pl-5">
                <li>To deploy volunteer marshals during Gudipadwa Swagat Yatra, Ganeshotsav, and Shiv Jayanti.</li>
                <li>To alert voluntary blood donors during emergency requests at Nashik regional blood banks.</li>
                <li>To process official acknowledgments, seva certificates, and tournament team registrations.</li>
                <li>To answer questions and coordinate office meetings in Indira Nagar, Nashik.</li>
                <li>To comply with regulatory audit requirements under the Maharashtra Public Trusts framework.</li>
              </ul>
            </div>

            {/* Section 4: Data Protection & Confidentiality */}
            <div className="glass-panel p-8 sm:p-10 rounded-block bg-white dark:bg-[#121214] border border-saffron/15 dark:border-white/10 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-saffron/10 border border-saffron/20 flex items-center justify-center text-saffron">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground font-heading">
                    4. Data Protection &amp; Zero Commercial Sharing
                  </h2>
                  <span className="text-xs text-slate-400 dark:text-neutral-400 font-bold uppercase tracking-wider">Security Controls</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-grey dark:text-neutral-300 leading-relaxed">
                <strong>We do NOT sell, rent, trade, or monetize your personal information.</strong> Your information is never provided to commercial marketers, advertisers, or third-party lead generators.
              </p>
              <p className="text-sm sm:text-base text-slate-grey dark:text-neutral-300 leading-relaxed">
                Access to volunteer records and submission data is restricted exclusively to authorized core trustees and coordinators. We implement industry-standard SSL encryption and secured server controls to protect your submissions from unauthorized access.
              </p>
            </div>

            {/* Section 5: Institutional Partners & User Rights */}
            <div className="glass-panel p-8 sm:p-10 rounded-block bg-white dark:bg-[#121214] border border-saffron/15 dark:border-white/10 shadow-xl space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-foreground font-heading">
                  5. Institutional Partners &amp; Your Rights
                </h2>
                <span className="text-xs text-slate-400 dark:text-neutral-400 font-bold uppercase tracking-wider">Authorized Collaborations</span>
              </div>
              <p className="text-sm sm:text-base text-slate-grey dark:text-neutral-300 leading-relaxed">
                Information is only shared with authorized institutional partners where strictly required for seva delivery:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-slate-grey dark:text-neutral-300 list-disc pl-5">
                <li><strong>Nashik Civil Hospital Blood Bank &amp; Red Cross:</strong> For verified blood donor records and medical safety compliance.</li>
                <li><strong>Samarth Sahakari Bank:</strong> For official banking verification and audited transaction records.</li>
                <li><strong>Civic &amp; Police Authorities:</strong> For mandatory permissions and crowd security management during public processions.</li>
              </ul>
              <p className="text-sm sm:text-base text-slate-grey dark:text-neutral-300 leading-relaxed pt-2">
                You may request access to, correction of, or deletion of your contact records or volunteer registration at any time by reaching out to our team at <a href="mailto:Info@shreepratishthan.com" className="text-saffron font-bold hover:underline">Info@shreepratishthan.com</a>.
              </p>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}
