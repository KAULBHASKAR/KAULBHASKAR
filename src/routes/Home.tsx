// src/routes/Home.tsx
import React, { lazy, Suspense } from "react";
import SEO from "../components/SEO"; 
import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";

// 🚀 Clean Static-Lazy imports (Fully visible to SEO crawlers)
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
  // Your existing homeSchema JSON setup...
  const homeSchema = { "@context": "https://schema.org", "@graph": [] };

  return (
    <div>
      <SEO title="KAULBHASKAR..." description="..." keywords="..." canonical="..." faq={[]} mentors={[]} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(homeSchema)}</script>
      </Helmet>

      {/* 1. Above the fold paints instantly */}
      <Hero />

      {/* 2. Below-the-fold components wrapped in standard Suspense boundaries */}
      <Suspense fallback={<div className="min-h-[40vh] bg-neutral-900/5 animate-pulse" />}>
        {/* We use standard HTML section elements with content-visibility properties to avoid CLS */}
        <section style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}>
          <Cohort />
          <Intro />
          <Feature />
        </section>

        <section style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}>
          <Camp />
          <CalendarComponent />
          <Gallery />
          <Mudra />
        </section>

        <section style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
          <FAQ />
          <StatsComponent />
          <Story />
          <Testimonial />
          <Mentor />
          <LatestPost />
          <Meet />
        </section>
      </Suspense>
    </div>
  );
};

export default Home;
