"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MagneticElement from "./MagneticElement";
import GridBackground from "./GridBackground";

export default function Contact() {
  const [email, setEmail] = useState("[loading...]");
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Decode email client-side to prevent scraping asynchronously
    const timer = setTimeout(() => {
      setEmail(atob("dWRpdHJhamthc2h5YXA0NDJAZ21haWwuY29t"));
    }, 0);

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Headline bouncy reveal lines
      gsap.fromTo(
        ".reveal-line",
        { y: "120%" },
        {
          y: "0%",
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Contact links pop in
      gsap.fromTo(
        ".contact-link",
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            trigger: ".contact-links",
            start: "top 85%",
          },
        }
      );

      // Massive Footer Parallax Reveal with spring
      gsap.fromTo(
        ".footer-huge-text",
        { y: "50%", scale: 0.8, opacity: 0 },
        {
          y: "0%",
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-huge-container",
            start: "top bottom",
            end: "center center",
            scrub: true, // Synced with Lenis
          },
        }
      );
    }, sectionRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const handleCopy = (e) => {
    e.preventDefault();
    if (email.includes("@")) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const links = [
    {
      label: "MAIL",
      value: email,
      href: `mailto:${email}`,
      onClick: handleCopy,
      extra: copied ? "COPIED ✓" : null,
      color: "bg-[#FA60BE]"
    },
    {
      label: "GITHUB",
      value: "/UditRajkashyap442-beep",
      href: "https://github.com/UditRajkashyap442-beep",
      color: "bg-[#06BA63]"
    },
    {
      label: "LINKEDIN",
      value: "/in/udit-r-kashyap",
      href: "https://linkedin.com/in/udit-r-kashyap-828a5a320/",
      color: "bg-[#333896]"
    }
  ];

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="theme-section relative w-full bg-[#E5E0D8] text-[#1A1A1A] pt-32 md:pt-48 pb-12 px-6 md:px-12 overflow-hidden flex flex-col justify-between min-h-[100dvh]"
      data-bgcolor="#E5E0D8"
      data-textcolor="#1A1A1A"
    >
      <GridBackground color="rgba(51,56,150,0.06)" />

      {/* Background grain */}
      <div className="absolute inset-0 z-[1] bg-[url('/noise.png')] opacity-[0.04] pointer-events-none mix-blend-overlay"></div>

      {/* Decorative Blob */}
      <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] bg-[#FFD1DC] rounded-full blur-[100px] mix-blend-multiply opacity-50 pointer-events-none z-0" />

      {/* Top Section - Form & Links */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
        
        {/* Left Column - Heading & Form */}
        <div className="contact-form-container flex flex-col justify-between">
          <div className="mb-12">
            <div className="inline-block font-control-tnt text-xs tracking-[0.1em] text-[#FF4757] bg-white/50 px-4 py-2 rounded-full uppercase mb-8 font-bold shadow-sm">
              05 — GET IN TOUCH
            </div>
            <h2 className="font-control-compressed text-[clamp(50px,7vw,100px)] leading-[0.85] font-black tracking-tighter text-[#1A1A1A]">
              <span className="overflow-hidden inline-block p-1">
                <span className="reveal-line inline-block">A LONG WAY TO GO.</span>
              </span>
              <span className="overflow-hidden inline-block mt-6 p-1">
                <span className="reveal-line inline-block border-b-[8px] border-[#333896] pb-3 text-[#FF4757]">LET&apos;S BUILD<br/>SOMETHING REAL.</span>
              </span>
            </h2>

            <p className="mt-8 font-control text-lg text-[#1A1A1A]/70 max-w-md font-medium">
              Got an idea? Need an engineer who actually cares about design? Let's talk. I'm currently open for new opportunities.
            </p>
          </div>
        </div>

        {/* Right Column - Magnetic Contact Links */}
        <div className="flex justify-start md:justify-end h-full">
          <div className="flex flex-col justify-end">
            <div className="contact-links flex flex-col gap-4">
              {links.map((link, i) => (
                <div key={i} data-cursor-text={link.label === 'MAIL' ? 'COPY' : 'OPEN'} className="contact-link group relative overflow-hidden bg-white/50 backdrop-blur-md rounded-[32px] shadow-sm hover:shadow-lg transition-all duration-300">
                  <MagneticElement>
                    <a
                      href={link.href}
                      target={link.label === 'MAIL' ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      onClick={link.onClick}
                      className="flex flex-col md:flex-row md:items-center justify-between p-6 relative group z-10 w-full"
                    >
                      {/* Bouncy fill from bottom */}
                      <div
                        className={`absolute inset-0 ${link.color} scale-y-0 origin-bottom group-hover:scale-y-100 z-0 rounded-[32px]`}
                        style={{
                          transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                      />

                      <div className="relative z-10 flex items-center gap-3 mb-2 md:mb-0">
                        <span className="font-control-tnt text-sm font-bold text-[#1A1A1A]/60 group-hover:text-white uppercase tracking-widest transition-colors">
                          {link.label}
                        </span>
                        <span className="text-[#1A1A1A] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:text-white group-hover:translate-x-0 transition-all duration-300 font-bold">
                          ✦
                        </span>
                      </div>

                      <div className="relative z-10 font-control font-bold text-xl md:text-2xl tracking-tight group-hover:text-white transition-colors duration-300 break-all text-right text-[#1A1A1A]">
                        {link.value}
                        {link.extra && (
                          <span className="absolute -top-4 right-0 font-control-tnt text-[10px] text-[#1A1A1A] bg-[#FFD500] px-3 py-1 uppercase tracking-widest rounded-full shadow-sm font-bold">
                            {link.extra}
                          </span>
                        )}
                      </div>
                    </a>
                  </MagneticElement>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Massive Scroll Reveal Text with bouncy animation */}
      <div className="footer-huge-container overflow-hidden w-full mt-32 relative bg-white/30 backdrop-blur-sm rounded-[60px] py-12">
        <div className="footer-huge-text flex justify-center w-full relative">
          <h1 className="font-control-compressed font-black text-[clamp(60px,18vw,300px)] leading-[0.8] tracking-tighter uppercase pointer-events-none text-[#FA60BE]">
            LET{"'"}S TALK
          </h1>
        </div>
      </div>

      {/* Footer strip */}
      <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-control-tnt text-sm font-bold opacity-60 uppercase tracking-widest bg-white/40 px-4 py-2 rounded-full">
          Udit Raj Kashyap — Portfolio 2026
        </span>
        <span className="font-control-tnt text-sm font-bold opacity-60 uppercase tracking-widest bg-white/40 px-4 py-2 rounded-full">
          VIT Vellore · B.Tech ECE · India
        </span>
        <span className="font-control font-black opacity-100 text-3xl text-[#333896]" style={{ animation: 'spin 8s linear infinite' }}>✦</span>
      </div>

    </section>
  );
}
