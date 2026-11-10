// src/routes/Home.tsx
import React, { lazy, Suspense, useState, useEffect } from "react";
import SEO from "../components/SEO"; 
import { Helmet } from "react-helmet-async";

// Statically load the absolute top layer to ensure immediate paint
import Hero from "../components/Hero";

// Lazy load below-the-fold component blocks
const Cohort = lazy(() => import("../components/Cohort")); 
const Intro = lazy(() => import("../components/Intro")); 
const Feature = lazy(() => import("../components/Feature"));
const Camp = lazy(() => import("../components/Camp"));

const DynamicCalendar = lazy(() => 
  import("../components/CalendarComponent").then(module => ({ default: module.default }))
);

const Gallery = lazy(() => import("../components/Gallery"));
const Mudra = lazy(() => import("../components/Mudra"));
const FAQ = lazy(() => import("../components/FAQ"));
const StatsComponent = lazy(() => import("../components/StatsComponent"));
const Story = lazy(() => import("../components/Story"));
const Testimonial = lazy(() => import("../components/Testimonial"));
const Mentor = lazy(() => import("../components/Team")); 
const Meet = lazy(() => import("../components/Meet"));
const LatestPost = lazy(() => import("../components/LatestPost"));

// Small visual fallback skeleton to improve cumulative layout shift metrics
const SectionSkeleton = () => (
  <div className="flex justify-center items-center h-[25vh] w-full bg-zinc-950/20 border border-zinc-900/30 rounded-lg my-4 animate-pulse">
    <div className="w-8 h-8 rounded-full border-2 border-zinc-700 border-t-transparent animate-spin" />
  </div>
);

const Home: React.FC = () => {
  const [renderCalendar, setRenderCalendar] = useState(false);
  // ⚡ FIX 1: Defer low-priority, heavy bottom-of-the-page sections entirely
  const [renderDeepSections, setRenderDeepSections] = useState(false);

  useEffect(() => {
    // Schedule interactive items right after the initial load completes
    const calendarTimer = setTimeout(() => setRenderCalendar(true), 200);
    
    // Schedule heavy below-the-fold content to load later
    const deepTimer = setTimeout(() => setRenderDeepSections(true), 600);
    
    return () => {
      clearTimeout(calendarTimer);
      clearTimeout(deepTimer);
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
        "publisher": { "@id": "https://www.kaulbhaskar.com" }
      },
      {
        "@type": "Organization",
        "@id": "https://www.kaulbhaskar.com",
        "name": "KAULBHASKAR Metaphysical Advisory",
        "url": "https://www.kaulbhaskar.com",
        "logo": "https://kaulbhaskar.com/img/Logo.webp",
        "sameAs": ["https://www.tantrasadhana.org"]
      }
    ]
  };

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
          { name: "KAULBHASKAR Guru Ji", role: "Spiritual Mentor & Expert in Tantra", description: "Belongs to the lineage of famous siddha yogi Sri MATSYENDRA NATH Ji.", image: "https://www.kaulbhaskar.com" }
        ]}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(homeSchema)}</script>
      </Helmet>

      {/* Primary Hero section paints instantly */}
      <Hero />

      {/* ⚡ FIX 2: Break up components into independent Suspense boundaries to decouple network streams */}
      <Suspense fallback={<SectionSkeleton />}>
        <Cohort />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Intro />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Feature />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Camp />
      </Suspense>

      {renderCalendar ? (
        <Suspense fallback={<SectionSkeleton />}>
          <DynamicCalendar />
        </Suspense>
      ) : (
        <div className="flex justify-center items-center h-[500px] w-full text-zinc-500 bg-zinc-950 rounded-xl border border-zinc-900/50">
          Loading Event Dashboard Workspace...
        </div>
      )}

      <Suspense fallback={<SectionSkeleton />}>
        <Gallery />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Mudra />
      </Suspense>

      {/* ⚡ FIX 3: Hold off loading non-visible bottom chunks until the core page is fully functional */}
      {renderDeepSections && (
        <>
          <Suspense fallback={<SectionSkeleton />}>
            <FAQ />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <StatsComponent />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <Story />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <Testimonial />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <Mentor />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <LatestPost />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <Meet />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default Home;
