// src/routes/Blog.tsx
import { useState } from "react";
import { Link } from "react-router";
import matter from "gray-matter";
import { Buffer } from "buffer";
import SEO from "../components/SEO";

// Type definition for the front-matter data in your markdown files
interface PostData {
  title: string;
  date: string;
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
// Record<string, string> because we are using import: "default" with ?raw
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

export default function Blog() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 9;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postEntries.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(postEntries.length / postsPerPage);

  return (
    <div className="px-6 py-10 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <SEO
        title="Spiritual Blog | Wisdom of Sri Kaulbhaskar Guru Ji"
        description="Explore spiritual insights..."
        canonical="https://www.tantrasadhana.org/blog"
        keywords="Tantra blog, Astrology articles"
        breadcrumbs={[
          { name: "Home", url: "https://www.tantrasadhana.org" },
          { name: "Blog", url: "https://www.tantrasadhana.org/blog" },
        ]}
      />

      <h1 className="special-font hero-subheading text-center my-24">BLOG</h1>
      
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <li key={post.slug} className="border rounded-xl bg-white overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            {/* Note: Use /{post.slug} if you moved the route to the root level as previously discussed */}
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

      {/* Pagination UI logic remains the same */}
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

