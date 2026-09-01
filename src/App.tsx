// src/App.tsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop'; // 👈 Move it here


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
    element: <Layout />, // Layout stays static so it doesn't unmount/flicker
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
    <>
      <RouterProvider router={router} />
      <ScrollToTop />
    </>
  );
}
