"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Magnetic from "./Magnetic";

export default function MenuOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
      gsap.to(menuRef.current, { autoAlpha: 1, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(linksRef.current, 
        { y: 60, opacity: 0, scale: 0.9 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(menuRef.current, { autoAlpha: 0, duration: 0.4, ease: "power2.in" });
    }
  }, [isOpen]);

  return (
    <>
      {/* Opener Button - Ghost Navigation Button */}
      <Magnetic>
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed top-6 right-6 md:top-10 md:right-10 z-40 font-control text-[12px] font-medium tracking-widest text-white bg-transparent border border-white/40 px-5 py-2.5 rounded-[8px] shadow-lg hover:border-white transition-all text-center hover-trigger"
          aria-label="Open Menu"
          data-cursor-text="MENU"
        >
          MENU
        </button>
      </Magnetic>

      {/* Full Screen Menu */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-[99990] bg-cloud-canvas text-midnight-ink flex flex-col justify-center items-center invisible opacity-0"
      >
        <Magnetic>
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-6 md:top-12 md:right-12 p-2 hover:rotate-90 transition-transform duration-500 hover-trigger text-midnight-ink"
            data-cursor-text="CLOSE"
          >
            <svg width="30" height="30" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.20458 -0.000234323L0 4.20435L32.7958 37.0001L37.0003 32.7955L4.20458 -0.000234323Z" fill="currentColor"/>
              <path d="M5.47257e-06 32.7955L4.20459 37.0001L37.0003 4.20434L32.7958 -0.000244141L5.47257e-06 32.7955Z" fill="currentColor"/>
            </svg>
          </button>
        </Magnetic>

        <nav className="flex flex-col items-center gap-[48px]">
          {["Home", "About", "Projects", "Stack", "Education", "Contact"].map((item, i) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              ref={el => linksRef.current[i] = el}
              className="font-control-compressed font-black text-[12vw] md:text-[6vw] uppercase leading-none tracking-normal hover:text-vivid-azure transition-colors hover:scale-[1.02] transform duration-300 relative group hover-trigger"
              data-cursor-text="GOTO"
            >
              <span className="absolute -left-10 md:-left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-control text-vivid-azure text-xl md:text-3xl">&rarr;</span>
              {item}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
