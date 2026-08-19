import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop'; // Static import to prevent network waterfall

// 1. Lazy load all page components properly
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));
const Services = lazy(() => import('./routes/Services'));
const Blog = lazy(() => import('./routes/Blog'));
const BlogPost = lazy(() => import('./routes/BlogPost'));
const Contact = lazy(() => import('./routes/Contact'));
const Profile = lazy(() => import('./routes/Profile'));

// 2. Helper to wrap elements in Suspense for cleaner code
const withSuspense = (Component: React.ComponentType) => {
  return (props: any) => (
    <Suspense fallback={<div className="loading-spinner" />}>
      <Component {...props} />
    </Suspense>
  );
};

// 3. Wrap components using the corrected helper function
const SuspendedHome = withSuspense(Home);
const SuspendedAbout = withSuspense(About);
const SuspendedServices = withSuspense(Services);
const SuspendedBlog = withSuspense(Blog);
const SuspendedContact = withSuspense(Contact);
const SuspendedProfile = withSuspense(Profile);
const SuspendedBlogPost = withSuspense(BlogPost);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop /> {/* Instantly loads alongside layout */}
        <Layout />
      </>
    ),
    children: [
      { index: true, element: <SuspendedHome /> },
      { path: "about-us", element: <SuspendedAbout /> },
      { path: "services", element: <SuspendedServices /> },
      { path: "blog", element: <SuspendedBlog /> },
      { path: "contact", element: <SuspendedContact /> },
      { path: "profile", element: <SuspendedProfile /> },
      { path: ":slug", element: <SuspendedBlogPost /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
