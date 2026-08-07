// src/components/LatestPost.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

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
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      // 1. Dynamic imports for heavy libraries
      const matterModule = await import("gray-matter");
      const matter = matterModule.default;
      const { Buffer } = await import("buffer");
      
      if (typeof window !== "undefined") {
        (window as any).Buffer = Buffer;
      }

      // 2. Async glob import (eager: false)
      const modules = import.meta.glob("../posts/*.md", {
        query: "?raw",
        import: "default",
      });

      const postPromises = Object.entries(modules).map(async ([path, resolver]) => {
        const content = (await resolver()) as string;
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
        } as Post;
      });

      const allPosts = await Promise.all(postPromises);
      
      // 3. Sort and Slice
      const sorted = allPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      setLatestPosts(sorted.slice(0, 3));
    };

    loadPosts();
  }, []);

  // Return a skeleton or empty div while loading to satisfy Lighthouse
  if (latestPosts.length === 0) {
    return <div className="min-h-screen bg-indigo-500" />;
  }

  return (
    <div className="px-6 py-10 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <h2 className="text-black text-center text-4xl font-bold mb-10">Latest Posts</h2>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {latestPosts.map((post) => (
          <li
            key={post.slug}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white"
          >
            <Link to={`/${post.slug}`}>
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-auto object-cover object-center"
              />
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
                    className="w-8 h-8 rounded-full"
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
