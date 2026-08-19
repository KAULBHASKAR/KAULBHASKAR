import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop'; // Import statically

const Home = lazy(() => import('./routes/Home'));
// ... Keep your other lazy page imports the same

const withSuspense = (Component: React.ReactNode) => (
  <Suspense fallback={<div className="loading-spinner" />}>
    {Component}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop /> {/* Rendered instantly without an extra code chunk */}
        <Layout />
      </>
    ),
    children: [
      { index: true, element: withSuspense(<Home />) },
      { path: "about-us", element: withSuspense(<About />) },
      { path: "services", element: withSuspense(<Services />) },
      { path: "blog", element: withSuspense(<Blog />) },
      { path: "contact", element: withSuspense(<Contact />) },
      { path: "profile", element: withSuspense(<Profile />) },
      { path: ":slug", element: withSuspense(<BlogPost />) },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
