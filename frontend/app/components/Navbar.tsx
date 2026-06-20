"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#value", label: "Technology" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 5);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 ${
          scrolled ? "bg-[#0A0A0A]/50 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex items-center justify-between px-6 py-4 lg:px-12">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Matrix Industries"
              width={120}
              height={40}
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 border border-[var(--color-primary)] rounded-full px-10 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-white p-2 transition-colors tracking-[0.08em] font-medium uppercase relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[var(--color-primary)] after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="#contact"
            className="hidden md:inline-block text-xs px-8 py-4 border border-[var(--color-primary)] rounded-full text-white bg-transparent hover:bg-[var(--color-primary)] hover:text-black hover:translate-y-[-2px] transition-all duration-250 font-medium tracking-[0.08em] uppercase"
          >
            Request a Demo
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white p-2"
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile drawer panel */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-[78%] max-w-sm bg-[#0A0A0A] border-l border-white/10 transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <Image
            src="/logo.png"
            alt="Matrix Industries"
            width={100}
            height={34}
          />
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white p-2"
            aria-label="Close menu"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-8 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className="text-sm text-white/80 hover:text-white py-3 border-b border-white/5 tracking-[0.08em] font-medium uppercase transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 mt-4">
          <Link
            href="#contact"
            onClick={handleLinkClick}
            className="block text-center text-xs px-8 py-4 border border-[var(--color-primary)] rounded-full text-white bg-transparent hover:bg-[var(--color-primary)] hover:text-black transition-all duration-250 font-medium tracking-[0.08em] uppercase"
          >
            Request a Demo
          </Link>
        </div>
      </div>
    </>
  );
}
