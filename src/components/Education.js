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
      // Bouncy fade-up
      gsap.utils.toArray(".edu-section").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
            },
          }
        );
      });

      // Staggered scale-in for timeline cards
      gsap.utils.toArray(".timeline-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "elastic.out(1, 0.75)",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={containerRef}
      className="theme-section py-24 overflow-hidden relative bg-[#06BA63] text-[#1A1A1A]"
      data-bgcolor="#06BA63"
      data-textcolor="#1A1A1A"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Education Header */}
        <div className="edu-section mb-12">
          <div className="inline-block font-control-tnt text-xs text-[#06BA63] bg-white px-4 py-2 rounded-full uppercase tracking-[0.2em] mb-4 font-bold shadow-sm">
            ACADEMIA
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-6 gap-4">
            <h2 className="font-control-compressed text-[clamp(48px,7vw,110px)] leading-[0.85] tracking-normal uppercase font-black">
              EDUCATION
            </h2>
            <div className="font-control text-sm font-bold uppercase tracking-widest pb-2 text-right bg-white/30 px-4 py-2 rounded-full backdrop-blur-sm">
              B.Tech — Electronics &amp; Communication
            </div>
          </div>
        </div>

        {/* Timeline Grid — pill cards */}
        <div className="edu-section grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10">
          <div className="timeline-card py-12 px-8 flex flex-col justify-center text-center bg-white text-[#1A1A1A] rounded-[32px] shadow-lg transform hover:-translate-y-2 transition-transform duration-300" style={{ animation: "float 6s ease-in-out infinite" }}>
            <span className="font-control-tnt text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 mb-2 font-bold">COMMENCEMENT</span>
            <span className="font-control-compressed text-5xl md:text-7xl font-black tracking-tighter leading-none mt-2">2024</span>
          </div>
          <div className="timeline-card py-12 px-8 flex flex-col justify-center text-center bg-white/40 backdrop-blur-md rounded-[32px] shadow-sm transform hover:-translate-y-2 transition-transform duration-300" style={{ animation: "float 6s ease-in-out infinite 1s" }}>
            <span className="font-control-tnt text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 mb-2 font-bold">CURRENT STATUS</span>
            <span className="font-control-compressed text-4xl md:text-5xl font-black tracking-tighter leading-none mt-2">3RD YEAR</span>
          </div>
          <div className="timeline-card py-12 px-8 flex flex-col justify-center text-center bg-white/20 backdrop-blur-md rounded-[32px] transform hover:-translate-y-2 transition-transform duration-300 border border-white/30" style={{ animation: "float 6s ease-in-out infinite 2s" }}>
            <span className="font-control-tnt text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 mb-2 font-bold">GRADUATION</span>
            <span className="font-control-compressed text-5xl md:text-7xl font-black tracking-tighter leading-none mt-2 text-[#1A1A1A]/50">2028</span>
          </div>
        </div>

        {/* University badge */}
        <div className="edu-section flex items-center gap-4 mb-16 p-6 bg-white rounded-full shadow-lg w-max mx-auto md:mx-0 pr-8 transform hover:scale-105 transition-transform duration-300 relative z-10">
          <div className="w-8 h-8 rounded-full bg-[#FF4757] flex items-center justify-center text-white">✦</div>
          <h3 className="font-control-compressed text-2xl md:text-4xl font-black uppercase tracking-tighter mt-1">
            VIT VELLORE
          </h3>
        </div>

        {/* Coursework */}
        <div className="edu-section mb-16 p-[32px] md:p-[48px] bg-white/30 backdrop-blur-md rounded-[40px] border border-white/20 relative z-10 shadow-sm">
          <h4 className="font-control-tnt text-sm font-bold uppercase tracking-[0.2em] mb-8 bg-white/80 w-max px-4 py-2 rounded-full shadow-sm text-[#1A1A1A]">
            COURSEWORK
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {courses.map((category, index) => (
              <div key={index} className="flex flex-col bg-white p-6 rounded-[32px] shadow-sm hover:shadow-lg transition-shadow border border-black/5">
                <div className="flex items-center gap-2 mb-6 border-b border-black/5 pb-4">
                  <span className="text-[#FA60BE] text-xl font-bold animate-pulse">✦</span>
                  <div className="font-control-tnt text-sm font-bold tracking-[0.1em] uppercase">
                    {category.title}
                  </div>
                </div>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li
                      key={i}
                      className="font-control font-bold text-sm leading-tight uppercase text-[#1A1A1A]/70 flex items-start gap-2"
                    >
                      <span className="text-[#06BA63]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Billboard — Poppy Blue Card with Gradient Mesh */}
        <a 
          href="/resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer" 
          data-cursor-text="RESUME"
          className="block edu-section relative p-8 md:p-16 rounded-[40px] overflow-hidden group bg-[#333896] text-white shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 z-10 cursor-pointer"
        >
          {/* Animated Gradient Mesh */}
          <div className="absolute inset-0 opacity-50 mix-blend-screen transition-opacity duration-500 group-hover:opacity-80">
            <div className="absolute w-[80%] h-[80%] rounded-full bg-[#FA60BE] blur-[100px] top-[-20%] right-[-20%] animate-pulse" />
            <div className="absolute w-[60%] h-[60%] rounded-full bg-[#FFD500] blur-[80px] bottom-[-20%] left-[-10%] mix-blend-overlay" />
          </div>

          {/* Fill on hover */}
          <div className="absolute inset-0 bg-[#FF4757] scale-y-0 origin-bottom transition-transform duration-500 ease-in-out group-hover:scale-y-100 z-0 mix-blend-multiply" />

          <div className="relative z-10 transition-colors duration-500">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6">
              <h4 className="font-control-compressed text-6xl md:text-8xl lg:text-[120px] font-black tracking-tighter uppercase leading-[0.85] max-w-4xl mt-2 drop-shadow-md">
                OPEN FOR<br />OPPORTUNITIES
              </h4>
              <span className="ghost-btn !bg-[#FFD500] !text-[#1A1A1A] shrink-0 shadow-xl hover:scale-105 transition-transform font-bold border border-white/20">
                DOWNLOAD RESUME ↗
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-control font-bold text-sm md:text-base">
              <p className="bg-white/10 backdrop-blur-md group-hover:bg-white/20 p-6 rounded-[24px] transition-colors border border-white/10">Seeking remote internships and part-time roles for 2026.</p>
              <p className="bg-white/10 backdrop-blur-md group-hover:bg-white/20 p-6 rounded-[24px] transition-colors border border-white/10">
                ECE core or software engineering. I learn fast. I ship real things.
              </p>
            </div>
          </div>
        </a>

      </div>
    </section>
  );
}
