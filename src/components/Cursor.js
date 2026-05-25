"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [text, setText] = useState("");
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    // Hide default cursor on body (fallback)
    document.body.style.cursor = "none";

    // Snappy quickTo for highly responsive cursor tracking
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3.out" });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e) => {
      const isInput = e.target.closest("input, textarea, select");
      if (isInput) {
        gsap.to(cursorRef.current, { opacity: 0, scale: 0.1, duration: 0.2 });
        document.body.style.cursor = "auto";
        return;
      }
      document.body.style.cursor = "none";
      gsap.to(cursorRef.current, { opacity: 1, duration: 0.2 });

      const target = e.target.closest("a, button, .hover-trigger, .ghost-btn, .project-card, .magnetic-element");
      if (target) {
        const cursorText = target.getAttribute("data-cursor-text") || "";
        setText(cursorText);
        
        gsap.to(cursorRef.current, { 
          scale: cursorText ? 6 : 4, 
          duration: 0.4,
          ease: "back.out(1.5)"
        });

        if (cursorText && textRef.current) {
          gsap.fromTo(textRef.current, 
            { opacity: 0, scale: 0.5 }, 
            { opacity: 1, scale: 1, duration: 0.3, delay: 0.1 }
          );
        }
      }
    };

    const handleMouseOut = (e) => {
      const isInput = e.target.closest("input, textarea, select");
      if (isInput) {
        gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.2 });
        document.body.style.cursor = "none";
        return;
      }

      const target = e.target.closest("a, button, .hover-trigger, .ghost-btn, .project-card, .magnetic-element");
      if (target) {
        setText("");
        gsap.to(cursorRef.current, { 
          scale: 1, 
          duration: 0.4,
          ease: "power3.out"
        });
      }
    };

    const handleMouseDown = () => {
      gsap.to(cursorRef.current, { scale: 0.6, duration: 0.15, ease: "power3.out" });
    };
    const handleMouseUp = () => {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 bg-white mix-blend-difference rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden"
    >
      {text && (
        <span 
          ref={textRef}
          className="text-[3px] font-control-tnt font-bold text-black uppercase tracking-[0.2em] text-center leading-none mt-[1px]"
        >
          {text}
        </span>
      )}
    </div>
  );
}
