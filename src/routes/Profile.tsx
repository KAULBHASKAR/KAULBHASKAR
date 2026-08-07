import React from 'react';

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
      {/* Header Section */}
      <header className="bg-white border-b border-stone-200 py-20 px-6 text-center shadow-sm">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-stone-900">
          {profileData.title}
        </h1>
        <div className="h-1 w-24 bg-orange-500 mx-auto mb-6"></div>
        <p className="text-xl md:text-2xl italic text-orange-800 font-medium max-w-2xl mx-auto">
          "{profileData.subtitle}"
        </p>
      </header>

      <main className="max-w-4xl mx-auto py-16 px-6">
        {/* Core Identity Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white p-8 border-l-4 border-orange-600 shadow-md">
            <h2 className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-2">Known As</h2>
            <p className="text-2xl font-black text-stone-900">{profileData.knownAs}</p>
          </div>
          <div className="bg-white p-8 border-l-4 border-stone-800 shadow-md">
            <h2 className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-2">Direct Disciple Of</h2>
            <p className="text-2xl font-black text-stone-900">{profileData.discipleOf}</p>
            <p className="text-lg font-semibold text-orange-700">{profileData.guruAs}</p>
          </div>
        </div>

        {/* Biography Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-stone-900 border-b-2 border-orange-100 pb-4">Biography</h2>
          
          {/* Using prose-2xl for a much larger, readable font size */}
          <div className="prose prose-stone prose-xl md:prose-2xl max-w-none text-stone-700 leading-relaxed space-y-10">
            <p className="text-2xl">
              I, of <span className="font-semibold text-stone-900">Kaushik Gotra</span>, was born into a respectable Bhumihar Brahmin Family of Bihar. 
              After completing my <span className="italic">B.Sc. and L.L.B.</span> degrees, I did roaring practice of law at the 
              <span className="font-semibold text-stone-900"> Patna High Court</span> until 2010.
            </p>
            
            <p className="text-2xl">
              Transitioning from law to spirituality, I am now a full-time Tantra and Astrology practitioner. 
              For over <span className="text-orange-700 font-bold">30 years</span>, I have dedicated myself to 
              <span className="font-semibold text-stone-900"> SRI VIDYA upasna</span> within the rare 
              <span className="text-orange-700 font-bold"> Dakshina Murti Sampradaya</span>.
            </p>

            {/* Fields separated as requested */}
            <p className="text-2xl">
              As a staunch follower of <span className="uppercase tracking-wide">Kaul Marg</span>, I carry the spiritual discipline of my Great lineage descending from Param Shiva to my Kaulavadhuta Guru, into my practice. 
              In the realm of <span className="font-semibold"> Astrology </span>, my expertise spans the <span className="font-semibold"> Parasara, Jaimini, </span> and <span className="font-semibold"> Krishnamurthi </span> systems.
            </p>
     
            <p className="bg-orange-50 p-8 rounded-xl border-l-8 border-orange-200 italic text-stone-800 text-xl md:text-2xl">
              My spiritual path is shared with my wife, a philanthropist and dedicated upasika of 
              Goddess Dashmayee Bala Tripura Sundari. Her support remains the cornerstone of my success in both worlds.
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
