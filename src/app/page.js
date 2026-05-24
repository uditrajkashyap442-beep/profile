"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Intro from "@/components/Intro";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {

  useEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative bg-transparent">
      <CustomCursor />
      <Nav />
      <Intro />

      {/*
        mt-[100vh] pushes the scroll-content below the fixed Intro.
        z-10 ensures it overlaps the Intro as the user scrolls down.
        bg-[#080810] = dark — the first section (Hero) is dark so this matches.
      */}
      <div className="relative z-10 mt-[100vh] bg-[#080810]">
        <Hero />
        <Projects />
        <About />
        <Stack />
        <Education />
        <Contact />
      </div>
    </main>
  );
}
