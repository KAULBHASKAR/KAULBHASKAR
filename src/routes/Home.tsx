import React, { lazy, Suspense } from "react";
import SEO from "../components/SEO"; 

{/* Hero renders instantly without waiting */}
<Hero />

{/* Block 1: Above-the-fold or immediate below-the-fold content */}
<Suspense fallback={<div className="h-[20vh] skeleton-loader" />}>
  <Cohort />
  <Intro />
  <Feature />
</Suspense>

{/* Block 2: Middle-page content and your Calendar */}
<Suspense fallback={<div className="h-[30vh] skeleton-loader" />}>
  <Camp />
  <CalendarComponent />
  <Gallery />
  <Mudra />
</Suspense>

{/* Block 3: Heavy lower page elements (completely deferred) */}
<Suspense fallback={<div className="h-[40vh] skeleton-loader" />}>
  <FAQ />
  <StatsComponent />
  <Story />
  <Testimonial />
  <Mentor />
  <LatestPost />
  <Meet />
</Suspense>


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

      {/* Hero renders instantly without waiting for network scripts to finish chunk downloading */}
      <Hero />

      {/* Graceful layout loading skeleton for below-the-fold content blocks */}
      <Suspense 
        fallback={
          <div className="flex-center h-[50vh] w-full">
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
        <Camp />
        <CalendarComponent />
        <Gallery />
        <Mudra />
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
