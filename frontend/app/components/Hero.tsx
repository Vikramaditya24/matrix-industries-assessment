"use client";

import React, { useEffect, useState } from "react";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      >
        <source src="/hero_background.mp4" type="video/mp4" />
      </video>

      {/* Subtle glow accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-12 py-32 text-center">
        <div className="flex flex-col items-center space-y-6">

          {/* Eyebrow */}
          <p
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0px)" : "translateY(16px)",
              transition: "opacity 0.7s ease 0ms, transform 0.7s ease 0ms",
            }}
          >
             Low profile.{" "}
            High impact.
            
          </p>

          {/* Headline */}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.15] tracking-[-0.02em]"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0px)" : "translateY(20px)",
              transition: "opacity 0.7s ease 150ms, transform 0.7s ease 150ms",
            }}
          >
            Consultants&nbsp;|&nbsp;Advisors&nbsp;|&nbsp;Partners
          </h1>

          {/* Subheadline */}
          <p
            className="text-sm sm:text-base text-[var(--foreground-secondary)] tracking-[0.05em] uppercase"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0px)" : "translateY(20px)",
              transition: "opacity 0.7s ease 300ms, transform 0.7s ease 300ms",
            }}
          >
            Informed. Discreet. Effective.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap justify-center gap-4 pt-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0px)" : "translateY(20px)",
              transition: "opacity 0.7s ease 450ms, transform 0.7s ease 450ms",
            }}
          >
            <a
              href="#contact"
              className="hidden md:inline-block text-xs px-8 py-4 border border-[var(--color-primary)] rounded-full text-white bg-transparent hover:bg-[var(--color-primary)] hover:text-black hover:translate-y-[-2px] transition-all duration-250 font-medium tracking-[0.08em] uppercase"
            >
              Get Started Now
            </a>

            <a
              href="#services"
              className="hidden md:inline-block text-xs px-8 py-4 border border-[var(--color-primary)] rounded-full text-white bg-transparent hover:bg-[var(--color-primary)] hover:text-black hover:translate-y-[-2px] transition-all duration-250 font-medium tracking-[0.08em] uppercase"
            >
              See Projects
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;