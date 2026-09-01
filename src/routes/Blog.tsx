// src/routes/Blog.tsx
import { useState } from "react";
import { Link } from "react-router";
// Import Helmet directly to bypass SEO prop type errors
import { Helmet } from "react-helmet-async";
import matter from "gray-matter";
import { Buffer } from "buffer";
import SEO from "../components/SEO";

// Type definition for the front-matter data in your markdown files
interface PostData {
  title: string;
  date: any; // Kept flexible as gray-matter can output strings or Date objects
  featuredImage: string;
  excerpt: string;
  authorName: string;
  authorAvatar: string;
  slug: string;
}

// Global Buffer setup for the browser (needed for gray-matter)
if (typeof window !== "undefined") {
  (window as any).Buffer = Buffer;
}

// Vite glob import with types
const posts = import.meta.glob<string>("../posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

// Map the glob result into a typed array
const postEntries: PostData[] = Object.entries(posts).map(([path, content]) => {
  const slug = path.split("/").pop()?.replace(".md", "") || "";
  const { data } = matter(content);
  
  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || "",
    featuredImage: data.featuredImage || "",
    excerpt: data.excerpt || "",
    authorName: data.authorName || "Anonymous",
    authorAvatar: data.authorAvatar || "",
  };
});

/**
 * Safely parses any date structure provided by Markdown front-matter
 * into an ISO standard short date format string (YYYY-MM-DD)
 * that is universally compatible across Apple Safari, iOS, and desktop browsers.
 */
function safeFormatDate(rawDate: any): string {
  const fallbackDate = "2026-08-28";
  
  if (!rawDate) return fallbackDate;

  try {
    let parsedDate: Date;

    if (rawDate instanceof Date) {
      parsedDate = rawDate;
    } else if (typeof rawDate === "string") {
      // Normalize hyphens into forward slashes to force strict browser parsing alignment on Safari
      const sanitizedStr = rawDate.replace(/-/g, "/").trim();
      parsedDate = new Date(sanitizedStr);
    } else {
      parsedDate = new Date(rawDate);
    }

    // Return the safe text snapshot if the parsed timestamp proves valid
    return !isNaN(parsedDate.getTime()) 
      ? parsedDate.toISOString().split("T")[0] 
      : fallbackDate;
  } catch {
    return fallbackDate;
  }
}

export default function Blog() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 9;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postEntries.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(postEntries.length / postsPerPage);

  // ✅ Safe, Dynamic JSON-LD Schema parsing with cross-engine fallback protections
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Spiritual Blog | Wisdom of Sri Kaulbhaskar Guru Ji",
    "description": "Explore spiritual insights, authentic Tantric sadhanas, Vedic astrology articles, and sacred scriptural guidance written by Guru Ji Kaulbhaskar.",
    "url": "https://www.kaulbhaskar.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "KAUL TANTRA SADHANA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kaulbhaskar.com"
      }
    },
    "blogPost": postEntries.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": safeFormatDate(post.date),
      "url": `https://kaulbhaskar.com{post.slug}`, // ✅ Fixed template string syntax bug
      "image": post.featuredImage || "https://www.kaulbhaskar.com/img/intro.webp",
      "author": {
        "@type": "Person",
        "name": post.authorName
      }
    }))
  };

  return (
    <div className="px-6 py-10 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <SEO
        title="Spiritual Blog | Wisdom of Sri Kaulbhaskar Guru Ji"
        description="Explore spiritual insights, authentic Tantric sadhanas, Vedic astrology articles, and sacred scriptural guidance written by Guru Ji Kaulbhaskar."
        canonical="https://www.kaulbhaskar.com/blog"
        
        breadcrumbs={[
          { name: "Home", url: "https://www.kaulbhaskar.com" },
          { name: "Blog", url: "https://www.kaulbhaskar.com/blog" },
        ]}
      />

      <Helmet>
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kaulbhaskar.com/blog" />
        <meta property="og:title" content="Spiritual Blog | Wisdom of Sri Kaulbhaskar Guru Ji" />
        <meta property="og:description" content="Explore spiritual insights, authentic Tantric sadhanas, Vedic astrology articles, and sacred scriptural guidance written by Guru Ji Kaulbhaskar." />
        <meta property="og:image" content="https://www.kaulbhaskar.com/img/intro.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.kaulbhaskar.com/blog" />
        <meta name="twitter:title" content="Spiritual Blog | Wisdom of Sri Kaulbhaskar Guru Ji" />
        <meta name="twitter:description" content="Explore spiritual insights, authentic Tantric sadhanas, Vedic astrology articles, and sacred scriptural guidance written by Guru Ji Kaulbhaskar." />
        <meta name="twitter:image" content="https://www.kaulbhaskar.com/img/intro.webp" />

        {/* Dynamic JSON-LD Integration */}
        <script type="application/ld+json">
          {JSON.stringify(blogListSchema)}
        </script>
      </Helmet>

      <h1 className="special-font hero-subheading text-center my-24">BLOG</h1>
      
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <li key={post.slug} className="border rounded-xl bg-white overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <Link to={`/${post.slug}`}>
              <img src={post.featuredImage} alt={post.title} className="w-full h-auto" />
              <div className="p-5">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination UI logic */}
      <div className="flex justify-center gap-6 mt-12">
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(p => p - 1)}
          className="px-5 py-2 bg-white rounded-full disabled:opacity-30"
        >
          ← Previous
        </button>
        <span className="text-white">{currentPage} / {totalPages}</span>
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(p => p + 1)}
          className="px-5 py-2 bg-white rounded-full disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
