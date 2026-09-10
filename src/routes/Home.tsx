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
const Mentor = lazy(() => import("../components/Team")); 
const Meet = lazy(() => import("../components/Meet"));
const LatestPost = lazy(() => import("../components/LatestPost"));

// Structured Data (Schema.org Graph)
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

const Home: React.FC = () => {
  return (
    <div>
      <SEO 
        title="KAULBHASKAR a Legend KAULA | Tantra, Astrology & Spiritual Guidance" 
        description="Metaphysical advisory for global leaders via authentic Tantric rituals & Sri Vidya Upasana; guided by Sri Kaulbhaskar Ji of the Sri Matsyendra Nath lineage."
        keywords="Kulachara, KAULA MARGA, KAULBHASKAR Guru Ji, Sri MATSYENDRA NATH lineage, Kaula tantra sadhana"
        canonical="https://www.kaulbhaskar.com"
        schema={schemaData} // <-- Pass the schema directly to your SEO component
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

      <Hero />

      {/* Layer 1 */}
      <Suspense fallback={<div className="flex-center h-[30vh] w-full"><div className="three-body"><div className="three-body__dot"></div><div className="three-body__dot"></div><div className="three-body__dot"></div></div></div>}>
        <Cohort />
        <Intro />
        <Feature />
      </Suspense>

      {/* Layer 2 */}
      <Suspense fallback={<div className="flex-center h-[30vh] w-full"><div className="three-body"><div className="three-body__dot"></div></div></div>}>
        <Camp />
        <CalendarComponent />
        <Gallery />
        <Mudra />
      </Suspense>

      {/* Layer 3 */}
      <Suspense fallback={<div className="flex-center h-[30vh] w-full"><div className="three-body"><div className="three-body__dot"></div></div></div>}>
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
