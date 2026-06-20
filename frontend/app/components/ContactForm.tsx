"use client";

import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const isLoading = status === "loading";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(
        "https://matrix-industries-assessment.onrender.com/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to submit");
    }
  };

  return (
    <section id="contact" className="bg-[var(--background)] text-white py-40">
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-primary)]">
            Get In Touch
          </p>
          <h2 className="mt-6 text-4xl sm:text-5xl font-bold tracking-[-0.03em]">
            Let&apos;s Discuss Your Operation
          </h2>
          <p className="mt-6 text-[var(--foreground-secondary)] leading-[1.8]">
            Tell us about your environment. We&apos;ll respond with discretion
            and clarity.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[8px] border border-[var(--border)] bg-[var(--background-secondary)] p-8 sm:p-10 space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-xs uppercase tracking-[0.08em] text-[var(--foreground-muted)] mb-3 font-medium"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[var(--background-elevated)] border border-[var(--border)] rounded-[4px] px-4 py-3 text-sm text-white placeholder-[var(--foreground-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-250"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs uppercase tracking-[0.08em] text-[var(--foreground-muted)] mb-3 font-medium"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[var(--background-elevated)] border border-[var(--border)] rounded-[4px] px-4 py-3 text-sm text-white placeholder-[var(--foreground-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-250"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs uppercase tracking-[0.08em] text-[var(--foreground-muted)] mb-3 font-medium"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[var(--background-elevated)] border border-[var(--border)] rounded-[4px] px-4 py-3 text-sm text-white placeholder-[var(--foreground-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-250"
              placeholder="07XXX XXXXXX"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs uppercase tracking-[0.08em] text-[var(--foreground-muted)] mb-3 font-medium"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-[var(--background-elevated)] border border-[var(--border)] rounded-[4px] px-4 py-3 text-sm text-white placeholder-[var(--foreground-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-250 resize-none"
              placeholder="Tell us about your environment and requirements"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-xs px-8 py-4 border border-[var(--color-primary)] rounded-full text-white bg-transparent hover:bg-[var(--color-primary)] hover:text-black hover:translate-y-[-2px] transition-all duration-250 font-medium tracking-[0.08em] uppercase disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-sm font-medium text-white bg-[var(--color-success)]/20 border border-[var(--color-success)] text-[#2E4F3E] px-4 py-3 rounded-[4px]">
              ✓ Thank you — we&apos;ve received your message and will be in
              touch shortly.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm font-medium text-[#FFB8A3] bg-[#6D5937]/20 border border-[#6D5937] px-4 py-3 rounded-[4px]">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
