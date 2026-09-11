// src/App.tsx
import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop'; 

// Static LCP text fallback component to prevent duplication
const HomeStaticFallback = () => (
  <p className="mb-5 max-w-72 font-robert-regular text-white lcp-static-fallback">
    त्रिपुरास्या महादेवी भुक्ति-मुक्ति-फल-प्रदा। न गुरोः सदृशं वस्तु न देवः शङ्करोपमः॥ न च कौलात् परो योगी न विद्या त्रैपुरी समा। न च शा…
  </p>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { 
        index: true, 
        // React Router native code-splitting handles Suspense under the hood
        lazy: () => import('./routes/Home').then(module => ({ Component: module.default })),
        hydrateFallbackElement: <HomeStaticFallback />
      },
      { 
        path: "about-us", 
        lazy: () => import('./routes/About').then(module => ({ Component: module.default })) 
      },
      { 
        path: "services", 
        lazy: () => import('./routes/Services').then(module => ({ Component: module.default })) 
      },
      { 
        path: "blog", 
        lazy: () => import('./routes/Blog').then(module => ({ Component: module.default })) 
      },
      { 
        path: "contact", 
        lazy: () => import('./routes/Contact').then(module => ({ Component: module.default })) 
      },
      { 
        path: ":slug", 
        lazy: () => import('./routes/BlogPost').then(module => ({ Component: module.default })) 
      },
      { 
        path: "profile", 
        lazy: () => import('./routes/Profile').then(module => ({ Component: module.default })) 
      },
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
    return <HomeStaticFallback />;
  }

  return (
    <HelmetProvider>
      <RouterProvider router={router} fallbackElement={<div className="loading-spinner" />} />
      <ScrollToTop />
    </HelmetProvider>
  );
}
