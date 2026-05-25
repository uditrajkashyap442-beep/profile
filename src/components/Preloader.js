"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const textRef = useRef(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
        document.body.style.overflow = "";
      }
    });

    const target = { val: 0 };
    tl.to(target, {
      val: 100,
      duration: 2.5,
      ease: "power3.inOut",
      onUpdate: function () {
        if (counterRef.current) {
          counterRef.current.innerText = Math.floor(target.val) + "%";
        }
      }
    }, 0);

    tl.fromTo(".preloader-char", 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.05, duration: 1, ease: "power4.out" }, 
      0.5
    );

    tl.to(".preloader-char", 
      { y: -100, opacity: 0, stagger: 0.05, duration: 0.8, ease: "power4.in" }, 
      2.5
    );

    tl.to(counterRef.current, { opacity: 0, duration: 0.5 }, 2.8);

    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "expo.inOut",
    }, 3);

  }, []);

  if (isDone) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-midnight-ink flex flex-col items-center justify-between p-8 md:p-12 text-cloud-canvas"
    >
      <div className="w-full flex justify-between uppercase font-control-tnt text-xs tracking-widest font-bold opacity-50">
        <span>Portfolio</span>
        <span>2026</span>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow overflow-hidden">
        <h1 
          ref={textRef}
          className="font-control-compressed text-[12vw] leading-none uppercase tracking-normal font-black overflow-hidden flex"
        >
          {"INITIALIZING".split("").map((char, i) => (
            <span key={i} className="preloader-char inline-block">
              {char}
            </span>
          ))}
        </h1>
      </div>

      <div className="w-full flex justify-between items-end">
        <div className="font-control-tnt text-xs tracking-widest font-bold uppercase opacity-50">
          Udit Raj Kashyap
        </div>
        <div 
          ref={counterRef} 
          className="font-control-compressed text-6xl md:text-8xl font-black text-vivid-azure leading-none"
        >
          0%
        </div>
      </div>
    </div>
  );
}
