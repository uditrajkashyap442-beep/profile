"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function PageTransition() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const hLinesRef = useRef([]);
  const vLinesRef = useRef([]);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        if (containerRef.current) containerRef.current.style.display = "none";
      }
    });

    // 1. Initial State - Background is dark, lines are scaled down
    gsap.set(vLinesRef.current, { scaleY: 0, transformOrigin: "top" });
    gsap.set(hLinesRef.current, { scaleX: 0, transformOrigin: "left" });

    // 2. Lines draw in rapidly
    tl.to(vLinesRef.current, {
      scaleY: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "expo.inOut"
    }, 0.2);

    tl.to(hLinesRef.current, {
      scaleX: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "expo.inOut"
    }, 0.2);

    // 3. Central square or elements expand/fade out
    tl.to(bgRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut"
    }, "+=0.4");

    // 4. Lines slide out
    tl.to(vLinesRef.current, {
      scaleY: 0,
      transformOrigin: "bottom",
      duration: 0.6,
      stagger: 0.05,
      ease: "power3.inOut"
    }, "<");

    tl.to(hLinesRef.current, {
      scaleX: 0,
      transformOrigin: "right",
      duration: 0.6,
      stagger: 0.05,
      ease: "power3.inOut"
    }, "<");

    // 5. Reveal site content
    tl.fromTo("main",
      { scale: 0.95, y: 50, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 1.2, ease: "back.out(1.5)", clearProps: "all" },
      "-=0.6" 
    );

  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[99990] flex items-center justify-center pointer-events-none"
    >
      {/* ── Solid Background ── */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full bg-[#FAFAFA] pointer-events-auto z-10"
      />

      {/* ── Transition Lines ── */}
      <div className="absolute inset-0 z-20 flex justify-between px-[10vw]">
        {[1, 2, 3].map((i) => (
          <span 
            key={`v-${i}`}
            ref={el => vLinesRef.current[i] = el}
            className="w-[1px] h-full bg-[#1A1A1A] opacity-20"
          />
        ))}
      </div>
      
      <div className="absolute inset-0 z-20 flex flex-col justify-between py-[15vh]">
        {[1, 2, 3].map((i) => (
          <span 
            key={`h-${i}`}
            ref={el => hLinesRef.current[i] = el}
            className="w-full h-[1px] bg-[#1A1A1A] opacity-20"
          />
        ))}
      </div>
    </div>
  );
}
