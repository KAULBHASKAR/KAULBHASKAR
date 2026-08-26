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
  return (
    <div className="w-full min-h-screen">
      {/* ✅ Safe layout variables that your SEO component already accepts */}
      <SEO
        title="Spiritual Services | Astrology, Tantra & Sri Vidya | KAULBHASKAR"
        description="Explore our range of professional spiritual services including authentic Tantric rituals, Vedic astrology consultations, and Sri Vidya guidance."
        canonical="https://www.kaulbhaskar.com"
        breadcrumbs={[
          { name: "Home", url: "https://www.kaulbhaskar.com" },
          { name: "Services", url: "https://www.kaulbhaskar.com/services" },
        ]}
      />

      {/* ✅ Direct Helmet injection to add Open Graph tags without breaking TypeScript definitions */}
      <Helmet>
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kaulbhaskar.com" />
        <meta property="og:title" content="Spiritual Services | Astrology, Tantra & Sri Vidya | KAULBHASKAR" />
        <meta property="og:description" content="Explore our range of professional spiritual services including authentic Tantric rituals, Vedic astrology consultations, and Sri Vidya guidance." />
        <meta property="og:image" content="https://www.kaulbhaskar.com/img/intro.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.kaulbhaskar.com" />
        <meta name="twitter:title" content="Spiritual Services | Astrology, Tantra & Sri Vidya | KAULBHASKAR" />
        <meta name="twitter:description" content="Explore our range of professional spiritual services including authentic Tantric rituals, Vedic astrology consultations, and Sri Vidya guidance." />
        <meta name="twitter:image" content="https://www.kaulbhaskar.com/img/intro.webp" />
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
