"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const wrapperRef = useRef(null);
  const innerRef   = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Disable entirely on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const wrapper = wrapperRef.current;
    const inner   = innerRef.current;
    if (!wrapper || !inner) return;

    let lastX = -300;
    let lastY = -300;
    let visible = false;
    let hovering = false;

    // Start offscreen and invisible
    gsap.set(wrapper, { x: lastX, y: lastY, xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(inner,   { scale: 1, rotation: 0, transformOrigin: "50% 50%" });

    const xTo = gsap.quickTo(wrapper, "x", { duration: 0.1, ease: "power2.out" });
    const yTo = gsap.quickTo(wrapper, "y", { duration: 0.1, ease: "power2.out" });

    const onMove = (e) => {
      // Ignore synthetic scroll events
      if (e.clientX === 0 && e.clientY === 0) return;

      lastX = e.clientX;
      lastY = e.clientY;
      xTo(lastX);
      yTo(lastY);

      if (!visible) {
        visible = true;
        gsap.to(wrapper, { opacity: 1, duration: 0.25, ease: "power2.out" });
      }
    };

    const onOver = (e) => {
      const hit = !!e.target.closest(
        "a, button, [role='button'], .hover-target, input, textarea, select"
      );
      if (hit === hovering) return;
      hovering = hit;

      gsap.to(inner, hovering
        ? { scale: 1.8, rotation: 45,  duration: 0.35, ease: "back.out(1.5)",      overwrite: "auto" }
        : { scale: 1,   rotation: 0,   duration: 0.45, ease: "elastic.out(1,0.5)", overwrite: "auto" }
      );
    };
    
    // Instantly snap to the current mouse position when scrolling so it doesn't float away
    const onScroll = () => {
      if (!visible) return;
      gsap.set(wrapper, { x: lastX, y: lastY });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("scroll", onScroll,  { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ willChange: "transform" }}
    >
      <div
        ref={innerRef}
        style={{
          fontSize:   "34px",
          lineHeight: 1,
          color:      "#FF3333",
          fontWeight: 900,
          fontFamily: "sans-serif",
          userSelect: "none",
          willChange: "transform",
        }}
      >
        ✱
      </div>
    </div>
  );
}
