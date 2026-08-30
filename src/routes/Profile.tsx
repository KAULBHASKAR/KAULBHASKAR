import React from 'react';
import { Helmet } from 'react-helmet-async';
const profileData = {
  title: "Profile",
  subtitle: "I am a TANTRA and ASTROLOGY mentor.",
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

const Profile: React.FC = () => {
  return (
    <div className="bg-yellow-500 min-h-screen font-serif text-stone-800 selection:bg-orange-200 pt-32">
      {/* Dynamic Helmet Head Meta Tags Injections */}
      <Helmet>
        <title>Guru Profile & Lineage | KAULBHASKAR Metaphysical Advisory</title>
        <meta name="description" content="Discover the analytical background and ancient spiritual lineage of Kaulbhaskar. Bridging elite traditional lineage with precision astrological and Tantric consulting." />
        <link rel="canonical" href="https://vwww.kaulbhaskar.com/profile" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://www.kaulbhaskar.com/profile" />
        <meta property="og:title" content="Guru Profile & Lineage | KAULBHASKAR Metaphysical Advisory" />
        <meta property="og:description" content="Discover the analytical background and ancient spiritual lineage of Kaulbhaskar. Bridging elite traditional lineage with precision astrological and Tantric consulting." />
        <meta property="og:image" content="https://www.kaulbhaskar.com" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.kaulbhaskar.com/profile" />
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
          <div className="bg-white p-8 border-l-4 border-orange-600 shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-2">Known As</h2>
              <p className="text-2xl font-black text-stone-900">{profileData.knownAs}</p>
            </div>
            {/* Image below KAULBHASKAR */}
            <img 
              src="/img/satyendra-large.webp" 
              alt="Kaulbhaskar" 
              className="mt-4 w-full h-48 object-contain rounded shadow-sm border border-stone-100" 
            />
          </div>
          
          <div className="bg-white p-8 border-l-4 border-stone-800 shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-2">Direct Disciple Of</h2>
              <p className="text-2xl font-black text-stone-900">{profileData.discipleOf}</p>
              <p className="text-lg font-semibold text-orange-700">{profileData.guruAs}</p>
            </div>
            {/* Image below An Esteemed KAUL of Prayagraj */}
            <img 
              src="/img/GURU.webp" 
              alt="An Esteemed Kaul of Prayagraj" 
              className="mt-4 w-full h-48 object-contain rounded shadow-sm border border-stone-100" 
            />
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
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-orange-400 text-center uppercase tracking-widest">
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
                  <div className="md:w-1/3 text-orange-300/80 text-base md:text-lg uppercase font-bold tracking-tighter mb-2 md:mb-0 md:pr-4">
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
