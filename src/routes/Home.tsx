import React, { lazy, Suspense } from "react";
// Import Helmet directly to bypass SEO prop type errors
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO"; 

// 1. Keep Hero static to prevent a blank white screen during initial page paint
import Hero from "../components/Hero";

// 2. Lazy load lower, below-the-fold component blocks
const Intro = lazy(() => import("../components/Intro")); 
const Cohort = lazy(() => import("../components/Cohort")); 
const StatsComponent = lazy(() => import("../components/StatsComponent"));
const Feature = lazy(() => import("../components/Feature"));
const Camp = lazy(() => import("../components/Camp"));
const CalendarComponent = lazy(() => import("../components/CalendarComponent"));
const Gallery = lazy(() => import("../components/Gallery"));
const Mudra = lazy(() => import("../components/Mudra"));
const FAQ = lazy(() => import("../components/FAQ"));
const Story = lazy(() => import("../components/Story"));
const Testimonial = lazy(() => import("../components/Testimonial"));
const Mentor = lazy(() => import("../components/Team")); // Imported as Mentor matching your JSX
const Meet = lazy(() => import("../components/Meet"));
const LatestPost = lazy(() => import("../components/LatestPost"));

const Home: React.FC = () => {
  // Define the structured data schema object
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "KAUL TANTRA SADHANA",
    "alternativeName": "KAULBHASKAR",
    "url": "https://kaulbhaskar.com",
    "logo": "https://kaulbhaskar.com", // Explicit fallback path recommended
    "image": "https://kaulbhaskar.com", 
    "description": "Metaphysical advisory for global leaders via authentic Tantric rituals & Sri Vidya Upasana; guided by Sri Kaulbhaskar Ji of the Sri Matsyendra Nath lineage.",
    "telephone": "+91-9934418459",
    "email": "kaultantra@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Patna",
      "addressRegion": "Bihar",
      "addressCountry": "IN"
    }
  };

  // Define dedicated variables for metadata uniformity
  const pageTitle = "KAULBHASKAR a Legend KAULA | Tantra & Spiritual Guidance";
  const pageDesc = "Metaphysical advisory for global leaders via authentic Tantric rituals & Sri Vidya Upasana; guided by Sri Kaulbhaskar Ji of the Sri Matsyendra Nath lineage.";

  return (
    <>
      {/* 1. FIXED: Helmet only manages JSON-LD structured script here to avoid tag collision */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLdSchema)}
        </script>
      </Helmet>

      {/* 2. Your custom SEO wrapper safely deploys the core Title, Open Graph, and Twitter metadata */}
      <SEO title={pageTitle} description={pageDesc} />

      {/* Main Page Layout */}
      <main>
        <Hero />
        
        <Suspense fallback={<div>Loading content...</div>}>
          <Intro />
          <Cohort />
          <StatsComponent />
          <Feature />
          <Camp />
          <CalendarComponent />
          <Gallery />
          <Mudra />
          <FAQ />
          <Story />
          <Testimonial />
          <Mentor />
          <Meet />
          <LatestPost />
        </Suspense>
      </main>
    </>
  );
};

export default Home;
