"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".fade-up-item").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 80, opacity: 0, skewY: 4 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
            },
          }
        );
      });

      // Parallax image
      gsap.fromTo(
        ".image-wrapper",
        { y: 60 },
        {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-32 bg-[#F0EDE6] text-[#0A0A0A] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-center">

          {/* Left Column */}
          <div className="md:col-span-6 flex flex-col justify-center">

            {/* Section label */}
            <div className="fade-up-item font-mono text-xs tracking-[0.25em] text-black/40 uppercase mb-8">
              &quot;ABOUT ME&quot;
            </div>

            {/* Headline */}
            <h2 className="fade-up-item font-sans text-[clamp(38px,5.5vw,78px)] leading-[0.88] mb-10 text-[#0A0A0A] tracking-tighter uppercase">
              <span className="font-black">Born in Assam.</span>
              <br />
              <span
                className="font-black text-transparent"
                style={{ WebkitTextStroke: "2px #0A0A0A" }}
              >
                Raised on the Internet.
              </span>
            </h2>

            {/* Body copy */}
            <div className="fade-up-item font-sans text-lg md:text-xl text-[#0A0A0A]/70 space-y-5 mb-14 max-w-md leading-relaxed tracking-tight">
              <p>
                I&apos;m Udit Raj Kashyap, a third-year ECE student at VIT Vellore.
                I&apos;ve shipped mobile apps with React Native, backend services with Spring Boot and FastAPI,
                and firmware for ESP32 microcontrollers. I enjoy taking a project from idea to something that actually works — hardware, software, or both.
              </p>
            </div>

            {/* Accordions */}
            <div className="fade-up-item border-t-2 border-black w-full">
              <Accordion title="STUFF I'M GOOD AT.">
                <ul className="space-y-2 font-sans text-base text-black/70">
                  <li>— React Native + Expo mobile apps</li>
                  <li>— Java Spring Boot + PostgreSQL backends</li>
                  <li>— ESP32 firmware &amp; sensor integration</li>
                  <li>— Python scripting &amp; data analysis</li>
                  <li>— Debugging weird issues at 2am</li>
                </ul>
              </Accordion>
              <Accordion title="STUFF I SUCK AT.">
                <ul className="space-y-2 font-sans text-base text-black/70">
                  <li>— Writing clean git commit messages</li>
                  <li>— Estimating how long things take</li>
                  <li>— Saying no to interesting side projects</li>
                  <li>— Taking breaks</li>
                </ul>
              </Accordion>
            </div>
          </div>

          {/* Right Column — Photo */}
          <div className="md:col-span-6 flex justify-center md:justify-end fade-up-item">
            <div className="image-wrapper relative w-full max-w-[480px] aspect-[4/5] bg-[#d8d5ce] border-[12px] border-[#0A0A0A] overflow-hidden shadow-[20px_20px_0px_#0A0A0A]">
              <img
                src="/street-photo.jpg.jpeg"
                alt="Udit Raj Kashyap"
                className="absolute inset-0 w-full h-full object-cover contrast-105"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Fallback */}
              <div className="absolute inset-0 items-center justify-center text-black/30 font-mono text-xs bg-[#d8d5ce] hidden">
                [Photo Placeholder]
              </div>
              {/* Corner tag */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A] text-white font-mono text-[9px] uppercase tracking-widest px-4 py-2 text-center">
                &quot;UDIT RAJ KASHYAP — ECE&quot;
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-5 px-0 text-left hover-target group"
      >
        <span className="font-sans font-black text-xl text-[#0A0A0A] tracking-tighter transition-colors group-hover:text-[#FF3333]">
          &quot;{title}&quot;
        </span>
        <span
          className="font-sans text-3xl text-[#0A0A0A] font-medium transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-80 opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-2">{children}</div>
      </div>
    </div>
  );
}
