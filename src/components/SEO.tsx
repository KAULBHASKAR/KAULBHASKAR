import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

// --- Interfaces for Structured Data ---
interface Breadcrumb {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface Mentor {
  name: string;
  role: string;
  image?: string;
  description?: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  breadcrumbs?: Breadcrumb[];
  faq?: FAQItem[];
  mentors?: Mentor[];
  featuredImage?: string; 
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  keywords,
  breadcrumbs,
  faq,
  mentors,
  featuredImage = "https://vercel.app",
  type = "website",
}) => {

  // 1. Memoize Breadcrumb Schema to prevent repetitive parsing passes
  const breadcrumbString = useMemo(() => {
    if (!breadcrumbs) return null;
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url,
      })),
    });
  }, [breadcrumbs]);

  // 2. FAQ Schema formatted directly into strict string format
  const faqString = useMemo(() => {
    if (!faq) return null;
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faq.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
        },
      })),
    });
  }, [faq]);

  // 3. Mentors/Team Schema mapped cleanly
  const mentorString = useMemo(() => {
    if (!mentors) return null;
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Our Mentors",
      "itemListElement": mentors.map((mentor, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Person",
          "name": mentor.name,
          "jobTitle": mentor.role,
          "image": mentor.image,
          "description": mentor.description,
        },
      })),
    });
  }, [mentors]);

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={featuredImage} />
      <meta property="og:url" content={canonical || "https://www.kaulbhaskar.com"} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={featuredImage} />

      {/* Inject Structured Data Safely using memoized values */}
      {breadcrumbString && (
        <script type="application/ld+json">{breadcrumbString}</script>
      )}
      
      {faqString && (
        <script type="application/ld+json">{faqString}</script>
      )}

      {mentorString && (
        <script type="application/ld+json">{mentorString}</script>
      )}
    </Helmet>
  );
};

export default SEO;
