import React, { lazy, Suspense } from "react";
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
  // Structured Data Configurations
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://kaulbhaskar.com",
        "name": "KAULBHASKAR Metaphysical Advisory",
        "url": "https://www.kaulbhaskar.com",
        "image": "https://kaulbhaskar.com", // Update with your actual logo path
        "description": "Metaphysical advisory for global leaders via authentic Tantric rituals & Sri Vidya Upasana; guided by Sri Kaulbhaskar Ji.",
        "telephone": "+91-9934418459",
        "email": "kaultantra@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Patna",
          "addressRegion": "Bihar",
          "addressCountry": "IN"
        },
        "priceRange": "$$$$"
      },
      {
        "@type": "Person",
        "@id": "https://kaulbhaskar.com",
        "name": "Sri Kaulbhaskar Ji",
        "alternateName": "KAULBHASKAR Guru Ji",
        "jobTitle": "Metaphysical Advisor & Spiritual Guide",
        "knowsAbout": ["Tantra", "Astrology", "Sri Vidya Upasana", "Kulachar", "KAULA"],
        "affiliation": {
          "@type": "Organization",
          "name": "Sri Matsyendra Nath Lineage"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://kaulbhaskar.com",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Who is KAUL BHASKAR?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Metaphysical Advisor to Elite Leaders and high-performers, practicing authentic spiritual systems to safely navigate modern power structures."
            }
          },
          {
            "@type": "Question",
            "name": "What are the primary services offered?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Data-driven spiritual systems, traditional Tantra rituals, astrology consulting, and Sri Vidya Upasana guidance."
            }
          },
          {
            "@type": "Question",
            "name": "What are the charges, if any?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pricing scales by specific ritual and advisory packages. Contact administrative channels for detailed tier assessments."
            }
          }
        ]
      }
    ]
  };

  return (
    <div>
      <SEO 
        title="KAULBHASKAR a Legend KAULA | Tantra, Astrology & Spiritual Guidance" 
        description="Metaphysical advisory for global leaders via authentic Tantric rituals & Sri Vidya Upasana; guided by Sri Kaulbhaskar Ji of the Sri Matsyendra Nath lineage."
        keywords="Kulachar, KAULA, KAULBHASKAR Guru Ji, Sri MATSYENDRA NATH lineage, Tantra Rituals"
        canonical="https://www.kaulbhaskar.com"
        faq={[
          { question: "Who is KAUL BHASKAR ?", answer: "Metaphysical Advisor to Elite Leaders" },
          { question: "What are the primary services offered ?", answer: "We provides high-performers with data-driven spiritual systems to safely navigate modern power structures" },
          { question: "What is the charges, if any ?", answer: "Services scale by ritual tier package requirements." }
        ]}
      />

      {/* Inject JSON-LD Script into Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* 1. Static Initial Above-the-fold Viewport */}
      <Hero />

      {/* 2. Asynchronous Below-the-fold Sections */}
      <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading experience...</div>}>
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
    </div>
  );
};

export default Home;
