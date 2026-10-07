import React, { lazy, Suspense } from "react";
// Import Helmet directly to bypass SEO prop type errors
import { Helmet } from "react-helmet-async";
import FAQ from "../components/FAQ";
import MultipleItems from "../components/MultipleItems";
import LatestPost from "../components/LatestPost";
import SEO from "../components/SEO";

// ✅ Lazy load CalendarComponent
const CalendarComponent = lazy(() => import("../components/CalendarComponent"));

const Services: React.FC = () => {
  // ✅ JSON-LD Service & OfferCatalog Schema Definition
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "@id": "https://www.kaulbhaskar.com/services",
    "url": "https://www.kaulbhaskar.com/services",
    "mainEntity": {
      "@type": "Service",
      "serviceType": "Tantra Puja, Spiritual Initiation, and Astrology Consultations",
      "name": "KAULBHASKAR Metaphysical Advisory Services",
      "provider": {
        "@type": "Person",
        "@id": "https://www.kaulbhaskar.com/" // 🔗 Perfect Linkage: Connects directly back to your primary profile identity node
      },
      "areaServed": "Worldwide",
      "availableLanguage": ["English", "Hindi", "Sanskrit"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Spiritual & Astrological Diagnostic Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Astrology Consultation",
              "description": "Comprehensive horoscope readings, palmistry assessments, Kerala Jyotish analysis, and effective Vedic planetary remedial solutions."
            },
            "price": "5000",
            "priceCurrency": "INR"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Maha Vidya Havan, Puja Rituals & Litigation Support",
              "description": "Sacred and highly specialized Tantric fire rituals, Yagyas, and Pujas executed by lineage-verified traditional experts for resolving executive bottlenecks."
            },
            "price": "250000", // Placed your target price point natively inside the array structure
            "priceCurrency": "INR"
          }
        ]
      }
    }
  };

  return (
    <div className="w-full min-h-screen">
      {/* ✅ Aligned canonical path to match your exact sitemap routing */}
      <SEO
        title="Metaphysical Consultation & Sri Vidya Mentorship | Services"
        description="Explore professional spiritual consultation. Authentic Tantric rituals, multi-layered astrological risk mapping, and private Sri Vidya Upasana mentorship."
        canonical="https://www.kaulbhaskar.com/services"
        keywords="Maha Viprita Pratyangira, Lalita Sahastranama Archanam, Shulini Durga, Khadaga Ravana, Shat Chandi Yagyan, Mahavidya Homam"
        breadcrumbs={[
          { name: "Home", url: "https://www.kaulbhaskar.com" },
          { name: "Services", url: "https://www.kaulbhaskar.com/services" },
        ]}
      />

      {/* ✅ Direct Helmet injection to add Open Graph tags and JSON-LD */}
      <Helmet>
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kaulbhaskar.com/services" />
        <meta property="og:title" content="Metaphysical Consultation & Sri Vidya Mentorship | Services" />
        <meta property="og:description" content="Explore professional spiritual consultation. Authentic Tantric rituals, multi-layered astrological risk mapping, and private Sri Vidya Upasana mentorship." />
        <meta property="og:image" content="https://www.kaulbhaskar.com/img/intro.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.kaulbhaskar.com/services" />
        <meta name="twitter:title" content="Metaphysical Consultation & Sri Vidya Mentorship | Services" />
        <meta name="twitter:description" content="Explore professional spiritual consultation. Authentic Tantric rituals, multi-layered astrological risk mapping, and private Sri Vidya Upasana mentorship." />
        <meta name="twitter:image" content="https://www.kaulbhaskar.com/img/intro.webp" />

        {/* Inject JSON-LD Object safely for TypeScript compilation */}
        <script type="application/ld+json">
          {JSON.stringify(servicesSchema)}
        </script>
      </Helmet>

      <MultipleItems />
      <FAQ />
      <LatestPost />

      {/* ✅ Lazy loaded calendar wrapped in Suspense */}
      <Suspense fallback={<div>Loading calendar…</div>}>
        <CalendarComponent />
      </Suspense>
    </div>
  );
};

export default Services;
