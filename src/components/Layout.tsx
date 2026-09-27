// src/components/Layout.tsx
import { lazy, Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router'; 
import { Helmet } from 'react-helmet-async';

// ✅ Lazy load the Navbar so its dependencies drop out of the initial paint blocking path
const Navbar = lazy(() => import('./Navbar'));
const Footer = lazy(() => import('./Footer'));
const WhatsAppWidget = lazy(() => import('./WhatsAppWidget').then(module => ({ default: module.WhatsAppWidget })));

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Helmet>
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ScrollRestoration /> 

      {/* Provide a lightweight visual placeholder shell while the Navbar bundle loads */}
      <header className="layout-header min-h-[60px]">
        <Suspense fallback={<div className="h-[60px] w-full bg-transparent" />}>
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
