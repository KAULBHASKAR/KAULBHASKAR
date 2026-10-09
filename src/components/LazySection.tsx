// src/components/LazySection.tsx
import React, { useState, useEffect, useRef } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string; // Preload barrier (e.g., "300px" means load 300px before scrolling into view)
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback = <div className="h-[20vh] w-full animate-pulse bg-neutral-900/5" />,
  rootMargin = "300px",
}) => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el); // Only trigger download once
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={sectionRef} className="w-full">
      {inView ? children : fallback}
    </div>
  );
};
