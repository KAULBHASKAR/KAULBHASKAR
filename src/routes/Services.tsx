import React, { lazy, Suspense } from "react";
import FAQ from "../components/FAQ";
import MultipleItems from "../components/MultipleItems";
import LatestPost from "../components/LatestPost";
import SEO from "../components/SEO";

// ✅ Lazy load CalendarComponent
const CalendarComponent = lazy(() => import("../components/CalendarComponent"));

const Services: React.FC = () => {
  return (
    <div className="w-full min-h-screen">
      {/* ✅ Page-specific SEO using reusable component */}
      <SEO
        title="Spiritual Services | Kaulbhaskar"
        description="Explore our range of spiritual services including Astrology consultations, Tantric rituals, and Sri Vidya guidance."
        canonical="https://www.tantrasadhana.org/services"
        breadcrumbs={[
          { name: "Home", url: "https://www.tantrasadhana.org" },
          { name: "Services", url: "https://www.tantrasadhana.org/services" },
        ]}
      />

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
