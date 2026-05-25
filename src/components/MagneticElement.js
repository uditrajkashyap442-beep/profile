"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticElement({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    // Check if device supports hover
    if (window.matchMedia("(hover: none)").matches) return;

    const el = ref.current;
    
    // Smooth elastic spring back - more aggressive bounce
    const xTo = gsap.quickTo(el, "x", { duration: 1.5, ease: "elastic.out(1.5, 0.2)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1.5, ease: "elastic.out(1.5, 0.2)" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // The pull strength (0.5 means it pulls 50% towards the cursor)
      xTo(x * 0.5);
      yTo(y * 0.5);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={ref} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}
