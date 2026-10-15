// src/routes/Home.tsx
import React, { lazy, Suspense, useState, useEffect } from "react";
import SEO from "../components/SEO"; 
import { Helmet } from "react-helmet-async";

// 1. Keep Hero static to prevent a blank white screen during initial page paint
import Hero from "../components/Hero";

// 2. Lazy load lower, below-the-fold component blocks
const Intro = lazy(() => import("../components/Intro")); 
const Cohort = lazy(() => import("../components/Cohort")); 
const StatsComponent = lazy(() => import("../components/StatsComponent"));
const Feature = lazy(() => import("../components/Feature"));
const Camp = lazy(() => import("../components/Camp"));

// ✅ FIX: Isolate the Calendar component through a strict inline initialization promise 
// to prevent the bundler from leaking the style block into the main app tree.
const DynamicCalendar = lazy(() => 
  import("../components/CalendarComponent").then(module => {
    return { default: module.default };
  })
);

const Gallery = lazy(() => import("../components/Gallery"));
const Mudra = lazy(() => import("../components/Mudra"));
const FAQ = lazy(() => import("../components/FAQ"));
const Story = lazy(() => import("../components/Story"));
const Testimonial = lazy(() => import("../components/Testimonial"));
const Mentor = lazy(() => import("../components/Team")); 
const Meet = lazy(() => import("../components/Meet"));
const LatestPost = lazy(() => import("../components/LatestPost"));

const Home: React.FC = () => {
  // ✅ FIX: Use local state to defer rendering the calendar until after the initial paint
  const [renderCalendar, setRenderCalendar] = useState(false);

  useEffect(() => {
    // Mount the calendar component smoothly right after the initial engine cycle completes
    const timer = setTimeout(() => setRenderCalendar(true), 50);
    return () => clearTimeout(timer);
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
        "logo": "https://kaulbhaskar.com/img/logo.webp",
        "sameAs": [
          "https://www.tantrasadhana.org"
        ]
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

      {/* Hero renders instantly without waiting for network scripts to finish chunk downloading */}
      <Hero />

      {/* Layer 1: Elements immediately seen below the hero image */}
      <Suspense 
        fallback={
          <div className="flex-center h-[30vh] w-full">
            <div className="three-body">
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
            </div>
          </div>
        }
      >
        <Cohort />
        <Intro />
        <Feature />
      </Suspense>

      {/* Layer 2: Middle interactive items including the calendar */}
      <Suspense 
        fallback={
          <div className="flex-center h-[30vh] w-full">
            <div className="three-body">
              <div className="three-body__dot"></div>
            </div>
          </div>
        }
      >
        <Camp />
        
        {/* ✅ FIX: Conditionally render the lazy target wrapper block */}
        {renderCalendar ? (
          <Suspense fallback={<div className="flex-center h-[30vh] w-full"><div className="three-body"><div className="three-body__dot"></div></div></div>}>
            <DynamicCalendar />
          </Suspense>
        ) : (
          <div className="flex-center h-[500px] w-full text-zinc-600 bg-zinc-950 rounded-xl border border-zinc-900/50">
            Loading Event Dashboard Workspace...
          </div>
        )}

        <Gallery />
        <Mudra />
      </Suspense>

      {/* Layer 3: Heavy items deeper down the page loaded entirely asynchronously */}
      <Suspense 
        fallback={
          <div className="flex-center h-[30vh] w-full">
            <div className="three-body">
              <div className="three-body__dot"></div>
            </div>
          </div>
        }
      >
        <FAQ />
        <StatsComponent />
        <Story />
        <Testimonial />
        <Mentor />
        <LatestPost />
        <Meet />
      </Suspense>
    </div>
  );
};

export default Home;
