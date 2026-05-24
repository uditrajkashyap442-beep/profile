"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // On scroll: shrink pill slightly + increase opacity
      gsap.to(navRef.current, {
        scaleX: 0.96,
        y: 4,
        backgroundColor: "rgba(8, 8, 16, 0.75)",
        ease: "power2.out",
        scrollTrigger: {
          trigger: document.body,
          start: "top -60",
          end: "top -220",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: "Work",    href: "#projects" },
    { name: "Stack",   href: "#stack"    },
    { name: "About",   href: "#about"    },
  ];

  return (
    <>
      <div className="fixed top-5 left-0 w-full z-50 px-4 md:px-8 pointer-events-none">
        <nav
          ref={navRef}
          className="mx-auto max-w-6xl rounded-[40px] bg-black/30 backdrop-blur-2xl border border-white/10 py-3 px-4 md:py-4 md:px-6 flex justify-between items-center pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.4)] origin-top"
          style={{ transition: "background-color 0.4s ease" }}
        >

          {/* Logo */}
          <a
            href="#"
            className="font-sans font-bold text-white text-lg md:text-xl tracking-tight hover-target ml-1 md:ml-3 leading-none opacity-90 hover:opacity-100 transition-opacity"
          >
            Udit Raj Kashyap
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-sans text-sm font-bold text-white/70 hover:text-white px-5 py-2.5 rounded-full hover:bg-white/10 transition-all duration-200 hover-target tracking-wide uppercase"
              >
                {link.name}
              </a>
            ))}

            <a
              href="/resume.pdf"
              target="_blank"
              className="font-sans text-sm font-bold bg-[#E6FF00] text-black px-6 py-2.5 rounded-full hover:bg-white transition-all duration-200 hover-target ml-2 tracking-wide uppercase"
            >
              Resume
            </a>

            <a
              href="#contact"
              className="w-11 h-11 rounded-full flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all duration-200 hover-target ml-1"
              aria-label="Contact"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center border border-white/20 text-white/80 hover:bg-white/10 hover-target mr-1 transition-all"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="8"  x2="21" y2="8"  />
              <line x1="3" y1="16" x2="21" y2="16" />
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile Full-Screen Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#080810]/97 backdrop-blur-2xl flex flex-col justify-center px-8">
          {/* Close */}
          <button
            className="absolute top-7 right-7 font-mono text-xs text-white/50 hover:text-white transition-colors hover-target tracking-widest uppercase"
            onClick={() => setMobileMenuOpen(false)}
          >
            CLOSE ✕
          </button>

          {/* Ticker strip at top */}
          <div className="absolute top-0 left-0 right-0 overflow-hidden border-b border-white/10 py-2 bg-[#E6FF00]">
            <div className="flex whitespace-nowrap animate-scroll">
              {[...Array(8)].map((_, i) => (
                <span key={i} className="font-sans font-bold text-black text-xs uppercase tracking-widest px-6">
                  UDIT RAJ KASHYAP · ECE · VIT VELLORE ·&nbsp;
                </span>
              ))}
            </div>
          </div>

          <nav className="flex flex-col space-y-2 mt-12">
            {[
              { name: "Work",    href: "#projects" },
              { name: "Stack",   href: "#stack"    },
              { name: "About",   href: "#about"    },
              { name: "Resume",  href: "/resume.pdf" },
              { name: "Contact", href: "#contact"  },
            ].map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between border-b border-white/10 py-6 hover-target"
              >
                <span className="font-sans font-black text-5xl text-white uppercase tracking-tighter group-hover:text-[#E6FF00] transition-colors duration-200">
                  {link.name}
                </span>
                <span className="font-mono text-white/30 text-sm group-hover:text-[#FF3333] transition-colors">
                  0{i + 1}
                </span>
              </a>
            ))}
          </nav>

          <p className="absolute bottom-8 left-8 font-mono text-xs text-white/20 uppercase tracking-widest">
            © 2026 Udit Raj Kashyap
          </p>
        </div>
      )}
    </>
  );
}
