"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Stack() {
  const containerRef = useRef(null);

  const stackCategories = [
    {
      title: "Mobile Dev",
      items: ["React Native", "Expo", "TypeScript", "Android APK", "EAS"],
    },
    {
      title: "Backend",
      items: ["Java 21", "Spring Boot", "Node.js", "Flask", "FastAPI", "PostgreSQL", "REST APIs"],
    },
    {
      title: "Embedded & Hardware",
      items: ["C++", "ESP32", "8051 MCU", "Verilog HDL", "I2C / SPI", "FFT Analysis", "ADXL345"],
    },
    {
      title: "Languages",
      items: ["Python 3", "Java", "C++", "TypeScript", "R", "Verilog"],
    },
    {
      title: "Frontend & Viz",
      items: ["React", "Next.js", "HTML5/CSS3", "JavaScript", "Plotly", "Matplotlib"],
    },
    {
      title: "Tools & DevOps",
      items: ["Git", "CI/CD", "Agile", "System Design", "Cloud Basics"],
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stack-block",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.09,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stack"
      ref={containerRef}
      className="py-32 bg-[#F0EDE6] text-[#0A0A0A] border-t-2 border-[#0A0A0A]"
    >
      {/* Section Header */}
      <div className="w-full text-center mb-20 px-6">
        <div className="font-mono text-xs text-black/40 uppercase tracking-[0.3em] mb-4">
          &quot;TOOLS OF TRADE&quot;
        </div>
        <h2 className="font-sans font-black text-[clamp(48px,9vw,130px)] leading-[0.82] tracking-tighter uppercase inline-block">
          &quot;THE STACK&quot;
        </h2>
        <div className="w-full border-b-2 border-[#0A0A0A] mt-6" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
          {stackCategories.map((category, index) => (
            <div key={index} className="stack-block flex flex-col">
              {/* Category label */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[#FF3333] font-bold text-sm">✱</span>
                <h3 className="font-mono text-xs font-bold text-black/40 uppercase tracking-[0.2em]">
                  {category.title}
                </h3>
              </div>

              {/* Items list */}
              <ul className="space-y-3">
                {category.items.map((item, i) => (
                  <li
                    key={i}
                    className="font-sans font-black text-2xl md:text-3xl text-[#0A0A0A] tracking-tighter leading-none hover:text-[#FF3333] transition-colors duration-200 hover-target cursor-default"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
        <div className="border-t-2 border-[#0A0A0A] pt-8 flex justify-between items-center">
          <span className="font-mono text-xs text-black/30 uppercase tracking-widest">
            &quot;Always learning&quot;
          </span>
          <span className="font-sans font-black text-6xl text-[#0A0A0A]/10 tracking-tighter">
            ✱
          </span>
        </div>
      </div>
    </section>
  );
}
