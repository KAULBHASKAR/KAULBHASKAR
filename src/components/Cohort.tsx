export default function Cohort() {
  const handleApplyClick = () => {
    // Fixed mailto URL syntax by adding a subject prefix and proper formatting
    window.location.href = "mailto:kaulbhaskar@://gmail.com";
  };

  return (
    <div className="bg-[#0f1115] text-[#e4e6eb] font-sans antialiased selection:bg-[#c5a880] selection:text-black">
      {/* HERO SECTION */}
      <section className="relative px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:px-8 flex flex-col items-center text-center">
        <span className="text-xs font-semibold tracking-widest text-[#c5a880] uppercase bg-[#1a1e26] px-4 py-2 rounded-full border border-[#c5a880]/20 mb-6">
          The Autumn 2026 Accelerator
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl max-w-4xl font-serif leading-tight">
          The Architecture of <span className="text-[#c5a880]">Absolute Sovereignty</span>.
        </h1>
        <p className="max-w-2xl mt-6 text-lg leading-8 text-[#9ca3af]">
          A selective, high-ticket metaphysical accelerator designed exclusively for founders, corporate executives, and wealth-builders who command material power but seek ultimate spiritual mastery.
        </p>
        <p className="max-w-xl mt-4 text-sm text-[#7c828d] italic border-t border-[#c5a880]/10 pt-4">
          You have mastered the rules of the marketplace. Now, master the unseen energetic laws that govern your legacy and eliminate executive burnout forever.
        </p>
        <div className="mt-10">
          <button
            onClick={handleApplyClick}
            className="rounded-md bg-[#c5a880] px-8 py-3.5 text-sm font-semibold text-black shadow-sm hover:bg-[#b0936b] transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#c5a880]"
          >
            Apply for the Cohort
          </button>
        </div>
      </section>

      {/* THE PREMISE */}
      <section className="bg-[#141822] py-20 border-y border-[#c5a880]/10">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-3xl mx-auto text-center lg:max-w-none">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl font-serif">
              Bridging Material Supremacy with Metaphysical Law
            </h2>
            <div className="grid grid-cols-1 gap-8 mt-10 text-base leading-7 text-[#9ca3af] lg:grid-cols-2 text-left">
              <p>
                Most mainstream spiritual spaces cater to passive retreat. They tell you to detach from your ambitions. They do not understand the heavy burdens, intense structural stress, or isolation that come with high-level corporate execution.
              </p>
              <p>
                The Sovereign Executive Cohort is entirely different. Founded by <strong className="text-white">Kaulbhaskar</strong>, this program treats your ambition as a sacred fire. By blending execution frameworks with the precise energetic sciences of the Kaula Marga, we help you turn your career into a flawless cosmic mechanism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM PILLARS */}
      <section className="px-6 py-20 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white font-serif sm:text-4xl">
            The Executive Core Framework
          </h2>
          <p className="mt-4 text-base text-[#7c828d]">
            Four pillars designed to systematically upgrade your energetic footprint and corporate capacity.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-[#141822] p-6 rounded-lg border border-[#c5a880]/5 hover:border-[#c5a880]/20 transition-colors">
            <div className="text-xs font-bold text-[#c5a880] tracking-wider mb-2 uppercase">Pillar I</div>
            <h3 className="text-lg font-semibold text-white mb-3">Karmic Architecture</h3>
            <p className="text-sm text-[#9ca3af] leading-relaxed">
              Diagnose and neutralize structural blocks in your professional timeline. Convert recurring business friction into predictable breakthroughs.
            </p>
          </div>
          <div className="bg-[#141822] p-6 rounded-lg border border-[#c5a880]/5 hover:border-[#c5a880]/20 transition-colors">
            <div className="text-xs font-bold text-[#c5a880] tracking-wider mb-2 uppercase">Pillar II</div>
            <h3 className="text-lg font-semibold text-white mb-3">Cognitive Resonance</h3>
            <p className="text-sm text-[#9ca3af] leading-relaxed">
              Shift from physical grind to energetic alignment. Deploy targeted metaphysical protocols to eradicate executive fatigue completely.
            </p>
          </div>
          <div className="bg-[#141822] p-6 rounded-lg border border-[#c5a880]/5 hover:border-[#c5a880]/20 transition-colors">
            <div className="text-xs font-bold text-[#c5a880] tracking-wider mb-2 uppercase">Pillar III</div>
            <h3 className="text-lg font-semibold text-white mb-3">The Sovereign Mind</h3>
            <p className="text-sm text-[#9ca3af] leading-relaxed">
              Replace casual mindfulness with authentic internal subsystems. Master absolute silence while managing multi-million dollar structures.
            </p>
          </div>
          <div className="bg-[#141822] p-6 rounded-lg border border-[#c5a880]/5 hover:border-[#c5a880]/20 transition-colors">
            <div className="text-xs font-bold text-[#c5a880] tracking-wider mb-2 uppercase">Pillar IV</div>
            <h3 className="text-lg font-semibold text-white mb-3">Material Expansion</h3>
            <p className="text-sm text-[#9ca3af] leading-relaxed">
              Align cash flows, networks, and enterprise goals with macro-laws of universal balance, keeping your wealth permanently defensive.
            </p>
          </div>
        </div>
      </section>

      {/* BIOGRAPHY FEATURE */}
      <section className="bg-[#141822] py-20 border-t border-[#c5a880]/10">
        <div className="px-6 mx-auto max-w-5xl lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="h-64 w-64 rounded-xl bg-linear-to-tr from-[#c5a880]/20 to-[#141822] border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] font-serif text-2xl tracking-widest uppercase">
              KB
            </div>
          </div>
          <div className="w-full md:w-2/3 text-left">
            <h2 className="text-sm font-semibold tracking-wider text-[#c5a880] uppercase">The Authority</h2>
            <h3 className="text-3xl font-bold text-white font-serif mt-2">Guided by Kaulbhaskar</h3>
            <p className="mt-4 text-base leading-7 text-[#9ca3af]">
              Kaulbhaskar is a deeply respected <em>Sri Vidya Upasaka</em> and traditional lineage researcher who acts as a key metaphysical advisor to elite high-performers, entrepreneurs, and industrial leaders. 
            </p>
            <p className="mt-4 text-base leading-7 text-[#9ca3af]">
              By separating modern commercial noise from authentic, verifiable energetic mechanics, he provides high-net-worth individuals with the practical, data-driven, and structural spiritual systems they need to navigate modern power structures safely.
            </p>
          </div>
        </div>
      </section>

      {/* CLOSING / SCARCITY FILTER */}
      <section className="px-6 py-24 mx-auto max-w-4xl text-center sm:py-32 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white font-serif sm:text-4xl">
          An Exclusive, Automated Digital Sanctuary
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#9ca3af]">
          To protect the absolute network value of our ecosystem, admission to the Sovereign Executive Cohort is strictly invitation-only. The program is fully optimized for your high-stakes schedule, utilizing secure private digital workspaces and premium mastermind systems.
        </p>
        <p className="mt-4 text-xs tracking-wider text-[#7c828d] uppercase font-semibold">
          Heavy Scarcity Filter Applied • Exclusively for Corporate Leaders
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={handleApplyClick}
            className="rounded-md bg-[#c5a880] px-8 py-3.5 text-sm font-semibold text-black shadow-sm hover:bg-[#b0936b] transition-colors"
          >
            Request an Invitation
          </button>
        </div>
      </section>
    </div>
  );
}
