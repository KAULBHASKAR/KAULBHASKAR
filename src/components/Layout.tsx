// src/components/Layout.tsx
import { lazy, Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router'; 
import { Helmet } from 'react-helmet-async';

// 🛠️ Dynamic loader wrapper to mask imports from Rolldown compiler graphs
const layoutImport = (componentName: string) => {
  return lazy(() => import(`./${componentName}`));
};

const Navbar = layoutImport('Navbar');
const Footer = layoutImport('Footer');

// Specific check handler for non-default named package exports
const WhatsAppWidget = lazy(() => 
  import(`./WhatsAppWidget`).then(module => ({ default: module.WhatsAppWidget }))
);

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Helmet>
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ScrollRestoration /> 

      <header className="layout-header">
        <Suspense fallback={<div className="h-20 bg-transparent" />}>
          <Navbar /> 
        </Suspense>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <Suspense fallback={null}>
        <WhatsAppWidget 
          phoneNumber="919934418459" 
          message="Hi! I have a question about your services." 
        />
      </Suspense>
    </div>
  );
}
