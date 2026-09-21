import { useParams, Link } from "react-router";
import { useState, useEffect, useMemo } from "react";
import matter from "gray-matter";
import { Buffer } from "buffer";
import CopyProtectedArticle from "../components/CopyProtectedArticle";

interface PostFrontMatter {
  title: string;
  excerpt?: string;
  keywords?: string;
  featuredImage?: string;
  authorName: string;
  authorAvatar: string;
  authorBio?: string;
  date: string;
  password?: string;
}

if (typeof window !== "undefined") {
  (window as any).Buffer = Buffer;
}

const posts = import.meta.glob<string>("../posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const path = `../posts/${slug}.md`;
  const rawContent = posts[path];

  if (!rawContent) {
    return <div className="text-center py-20 text-gray-800 bg-white min-h-screen">Post not found</div>;
  }

  // 1. Optimize Markdown Frontmatter Extraction using useMemo to avoid main thread layout blocking
  const { postData, content } = useMemo(() => {
    const { data, content: bodyContent } = matter(rawContent);
    return { postData: data as PostFrontMatter, content: bodyContent };
  }, [rawContent]);

  const isProtected = !!postData.password;

  // 2. FIXED URL STYLING SYNTAX: Switched standard string literal to Template Literal syntax
  const canonicalUrl = `https://kaulbhaskar.com{slug || ""}`;
  const fallbackImage = "https://kaulbhaskar.com"; // Provide a valid image URL resource
  const ogImageUrl = postData.featuredImage 
    ? (postData.featuredImage.startsWith('http') ? postData.featuredImage : `https://www.kaulbhaskar.com${postData.featuredImage}`)
    : fallbackImage;

  // 3. Memoize Structured Schema computation tracking
  const articleSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": postData.title,
    "description": postData.excerpt || "Read scriptural wisdom entries on classical Tantra, Sri Vidya frameworks, and Vedic Astrology calculation methods by Kaulbhaskar Guru Ji.",
    "image": ogImageUrl,
    "datePublished": postData.date ? new Date(postData.date).toISOString().split('T')[0] : "2026-08-28",
    "url": canonicalUrl,
    "mainEntityOfPage": canonicalUrl,
    "author": {
      "@type": "Person",
      "name": postData.authorName || "KAULBHASKAR Guru Ji",
      "image": postData.authorAvatar || "https://kaulbhaskar.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "KAUL TANTRA SADHANA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kaulbhaskar.com"
      }
    }
  }), [postData, ogImageUrl, canonicalUrl]);

  // 4. FIXED JSON-LD INJECTION: Inject safely to document head via clean layout tracking effect
  useEffect(() => {
    let script = document.getElementById("jsonLdSchema") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "jsonLdSchema";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(articleSchema);
    
    return () => {
      document.getElementById("jsonLdSchema")?.remove();
    };
  }, [articleSchema]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === postData.password) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  // 1. RESTRICTED PASSWORD VIEW
  if (isProtected && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <title>Protected Content | KAULBHASKAR Blog</title>
        <meta name="description" content="This spiritual sadhana layout framework requires authorized password entry credentials to view context details safely." />
        <meta name="robots" content="noindex, follow" />

        <div className="max-w-md w-full p-8 border border-gray-200 rounded-2xl bg-white shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Restricted Access</h2>
          <p className="mb-6 text-gray-600">This Sadhana requires a password to view.</p>
          
          <form onSubmit={handleVerify} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className={`p-3 border rounded-lg outline-none focus:ring-2 ${
                error ? "border-red-500 ring-red-100" : "border-gray-300 focus:ring-indigo-200"
              }`}
              autoFocus
              required
            />
            {error && <p className="text-red-500 text-sm font-medium">Incorrect password.</p>}
            
            <button type="submit" className="bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-700 transition-all active:scale-95">
              Unlock Content
            </button>
            
            <Link to="/blog" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm mt-2">
              ← Back to Blog
            </Link>
          </form>
        </div>
      </div>
    );
  }

  // 2. OPEN / UNLOCKED CONTENT VIEW
  // 5. OPTIMIZED BACKGROUND RENDERING: Replaced multi-stop linear gradients to avoid LCP paint lag
  return (
    <article className="w-full px-6 py-10 bg-slate-50 min-h-screen text-gray-900">
      <title>{`${postData.title} | Sri Kaulbhaskar Blog`}</title>
      <meta name="description" content={postData.excerpt || "Read scriptural wisdom entries on classical Tantra, Sri Vidya frameworks, and Vedic Astrology calculation methods by Kaulbhaskar Guru Ji."} />
      <meta name="keywords" content={postData.keywords || "Tantra wisdom, Sri Vidya sadhana"} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={`${postData.title} | Sri Kaulbhaskar Blog`} />
      <meta property="og:description" content={postData.excerpt || "Read scriptural wisdom entries on classical Tantra, Sri Vidya frameworks, and Vedic Astrology calculation methods by Kaulbhaskar Guru Ji."} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="article:author" content={postData.authorName || "KAULBHASKAR Guru Ji"} />
      <meta property="article:published_time" content={postData.date} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={`${postData.title} | Sri Kaulbhaskar Blog`} />
      <meta name="twitter:description" content={postData.excerpt || "Read scriptural wisdom entries on classical Tantra, Sri Vidya frameworks, and Vedic Astrology calculation methods by Kaulbhaskar Guru Ji."} />
      <meta name="twitter:image" content={ogImageUrl} />

      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="mt-6 text-sm text-indigo-600 hover:text-indigo-800 mb-8 inline-block font-medium">
          ← Back to Blog
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-950 mb-6 leading-tight tracking-tight">
            {postData.title}
          </h1>
          <div className="flex items-center gap-4 mb-8">
            {/* 6. FIXED ACCESSIBILITY AND PAINT SIZE: Replaced absolute size string bindings */}
            <img 
              src={postData.authorAvatar || "https://kaulbhaskar.com"} 
              className="w-14 h-14 rounded-full border border-gray-200 shadow-xs object-cover" 
              alt={postData.authorName || "Author"}
              width="56"
              height="56"
            />
            <div>
              <p className="font-bold text-gray-900 text-lg">{postData.authorName}</p>
              <p className="text-gray-500 text-sm">{postData.date}</p>
            </div>
          </div>
        </header>

        <CopyProtectedArticle content={content} />
      </div>
    </article>
  );
}
