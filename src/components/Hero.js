"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const [repoCount, setRepoCount] = useState("—");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Live GitHub repo count
    fetch("https://api.github.com/users/UditRajkashyap442-beep")
      .then((res) => res.json())
      .then((data) => {
        if (data.public_repos !== undefined) setRepoCount(data.public_repos);
      })
      .catch(console.error);

    import("splitting").then((mod) => {
      const Splitting = mod.default;
      if (headlineRef.current) {
        Splitting({ target: headlineRef.current, by: "chars" });
      }

      // Char stagger reveal
      gsap.fromTo(
        headlineRef.current.querySelectorAll(".char"),
        { opacity: 0, y: 80, skewX: -8 },
        {
          opacity: 1,
          y: 0,
          skewX: 0,
          duration: 0.9,
          stagger: 0.018,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // Parallax drift on headline
      gsap.to(headlineRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Stat rows fade in
    gsap.fromTo(
      ".stat-row",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stat-block",
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col justify-center py-24 bg-[#080810] overflow-hidden noise-overlay"
    >
      {/* Yellow ticker strip */}
      <div className="w-full mb-16 bg-[#E6FF00] border-y-4 border-black py-3 flex items-center overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="flex items-center space-x-6 px-4 font-sans font-black text-base md:text-xl text-black uppercase shrink-0 tracking-tighter"
            >
              <span>&quot;ECE&quot;</span>
              <span className="text-black/30">✱</span>
              <span>&quot;VIT VELLORE&quot;</span>
              <span className="text-black/30">✱</span>
              <span>&quot;2024–2028&quot;</span>
              <span className="text-black/30">✱</span>
              <span>&quot;INDIA&quot;</span>
              <span className="text-black/30">✱</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative">
        {/* Decorative asterisk */}
        <div className="absolute -top-24 right-0 md:right-16 text-[#FF3333] text-[clamp(160px,22vw,280px)] leading-none font-sans font-black select-none z-0 pointer-events-none opacity-90 mix-blend-screen">
          ✱
        </div>

        {/* Portfolio eyebrow */}
        <div className="font-mono text-white/40 text-xs uppercase tracking-[0.3em] mb-6 relative z-10">
          &quot;PORTFOLIO&quot; <span className="ml-2 opacity-60">©2026</span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-sans font-black text-[clamp(28px,5vw,88px)] leading-[0.93] tracking-tighter mb-14 max-w-[95%] text-white relative z-10"
          data-splitting
        >
          Hardware and software — I refused to pick one.
          I build mobile apps, backend services, embedded firmware, and the sensor systems that feed them.
          Actively looking for opportunities where real engineering happens.
        </h1>

        {/* Divider */}
        <div className="w-full border-t border-white/10 mb-10 relative z-10" />

        {/* Signal check stats */}
        <div className="stat-block max-w-2xl relative z-10">
          <div className="font-mono text-xs tracking-wider text-[#E6FF00] mb-6 uppercase">
            ↘ SIGNAL CHECK
          </div>
          <div className="flex flex-col space-y-5">
            <StatRow number="3 yrs"  text="writing code alongside circuits" />
            <StatRow number={String(repoCount)} text="public repos, more incoming" />
            <StatRow number="3rd yr"  text="at VIT Vellore" />
            <StatRow number="Remote" text="available · Vellore-based" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatRow({ number, text }) {
  return (
    <div className="stat-row flex items-baseline gap-6 border-b border-white/5 pb-4">
      <div className="font-sans font-black text-3xl md:text-4xl text-white w-28 md:w-36 shrink-0 tracking-tighter">
        {number}
      </div>
      <div className="font-mono text-sm text-white/50 tracking-tight">{text}</div>
    </div>
  );
}
