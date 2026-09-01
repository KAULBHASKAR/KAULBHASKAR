import React, { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import LatestPost from "../components/LatestPost";
import SEO from "../components/SEO";

// ✅ Lazy load CalendarComponent
const CalendarComponent = lazy(() => import("../components/CalendarComponent"));

const About: React.FC = () => {

  useEffect(() => {
    // ✅ Use standard browser window API instead of React Router hook
    // This works even if the component is outside a Router
    const hash = window.location.hash;

    if (hash) {
      // ✅ 500ms delay helps wait for the 100vh hero image & lazy components to settle
      const timeoutId = setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500); 

      return () => clearTimeout(timeoutId);
    }
  }, []); // Run once on mount

  // ✅ JSON-LD AboutPage & Person Schema Definition (Aligned to /about-us)
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Person",
      "name": "KAULBHASKAR GURU Ji",
      "description": "Expert of Kaul Marga with over 30 years of practice in Sri Vidya Upasana, belonging to the lineage of legendary siddha yogi Sri Matsyendra Nath Ji.",
      "image": "https://kaulbhaskar.com",
      "knowsAbout": [
        "Tantra",
        "Astrology",
        "Sri Vidya Upasana",
        "Kaula Marga",
        "Dakshinamurti Sampradaya"
      ],
      "affiliation": {
        "@type": "Organization",
        "name": "KAUL TANTRA SADHANA",
        "url": "https://kaulbhaskar.com"
      }
    }
  };

  return (
    <div className="flex flex-col w-full content-center">
      {/* 1. Aligned to your /about-us sitemap setup path configuration */}
      <SEO
        title="About Kaulbhaskar Guru Ji | Tantra, Astrology & Spiritual Mentor"
        description="Learn about Kaulbhaskar Guru Ji, a direct disciple of Sri Kulbhushananand Nath, and our team of experts in Tantra, Astrology, and Sri Vidya Upasana."
        canonical="https://kaulbhaskar.com/about-us"
        breadcrumbs={[
          { name: "Home", url: "https://kaulbhaskar.com" },
          { name: "About Us", url: "https://kaulbhaskar.com/about-us" },
        ]}
      />

      {/* 2. Direct Helmet injection to add Open Graph tags and JSON-LD text definitions */}
      <Helmet>
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://kaulbhaskar.com/about-us" />
        <meta property="og:title" content="About Kaulbhaskar Guru Ji | Tantra & Strategic lifepath mapping Experts" />
        <meta property="og:description" content="Learn about Kaulbhaskar Guru Ji, a direct disciple of Sri Kulbhushananand Nath, and our team of experts in Tantra, Astrology, and Sri Vidya Upasana." />
        <meta property="og:image" content="https://kaulbhaskar.com" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://kaulbhaskar.com/about-us" />
        <meta name="twitter:title" content="About Kaulbhaskar Guru Ji | Tantra & Strategic lifepath mapping Experts" />
        <meta name="twitter:description" content="Learn about Kaulbhaskar Guru Ji, a direct disciple of Sri Kulbhushananand Nath, and our team of experts in Tantra, Astrology, and Sri Vidya Upasana." />
        <meta name="twitter:image" content="https://kaulbhaskar.com" />

        {/* Inject JSON-LD Object safely for TypeScript compilation */}
        <script type="application/ld+json">
          {JSON.stringify(aboutSchema)}
        </script>
      </Helmet>

      <div className="flexCenter max-container relative w-full min-h-screen">
        <img
          src="/img/ABOUT_US.png"
          alt="yoga background"
          width={1440}
          height={580}
          loading="lazy"
          decoding="async"
          className="w-screen h-screen object-cover object-center 2xl:rounded-s-xl"
        />

        <h1 className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-4xl text-white font-bold pageHeader">
          About Us
        </h1>

        <h2 className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-xl text-white font-bold p-6 text-center max-w-3xl pageHeader">
          I guide the world's most powerful minds to master the cosmic laws that govern destiny, internal peace, and legacy.
        </h2>
      </div>

      <section className="flex-row md:flex mx-auto items-center w-full bg-gradient-to-r from-green-400 via-indigo-500 to-yellow-400">
        <div id="guru-ji" className="sm:w-1/2 sm:ml-10 sm:mr-10 w-full flex justify-center mt-12 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <img
            src="/img/satyendra-large.webp"
            alt="Kaulbhaskar Guru Ji - Tantra Expert"
            width={940}
            height={960}
            loading="lazy"
            decoding="async"
            className="profileImage"
          />
        </div>
        <div className="sm:mt-0 sm:w-2/3 w-full mt-6 ml-0 p-10">
          <h2 className="pb-20 text-2xl md:text-4xl font-bold text-center justify-center scroll-mt-24">
            KAULBHASKAR GURU Ji
          </h2>
          <p className="text-lg text-simple text-justify">
            From the High Courts of Material Law to the High Realms of Cosmic Order, <strong>KAULBHASKAR Guru Ji</strong> spent years mastering the laws made by man to fight earthly battles. His KAULAVADHUTA GURU bestow him the MAHA PURN KRAM DIKSHA of all the Amnayas. Guru Ji, popularly known as <strong>KAULBHASKAR</strong>, is from
            the lineage of Sri <strong>Matsyendra Nath</strong> (also known as Machendra Nath) ji, a legend of Naths and one of{" "} <strong>84 Maha Siddhas</strong>. A direct disciple of esteemed KAUL
            of Prayag, Sri <strong>KULBHUSHANANAND NATH</strong>, Guru Ji is basically an Urdhvamanayee Upasaka of MAHATRIPURSUNDARI. Sri Kaulbhaskar Ji, an expert of <strong>KAUL MARGA</strong>, has spent
            more than 30 years painstakingly perfecting his practice of SRI VIDYA UPASANA of highly mysterious{" "} <strong>DAKSHINAMURTI SAMPRADAYA</strong>.
            <a href="/profile" className="text-red-500 hover:text-black font-semibold ml-4 inline-flex items-center">
            KNOW MORE <span className="ml-1">→</span> </a>
          </p>
        </div>
      </section>
            
      <div className="bg-yellow-400">
        <Suspense fallback={<div>Loading calendar…</div>}>
          <CalendarComponent />
        </Suspense>
        <LatestPost />
      </div>

      <section className="w-full text-black text-4xl font-bold text-center justify-center p-10 h-full mt-5 ">
        <p>We are some of the experts in Tantra & Astrology</p>
      </section>

      <section className="mx-auto w-full h-auto px-4 lg:px-8 pb-10">
        <div className="flex flex-col lg:flex-row w-full h-auto gap-5 justify-center items-center">
          <img 
            src="/mentor/S.Bakshi.webp" 
            alt="Expert S. Bakshi" 
            loading="lazy" 
            decoding="async" 
            className="w-full max-w-md lg:w-1/5 h-auto object-cover rounded-lg transition-all duration-300 hover:scale-105 hover:brightness-110 hover:shadow-xl cursor-pointer mx-auto" 
          />

          <img 
            src="/mentor/Aradhya.webp" 
            alt="Expert Aradhya" 
            loading="lazy" 
            decoding="async" 
            className="w-full max-w-md lg:w-1/5 h-auto object-cover rounded-lg transition-all duration-300 hover:scale-105 hover:brightness-110 hover:shadow-xl cursor-pointer mx-auto" 
          />

          <img 
            src="/mentor/Subhas.webp" 
            alt="Expert Subhas" 
            loading="lazy" 
            decoding="async" 
            className="w-full max-w-md lg:w-1/5 h-auto object-cover rounded-lg transition-all duration-300 hover:scale-105 hover:brightness-110 hover:shadow-xl cursor-pointer mx-auto" 
          />

          <img 
            src="/mentor/Kiran.webp" 
            alt="Expert Kiran" 
            loading="lazy" 
            decoding="async" 
            className="w-full max-w-md lg:w-1/5 h-auto object-cover rounded-lg transition-all duration-300 hover:scale-105 hover:brightness-110 hover:shadow-xl cursor-pointer mx-auto" 
          />

          <img 
            src="/mentor/YATAN.webp" 
            alt="Expert Yatan" 
            loading="lazy" 
            decoding="async" 
            className="w-full max-w-md lg:w-1/5 h-auto object-cover rounded-lg transition-all duration-300 hover:scale-105 hover:brightness-110 hover:shadow-xl cursor-pointer mx-auto" 
          />
        </div>
      </section>
    </div>
  );
};

export default About;
