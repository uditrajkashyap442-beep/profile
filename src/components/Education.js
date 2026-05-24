"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Education() {
  const containerRef = useRef(null);

  const courses = [
    {
      title: "ECE Core",
      items: [
        "Digital Systems & Design",
        "Electronic Materials & Devices",
        "Sensors",
        "Analog Circuits",
        "Signals & Systems",
      ],
    },
    {
      title: "Programming & Tools",
      items: ["Python", "MATLAB", "Probability & Statistics"],
    },
    {
      title: "Areas of Interest",
      items: ["IoT", "Computer Vision", "Embedded Systems", "Full Stack Dev", "Signal Processing", "Machine Learning"],
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".edu-section").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 80, opacity: 0, skewY: 2 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 87%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-32 bg-[#080810] text-white overflow-hidden relative border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Education Header */}
        <div className="edu-section mb-16">
          <div className="font-mono text-xs text-white/30 uppercase tracking-[0.3em] mb-6">
            &quot;ACADEMIA&quot;
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-4">
            <h2 className="font-sans font-black text-[clamp(48px,7vw,110px)] leading-[0.82] tracking-tighter uppercase">
              &quot;EDUCATION&quot;
            </h2>
            <div className="font-mono text-xs text-white/30 uppercase tracking-widest pb-2 text-right">
              B.Tech — Electronics & Communication Engineering
            </div>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="edu-section grid grid-cols-1 md:grid-cols-3 border border-white/10 mb-24 overflow-hidden">
          <div className="py-12 px-8 flex flex-col justify-center text-center bg-[#E6FF00] border-r border-white/10">
            <span className="font-mono text-[10px] tracking-widest uppercase text-black/50 mb-2">&quot;COMMENCEMENT&quot;</span>
            <span className="font-sans font-black text-5xl md:text-7xl text-black tracking-tighter">&quot;2024&quot;</span>
          </div>
          <div className="py-12 px-8 flex flex-col justify-center text-center border-r border-white/10">
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/30 mb-2">&quot;CURRENT STATUS&quot;</span>
            <span className="font-sans font-black text-3xl md:text-5xl text-white tracking-tighter">&quot;3RD YEAR&quot;</span>
          </div>
          <div className="py-12 px-8 flex flex-col justify-center text-center opacity-40">
            <span className="font-mono text-[10px] tracking-widest uppercase mb-2">&quot;GRADUATION&quot;</span>
            <span className="font-sans font-black text-5xl md:text-7xl tracking-tighter">&quot;2028&quot;</span>
          </div>
        </div>

        {/* University badge */}
        <div className="edu-section flex items-center gap-4 mb-20">
          <div className="w-2 h-2 rounded-full bg-[#E6FF00]" />
          <h3 className="font-sans font-black text-2xl md:text-4xl uppercase tracking-tighter">
            &quot;VIT VELLORE&quot;
          </h3>
        </div>

        {/* Coursework */}
        <div className="edu-section mb-24">
          <h4 className="font-mono text-xs text-white/30 uppercase tracking-[0.25em] mb-10">
            &quot;COURSEWORK&quot;
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-t border-white/10 pt-10">
            {courses.map((category, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[#FF3333] text-sm">✱</span>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30">
                    {category.title}
                  </div>
                </div>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li
                      key={i}
                      className="font-sans font-bold text-base md:text-lg uppercase tracking-tighter text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Billboard */}
        <div className="edu-section relative border border-white/20 p-8 md:p-16 overflow-hidden group hover-target">
          {/* Fill on hover */}
          <div className="absolute inset-0 bg-[#E6FF00] scale-y-0 origin-bottom transition-transform duration-500 ease-in-out group-hover:scale-y-100 z-0" />

          <div className="relative z-10 group-hover:text-black transition-colors duration-500">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6">
              <h4 className="font-sans font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.85] max-w-4xl">
                &quot;OPEN FOR<br />OPPORTUNITIES&quot;
              </h4>
              <span className="font-mono text-xs tracking-widest uppercase border border-current px-4 py-2 animate-pulse shrink-0">
                &quot;ACTIVELY LOOKING&quot;
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-sans font-bold tracking-tighter text-lg md:text-xl uppercase">
              <p>Seeking remote internships and part-time roles for 2026.</p>
              <p className="md:text-right">
                ECE core or software engineering. I learn fast. I ship real things.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
