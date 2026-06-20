"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#value", label: "Approach" },
  { href: "#testimonials", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

const policyLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Cookie Policy" },
];

const Footer = () => (
  <footer className="bg-[#0A0A0A] text-white border-t border-[var(--border)]">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16">
      
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">

        {/* Brand column */}
        <div>
          <Image src="/logo.png" alt="Matrix Industries" width={120} height={40} />
          <p className="mt-4 text-sm text-[var(--foreground-muted)] leading-[1.8] max-w-xs">
            Boutique risk management firm providing operational intelligence,
            bespoke security risk, and facilities management with discretion.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--foreground-muted)] mb-4">
            Navigate
          </p>
          <ul className="space-y-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[var(--foreground-secondary)] hover:text-white transition-colors duration-250"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + social */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--foreground-muted)] mb-4">
            Contact
          </p>
          
           <a href="mailto:info@matrixindustries.uk"
            className="text-sm text-[var(--foreground-secondary)] hover:text-white transition-colors duration-250"
          >
            info@matrixindustries.uk
          </a>

          <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--foreground-muted)] mt-6 mb-4">
            Follow
          </p>
          
          <a  href="https://www.linkedin.com/company/matrix-industries-ltd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--foreground-secondary)] hover:text-white transition-colors duration-250"
          >
            LinkedIn
          </a>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="mt-16 pt-8 border-t border-[var(--divider)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[var(--foreground-muted)]">
          © {new Date().getFullYear()} Matrix™ Industries Limited.
        </p>
        <div className="flex gap-6">
          {policyLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground-secondary)] transition-colors duration-250"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

    </div>
  </footer>
);

export default Footer;