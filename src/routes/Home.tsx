import React, { lazy, Suspense, useMemo } from "react";
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
const Mentor = lazy(() => import("../components/Team")); 
const Meet = lazy(() => import("../components/Meet"));
const LatestPost = lazy(() => import("../components/LatestPost"));

const Home: React.FC = () => {
  // Define dedicated variables for metadata uniformity
  const pageTitle = "KAULBHASKAR a Legend KAULA | Tantra & Spiritual Guidance";
  const pageDesc = "Metaphysical advisory for global leaders via authentic Tantric rituals & Sri Vidya Upasana; guided by Sri Kaulbhaskar Ji of the Sri Matsyendra Nath lineage.";
  const ogImageUrl = "https://kaulbhaskar.com/img/intro.webp";

  // Memoize LocalBusiness structured data schema object to prevent rerender thrashing
  const localBusinessSchema = useMemo(() => {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "KAUL TANTRA SADHANA",
      "alternativeName": "KAULBHASKAR",
      "url": "https://kaulbhaskar.com",
      "logo": "https://kaulbhaskar.com", 
      "image": ogImageUrl, 
      "description": pageDesc,
      "telephone": "+91-9934418459",
      "email": "kaultantra@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Patna",
        "addressRegion": "Bihar",
        "addressCountry": "IN"
      }
    });
  }, [pageDesc, ogImageUrl]);

  return (
    <>
      {/* 1. Unified SEO Component handles titles, standard meta tags, canonical link configurations, and open graph data */}
      <SEO 
        title={pageTitle} 
        description={pageDesc} 
        featuredImage={ogImageUrl}
      />

      {/* 2. Isolated fallback block for page-specific JSON-LD structures */}
      <Helmet>
        <script type="application/ld+json">
          {localBusinessSchema}
        </script>
      </Helmet>

      {/* Main Page Layout */}
      <main>
        <Hero />
        
        <Suspense fallback={<div style={{ minHeight: "200px", textAlign: "center", padding: "2rem" }}>Loading content...</div>}>
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
