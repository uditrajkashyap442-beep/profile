"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import GridBackground from "./GridBackground";

export default function About() {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const innerImageRef = useRef(null);
  const [activeTab, setActiveTab] = useState("PARCOURS");

  const tabs = ["PARCOURS", "STACK", "INFOS"];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Bouncy fade/up reveal
      gsap.utils.toArray(".fade-up-item").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          }
        );
      });

      // Horizontal scroll for marquee text driven by vertical scroll
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true, // Synced with Lenis
          }
        });
      }

      // Smooth Image Reveal (scale)
      if (imageWrapperRef.current) {
        gsap.fromTo(imageWrapperRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "elastic.out(1, 0.75)",
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: "top 80%",
            }
          }
        );
        
        // Inner image parallax
        gsap.fromTo(innerImageRef.current,
          { scale: 1.2 },
          {
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: "top 80%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Simple animation for tab content change
  useEffect(() => {
    gsap.fromTo(".tab-content", 
      { opacity: 0, y: 10 }, 
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [activeTab]);

  return (
    <section
      id="about-details"
      ref={containerRef}
      className="theme-section relative py-24 bg-[#CDE2FF] text-[#1A1A1A] overflow-hidden"
      data-bgcolor="#CDE2FF"
      data-textcolor="#1A1A1A"
    >
      <GridBackground color="rgba(51,56,150,0.1)" />

      {/* Scroll Marquee */}
      <div className="relative z-10 w-[200vw] overflow-hidden whitespace-nowrap border-y border-black/5 py-6 mb-24 bg-white/30 backdrop-blur-md">
        <h2 ref={marqueeRef} className="font-control-compressed text-[15vw] md:text-[10vw] font-black uppercase tracking-tighter leading-none text-[#333896] flex gap-8 select-none pointer-events-none">
          <span>ENGINEER</span>
          <span className="text-[#FA60BE]">✦</span>
          <span>CREATIVE</span>
          <span className="text-[#FA60BE]">✦</span>
          <span>HARDWARE</span>
          <span className="text-[#FA60BE]">✦</span>
          <span>SOFTWARE</span>
          <span className="text-[#FA60BE]">✦</span>
          <span>DEVELOPER</span>
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-start">

          {/* Left Column */}
          <div className="md:col-span-7 flex flex-col justify-center">
            
            <h3 className="fade-up-item font-control-compressed text-[clamp(40px,6vw,90px)] leading-[0.9] mb-12 font-black uppercase tracking-tighter text-[#1A1A1A]">
              BORN IN ASSAM.<br/>
              RAISED ON THE<br/>
              <span className="text-[#FA60BE]">INTERNET.</span>
            </h3>

            {/* Tab Navigation */}
            <div className="fade-up-item flex gap-2 md:gap-4 mb-8 pb-4 border-b border-[#333896]/20 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-control-tnt text-xs tracking-widest uppercase font-bold px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
                    activeTab === tab 
                      ? "bg-[#333896] text-white" 
                      : "bg-white/50 text-[#333896] hover:bg-white/80"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="fade-up-item tab-content font-control text-base md:text-xl text-[#1A1A1A]/80 space-y-6 max-w-lg leading-relaxed font-medium min-h-[160px]">
              {activeTab === "PARCOURS" && (
                <>
                  <p>
                    I&apos;m Udit Raj Kashyap, an ECE student at VIT Vellore. 
                    I focus on the intersection of hardware and software, bridging the gap between embedded systems and modern web/mobile applications.
                  </p>
                  <p>
                    Whether it&apos;s writing ESP32 firmware in C++, building robust backends with Spring Boot, or crafting fluid UI experiences in React, I build end-to-end solutions that work.
                  </p>
                </>
              )}
              {activeTab === "STACK" && (
                <>
                  <p>
                    <strong>Frontend:</strong> React, Next.js, Tailwind CSS, GSAP.
                  </p>
                  <p>
                    <strong>Backend:</strong> Java, Spring Boot, Node.js, Express.
                  </p>
                  <p>
                    <strong>Hardware/Embedded:</strong> C++, ESP32, Arduino, IoT architectures.
                  </p>
                </>
              )}
              {activeTab === "INFOS" && (
                <>
                  <p>
                    <strong>Location:</strong> Vellore, India
                  </p>
                  <p>
                    <strong>Availability:</strong> Open for freelance projects and exploring full-time roles starting 2026.
                  </p>
                  <p>
                    <strong>Contact:</strong> Let&apos;s build something. Check the contact section to reach out.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Right Column — Photo */}
          <div className="md:col-span-5 flex justify-center md:justify-end sticky top-32">
            <div 
              ref={imageWrapperRef}
              className="relative w-full max-w-[480px] aspect-[4/5] bg-white/50 rounded-[40px] overflow-hidden shadow-2xl shadow-[#333896]/20 p-4"
            >
              <div className="w-full h-full rounded-[28px] overflow-hidden relative">
                <img
                  ref={innerImageRef}
                  src="/street-photo.jpg.jpeg"
                  alt="Udit Raj Kashyap"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="absolute inset-0 items-center justify-center text-[#1A1A1A]/40 font-control-tnt text-sm tracking-widest uppercase bg-[#CDE2FF] hidden font-bold">
                  [IMAGE PLACEHOLDER]
                </div>
              </div>
              
              {/* Soft Decorator */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[#FFD500] pointer-events-none z-10 shadow-lg" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
