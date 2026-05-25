"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GridBackground({ color = "rgba(0,0,0,0.05)" }) {
  const containerRef = useRef(null);
  const vLinesRef = useRef([]);
  const hLinesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate vertical lines growing downwards
      gsap.fromTo(
        vLinesRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.inOut",
          stagger: 0.1,
          transformOrigin: "top",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Animate horizontal lines growing rightwards
      gsap.fromTo(
        hLinesRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.inOut",
          stagger: 0.1,
          transformOrigin: "left",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Vertical Lines */}
      <div className="absolute inset-0 flex justify-between px-[10vw]">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={`v-${i}`}
            ref={(el) => (vLinesRef.current[i] = el)}
            className="w-[1px] h-full"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      
      {/* Horizontal Lines */}
      <div className="absolute inset-0 flex flex-col justify-between py-[15vh]">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={`h-${i}`}
            ref={(el) => (hLinesRef.current[i] = el)}
            className="h-[1px] w-full"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
