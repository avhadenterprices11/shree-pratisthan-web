"use client";

import { useEffect } from "react";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError] Next.js route error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md w-full p-8 rounded-2xl bg-neutral-900 border border-saffron/20 shadow-2xl">
        <h2 className="text-2xl font-extrabold text-saffron font-heading mb-3">
          Something went wrong
        </h2>
        <p className="text-sm text-slate-grey mb-6">
          We encountered an unexpected error while loading this page. Our technical team has been notified.
        </p>
        <button
          onClick={() => reset()}
          className="bg-saffron hover:bg-saffron/90 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-3 rounded-full transition-all cursor-pointer shadow-lg hover:shadow-saffron/25"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
