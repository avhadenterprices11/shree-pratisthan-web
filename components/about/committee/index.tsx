"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutCommittee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance staggered fade reveal
      gsap.fromTo(
        ".committee-member-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
          },
        }
      );

      // 2. Interactive mouse tilt & magnetic pulls on cards (Desktop only)
      const cards = gsap.utils.toArray<HTMLElement>(".committee-member-card");
      cards.forEach((card) => {
        const avatar = card.querySelector(".committee-avatar");
        const watermark = card.querySelector(".committee-watermark");

        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const mouseX = e.clientX - rect.left - rect.width / 2;
          const mouseY = e.clientY - rect.top - rect.height / 2;

          // 3D Card Tilt
          gsap.to(card, {
            rotateY: mouseX * 0.05,
            rotateX: -mouseY * 0.05,
            transformPerspective: 800,
            duration: 0.5,
            ease: "power2.out",
          });

          // Parallax background watermark shift
          if (watermark) {
            gsap.to(watermark, {
              x: -mouseX * 0.12,
              y: -mouseY * 0.12,
              duration: 0.5,
              ease: "power2.out",
            });
          }

          // Magnetic Avatar pull
          if (avatar) {
            gsap.to(avatar, {
              x: mouseX * 0.15,
              y: mouseY * 0.15,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        };

        const handleMouseLeave = () => {
          // Reset elements smoothly
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
          if (watermark) gsap.to(watermark, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
          if (avatar) gsap.to(avatar, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-24 px-6 md:px-12 xl:px-24 bg-[#FFFDF9] border-t border-saffron/10 relative overflow-hidden select-none z-10"
    >
      {/* Background Grid Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 106, 54, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 106, 54, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-saffron/15 mb-16 relative z-10">
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-800 font-heading uppercase leading-none">
              Leadership & Founding Pillars
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-grey max-w-md font-sans font-light leading-relaxed">
            Led by Adv. Shyam Dharmaraj Badode and powered by 20 founding members and 100+ active organizers in Indira Nagar, Nashik.
          </p>
        </div>

        {/* Asymmetrical Split Editorial Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch w-full">
          
          {/* Left Column: Founder & President Card (Taller Focus Frame) */}
          <div className="w-full lg:w-1/2 flex">
            <div className="committee-member-card w-full min-h-[440px] bg-white border border-saffron/15 rounded-[3rem] p-10 flex flex-col justify-between items-start shadow-xl shadow-saffron/5 group hover:border-saffron/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              
              {/* Saffron Initials Watermark */}
              <div className="committee-watermark absolute right-0 top-0 text-[18rem] font-black text-saffron/5 select-none leading-none -translate-y-16 translate-x-12 font-heading pointer-events-none transition-colors duration-500">
                S
              </div>

              {/* Avatar Indicator */}
              <div className="committee-avatar w-24 h-24 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-xl font-bold font-heading text-saffron shadow-md relative z-10">
                SB
              </div>

              {/* Founder Text */}
              <div className="relative z-10 mt-12 text-left">
                <span className="text-xs font-bold text-saffron uppercase tracking-widest block mb-2">
                  Founder & President • संस्थापक व अध्यक्ष
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading uppercase leading-tight mb-2 group-hover:text-saffron transition-colors duration-300">
                  ॲड श्याम धर्मराज बडोदे
                </h3>
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-4">
                  गटनेता तथा नगरसेवक प्रभाग क्र.३० | सरचिटणीस भाजपा नाशिक शहर
                </p>
                <p className="text-xs sm:text-sm text-slate-grey font-sans font-light leading-relaxed max-w-md">
                  Pioneered the evolution from the 2006 cricket brotherhood to the registered trust (कै.धर्मराज बडोदे बहुउद्देशिय सेवाभावी संस्था - Reg: nashik/0000153/2018), championing cultural festivals and welfare across Nashik.
                </p>
              </div>

              {/* Footer Stamp */}
              <div className="border-t border-saffron/10 w-full pt-4 mt-6 text-[10px] text-slate-grey uppercase font-bold tracking-wider relative z-10 text-left">
                Leading Community Progress • Established 2006
              </div>

            </div>
          </div>

          {/* Right Column: Stacked Trustees & 20 Founders Honor Roll */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            
            {/* 20 Founding Pillars (संस्थापक सदस्य) */}
            <div className="committee-member-card w-full min-h-[220px] bg-white border border-saffron/15 rounded-[2.5rem] p-8 flex flex-col justify-between items-start gap-5 shadow-xl shadow-saffron/5 group hover:border-saffron/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="committee-watermark absolute right-0 top-0 text-[12rem] font-black text-saffron/5 select-none leading-none -translate-y-8 translate-x-8 font-heading pointer-events-none">
                20
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <div className="committee-avatar w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-sm font-bold font-heading text-emerald-600 shadow-sm">
                  20
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-[10px] font-bold text-saffron uppercase tracking-wider">The 20 Founding Pillars</span>
                  <h3 className="text-xl font-black text-slate-800 font-heading uppercase leading-tight group-hover:text-saffron transition-colors">
                    संस्थापक सदस्य (Founders Roll)
                  </h3>
                </div>
              </div>

              {/* 20 Founders Tags */}
              <div className="flex flex-wrap gap-1.5 relative z-10 max-w-lg">
                {[
                  "Shyam Badode", "Gopal Avhad", "Jaywant Takke", "Ganesh Ratnaparkhe",
                  "Manish Patil", "Bharat Shirsath", "Yogesh Revgade", "Satish Yadav",
                  "Ashish Dabholkar", "Paresh Patil", "Prashant Patil", "Nitin Bande",
                  "Kiran Patil", "Pankaj Sonar", "Ram Nagare", "Ghanshyam Bachaw",
                  "Prakash Sonawane", "Manoj Vayal", "Adil Shaikh", "Somnath Suryawanshi"
                ].map((name, i) => (
                  <span key={i} className="text-[10px] font-medium bg-saffron/5 border border-saffron/15 text-slate-700 px-2.5 py-0.5 rounded-full">
                    {name}
                  </span>
                ))}
              </div>

              <div className="text-[10px] text-slate-grey uppercase font-bold tracking-wider relative z-10 pt-2 border-t border-saffron/10 w-full text-left">
                20 Founding Pillars • Indira Nagar, Nashik (2006)
              </div>
            </div>

            {/* 100+ Active Members & Youth Force */}
            <div className="committee-member-card w-full min-h-[160px] bg-white border border-saffron/15 rounded-[2.5rem] p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl shadow-saffron/5 group hover:border-saffron/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="committee-watermark absolute right-0 top-0 text-[12rem] font-black text-saffron/5 select-none leading-none -translate-y-8 translate-x-8 font-heading pointer-events-none">
                100+
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative z-10">
                <div className="committee-avatar w-16 h-16 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-base font-bold font-heading text-blue-600 shadow-sm">
                  100+
                </div>
                <div className="flex flex-col items-start text-left max-w-sm">
                  <span className="text-[10px] font-bold text-saffron uppercase tracking-wider mb-1">Youth Force & Volunteers</span>
                  <h3 className="text-xl font-black text-slate-800 font-heading uppercase leading-tight group-hover:text-saffron transition-colors">
                    100+ Active Organizers
                  </h3>
                  <p className="text-xs text-slate-grey font-sans font-light mt-1">
                    Driving Ganeshotsav, Swagat Yatra, 50+ blood donation camps, and sports leagues.
                  </p>
                </div>
              </div>

              <div className="text-[10px] text-slate-grey uppercase font-bold tracking-wider self-start sm:self-center relative z-10 pt-4 sm:pt-0 sm:border-l border-saffron/15 sm:pl-6">
                19+ Yrs
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
