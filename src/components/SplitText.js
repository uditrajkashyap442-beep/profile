"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function SplitText({ text, className = "", delay = 0, scrub = false }) {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;
    const words = containerRef.current.querySelectorAll(".split-word-inner");
    
    if (scrub) {
      // Premium 3D Blur & Tilt Reveal (Awwwards Style)
      gsap.set(containerRef.current, { perspective: 1000 });
      gsap.set(words, { opacity: 0, filter: "blur(12px)", rotationX: -80, y: 50, scale: 0.9 });
      
      gsap.to(words, {
        opacity: 1,
        filter: "blur(0px)",
        rotationX: 0,
        y: 0,
        scale: 1,
        stagger: 0.03,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          end: "top 65%",
          scrub: 1,
        }
      });
    } else {
      // Standard slide-up staggered reveal
      gsap.fromTo(words, 
        { y: "110%", rotationZ: 5 },
        {
          y: "0%",
          rotationZ: 0,
          duration: 1,
          stagger: 0.02,
          ease: "power4.out",
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, [delay, scrub]);

  return (
    <span ref={containerRef} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top mr-[0.25em]">
          <span className="split-word-inner inline-block origin-top-left will-change-transform pb-2">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
