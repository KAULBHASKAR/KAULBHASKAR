import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Resolve paths relative to the current working directory
const postsDirectory = path.join(process.cwd(), 'src/posts');
const outputFile = path.join(process.cwd(), 'src/posts-meta.json');

try {
  // Read all files from the posts folder
  const files = fs.readdirSync(postsDirectory);
  
  const allPosts = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(postsDirectory, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(content);
      
      // Extract frontmatter metadata fields
      return {
        slug: file.replace('.md', ''),
        title: data.title || "Untitled",
        date: data.date || "",
        featuredImage: data.featuredImage || "",
        excerpt: data.excerpt || "",
        authorName: data.authorName || "Anonymous",
        authorAvatar: data.authorAvatar || "",
      };
    });

  // Sort by date descending (assuming YYYY-MM-DD or standard date strings)
  allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Slice only the top 3 posts needed for the homepage widget
  const homepagePosts = allPosts.slice(0, 3);

  // Write out the raw JSON data statically
  fs.writeFileSync(outputFile, JSON.stringify(homepagePosts, null, 2));
  console.log("✅ [Success] Statically generated src/posts-meta.json for the homepage!");
} catch (error) {
  console.error("❌ [Error] Failed to build post metadata:", error);
  process.exit(1);
}
