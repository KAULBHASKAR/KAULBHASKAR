import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface CopyProtectedArticleProps {
  content: string;
  className?: string;
}

export default function CopyProtectedArticle({ 
  content, 
  className = "" 
}: CopyProtectedArticleProps) {
  
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      const selection = document.getSelection()?.toString();
      if (selection) {
        e.clipboardData?.setData(
          "text/plain",
          `${selection}\n\nRead more at: ${window.location.href}`
        );
        e.preventDefault();
      }
    };
    document.addEventListener("copy", handleCopy);
    return () => document.removeEventListener("copy", handleCopy);
  }, []);

  return (
    <article className={`prose lg:prose-xl mx-auto px-6 font-circular-web ${className}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // Use 'not-prose' on the wrapper to shield your custom block elements from parent overrides
          strong: ({ children }) => (
            <span className="not-prose block bg-white/10 border-l-4 border-[#c2410c] p-6 my-8 text-xl md:text-2xl leading-relaxed text-white font-robert-medium italic backdrop-blur-sm rounded-r-lg">
              {children}
            </span>
          ),
          // Ensure your standard copy blocks map directly to your branding font rules
          p: ({ children }) => (
            <p className="font-circular-web text-gray-800 leading-relaxed">
              {children}
            </p>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
