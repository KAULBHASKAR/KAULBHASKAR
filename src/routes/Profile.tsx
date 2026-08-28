import React from 'react';
// Import Helmet directly to bypass SEO prop type errors
import { Helmet } from 'react-helmet-async';

// Upgraded copy variables for premium, international branding
const profileData = {
  title: "Metaphysical Strategy for High-Performers",
  subtitle: "Kaulbhaskar provides high-performers with data-driven spiritual systems to safely navigate modern power structures.",
  knownAs: "KAULBHASKAR",
  discipleOf: "KULBHUSHANANAD NATH",
  guruAs: "- An Esteemed KAUL of Prayagraj",
  lineage: [
    { label: "Sri Guru", name: "Sri KULBHUSHANANAND NATH Ji" },
    { label: "Grand Guru (Param Guru)", name: "Sri GUPTAVATAR BABA SRI" },
    { label: "Great Grand Guru (Paratpara Guru)", name: "Sri MATSYENDRA NATH" },
    { label: "Great-Great Grand Guru (Par-Paratpara Guru)", name: "Lord ISHANA" },
    { label: "Great-Great-Great Grand Guru (Parmeshthi Guru)", name: "PARAMA SHIVA" },
  ]
};

// Tooltip dictionary mapping keyword keys to premium executive explanations
const tooltips: Record<string, string> = {
  eliteFamily: "A heritage designation indicating a background rooted in high-court scholarship, land governance, and intellectual leadership within traditional Indian society (historically identified as Bhumihar Brahmin of the Kaushik Gotra).",
  sriVidya: "A sophisticated school of Vedic metaphysics focused on mastering cosmic energy, geometry, and consciousness to achieve absolute balance between immense material wealth and spiritual liberation.",
  kaulMarg: "An unbroken chain of oral tradition and energetic transmission passed down directly through generations of masters, ensuring all advisory practices remain authentic and free from modern alterations.",
  astrologicalSystems: "Three distinct mathematical and analytical frameworks within Vedic astrology (Parasara, Jaimini, and Krishnamurthi). Combining them allows for multi-layered data verification, offering highly accurate timing for business decisions and risk management."
};

interface TooltipProps {
  text: string;
  tooltipKey: keyof typeof tooltips;
}

// Reusable custom React Tooltip component utilizing Tailwind's group-hover states
const InteractiveTooltip: React.FC<TooltipProps> = ({ text, tooltipKey }) => {
  return (
    <span className="relative inline-block group cursor-help border-b-2 border-dashed border-orange-500 text-stone-900 font-semibold px-1 bg-orange-50/50 hover:bg-orange-100/80 transition-colors rounded">
      {text}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block w-72 md:w-80 bg-stone-900 text-stone-200 text-sm font-normal normal-case p-4 rounded-xl shadow-2xl border border-stone-800 z-50 leading-relaxed font-sans animate-fade-in">
        {tooltips[tooltipKey]}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900"></span>
      </span>
    </span>
  );
};

