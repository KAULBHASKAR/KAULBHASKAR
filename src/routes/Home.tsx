import React, { lazy, Suspense } from "react";
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
  const siteUrl = "https://kaulbhaskar.com";
  
  // FIXED: Point to absolute paths containing actual visual media formats
  const ogImageUrl = "https://kaulbhaskar.com/img/intro.webp"; 
  const logoUrl = "https://kaulbhaskar.com"; // Ensure this image asset exists

  // Define the structured data schema object
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "KAUL TANTRA SADHANA",
    "alternativeName": "KAULBHASKAR",
    "url": siteUrl,
    "logo": logoUrl, 
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
  };

  return (
    <>
      {/* 1. Standard Helmet Metadata injection */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="KAUL TANTRA SADHANA - Sri Vidya Upasana & Tantric Rituals Banner" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={ogImageUrl} />

        <script type="application/ld+json">
          {JSON.stringify(jsonLdSchema)}
        </script>
      </Helmet>

      {/* 2. Properties passed directly to satisfy the SEO component type checks */}
      <SEO title={pageTitle} description={pageDesc} />

      {/* Main Page Layout */}
      <main>
        <Hero />
        
        <Suspense fallback={<div style={{ minHeight: "200px", padding: "2rem", textAlign: "center" }}>Loading content...</div>}>
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
