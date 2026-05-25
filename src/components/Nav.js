"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import CyclingWord from "./CyclingWord";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const menuItemsRef = useRef([]);
  const stickyHeaderRef = useRef(null);

  // Menu open/close animation (Bouncy block slide down)
  useEffect(() => {
    if (isOpen) {
      if (window.lenis) window.lenis.stop();
      gsap.to(overlayRef.current, {
        y: "0%",
        duration: 1,
        ease: "power4.out", // Smooth fast slide
      });
      gsap.fromTo(
        menuItemsRef.current,
        { y: "100%", opacity: 0, scale: 0.9 },
        { y: "0%", opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, delay: 0.2, ease: "back.out(1.5)" }
      );
    } else {
      if (window.lenis) window.lenis.start();
      gsap.to(overlayRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  // Island header reveal animation on load
  useEffect(() => {
    // We remove the scroll trigger, the island is always visible and floats down on load
    gsap.fromTo(stickyHeaderRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.75)", delay: 3.5 }
    );
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    
    setTimeout(() => {
      if (href === "#" || href === "") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        const offset = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: offset,
          behavior: "smooth"
        });
      }
    }, 800); // Wait for menu close animation
  };

  const links = [
    { label: "INDEX", href: "#" },
    { label: "ABOUT", href: "#about-details" },
    { label: "WORK", href: "#projects" },
    { label: "STACK", href: "#stack" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      {/* NorthGarden Style Floating Island Header */}
      <div
        ref={stickyHeaderRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between min-w-[320px] md:min-w-[400px] bg-white/40 backdrop-blur-2xl border border-white/60 rounded-full px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.05)] opacity-0"
      >
        <a
          href="#"
          onClick={(e) => handleLinkClick(e, "#")}
          className="font-control-tnt text-xs md:text-sm uppercase tracking-widest text-[#1A1A1A] hover:text-[#333896] transition-colors font-bold"
        >
          UDIT R. KASHYAP
        </a>

        <button
          onClick={toggleMenu}
          className="group flex items-center justify-center gap-2 uppercase font-control-tnt font-bold text-xs tracking-widest transition-colors bg-[#1A1A1A] text-white px-5 py-2 rounded-full hover:bg-[#FF4757]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:animate-ping"></span>
          {isOpen ? "CLOSE" : "MENU"}
        </button>
      </div>

      {/* Full Screen Overlay (Vibrant block) */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-gradient-to-br from-[#333896] to-[#1A1A2E] z-[90] flex flex-col items-center justify-center text-white overflow-hidden px-6"
        style={{ transform: "translateY(-100%)" }}
      >
        {/* Upper Utility Bar inside menu */}
        <div className="absolute top-8 md:top-12 left-6 right-6 md:left-24 md:right-24 flex justify-between items-center text-xs tracking-widest font-control-tnt font-bold text-white/60 z-10 border-b border-white/10 pb-6 uppercase">
          <div className="flex flex-col gap-1">
            <span className="opacity-50">PORTFOLIO 2026</span>
            <span className="text-white">v2.0</span>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1">
            <span className="opacity-50">STATUS</span>
            <span className="text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06BA63] animate-pulse"></span>
              AVAILABLE FOR <CyclingWord words={['INTERNSHIPS', 'REMOTE-WORK']} />
            </span>
          </div>
        </div>

        {/* Background watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-control-compressed font-black uppercase text-white/5 select-none pointer-events-none z-0 tracking-tighter mix-blend-overlay">
          MENU
        </div>

        {/* Main Navigation Links */}
        <nav className="flex flex-col items-center gap-2 md:gap-4 z-10 w-full max-w-4xl mt-12 md:mt-0">
          {links.map((link, i) => (
            <div key={i} className="overflow-hidden w-full text-center group">
              <a 
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                ref={el => menuItemsRef.current[i] = el}
                className="inline-block font-control-compressed text-[clamp(40px,10dvh,120px)] font-black tracking-tighter uppercase hover:text-[#FFD500] hover:scale-105 hover:italic transition-all duration-300 leading-[0.85] text-white origin-center relative"
              >
                <span className="absolute -left-12 top-1/2 -translate-y-1/2 text-2xl opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                {link.label}
                <span className="absolute -right-12 top-1/2 -translate-y-1/2 text-2xl opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
              </a>
            </div>
          ))}
        </nav>
        
        {/* Bottom Utility Bar inside menu */}
        <div className="absolute bottom-6 md:bottom-12 left-6 right-6 md:left-24 md:right-24 flex flex-col md:flex-row justify-between items-center gap-4 uppercase text-xs tracking-widest font-control-tnt font-bold text-white/60 z-10 border-t border-white/10 pt-6">
          <div className="flex flex-col text-center md:text-left gap-1">
            <span className="opacity-50 hidden md:block">LOCATION</span>
            <span className="text-white bg-white/10 px-4 py-2 rounded-full">VELLORE, INDIA</span>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 items-center md:items-end">
              <span className="opacity-50 hidden md:block">SOCIALS</span>
              <div className="flex gap-2">
                <a href="https://github.com/UditRajkashyap442-beep" target="_blank" rel="noopener noreferrer" className="bg-white/10 px-4 py-2 rounded-full hover:bg-white hover:text-[#333896] text-white transition-all">GITHUB</a>
                <a href="https://linkedin.com/in/udit-r-kashyap-828a5a320/" target="_blank" rel="noopener noreferrer" className="bg-white/10 px-4 py-2 rounded-full hover:bg-white hover:text-[#333896] text-white transition-all">LINKEDIN</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
