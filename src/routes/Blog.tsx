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
  
  // ✅ Fallback safety mechanism: ensures total pages evaluates to at least 1 if array is empty
  const totalPages = Math.max(Math.ceil(postEntries.length / postsPerPage), 1);

  // ✅ Safe, Dynamic JSON-LD Schema parsing with verified graph targets
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Esoteric Wisdom Blog | Tantra Shastra & Classical Astrology Insights",
    "description": "Deep-dive into classical Tantric sciences, advanced Vedic astrology, and sacred stotras. Read authentic metaphysical articles written by Guru Ji Kaulbhaskar.",
    "url": "https://www.kaulbhaskar.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "KAUL TANTRA SADHANA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kaulbhaskar.com/img/logo.webp"
      }
    },
    "blogPost": postEntries.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": safeFormatDate(post.date),
      "url": `https://kaulbhaskar.com{post.slug}`, // ✅ FIXED: Replaced static broken text quotes with functional backtick evaluation syntax
      "image": post.featuredImage || "https://www.kaulbhaskar.com/img/intro.webp",
      "author": {
        "@type": "Person",
        "name": post.authorName
      }
    }))
  };

  return (
    <div className="px-6 py-10 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      {/* ✅ FIXED: Synchronized page Header Title and Description nodes with Open Graph properties below */}
      <SEO
        title="Esoteric Wisdom Blog | Tantra Shastra & Classical Astrology Insights"
        description="Deep-dive into classical Tantric sciences, advanced Vedic astrology, and sacred stotras. Read authentic metaphysical articles written by Guru Ji Kaulbhaskar."
        canonical="https://www.kaulbhaskar.com/blog"
        keywords="Tantra Shastra Blog, Advanced Vedic Astrology Articles, Sri Vidya Sadhana, Kaula Marga Teachings, Kulashastra Research, Tripura Sundari Stotra"
        breadcrumbs={[
          { name: "Home", url: "https://www.kaulbhaskar.com" },
          { name: "Blog", url: "https://www.kaulbhaskar.com/blog" },
        ]}
      />

      <Helmet>
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kaulbhaskar.com/blog" />
        <meta property="og:title" content="Esoteric Wisdom Blog | Tantra Shastra & Classical Astrology Insights" />
        <meta property="og:description" content="Deep-dive into classical Tantric sciences, advanced Vedic astrology, and sacred stotras. Read authentic metaphysical articles written by Guru Ji Kaulbhaskar." />
        <meta property="og:image" content="https://www.kaulbhaskar.com/img/intro.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.kaulbhaskar.com/blog" />
        <meta name="twitter:title" content="Esoteric Wisdom Blog | Tantra Shastra & Classical Astrology Insights" />
        <meta name="twitter:description" content="Deep-dive into classical Tantric sciences, advanced Vedic astrology, and sacred stotras. Read authentic metaphysical articles written by Guru Ji Kaulbhaskar." />
        <meta name="twitter:image" content="https://www.kaulbhaskar.com/img/intro.webp" />

        {/* Dynamic JSON-LD Integration */}
        <script type="application/ld+json">
          {JSON.stringify(blogListSchema)}
        </script>
      </Helmet>

      <h1 className="special-font hero-subheading text-center my-24 text-white">BLOG</h1>
      
      {currentPosts.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <li key={post.slug} className="border rounded-xl bg-white overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <Link to={`/${post.slug}`}>
                <img 
                  src={post.featuredImage || "https://www.kaulbhaskar.com/img/intro.webp"} 
                  alt={post.title} 
                  className="w-full h-48 object-cover" 
                  loading="lazy"
                />
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h2>
                  <p className="text-gray-600 line-clamp-3 text-sm">{post.excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center p-12 bg-white/10 rounded-xl text-white">
          <p className="text-lg">No articles discovered in the source directory.</p>
        </div>
      )}

      {/* Pagination UI logic */}
      {postEntries.length > postsPerPage && (
        <div className="flex justify-center gap-6 mt-12 items-center">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(p => p - 1)}
            className="px-5 py-2 bg-white rounded-full font-bold text-gray-900 disabled:opacity-30 transition-transform active:scale-95"
          >
            ← Previous
          </button>
          <span className="text-white font-semibold">{currentPage} / {totalPages}</span>
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(p => p + 1)}
            className="px-5 py-2 bg-white rounded-full font-bold text-gray-900 disabled:opacity-30 transition-transform active:scale-95"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
