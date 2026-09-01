import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";

// --- Interfaces for Structured Data ---
export interface Breadcrumb {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Mentor {
  name: string;
  role: string;
  image?: string;
  description?: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  breadcrumbs?: Breadcrumb[];
  faq?: FAQItem[];
  mentors?: Mentor[];
  featuredImage?: string; 
  type?: string;
}

const DEFAULT_SITE_URL = "https://kaulbhaskar.com";
// Optimized Open Graph image standard path (recommended size: 1200x630)
const DEFAULT_IMAGE = `${DEFAULT_SITE_URL}/img/og-main-fallback.jpg`;

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  breadcrumbs,
  faq,
  mentors,
  featuredImage = DEFAULT_IMAGE,
  type = "website",
}) => {
  // Resolve current absolute canonical URL string
  const activeUrl = canonical || DEFAULT_SITE_URL;

  // Validation rules for title & metadata parameters
  const cleanTitle = title.trim();
  
  // Truncate meta description cleanly to prevent arbitrary browser clipping
  const cleanDescription = useMemo(() => {
    const trimmed = description.trim().replace(/["']/g, ""); // Stripping quotes prevents snippet injection truncation bugs
    return trimmed.length > 155 ? `${trimmed.substring(0, 152)}...` : trimmed;
  }, [description]);

  // 1. Memoize Breadcrumb Schema
  const breadcrumbString = useMemo(() => {
    if (!breadcrumbs || breadcrumbs.length === 0) return null;
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url.startsWith("http") ? crumb.url : `${DEFAULT_SITE_URL}${crumb.url}`,
      })),
    });
  }, [breadcrumbs]);

  // 2. FAQ Schema formatted directly into strict string format
  const faqString = useMemo(() => {
    if (!faq || faq.length === 0) return null;
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
    if (!mentors || mentors.length === 0) return null;
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
          "image": mentor.image || undefined,
          "description": mentor.description || undefined,
        },
      })),
    });
  }, [mentors]);

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{cleanTitle}</title>
      <meta name="description" content={cleanDescription} />
      <link rel="canonical" href={activeUrl} />

      {/* Open Graph / Facebook Metadata */}
      <meta property="og:site_name" content="Kaul Bhaskar" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={cleanTitle} />
      <meta property="og:description" content={cleanDescription} />
      <meta property="og:url" content={activeUrl} />
      
      {/* Structural Open Graph Image Dimensions */}
      <meta property="og:image" content={featuredImage} />
      <meta property="og:image:secure_url" content={featuredImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content={`Preview image for ${cleanTitle}`} />

      {/* Twitter Cards Metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={cleanTitle} />
      <meta name="twitter:description" content={cleanDescription} />
      <meta name="twitter:image" content={featuredImage} />
      <meta name="twitter:image:alt" content={`Preview image for ${cleanTitle}`} />

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
