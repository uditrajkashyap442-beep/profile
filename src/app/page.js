"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import About from "@/components/About";
import ProjectsList from "@/components/ProjectsList";
import Stack from "@/components/Stack";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {

  useEffect(() => {
    // Lenis Smooth Scroll - Ultra smooth physics
    const lenis = new Lenis({
      lerp: 0.09, // Buttery smooth inertia
      smoothWheel: true,
      wheelMultiplier: 0.9, // Slightly softer wheel pace
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenis = lenis;

    // Sync Lenis with GSAP ScrollTrigger to prevent jitter
    lenis.on('scroll', ScrollTrigger.update);

    // Use native requestAnimationFrame instead of gsap.ticker to avoid strict mode crashes
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global Scroll Color Themes
    gsap.registerPlugin(ScrollTrigger);
    
    const sections = document.querySelectorAll(".theme-section");
    
    sections.forEach((section) => {
      const bgColor = section.getAttribute("data-bgcolor") || "#F4F0EA";
      const textColor = section.getAttribute("data-textcolor") || "#1A1A1A";
      
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => {
          document.documentElement.style.setProperty('--current-bg', bgColor);
          document.documentElement.style.setProperty('--current-fg', textColor);
        },
        onEnterBack: () => {
          document.documentElement.style.setProperty('--current-bg', bgColor);
          document.documentElement.style.setProperty('--current-fg', textColor);
        }
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.lenis = null;
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <main className="relative bg-transparent transition-colors duration-700">
        <Hero />
        <AboutSection />
        <About />
        <ProjectsList />
        <Stack />
        <Education />
        <Contact />
      </main>
    </>
  );
}
