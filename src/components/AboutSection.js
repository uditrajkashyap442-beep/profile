"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "./SplitText";

export default function AboutSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Scale-in bouncy effect for the decorative blob
      gsap.fromTo(".about-blob", 
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 0.6, 
          duration: 1.5, 
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );
      
      // Floating animation for the blob
      gsap.to(".about-blob", {
        y: -30,
        x: 20,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="theme-section relative w-full min-h-[100dvh] bg-transparent text-current px-6 md:px-12 pt-40 md:pt-56 pb-24 md:pb-32 flex flex-col justify-center selection:bg-vivid-azure selection:text-white overflow-hidden"
      data-bgcolor="#F4F0EA"
      data-textcolor="#1A1A1A"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-50" />
      
      {/* Floating Blob */}
      <div className="about-blob absolute top-[10%] right-[5%] md:right-[20%] w-[30vw] h-[30vw] md:w-[20vw] md:h-[20vw] bg-[#333896] rounded-full blur-[80px] -z-10 mix-blend-multiply pointer-events-none" />

      {/* Intro Subhead */}
      <div className="relative z-10 mb-12 md:mb-16">
        <span className="bg-white/60 backdrop-blur-md px-6 py-3 rounded-full font-control-tnt text-xs font-bold tracking-[0.2em] text-[#FF4757] uppercase shadow-sm border border-[#FF4757]/10">
          ENGINEERING ETHOS
        </span>
      </div>

      {/* Massive Statement Typography */}
      <div className="relative z-10 max-w-6xl">
        <h2 className="font-control-compressed font-black text-[12vw] md:text-[9vw] leading-[0.9] tracking-tighter uppercase text-[#1A1A1A]">
          <SplitText scrub={true} text="I DON'T JUST WRITE CODE." />
        </h2>
        <h2 className="font-control-compressed font-black text-[12vw] md:text-[9vw] leading-[0.9] tracking-tighter uppercase text-[#FF4757] mt-2 md:mt-4">
          <SplitText scrub={true} text="I BUILD EXPERIENCES." />
        </h2>
        
        <div className="mt-12 md:mt-20 font-control text-xl md:text-3xl font-bold text-[#1A1A1A] max-w-3xl leading-snug">
          <SplitText scrub={true} text="Bridging the massive gap between raw hardware and beautiful software. Fast. Fluid. Built to be remembered." />
        </div>
      </div>
    </section>
  );
}
