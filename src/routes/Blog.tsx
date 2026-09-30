// src/routes/Blog.tsx
import { useState } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import allPosts from "../posts-meta.json";

interface PostData {
  title: string;
  date: string;
  featuredImage: string;
  excerpt: string;
  authorName: string;
  authorAvatar: string;
  slug: string;
}

export default function Blog() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 9;

  const typedPosts = allPosts as PostData[];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = typedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(typedPosts.length / postsPerPage) || 1;

  // ✅ FIXED: Corrected template string evaluation and added clean path slashes
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Spiritual Blog | Wisdom of Sri Kaulbhaskar Guru Ji",
    "description": "Explore spiritual insights, authentic Tantric sadhanas, Vedic astrology articles, and sacred scriptural guidance written by Guru Ji Kaulbhaskar.",
    "url": "https://kaulbhaskar.com",
    "publisher": {
      "@type": "Organization",
      "name": "KAUL TANTRA SADHANA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kaulbhaskar.com"
      }
    },
    "blogPost": typedPosts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "url": `https://kaulbhaskar.com{post.slug}`,
      "image": post.featuredImage || "https://kaulbhaskar.com",
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
        canonical="https://kaulbhaskar.com"
        keywords="Tantra blog, Astrology articles, Sri Vidya insights, Kaulbhaskar writings, Kulashastra, Tripura Stotra"
        breadcrumbs={[
          { name: "Home", url: "https://kaulbhaskar.com" },
          { name: "Blog", url: "https://kaulbhaskar.com" },
        ]}
      />

      <Helmet>
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kaulbhaskar.com" />
        <meta property="og:title" content="Spiritual Blog | Wisdom of Sri Kaulbhaskar Guru Ji" />
        <meta property="og:description" content="Explore spiritual insights, authentic Tantric sadhanas, Vedic astrology articles, and sacred scriptural guidance written by Guru Ji Kaulbhaskar." />
        <meta property="og:image" content="https://kaulbhaskar.com" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://kaulbhaskar.com" />
        <meta name="twitter:title" content="Spiritual Blog | Wisdom of Sri Kaulbhaskar Guru Ji" />
        <meta name="twitter:description" content="Explore spiritual insights, authentic Tantric sadhanas, Vedic astrology articles, and sacred scriptural guidance written by Guru Ji Kaulbhaskar." />
        <meta name="twitter:image" content="https://kaulbhaskar.com" />

        {/* FIXED: Uses dangerouslySetInnerHTML to guarantee cross-platform execution stability across older Samsung Internet versions */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
        />
      </Helmet>

      <h1 className="special-font hero-subheading text-center my-24">BLOG</h1>
      
      {typedPosts.length === 0 ? (
        <div className="flex justify-center items-center py-20 text-white font-semibold">
          No articles published yet.
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <li 
              key={post.slug} 
              className="border rounded-xl bg-white overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-2xl flex flex-col"
            >
              <Link to={`/${post.slug}`} className="flex flex-col h-full">
                {/* Structural box wrapper forces strict baseline alignment layouts */}
                <div className="w-full h-fit overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title} 
                    width="800"
                    height="500"
                    className="w-full h-auto object-contain transform hover:scale-102 transition-transform duration-500" 
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-orange-600 font-semibold mb-1">{post.date}</p>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                  </div>
                  
                  <div className="mt-5 flex items-center gap-2 border-t pt-3 border-gray-50">
                    <img
                      src={post.authorAvatar || "https://kaulbhaskar.com/img/avatar-fallback.webp"}
                      className="w-7 h-7 rounded-full object-cover bg-gray-50"
                      alt={post.authorName}
                    />
                    <span className="text-xs text-gray-500 font-medium">
                      By {post.authorName}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination UI logic */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-12">
          <button 
            disabled={currentPage === 1} 
            onClick={() => {
              setCurrentPage(p => p - 1);
              window.scrollTo({ top: 0, behavior: 'smooth' }); // Native fluid ux addition
            }}
            className="px-5 py-2 bg-white rounded-full disabled:opacity-30 font-medium text-sm text-gray-800 transition-opacity cursor-pointer hover:bg-gray-50 select-none"
          >
            ← Previous
          </button>
          <span className="text-white font-medium text-sm">{currentPage} / {totalPages}</span>
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => {
              setCurrentPage(p => p + 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2 bg-white rounded-full disabled:opacity-30 font-medium text-sm text-gray-800 transition-opacity cursor-pointer hover:bg-gray-50 select-none"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
