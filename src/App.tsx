// src/App.tsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop'; 

// 1. Lazy load all page components
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));
const Services = lazy(() => import('./routes/Services'));
const Blog = lazy(() => import('./routes/Blog'));
const BlogPost = lazy(() => import('./routes/BlogPost'));
const Contact = lazy(() => import('./routes/Contact'));
const Profile = lazy(() => import('./routes/Profile'));


// 2. Helper to wrap elements in Suspense for cleaner code
const withSuspense = (Component: React.ReactNode) => (
  <Suspense fallback={<div className="loading-spinner" />}>
    {Component}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element: withSuspense(<Home />) },
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
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
      <ScrollToTop />
    </HelmetProvider>
  );
}
