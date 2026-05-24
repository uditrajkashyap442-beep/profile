"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MagneticElement from "./MagneticElement";

export default function Contact() {
  const [email, setEmail] = useState("[loading...]");
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Decode email client-side to prevent scraping
    const decoded = atob("dWRpdHJhamthc2h5YXA0NDJAZ21haWwuY29t");
    setEmail(decoded);

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Headline reveal lines
      gsap.fromTo(
        ".reveal-line",
        { y: "105%" },
        {
          y: "0%",
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );

      // Contact links fade in
      gsap.fromTo(
        ".contact-link",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-links",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = (e) => {
    e.preventDefault();
    if (email.includes("@")) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const links = [
    {
      label: "MAIL",
      value: email,
      href: `mailto:${email}`,
      onClick: handleCopy,
      extra: copied ? "COPIED ✓" : null,
    },
    {
      label: "GITHUB",
      value: "/UditRajkashyap442-beep",
      href: "https://github.com/UditRajkashyap442-beep",
    },
    {
      label: "LINKEDIN",
      value: "/in/udit-r-kashyap",
      href: "https://linkedin.com/in/udit-r-kashyap-828a5a320/",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 bg-[#080810] text-white overflow-hidden border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section eyebrow */}
        <div className="font-mono text-xs text-white/30 uppercase tracking-[0.3em] mb-16">
          &quot;LET&apos;S TALK&quot;
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">

          {/* Left — Closing statement */}
          <div className="flex flex-col justify-between">
            <h2 className="font-sans font-black text-[clamp(44px,5.5vw,90px)] uppercase leading-[0.88] tracking-tighter flex flex-col gap-1">
              <span className="overflow-hidden inline-block">
                <span className="reveal-line inline-block">&quot;3RD YEAR IN.&quot;</span>
              </span>
              <span className="overflow-hidden inline-block">
                <span className="reveal-line inline-block">&quot;A LONG WAY TO GO.&quot;</span>
              </span>
              <span className="overflow-hidden inline-block mt-6">
                <span className="reveal-line inline-block border-b-4 border-white pb-3">&quot;LET&apos;S BUILD<br/>SOMETHING REAL.&quot;</span>
              </span>
            </h2>

            {/* Availability badge */}
            <div className="mt-12 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#E6FF00] animate-pulse" />
              <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
                Available for work — 2026
              </span>
            </div>
          </div>

          {/* Right — Contact links */}
          <div className="flex flex-col justify-end">
            <div className="contact-links flex flex-col border-t border-white/10">
              {links.map((link, i) => (
                <div key={i} className="contact-link group border-b border-white/10 overflow-hidden">
                  <MagneticElement>
                    <a
                      href={link.href}
                      target={link.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      onClick={link.onClick}
                      className="flex flex-col md:flex-row md:items-center justify-between py-8 px-0 hover:px-6 transition-all duration-400 relative group"
                    >
                      {/* Hover fill */}
                      <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 ease-in-out z-0" />

                      <div className="relative z-10 flex items-center gap-3 mb-2 md:mb-0">
                        <span className="font-mono text-xs text-white/30 group-hover:text-black/40 uppercase tracking-widest transition-colors">
                          {link.label}
                        </span>
                        <span className="text-[#FF3333] opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-bold">
                          →
                        </span>
                      </div>

                      <div className="relative z-10 font-sans font-black text-xl md:text-2xl tracking-tighter group-hover:text-black transition-colors duration-300 break-all text-right">
                        {link.value}
                        {link.extra && (
                          <span className="absolute -top-8 right-0 font-mono text-[10px] text-black bg-[#E6FF00] px-3 py-1 uppercase tracking-widest">
                            {link.extra}
                          </span>
                        )}
                      </div>
                    </a>
                  </MagneticElement>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer strip */}
        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-xs text-white/20 uppercase tracking-widest">
            &quot;Udit Raj Kashyap — Portfolio 2026&quot;
          </span>
          <span className="font-mono text-xs text-white/20 uppercase tracking-widest">
            VIT Vellore · B.Tech ECE · India
          </span>
          <span className="font-sans font-black text-white/10 text-4xl">✱</span>
        </div>

      </div>
    </section>
  );
}
