import React from "react";
import { Link } from "react-router";
// 1. Directly import the static pre-compiled JSON file
import latestPosts from "../posts-meta.json";

interface Post {
  slug: string;
  title: string;
  date: string;
  featuredImage: string;
  excerpt: string;
  authorName: string;
  authorAvatar: string;
}

const LatestPost: React.FC = () => {
  // 2. No hooks or runtime parsing needed. If no posts exist, render empty fallback layout.
  if (!latestPosts || latestPosts.length === 0) {
    return <div className="min-h-screen bg-indigo-500" />;
  }

  return (
    <div className="px-6 py-10 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <h2 className="text-black text-center text-4xl font-bold mb-10">Latest Posts</h2>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(latestPosts as Post[]).map((post) => (
          <li
            key={post.slug}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white"
          >
            <Link to={`/${post.slug}`}>
              {/* FIXED: Enforced an explicit aspect ratio box container shell layer to preserve image footprint boundaries prior to file delivery */}
              <div className="w-full aspect-video md:aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  loading="lazy" /* Browser native optimization */
                />
              </div>
              
              <div className="p-5">
                <p className="text-sm text-orange-600 font-semibold mb-2">
                  {post.date}
                </p>
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <img
                    src={post.authorAvatar}
                    className="w-8 h-8 rounded-full object-cover bg-gray-50"
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
    </div>
  );
};

export default LatestPost;
