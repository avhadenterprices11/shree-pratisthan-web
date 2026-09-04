import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-[#FBFBFA] relative overflow-hidden">
      {/* Ambient glow backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-10 blur-[120px]"
          style={{ background: "radial-gradient(ellipse, #E26A36 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full opacity-8 blur-[100px]"
          style={{ background: "radial-gradient(ellipse, #D4AF37 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-lg w-full mx-auto relative z-10 text-center space-y-8">
        {/* Decorative 404 */}
        <div className="space-y-2">
          <p className="text-[8rem] sm:text-[10rem] font-black text-saffron/10 leading-none font-heading select-none">
            404
          </p>
          <p className="text-xs uppercase font-extrabold tracking-[0.2em] text-saffron -mt-6 relative z-10">
            Page Not Found
          </p>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight font-heading leading-tight uppercase">
            Lost in the Festival?
          </h1>
          <div className="w-12 h-1 bg-saffron mx-auto rounded-full" />
        </div>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
          The page you are looking for may have moved, been renamed, or does not exist. Let us guide you back to the celebration.
        </p>

        {/* Quick navigation links */}
        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto text-xs">
          {[
            { label: "Home", href: "/" },
            { label: "Events", href: "/events" },
            { label: "Gallery", href: "/gallery" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="uppercase font-extrabold tracking-widest text-slate-500 hover:text-saffron transition-colors duration-300 border border-slate-200 hover:border-saffron/30 rounded-xl py-3 px-4 text-center"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Primary CTA */}
        <div>
          <Link
            href="/"
            className="inline-block bg-saffron hover:bg-saffron/90 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-saffron/20 active:scale-95"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
