// src/routes/Home.tsx
import React, { lazy, Suspense } from "react";
import SEO from "../components/SEO"; 
import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import { LazySection } from "../components/LazySection"; // ✅ Import the observer

// 😴 Lazy load lower component blocks
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
        "logo": "https://kaulbhaskar.com/img/logo.webp",
        "sameAs": ["https://www.tantrasadhana.org"]
      }
    ]
  };

  // Shared reusable skeleton fallback for scrolling items
  const blockSpinner = (
    <div className="flex-center h-[25vh] w-full">
      <div className="three-body"><div className="three-body__dot"></div></div>
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
        <script type="application/ld+json">{JSON.stringify(homeSchema)}</script>
      </Helmet>

      {/* 1. Hero paints instantly */}
      <Hero />

      {/* 2. Layer 1: Immediately loads because it sits directly underneath the fold */}
      <Suspense fallback={blockSpinner}>
        <Cohort />
        <Intro />
        <Feature />
      </Suspense>

      {/* 3. Layer 2 & 3: Wrapped in LazySections so they remain completely un-downloaded at startup */}
      <LazySection fallback={blockSpinner}>
        <Suspense fallback={blockSpinner}>
          <Camp />
          <CalendarComponent />
          <Gallery />
          <Mudra />
        </Suspense>
      </LazySection>

      <LazySection fallback={blockSpinner}>
        <Suspense fallback={blockSpinner}>
          <FAQ />
          <StatsComponent />
          <Story />
          <Testimonial />
          <Mentor />
          <LatestPost />
          <Meet />
        </Suspense>
      </LazySection>
    </div>
  );
};

export default Home;
