import { useParams, Link } from "react-router";
import { useState } from "react";
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
    return <div className="text-center py-20">Post not found</div>;
  }

  const { data, content } = matter(rawContent);
  const postData = data as PostFrontMatter;
  const isProtected = !!postData.password;

  // ✅ Fixed string interpolation bug & matched routing structure
  const canonicalUrl = `https://kaulbhaskar.com{slug}`;
  const fallbackImage = "https://kaulbhaskar.com";
  const ogImageUrl = postData.featuredImage 
    ? (postData.featuredImage.startsWith('http') ? postData.featuredImage : `https://www.kaulbhaskar.com${postData.featuredImage}`)
    : fallbackImage;

  // ✅ Structured JSON-LD BlogPosting Schema Object
  const articleSchema = {
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
  };

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
      <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-500 to-purple-500 px-4">
        {/* React 19 native hoisting manages these tags automatically without Helmet wrappers */}
        <title>Protected Content | KAULBHASKAR Blog</title>
        <meta name="description" content="This spiritual sadhana layout framework requires authorized password entry credentials to view context details safely." />
        <meta name="robots" content="noindex, follow" />

        <div className="max-w-md w-full p-8 border rounded-2xl bg-white shadow-2xl text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Restricted Access</h2>
          <p className="mb-6 text-gray-600">This Sadhana requires a password to view.</p>
          
          <form onSubmit={handleVerify} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className={`p-3 border rounded-lg outline-hidden focus:ring-2 ${
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
  return (
    <article className="w-full px-6 py-10 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      {/* ✅ Native React 19 Document Metadata Hoisting tags */}
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

      {/* ✅ TypeScript-Safe Native JSON-LD Injection */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>

      <div className="max-w-5xl mx-auto">
        <Link to="/blog" className="mt-20 text-sm text-black hover:text-orange-200 mb-8 inline-block">
          ← Back to Blog
        </Link>

        <header className="mb-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
            {postData.title}
          </h1>
          <div className="flex items-center gap-4 mb-8">
            <img src={postData.authorAvatar || "https://kaulbhaskar.com"} className="w-14 h-14 rounded-full border-2 border-white shadow-md" alt="" />
            <div>
              <p className="font-bold text-black text-lg">{postData.authorName}</p>
              <p className="text-black/80">{postData.date}</p>
            </div>
          </div>
        </header>

        <CopyProtectedArticle content={content} />
      </div>
    </article>
  );
}
