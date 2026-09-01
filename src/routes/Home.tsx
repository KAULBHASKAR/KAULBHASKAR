import React, { lazy, Suspense } from "react";
import SEO from "../components/SEO"; 
import Hero from "../components/Hero";

// Lazy components
const Intro = lazy(() => import("../components/Intro")); 
const FAQ = lazy(() => import("../components/FAQ"));
// Add other lazy imports identically...

const Home: React.FC = () => {
  // Pass specialized definitions directly to the graph payload block array
  const businessAndGuruSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": "https://kaulbhaskar.com",
      "name": "KAULBHASKAR Metaphysical Advisory",
      "url": "https://www.kaulbhaskar.com",
      "image": "https://kaulbhaskar.com",
      "description": "Metaphysical advisory for global leaders via authentic Tantric rituals & Sri Vidya Upasana.",
      "telephone": "+91-9934418459",
      "email": "kaultantra@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Patna",
        "addressRegion": "Bihar",
        "addressCountry": "IN"
      },
      "priceRange": "$$$$"
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://kaulbhaskar.com",
      "name": "Sri Kaulbhaskar Ji",
      "alternateName": "KAULBHASKAR Guru Ji",
      "jobTitle": "Metaphysical Advisor & Spiritual Guide",
      "knowsAbout": ["Tantra", "Astrology", "Sri Vidya Upasana", "Kulachar"],
      "affiliation": {
        "@type": "Organization",
        "name": "Sri Matsyendra Nath Lineage"
      }
    }
  ];

  return (
    <div>
      <SEO 
        title="KAULBHASKAR a Legend KAULA | Tantra, Astrology & Spiritual Guidance" 
        description="Metaphysical advisory for global leaders via authentic Tantric rituals & Sri Vidya Upasana; guided by Sri Kaulbhaskar Ji of the Sri Matsyendra Nath lineage."
        keywords="Kulachar, KAULA, KAULBHASKAR Guru Ji, Sri MATSYENDRA NATH lineage, Tantra Rituals"
        canonical="https://www.kaulbhaskar.com"
        customSchemas={businessAndGuruSchemas}
        faq={[
          { question: "Who is KAUL BHASKAR ?", answer: "Metaphysical Advisor to Elite Leaders" },
          { question: "What are the primary services offered ?", answer: "We provides high-performers with data-driven spiritual systems to safely navigate modern power structures" },
          { question: "What is the charges, if any ?", answer: "Services scale by ritual tier package requirements." }
        ]}
      />

      <Hero />

      <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading...</div>}>
        <Intro />
        <FAQ />
        {/* Additional child nodes rendered safely below */}
      </Suspense>
    </div>
  );
};

export default Home;
