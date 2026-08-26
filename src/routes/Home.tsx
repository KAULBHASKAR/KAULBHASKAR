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
  return (
    <div>
      {/* 1. Safe layout variables that your SEO component already accepts */}
      <SEO 
        title="KAULBHASKAR a Legend KAUL | Tantra, Astrology & Spiritual Guidance" 
        description="Connect with experts in Tantra & Astrology led by Sri KAULBHASKAR Ji, lineage of Sri MATSYENDRA NATH Ji. Services include Puja, Rituals, and Astro-consultation."
        keywords="Tantra, Astrology, KAULBHASKAR Guru Ji, Sri MATSYENDRA NATH lineage, Puja Rituals, Astrology Consultation, Yantra"
        canonical="https://www.kaulbhaskar.com"
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
            image: "https://www.kaulbhaskar.com"
          }
        ]}
      />

      {/* 2. Direct Helmet injection to add Open Graph tags without breaking TypeScript definitions */}
      <Helmet>
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kaulbhaskar.com" />
        <meta property="og:title" content="KAULBHASKAR a Legend KAUL | Tantra, Astrology & Spiritual Guidance" />
        <meta property="og:description" content="Connect with experts in Tantra & Astrology led by Sri KAULBHASKAR Ji, lineage of Sri MATSYENDRA NATH Ji. Services include Puja, Rituals, and Astro-consultation." />
        <meta property="og:image" content="https://www.kaulbhaskar.com" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.kaulbhaskar.com" />
        <meta name="twitter:title" content="KAULBHASKAR a Legend KAUL | Tantra, Astrology & Spiritual Guidance" />
        <meta name="twitter:description" content="Connect with experts in Tantra & Astrology led by Sri KAULBHASKAR Ji, lineage of Sri MATSYENDRA NATH Ji. Services include Puja, Rituals, and Astro-consultation." />
        <meta name="twitter:image" content="https://www.kaulbhaskar.com" />
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
        <CalendarComponent />
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
