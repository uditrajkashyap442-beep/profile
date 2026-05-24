export default function Intro() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#080810] flex flex-col items-center justify-center pointer-events-none overflow-hidden">

      {/* Background Image */}
      <img
        src="/new-landing.jpg"
        alt="Background Landing Image"
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { e.target.style.display = "none"; }}
      />

      {/* Gradient overlay to deepen bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 text-center">

        {/* Eyebrow label */}
        <div className="font-mono text-[10px] md:text-xs text-white/50 uppercase tracking-[0.4em] mb-6 border border-white/20 px-4 py-1.5">
          &quot;PORTFOLIO 2026&quot;
        </div>

        {/* Name */}
        <h1 className="intro-text font-sans font-black text-[14vw] md:text-[11vw] leading-[0.82] tracking-tighter text-white uppercase w-full">
          UDIT RAJ
          <br />
          KASHYAP
        </h1>

        {/* Subtitle strip */}
        <div className="intro-text mt-10 border-y border-white/30 py-3 w-full max-w-xl mx-auto">
          <p className="font-mono text-[10px] md:text-xs text-white/60 uppercase tracking-[0.35em]">
            VIT Vellore · B.Tech ECE · 2024 – 2028
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-50">
          <span className="font-mono text-[9px] text-white uppercase tracking-[0.3em]">SCROLL</span>
          <div className="w-px h-10 bg-white/50 animate-pulse" />
        </div>
      </div>

    </div>
  );
}
