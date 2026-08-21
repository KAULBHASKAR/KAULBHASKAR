import React, { lazy, Suspense } from "react";
import SEO from "../components/SEO"; 

// 1. Static Above-the-Fold components (Rendered without any script delays)
import Hero from "../components/Hero";

// 2. Row 1: High-priority immediate section components (First items scrolled into view)
const Cohort = lazy(() => import("../components/Cohort")); 
const Intro = lazy(() => import("../components/Intro")); 
const Feature = lazy(() => import("../components/Feature"));

// 3. Row 2: Heavy interactive assets (Isolated so they do not hold up Row 1)
const Camp = lazy(() => import("../components/Camp"));
const CalendarComponent = lazy(() => import("../components/CalendarComponent"));
const Gallery = lazy(() => import("../components/Gallery"));
const Mudra = lazy(() => import("../components/Mudra"));

// 4. Row 3: Social proof, media carousels, and footer-adjacent data
const FAQ = lazy(() => import("../components/FAQ"));
const StatsComponent = lazy(() => import("../components/StatsComponent"));
const Story = lazy(() => import("../components/Story"));
const Testimonial = lazy(() => import("../components/Testimonial"));
const Mentor = lazy(() => import("../components/Team"));
const LatestPost = lazy(() => import("../components/LatestPost"));
const Meet = lazy(() => import("../components/Meet"));

// Standard lightweight fallback loader for structural transitions
const SectionLoader = () => (
  <div className="flex justify-center items-center h-[20vh] w-full">
    <div className="three-body">
      <div className="three-body__dot"></div>
      <div className="three-body__dot"></div>
      <div className="three-body__dot"></div>
    </div>
  </div>
);

const Home: React.FC = () => {
  return (
    <div>
      <SEO 
        title="KAULBHASKAR a Legend KAUL | Tantra, Astrology & Spiritual Guidance" 
        description="Connect with experts in Tantra & Astrology led by Sri KAULBHASKAR Ji, lineage of Sri MATSYENDRA NATH Ji. Services include Puja, Rituals, and Astro-consultation."
        keywords="Tantra, Astrology, KAULBHASKAR Guru Ji, Sri MATSYENDRA NATH lineage, Puja Rituals, Astrology Consultation, Yantra"
        canonical="https://vercel.app"
        faq={[
          { question: "Who is KAUL BHASKAR ?", answer: "Kaul Bhaskar is a Sri Vidya Upaska and a dedicated follower of Kaul Marg. He provides guidance in authentic Tantra, spiritual initiation, and astrological consultations." },
          { question: "What are the primary services offered ?", answer: "We provide Tantra teachings and rituals, Astrology consultation, Gems, Talismans, and Worship Yantras like Meru & Kurma." },
          { question: "What is the charges, if any ?", answer: "Services range from Astrology Consultation (₹5,000) to specialized rituals like Shat Chandi (₹2,50,000). Contact us for specific details." }
        ]}
        mentors={[
          { 
            name: "KAULBHASKAR Guru Ji", 
            role: "Spiritual Mentor & Expert in Tantra", 
            description: "Belongs to the lineage of famous siddha yogi Sri MATSYENDRA NATH Ji.",
            image: "https://vercel.app/img/intro.webp"
          }
        ]}
      />

      {/* Renders instantly with no network request chain baggage */}
      <Hero />

      {/* Row 1: High Priority (Loads immediately after Hero) */}
      <Suspense fallback={<SectionLoader />}>
        <Cohort />
        <Intro />
        <Feature />
      </Suspense>

      {/* Row 2: Deep Elements (Heavy components like Calendar live here safely) */}
      <Suspense fallback={<SectionLoader />}>
        <Camp />
        <CalendarComponent />
        <Gallery />
        <Mudra />
      </Suspense>

      {/* Row 3: Bottom of the page assets (Unseen until user engages scrolling down) */}
      <Suspense fallback={<SectionLoader />}>
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
