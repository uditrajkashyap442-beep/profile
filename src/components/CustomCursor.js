"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const wrapperRef = useRef(null);
  const innerRef   = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const wrapper = wrapperRef.current;
    const inner   = innerRef.current;
    if (!wrapper || !inner) return;

    let lastX     = -300;
    let lastY     = -300;
    let visible   = false;
    let hovering  = false;
    let scrolling = false;
    let scrollTimer = null;

    // Centre on pointer; start offscreen + invisible
    gsap.set(wrapper, { x: lastX, y: lastY, xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(inner,   { scale: 1, rotation: 0, transformOrigin: "50% 50%" });

    const xTo = gsap.quickTo(wrapper, "x", { duration: 0.1, ease: "power2.out" });
    const yTo = gsap.quickTo(wrapper, "y", { duration: 0.1, ease: "power2.out" });

    // ── Mouse move ──────────────────────────────────────────────────────────
    const onMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;

      // Returning from scroll — snap back instantly then resume tracking
      if (scrolling) {
        scrolling = false;
        clearTimeout(scrollTimer);
        gsap.set(wrapper, { x: lastX, y: lastY });
      }

      xTo(lastX);
      yTo(lastY);

      if (!visible) {
        visible = true;
        gsap.to(wrapper, { opacity: 1, duration: 0.25, ease: "power2.out" });
      }
    };

    // ── Hover state ─────────────────────────────────────────────────────────
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

    // ── Scroll — park in top-left corner ───────────────────────────────────
    const onScroll = () => {
      if (!visible) return;

      if (!scrolling) {
        scrolling = true;
        // Glide to top-left corner
        gsap.to(wrapper, {
          x: 48,
          y: 48,
          duration: 0.55,
          ease: "power3.out",
          overwrite: "auto",
        });
        // Also shrink & un-rotate while parked
        gsap.to(inner, {
          scale: 0.7,
          rotation: 0,
          duration: 0.35,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      // Reset the "scroll ended" timer on every scroll event
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        scrolling = false;
        // Restore scale when scroll stops (cursor returns on next mousemove)
        gsap.to(inner, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      }, 180);
    };

    window.addEventListener("mousemove", onMove,   { passive: true });
    window.addEventListener("mouseover", onOver,   { passive: true });
    window.addEventListener("scroll",    onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("scroll",    onScroll);
      clearTimeout(scrollTimer);
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
