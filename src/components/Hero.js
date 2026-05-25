"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticElement from "./MagneticElement";
import GridBackground from "./GridBackground";
import CyclingWord from "./CyclingWord";

function CharSplit({ text, className = "" }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span key={i} className="overflow-hidden inline-block px-[0.02em]">
          <span className={`hero-char inline-block ${className}`}>
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const delay = 3.2; // Wait for preloader

      // Stagger text reveal with bouncy spring
      gsap.set(".hero-char", { yPercent: 120, scale: 0.8 });
      gsap.to(".hero-char", {
        yPercent: 0,
        scale: 1,
        duration: 1.4,
        stagger: 0.04,
        ease: "elastic.out(1, 0.75)",
        delay: delay,
      });

      // Simple fade in for secondary text
      gsap.fromTo(".hero-reveal", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "back.out(1.5)", delay: delay + 0.8 }
      );
      
      // Removed infinite rotating star in favor of interactive swipe rotation

      // Slow moving mesh blobs
      gsap.to(".mesh-blob-1", {
        x: "20vw", y: "10vh", rotation: 45, duration: 20, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
      gsap.to(".mesh-blob-2", {
        x: "-20vw", y: "-10vh", rotation: -45, duration: 25, repeat: -1, yoyo: true, ease: "sine.inOut"
      });

    }, containerRef);

    // 3D Parallax Mouse Tracking & Star Trackball
    const xToMain = gsap.quickTo(".layer-main", "x", { duration: 0.8, ease: "power3.out" });
    const yToMain = gsap.quickTo(".layer-main", "y", { duration: 0.8, ease: "power3.out" });
    
    const xToStroke = gsap.quickTo(".layer-stroke", "x", { duration: 1.2, ease: "power3.out" });
    const yToStroke = gsap.quickTo(".layer-stroke", "y", { duration: 1.2, ease: "power3.out" });
    
    const xToShadow = gsap.quickTo(".layer-shadow", "x", { duration: 1.6, ease: "power3.out" });
    const yToShadow = gsap.quickTo(".layer-shadow", "y", { duration: 1.6, ease: "power3.out" });

    // Interactive Star Rotation
    const rotToStar = gsap.quickTo(".rotating-star", "rotation", { duration: 1.2, ease: "power3.out" });
    let starRotation = 0;
    let lastX = null;

    const handleMouseMove = (e) => {
      // Handle both mouse and touch events
      let clientX, clientY;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const xNorm = (clientX / window.innerWidth - 0.5) * 2;
      const yNorm = (clientY / window.innerHeight - 0.5) * 2;
      
      xToMain(xNorm * 20);
      yToMain(yNorm * 20);
      
      xToStroke(xNorm * -15);
      yToStroke(yNorm * -15);
      
      xToShadow(xNorm * -40);
      yToShadow(yNorm * -40);

      // Trackball Star Swipe
      if (lastX !== null) {
        const deltaX = clientX - lastX;
        starRotation += deltaX * 0.6; // Multiplier for spin speed
        rotToStar(starRotation);
      }
      lastX = clientX;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="theme-section relative w-full h-[100dvh] bg-[#F4F0EA] text-[#1A1A1A] overflow-hidden flex flex-col justify-between"
      data-bgcolor="#F4F0EA"
      data-textcolor="#1A1A1A"
    >
      <GridBackground color="rgba(26,26,26,0.06)" />
      
      {/* Dynamic Fluid Mesh Background with Bottom Fade Mask */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60"
        style={{ 
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)", 
          WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)" 
        }}
      >
        <div className="mesh-blob-1 absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#FFD1DC] rounded-full mix-blend-multiply blur-[100px]" />
        <div className="mesh-blob-2 absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#CDE2FF] rounded-full mix-blend-multiply blur-[100px]" />
        <div className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] bg-[#D0BCFF] rounded-full mix-blend-multiply blur-[120px] animate-pulse" />
      </div>
      
      {/* Grain Overlay */}
      <div className="absolute inset-0 z-[1] bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

      {/* Top Banner - Editorial Header (Off-White Aesthetic) */}
      <header className="relative z-20 w-full pt-8 px-6 md:px-12 flex justify-between items-center text-xs md:text-sm font-control-tnt font-bold tracking-[0.2em] uppercase">
        <MagneticElement>
          <div className="hero-reveal opacity-0 flex items-center gap-2 text-[#1A1A1A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4757] animate-pulse"></span>
            AVAILABLE FOR <span className="text-[#333896]"><CyclingWord words={['INTERNSHIPS', 'REMOTE-WORK']} /></span>
          </div>
        </MagneticElement>
        
        <div className="hero-reveal opacity-0 hidden md:block text-[#1A1A1A] tracking-[0.3em]">
          <span className="opacity-40 lowercase tracking-normal mr-2">c/o</span>UDIT RAJ ©
        </div>

        <MagneticElement>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-reveal opacity-0 text-[#1A1A1A] hover:text-[#FF4757] transition-colors flex items-center gap-2 group"
          >
            "RESUME"
            <span className="group-hover:translate-x-1 transition-transform opacity-50 text-[10px]">→</span>
          </a>
        </MagneticElement>
      </header>

      {/* 3D Parallax Typography - Hyper Clean */}
      <div className="w-full flex-grow relative z-10 flex flex-col justify-center items-center" ref={textContainerRef}>
        <div className="relative w-full text-center flex flex-col items-center justify-center mix-blend-multiply">
          <div className="layer-main relative z-20 flex flex-col items-center justify-center leading-[0.85] pointer-events-none">
            <h1 className="font-control-compressed font-black tracking-tighter uppercase text-[24vw] md:text-[20vw] text-[#1A1A1A]">
              <CharSplit text="UDIT" />
            </h1>
            <h1 className="font-control-compressed font-black tracking-tighter uppercase text-[24vw] md:text-[20vw] text-[#FF4757] relative">
              <CharSplit text="RAJ" />
              <span className="absolute -bottom-8 md:-bottom-12 right-0 text-xs md:text-sm font-control-tnt tracking-[0.3em] text-[#1A1A1A]/40 uppercase whitespace-nowrap">
                "CREATIVE ENGINEERING"
              </span>
            </h1>
          </div>
          
          {/* Decorative Rotating Element */}
          <div className="rotating-star absolute top-1/2 left-[10%] md:left-[20%] -translate-y-1/2 text-[#333896] text-3xl md:text-5xl font-serif z-30 pointer-events-auto cursor-grab active:cursor-grabbing" data-cursor-text="DRAG">
            ✦
          </div>
        </div>
      </div>

      {/* Bottom Information - Minimalist (Off-White Aesthetic) */}
      <div className="relative z-20 w-full pb-10 px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end text-[10px] md:text-xs font-control font-bold tracking-[0.1em] uppercase gap-6 md:gap-0">
        <MagneticElement>
          <div className="hero-reveal opacity-0 text-[#1A1A1A]/50">
            LOCATION // <br/>
            <span className="text-[#1A1A1A] text-sm md:text-base font-control-tnt tracking-[0.2em]">"VELLORE"</span>
          </div>
        </MagneticElement>
        
        <div className="hero-reveal opacity-0 w-full md:w-1/3 flex flex-col items-center justify-end text-[#1A1A1A]/40 text-[10px] tracking-[0.3em]">
          <span className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#FF4757] mb-4 animate-pulse"></span>
          "SCROLL"
        </div>
        
        <MagneticElement>
          <div className="hero-reveal opacity-0 text-left md:text-right text-[#1A1A1A]/50">
            ROLE // <br/>
            <span className="text-[#1A1A1A] text-sm md:text-base font-control-tnt tracking-[0.2em]">"ENGINEER"</span>
          </div>
        </MagneticElement>
      </div>

    </section>
  );
}
