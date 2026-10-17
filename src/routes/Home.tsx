// src/routes/Home.tsx
import React, { lazy, Suspense, useState, useEffect } from "react";
import SEO from "../components/SEO"; 
import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";

// 1. Keep above-the-fold elements static to render instantly
// (If Cohort and Intro are right beneath Hero, keep them unchained)

// 2. Core content lazy chunks
const Intro = lazy(() => import("../components/Intro")); 
const Cohort = lazy(() => import("../components/Cohort")); 
const StatsComponent = lazy(() => import("../components/StatsComponent"));
const Feature = lazy(() => import("../components/Feature"));
const Camp = lazy(() => import("../components/Camp"));

// Isolated Calendar block 
const DynamicCalendar = lazy(() => 
  import("../components/CalendarComponent").then(module => ({ default: module.default }))
);

// Deep-page sections
const Gallery = lazy(() => import("../components/Gallery"));
const Mudra = lazy(() => import("../components/Mudra"));
const FAQ = lazy(() => import("../components/FAQ"));
const Story = lazy(() => import("../components/Story"));
const Testimonial = lazy(() => import("../components/Testimonial"));
const Mentor = lazy(() => import("../components/Team")); 
const Meet = lazy(() => import("../components/Meet"));
const LatestPost = lazy(() => import("../components/LatestPost"));

const Home: React.FC = () => {
  // State switches to stop Vite from fetching lower-level chunks on mount
  const [renderCalendar, setRenderCalendar] = useState(false);
  const [renderDeepPage, setRenderDeepPage] = useState(false);

  useEffect(() => {
    // 1. Defer the heavy Calendar engine initialization safely
    const calendarTimer = setTimeout(() => setRenderCalendar(true), 200);

    // 2. Completely defer deep-page rendering until initial mount finishes 
    // OR swap this with an IntersectionObserver for seamless scroll loading
    const deepPageTimer = setTimeout(() => setRenderDeepPage(true), 600);

    return () => {
      clearTimeout(calendarTimer);
      clearTimeout(deepPageTimer);
    };
  }, []);

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.kaulbhaskar.com",
        "url": "https://www.kaulbhaskar.com",
        "name": "KAULBHASKAR",
        "description": "Metaphysical advisory for global leaders via authentic Tantric rituals & Sri Vidya Upasana.",
        "publisher": {
          "@id": "https://www.kaulbhaskar.com"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://www.kaulbhaskar.com",
        "name": "KAULBHASKAR Metaphysical Advisory",
        "url": "https://www.kaulbhaskar.com",
        "logo": "https://kaulbhaskar.com/img/Logo.webp",
        "sameAs": [
          "https://www.tantrasadhana.org"
        ]
      }
    ]
  };

  // Shared generic structural skeleton loader
  const FallbackLoader = () => (
    <div className="flex-center h-[25vh] w-full">
      <div className="three-body">
        <div className="three-body__dot"></div>
      </div>
    </div>
  );

  return (
    <div>
      <SEO 
        title="KAULBHASKAR a Legend KAULA | Metaphysical Advisory & Tantra Strategy for Leaders" 
        description="Metaphysical advisory for global leaders via authentic Tantric rituals & Sri Vidya Upasana; guided by Sri Kaulbhaskar Ji of the Sri Matsyendra Nath lineage."
        keywords="Kulachara, KAULA MARGA, KAULBHASKAR Guru Ji, Sri MATSYENDRA NATH lineage, Kaula tantra sadhana"
        canonical="https://www.kaulbhaskar.com"
        faq={[
          { question: "Who is KAUL BHASKAR ?", answer: "Metaphysical Advisor to Elite Leaders" },
          { question: "What are the primary services offered ?", answer: "We provides high-performers with data-driven spiritual systems to safely navigate modern power structures" },
          { question: "What is the charges, if any ?", answer: "Services range from Astrology Consultation (₹5,000) to specialized rituals like Shat Chandi (₹2,50,000). Contact us for specific details." }
        ]}
        mentors={[
          { 
            name: "KAULBHASKAR Guru Ji", 
            role: "Spiritual Mentor & Expert in Tantra", 
            description: "Belongs to the lineage of famous siddha yogi Sri MATSYENDRA NATH Ji.",
            image: "https://www.kaulbhaskar.com"
          }
        ]}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(homeSchema)}
        </script>
      </Helmet>

      {/* Renders instantly on page paint */}
      <Hero />

      {/* Layer 1: Immediately seen beneath the hero image */}
      <Suspense fallback={<FallbackLoader />}>
        <Cohort />
        <Intro />
        <Feature />
      </Suspense>

      {/* Layer 2: Middle interactive items containing the calendar */}
      <Suspense fallback={<FallbackLoader />}>
        <Camp />
        
        {renderCalendar ? (
          <Suspense fallback={<FallbackLoader />}>
            <DynamicCalendar />
          </Suspense>
        ) : (
          <div className="flex-center h-[400px] w-full text-zinc-600 bg-zinc-950 rounded-xl border border-zinc-900/50">
            Loading Event Dashboard Workspace...
          </div>
        )}

        <Gallery />
        <Mudra />
      </Suspense>

      {/* Layer 3: Heavy items deeper down the page are completely un-mounted initially */}
      {renderDeepPage ? (
        <Suspense fallback={<FallbackLoader />}>
          <FAQ />
          <StatsComponent />
          <Story />
          <Testimonial />
          <Mentor />
          <LatestPost />
          <Meet />
        </Suspense>
      ) : (
        <div className="h-[40vh] w-full bg-transparent" /> 
      )}
    </div>
  );
};

export default Home;
