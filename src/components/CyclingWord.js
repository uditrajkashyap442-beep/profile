"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CyclingWord({ words }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".cycling-item");
      const tl = gsap.timeline({ repeat: -1 });

      items.forEach((item, index) => {
        // Initial setup - push everything down except the first one
        gsap.set(item, { y: index === 0 ? "0%" : "100%", opacity: index === 0 ? 1 : 0 });

        if (index > 0) {
          // Slide out previous
          tl.to(items[index - 1], {
            y: "-100%",
            opacity: 0,
            duration: 0.6,
            ease: "power3.inOut",
            delay: 2.0 // Hold duration
          });

          // Slide in current
          tl.to(item, {
            y: "0%",
            opacity: 1,
            duration: 0.6,
            ease: "power3.inOut",
          }, "<");
        }
      });

      // After the last one, cycle back to the first
      tl.to(items[items.length - 1], {
        y: "-100%",
        opacity: 0,
        duration: 0.6,
        ease: "power3.inOut",
        delay: 2.0
      });

      tl.fromTo(items[0], 
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.6, ease: "power3.inOut" }, 
        "<"
      );

    }, containerRef);

    return () => ctx.revert();
  }, [words]);

  const longestWord = words.reduce((a, b) => a.length > b.length ? a : b, "");

  return (
    <span 
      ref={containerRef} 
      className="inline-flex relative overflow-hidden align-bottom"
      style={{ height: "1.2em", minWidth: "5em" }} // Adjust height/width as needed
    >
      <span className="invisible opacity-0" aria-hidden="true">{longestWord}</span> {/* Sizer */}
      {words.map((word, index) => (
        <span 
          key={index}
          className="cycling-item absolute left-0 top-0 w-full"
        >
          {word}
        </span>
      ))}
    </span>
  );
}
