import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";

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
  customSchemas?: Record<string, any>[]; 
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
  customSchemas,
}) => {

  // 1. Breadcrumb Schema Stringification
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

  // 2. FAQ Schema Stringification
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

  // 3. Mentors Schema Stringification
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
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        {canonical && <link rel="canonical" href={canonical} />}

        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:url" content={canonical || "https://kaulbhaskar.com"} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={featuredImage} />
      </Helmet>

      {/* 
        CRITICAL ARCHITECTURE REPAIR:
        We append directly to the body layout using dangerouslySetInnerHTML.
        This forces clean, raw text output devoid of double-stringification backslashes.
      */}
      {breadcrumbString && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: breadcrumbString }} 
        />
      )}
      
      {faqString && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: faqString }} 
        />
      )}

      {mentorString && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: mentorString }} 
        />
      )}

      {customSchemas?.map((schema, idx) => (
        <script
          key={`custom-schema-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

export default SEO;
