"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, Settings2, TrendingUp, Check } from "lucide-react";

const stages = [
  {
    id: "01",
    icon: Search,
    title: "Assess",
    subtitle: "We map the risk before we touch a single system.",
    description:
      "A Matrix consultant walks your sites, reviews your existing protocols, and interviews the people who run your operation day to day. We're looking for the gap between what your policy says and what actually happens on the ground.",
    outcomes: [
      "A written risk register, ranked by exposure",
      "A clear view of where your current provider is falling short",
    ],
  },
  {
    id: "02",
    icon: Settings2,
    title: "Engineer",
    subtitle: "We design around your operation, not a template.",
    description:
      "No two sites carry the same risk profile, so no two protocols look the same. We build protective coverage, access control, and facilities procedures around how your business actually runs — not a generic playbook.",
    outcomes: [
      "Site-specific protocols your team can follow without a manual",
      "Coverage that fits your budget without leaving gaps",
    ],
  },
  {
    id: "03",
    icon: TrendingUp,
    title: "Optimize",
    subtitle: "The engagement doesn't end at deployment.",
    description:
      "We stay on site, reviewing incident logs, maintenance records, and compliance checkpoints. When something drifts off plan, we catch it before it becomes a problem you hear about from someone else.",
    outcomes: [
      "Monthly performance review against your risk register",
      "One point of contact, accountable for the result",
    ],
  },
];

const useInView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
};

const StageRow = ({
  stage,
  index,
}: {
  stage: (typeof stages)[number];
  index: number;
}) => {
  const Icon = stage.icon;
  const isEven = index % 2 === 0;
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(24px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {/* Node */}
      <div
        className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center w-16 h-16 rounded-[8px] bg-[var(--background-elevated)] border transition-all duration-500"
        style={{
          borderColor: inView ? "var(--color-primary)" : "var(--border)",
        }}
      >
        <Icon
          className="w-6 h-6 transition-colors duration-500"
          style={{ color: inView ? "var(--color-primary)" : "var(--foreground-muted)" }}
          strokeWidth={1.5}
        />
      </div>

      <div className="w-16 md:hidden flex-shrink-0" />

      {/* Card */}
      <div
        className={`flex-1 md:w-[calc(50%-3rem)] pl-6 md:pl-0 ${
          isEven ? "md:text-left" : "md:text-right"
        }`}
      >
        <div className="group rounded-[8px] border border-[var(--border)] bg-[var(--background-secondary)] p-8 sm:p-10 hover:bg-[#161616] hover:border-[#3a3a3a] hover:-translate-y-1 transition-all duration-500 shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]">

          <span
            className="block font-bold tracking-[-0.02em] leading-none text-[var(--color-primary)]"
            style={{ fontSize: "2.75rem", opacity: 0.9 }}
          >
            {stage.id}
          </span>

          <h3 className="mt-5 text-2xl sm:text-3xl font-bold text-white tracking-[-0.02em]">
            {stage.title}
          </h3>
          <p className="mt-2 text-sm text-[var(--color-primary)] font-medium">
            {stage.subtitle}
          </p>

          <p className="mt-6 text-[15px] text-[var(--foreground-secondary)] leading-[1.85]">
            {stage.description}
          </p>

          <div className="mt-8 pt-8 border-t border-[var(--divider)]">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--foreground-muted)] mb-4">
              What You Gain
            </p>
            <ul className={`space-y-3 ${isEven ? "" : "md:flex md:flex-col md:items-end"}`}>
              {stage.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className={`flex items-start gap-3 text-sm text-white/85 ${
                    isEven ? "" : "md:flex-row-reverse md:text-right"
                  }`}
                >
                  <Check
                    className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--color-primary)]"
                    strokeWidth={2.5}
                  />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

const ValueFramework = () => (
  <section id="value" className="bg-[var(--background)] text-white py-40">
    <div className="mx-auto max-w-5xl px-6 lg:px-12">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-32">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-primary)]">
          Our Framework
        </p>
        <h2 className="mt-6 text-4xl sm:text-5xl font-bold tracking-[-0.03em]">
          How an Engagement Actually Runs
        </h2>
        <p className="mt-6 text-[var(--foreground-secondary)] leading-[1.8]">
          Three stages, one accountable team — from the first site visit
          to the report that lands on your desk every month after.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-px bg-[var(--divider)] md:-translate-x-1/2" />
        <div className="space-y-20 md:space-y-24">
          {stages.map((stage, index) => (
            <StageRow key={stage.id} stage={stage} index={index} />
          ))}
        </div>
      </div>

      {/* Closing statement */}
      <div className="mt-28 text-center max-w-xl mx-auto border-t border-[var(--divider)] pt-16">
        <p className="text-base sm:text-lg font-semibold tracking-[-0.01em] text-white">
          Assess&nbsp;
          <span className="text-[var(--color-primary)]">→</span>
          &nbsp;Engineer&nbsp;
          <span className="text-[var(--color-primary)]">→</span>
          &nbsp;Optimize
        </p>
        <p className="mt-4 text-sm text-[var(--foreground-secondary)] tracking-[0.04em] uppercase">
          Reduced Risk · Simplified Operations · Long-Term Value
        </p>
      </div>

    </div>
  </section>
);

export default ValueFramework;