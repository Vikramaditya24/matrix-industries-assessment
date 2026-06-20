"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const securityServices = [
  {
    id: "0.1",
    title: "Security Strategy, Risk Management & Advisory",
    icon: "/service_1.png",
  },
  { id: "0.2", title: "Protective Operations", icon: "/service_2.png" },
  { id: "0.3", title: "Specialist Services", icon: "/service_3.png" },
];

const facilitiesServices = [
  { id: "0.1", title: "Operations & Maintenance", icon: "/service_4.png" },
  { id: "0.2", title: "Specialist Projects", icon: "/service_5.png" },
];

const ServiceCard = ({
  id,
  title,
  icon,
  visible,
  delay,
}: {
  id: string;
  title: string;
  icon: string;
  visible: boolean;
  delay: number;
}) => (
  <div
    className="w-72 h-72 rounded-[8px] border border-[var(--border)] p-6 flex flex-col justify-between hover:bg-[#1A1A1A] hover:border-[#444444] transition-colors duration-400 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
    style={{
      background: "linear-gradient(to top, #424242, #0a0a0a)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0px)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}
  >
    <span className="text-xs text-[var(--foreground-muted)] text-center font-medium tracking-[0.08em]">
      [{id}]
    </span>

    <div className="flex-1 flex items-center justify-center">
      <Image
        src={icon}
        alt={title}
        width={150}
        height={150}
        className="object-contain opacity-90"
      />
    </div>

    <h6 className="text-xs text-right font-medium text-[var(--foreground-secondary)] leading-snug tracking-[-0.02em]">
      {title}
    </h6>
  </div>
);

// Hook: triggers true once the section scrolls into view
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
          observer.disconnect(); // animate once only
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
};

const StaggeredRow = ({
  services,
}: {
  services: { id: string; title: string; icon: string }[];
}) => {
  const { ref, inView } = useInView();
  const count = services.length;

  const CARD_WIDTH = 288;
  const CONTAINER_WIDTH = 896; // matches max-w-4xl
  const DESIRED_OVERLAP_PX = 50; // tweak this single number to control overlap

  const getLeftPercent = (index: number) => {
    if (count === 2) {
      const centerDistancePct =
        ((CARD_WIDTH - DESIRED_OVERLAP_PX) / CONTAINER_WIDTH) * 100;
      const positions = [
        50 - centerDistancePct / 2,
        50 + centerDistancePct / 2,
      ];
      return positions[index];
    }
    return ((index + 1) / (count + 1)) * 100;
  };
  return (
    <div ref={ref}>
      {/* Desktop: absolute staggered layout */}
      <div className="relative h-[420px] max-w-4xl mx-auto hidden md:block">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="absolute -translate-x-1/2"
            style={{
              left: `${getLeftPercent(index)}%`,
              top: `${20 - index * 40}px`,
              zIndex: 30 - index * 10,
            }}
          >
            <ServiceCard {...service} visible={inView} delay={index * 150} />
          </div>
        ))}
      </div>

      {/* Mobile: stacked fallback */}
      <div className="flex flex-col items-center gap-6 md:hidden">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            {...service}
            visible={inView}
            delay={index * 150}
          />
        ))}
      </div>
    </div>
  );
};

const Services = () => (
  <section
    id="services"
    className="bg-[url('/services_bg.png')] bg-cover text-white py-40 overflow-hidden"
  >
    <div className="mx-auto max-w-7xl px-6 lg:px-12">
      <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-white mb-32">
        SECURITY RISK MANAGEMENT
      </h2>
      <StaggeredRow services={securityServices} />

      <h2
        className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-white mb-32"
        style={{ marginTop: "20px" }}
      >
        Facilities Management
      </h2>
      <StaggeredRow services={facilitiesServices} />
    </div>
  </section>
);

export default Services;