const Profile: React.FC = () => {
  // ✅ Structured JSON-LD Person & Lineage Schema definition
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "KAULBHASKAR GURU Ji",
    "description": "Metaphysical consultant bridging classical Astrological systems with authentic Tantric sciences for corporate and high-performance strategy.",
    "url": "https://kaulbhaskar.com",
    "image": "https://kaulbhaskar.com",
    "jobTitle": "Metaphysical Strategist & Spiritual Consultant",
    "knowsAbout": [
      "Vedic Astrology",
      "Sri Vidya Metaphysics",
      "Kaul Marg Traditions",
      "Tantric Ritual Mechanics"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "KAUL TANTRA SADHANA",
      "url": "https://www.kaulbhaskar.com"
    }
  };
  return (
    <div className="bg-yellow-500 min-h-screen font-serif text-stone-800 selection:bg-orange-200 pt-32">
      {/* Dynamic Helmet Head Meta Tags Injections */}
      <Helmet>
        <title>Guru Profile & Lineage | KAULBHASKAR Metaphysical Advisory</title>
        <meta name="description" content="Discover the analytical background and ancient spiritual lineage of Kaulbhaskar. Bridging elite traditional lineage with precision astrological and Tantric consulting." />
        <link rel="canonical" href="https://vwww.kaulbhaskar.com" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://www.kaulbhaskar.com" />
        <meta property="og:title" content="Guru Profile & Lineage | KAULBHASKAR Metaphysical Advisory" />
        <meta property="og:description" content="Discover the analytical background and ancient spiritual lineage of Kaulbhaskar. Bridging elite traditional lineage with precision astrological and Tantric consulting." />
        <meta property="og:image" content="https://www.kaulbhaskar.com" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.kaulbhaskar.com" />
        <meta name="twitter:title" content="Guru Profile & Lineage | KAULBHASKAR Metaphysical Advisory" />
        <meta name="twitter:description" content="Discover the analytical background and ancient spiritual lineage of Kaulbhaskar. Bridging elite traditional lineage with precision astrological and Tantric consulting." />
        <meta name="twitter:image" content="https://www.kaulbhaskar.com" />
      </Helmet>

      {/* Homepage Hero Section */}
      <header className="bg-white border-b border-stone-200 py-24 px-6 text-center shadow-sm">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-stone-900 max-w-4xl mx-auto leading-tight">
          {profileData.title}
        </h1>
        <div className="h-1 w-24 bg-orange-500 mx-auto mb-8"></div>
        <p className="text-lg md:text-2xl text-stone-600 font-normal max-w-3xl mx-auto leading-relaxed">
          {profileData.subtitle}
        </p>
      </header>

      <main className="max-w-4xl mx-auto py-16 px-6">
        {/* Core Identity Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white p-8 border-l-4 border-orange-600 shadow-md">
            <h2 className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-2 font-sans">Known As</h2>
            <p className="text-2xl font-black text-stone-900">{profileData.knownAs}</p>
          </div>
          <div className="bg-white p-8 border-l-4 border-stone-800 shadow-md">
            <h2 className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-2 font-sans">Direct Disciple Of</h2>
            <p className="text-2xl font-black text-stone-900">{profileData.discipleOf}</p>
            <p className="text-lg font-semibold text-orange-700">{profileData.guruAs}</p>
          </div>
        </div>

        {/* Biography Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-stone-900 border-b-2 border-orange-100 pb-4">Executive Biography</h2>
          
          <div className="prose prose-stone prose-xl md:prose-2xl max-w-none text-stone-700 leading-relaxed space-y-10">
            <p className="text-2xl">
              A former high-court litigator with a strong academic foundation in science and law, 
              <span className="font-semibold text-stone-900"> Kaulbhaskar</span> spent decades handling complex legal disputes before pivoting fully into high-level metaphysical advisory. Born into a highly respected, traditional <InteractiveTooltip text="elite family" tooltipKey="eliteFamily" /> in Bihar, India, he transitioned his rigorous analytical mastery from the courtroom to the study of ancient energetic mechanics. Today, he bridges heritage wisdom with modern leadership strategy as a full-time consultant in classical Astrology and authentic Tantric sciences.
            </p>
            
            <p className="text-2xl">
              For more than three decades, Kaulbhaskar has maintained the strict spiritual protocols of <InteractiveTooltip text="Sri Vidya" tooltipKey="sriVidya" />, descending directly through the venerable, lineage-backed <InteractiveTooltip text="Kaul Marg tradition" tooltipKey="kaulMarg" />. 
            </p>

            <p className="text-2xl">
              His advanced corporate and personal consulting fuses three distinct classical <InteractiveTooltip text="astrological systems" tooltipKey="astrologicalSystems" /> of mathematics—Parasara, Jaimini, and Krishnamurthi—to provide precise strategic foresight.
            </p>
     
            <p className="bg-orange-50 p-8 rounded-xl border-l-8 border-orange-200 italic text-stone-800 text-xl md:text-2xl">
              Kaulbhaskar’s global advisory work is supported by his wife, an active philanthropist and accomplished practitioner of the Goddess lineage, whose partnership anchors their high-impact success in both the material and spiritual worlds.
            </p>
          </div>
        </section>

        {/* Lineage Table */}
        <section className="bg-stone-900 text-stone-200 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-orange-400 text-center uppercase tracking-widest font-sans">
              Guru-Parampara
            </h2>
            <div className="space-y-0">
              {profileData.lineage.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col md:flex-row py-6 border-b border-stone-800 ${
                    index === profileData.lineage.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <div className="md:w-1/3 text-orange-300/80 text-base md:text-lg uppercase font-bold tracking-tight mb-2 md:mb-0 md:pr-4 font-sans">
                    {item.label}
                  </div>
                  <div className="md:w-2/3 text-lg md:text-xl font-semibold md:pl-4">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
