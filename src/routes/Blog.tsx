// src/routes/Blog.tsx
import { Link, useSearchParams } from "react-router"; // Replaced useState with useSearchParams
import { Helmet } from "react-helmet-async";
import matter from "gray-matter";
import { Buffer } from "buffer";
import SEO from "../components/SEO";

interface PostData {
  title: string;
  date: any; 
  featuredImage: string;
  excerpt: string;
  authorName: string;
  authorAvatar: string;
  slug: string;
}

if (typeof window !== "undefined") {
  (window as any).Buffer = Buffer;
}

const posts = import.meta.glob<string>("../posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

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

function safeFormatDate(rawDate: any): string {
  const fallbackDate = "2026-08-28";
  if (!rawDate) return fallbackDate;
  try {
    let parsedDate: Date;
    if (rawDate instanceof Date) {
      parsedDate = rawDate;
    } else if (typeof rawDate === "string") {
      const sanitizedStr = rawDate.replace(/-/g, "/").trim();
      parsedDate = new Date(sanitizedStr);
    } else {
      parsedDate = new Date(rawDate);
    }
    return !isNaN(parsedDate.getTime()) 
      ? parsedDate.toISOString().split("T")[0] 
      : fallbackDate;
  } catch {
    return fallbackDate;
  }
}

export default function Blog() {
  // Sync the current page with the URL search query parameters (?page=X)
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  
  const postsPerPage = 9;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postEntries.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(postEntries.length / postsPerPage);

  // Helper to cleanly update page search params
  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

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
      "url": `https://kaulbhaskar.com{post.slug}`,
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
        title="Esoteric Wisdom Blog | Tantra Shastra & Classical Astrology Insights"
        description="Deep-dive into classical Tantric sciences, advanced Vedic astrology, and sacred stotras. Read authentic metaphysical articles written by Guru Ji Kaulbhaskar."
        canonical="https://www.kaulbhaskar.com/blog"
        keywords="Tantra blog, Astrology articles, Sri Vidya insights, Kaulbhaskar writings, Kulashastra, Tripura Stotra"
        breadcrumbs={[
          { name: "Home", url: "https://www.kaulbhaskar.com" },
          { name: "Blog", url: "https://www.kaulbhaskar.com/blog" },
        ]}
      />

      <Helmet>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kaulbhaskar.com/blog" />
        <meta property="og:title" content="Esoteric Wisdom Blog | Tantra Shastra & Classical Astrology Insights" />
        <meta property="og:description" content="Deep-dive into classical Tantric sciences, advanced Vedic astrology, and sacred stotras. Read authentic metaphysical articles written by Guru Ji Kaulbhaskar." />
        <meta property="og:image" content="https://www.kaulbhaskar.com/img/intro.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.kaulbhaskar.com/blog" />
        <meta name="twitter:title" content="Esoteric Wisdom Blog | Tantra Shastra & Classical Astrology Insights" />
        <meta name="twitter:description" content="Deep-dive into classical Tantric sciences, advanced Vedic astrology, and sacred stotras. Read authentic metaphysical articles written by Guru Ji Kaulbhaskar." />
        <meta name="twitter:image" content="https://www.kaulbhaskar.com/img/intro.webp" />
        <script type="application/ld+json">
          {JSON.stringify(blogListSchema)}
        </script>
      </Helmet>

      <h1 className="special-font hero-subheading text-center my-24">BLOG</h1>
      
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <li key={post.slug} className="border rounded-xl bg-white overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            {/* Added: Passing the pagination state into the link state context */}
            <Link to={`/${post.slug}`} state={{ fromPage: currentPage }}>
              <img src={post.featuredImage} alt={post.title} className="w-full h-auto" />
              <div className="p-5">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination UI logic updates */}
      <div className="flex justify-center gap-6 mt-12">
        <button 
          disabled={currentPage === 1} 
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-5 py-2 bg-white rounded-full disabled:opacity-30 cursor-pointer"
        >
          ← Previous
        </button>
        <span className="text-white">{currentPage} / {totalPages}</span>
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-5 py-2 bg-white rounded-full disabled:opacity-30 cursor-pointer"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
