// src/App.tsx
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop'; 

// 1. Lazy load page components
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));
const Services = lazy(() => import('./routes/Services'));
const Blog = lazy(() => import('./routes/Blog'));
const BlogPost = lazy(() => import('./routes/BlogPost'));
const Contact = lazy(() => import('./routes/Contact'));
const Profile = lazy(() => import('./routes/Profile'));

// 2. Optimized Suspense mapping with precise LCP preservation fallbacks
const withSuspense = (Component: React.ReactNode, isHomeRoute: boolean = false) => {
  const fallbackElement = isHomeRoute ? (
    <p className="mb-5 max-w-72 font-robert-regular text-white lcp-static-fallback">
      त्रिपुरास्या महादेवी भुक्ति-मुक्ति-फल-प्रदा। न गुरोः सदृशं वस्तु न देवः शङ्करोपमः॥ न च कौलात् परो योगी न विद्या त्रैपुरी समा। न च शा…
    </p>
  ) : (
    <div className="loading-spinner" />
  );

  return (
    <Suspense fallback={fallbackElement}>
      {Component}
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element: withSuspense(<Home />, true) },
      { path: "about-us", element: withSuspense(<About />) },
      { path: "services", element: withSuspense(<Services />) },
      { path: "blog", element: withSuspense(<Blog />) },
      { path: "contact", element: withSuspense(<Contact />) },
      { path: ":slug", element: withSuspense(<BlogPost />) },
      { path: "profile", element: withSuspense(<Profile />) },
    ],
  },
]);

export default function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Before hydration begins, emit raw server structure to maintain the painted visual state
  if (!isClient) {
    return (
      <p className="mb-5 max-w-72 font-robert-regular text-white lcp-static-fallback">
        त्रिपुरास्या महादेवी भुक्ति-मुक्ति-फल-प्रदा। न गुरोः सदृशं वस्तु न देवः शङ्करोपमः॥ न च कौलात् परो योगी न विद्या त्रैपुरी समा। न च शा…
      </p>
    );
  }

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
      <ScrollToTop />
    </HelmetProvider>
  );
}
