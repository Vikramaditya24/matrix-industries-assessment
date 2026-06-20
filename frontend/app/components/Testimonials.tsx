"use client";

import React from "react";

const testimonials = [
  {
    quote:
      "Matrix gave us visibility we'd never had across our sites — fewer surprises, faster response, and a partner who never overstates what they can deliver.",
    name: "Alistair Pryce",
    title: "Head of Facilities",
    company: "Whitmore Estates Group",
  },
  {
    quote:
      "Their risk assessment was the first one that actually changed how we operate, not just a report that sat in a drawer.",
    name: "Sarah Following",
    title: "Director of Operations",
    company: "Carrow Logistics",
  },
  {
    quote:
      "Discretion was non-negotiable for us. Matrix understood that from the first meeting and never made us second-guess it.",
    name: "David Okonkwo",
    title: "Chief Security Officer",
    company: "Lennard Capital",
  },
  {
    quote:
      "What stood out was the discipline — clear protocols, clean handovers, no drama. Exactly what you want from a security partner.",
    name: "Helena Marsh",
    title: "General Manager",
    company: "Aldgate Property Holdings",
  },
  {
    quote:
      "We brought Matrix in for one site. Within a year they were managing risk and facilities across our entire portfolio.",
    name: "Thomas Reyes",
    title: "Portfolio Director",
    company: "Beckford Group",
  },
];

const TestimonialCard = ({
  quote,
  name,
  title,
  company,
}: {
  quote: string;
  name: string;
  title: string;
  company: string;
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="w-[380px] flex-shrink-0 rounded-[8px] border border-[var(--border)] bg-[var(--background-secondary)] p-8 mx-3 hover:bg-[#1A1A1A] hover:border-[#444444] transition-all duration-400 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      <p className="text-sm text-[var(--foreground-secondary)] leading-[1.8]">&ldquo;{quote}&rdquo;</p>

      <div className="mt-6 pt-6 border-t border-[var(--divider)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-[4px] bg-[var(--color-primary)]/10 flex items-center justify-center text-xs font-bold text-[var(--color-primary)] flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-xs text-[var(--foreground-muted)]">
            {title}, {company}
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => (
  <section id="testimonials" className="bg-[var(--background)] text-white py-40 overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 mb-24">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-primary)]">
        Client Testimonials
      </p>
      <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-[-0.03em] max-w-xl">
        Trusted by operators who can&apos;t afford disruption.
      </h2>
    </div>

    {/* Scrolling track — duplicated content for seamless loop */}
    <div className="relative group">
      <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
        {[...testimonials, ...testimonials].map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>

      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent" />
    </div>
  </section>
);

export default Testimonials;