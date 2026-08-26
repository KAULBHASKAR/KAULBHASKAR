import { useParams, Link } from "react-router";
import { useState } from "react"; // Added for password state
// Import Helmet directly to bypass SEO prop type errors
import { Helmet } from "react-helmet-async";
import matter from "gray-matter";
import { Buffer } from "buffer";
import SEO from "../components/SEO";
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
  password?: string; // Add password to front-matter type
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

  // Fallback fallback configurations for image assets
  const canonicalUrl = `https://vercel.app{slug}`;
  const fallbackImage = "https://vercel.app";
  const ogImageUrl = postData.featuredImage 
    ? (postData.featuredImage.startsWith('http') ? postData.featuredImage : `https://vercel.app${postData.featuredImage}`)
    : fallbackImage;

  // Handle password submission
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === postData.password) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  // 1. RESTRICTED VIEW (If protected and not verified)
  if (isProtected && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-500 to-purple-500 px-4">
        {/* Safe loading of tags even on locked layouts so search engine spiders can crawl metadata structure cleanly */}
        <Helmet>
          <title>Protected Content | KAULBHASKAR Blog</title>
          <meta name="description" content="This spiritual sadhana layout framework requires authorized password entry credentials to view context details safely." />
          <meta name="robots" content="noindex, follow" />
        </Helmet>

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

  // 2. AUTHORIZED CONTENT VIEW
  return (
    <article className="w-full px-6 py-10 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      {/* ✅ Safe layout variables that your SEO component already accepts */}
      <SEO
        title={`${postData.title} | Sri Kaulbhaskar Blog`}
        description={postData.excerpt || "Read scriptural wisdom entries on classical Tantra, Sri Vidya frameworks, and Vedic Astrology calculation methods by Kaulbhaskar Guru Ji."}
        canonical={canonicalUrl}
        keywords={postData.keywords || "Tantra wisdom, Sri Vidya sadhana"}
        featuredImage={ogImageUrl}
        breadcrumbs={[
          { name: "Home", url: "https://www.kaulbhaskar.com" },
          { name: "Blog", url: "https://www.kaulbhaskar.com/blog" },
          { name: postData.title, url: canonicalUrl },
        ]}
      />

      {/* ✅ Direct Helmet injection to add dynamic Open Graph tags without breaking TypeScript definitions */}
      <Helmet>
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
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <Link to="/blog" className="mt-20 text-sm text-black hover:text-orange-200 mb-8 inline-block">
          ← Back to Blog
        </Link>

        <header className="mb-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
            {postData.title}
          </h1>
          <div className="flex items-center gap-4 mb-8">
            <img src={postData.authorAvatar} className="w-14 h-14 rounded-full border-2 border-white shadow-md" alt="" />
            <div>
              <p className="font-bold text-black text-lg">{postData.authorName}</p>
              <p className="text-black/80">{postData.date}</p>
            </div>
          </div>
        </header>

        {/* Use your reusable CopyProtectedArticle component here */}
        <CopyProtectedArticle 
          content={content} 
          className="prose-invert text-white text-xl md:text-2xl" 
        />

        <footer className="mt-20 pt-10 border-t border-white/20 text-center text-black/60 font-medium">
          ॐ End of Wisdom ॐ
        </footer>
      </div>
    </article>
  );
}
