// src/components/Layout.tsx
import { lazy, Suspense, startTransition } from 'react';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router'; 
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar'; 
import { WhatsAppWidget } from './WhatsAppWidget'; 

// Keep lazy loading for non-critical footer asset
const Footer = lazy(() => import('./Footer'));

export default function Layout() {
  const navigate = useNavigate();

  // Optimization: Prevents blocking user interactions during router transitions
  const handleSafeNavigation = (to: string) => {
    startTransition(() => {
      navigate(to);
    });
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Helmet>
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Keeps user's window focus and position consistent upon view switching */}
      <ScrollRestoration getKey={(location) => location.pathname} /> 

      <header className="w-full z-50">
        <Navbar onNavigate={handleSafeNavigation} /> 
      </header>

      <main className="flex-1 w-full" id="main-content">
        <Outlet />
      </main>
      
      {/* Optimized fallback layer to prevent Cumulative Layout Shift (CLS) */}
      <Suspense fallback={<div className="h-24 bg-transparent" aria-hidden="true" />}>
        <Footer />
      </Suspense>

      <WhatsAppWidget 
        phoneNumber="919934418459" 
        message="Hi! I have a question about your services." 
      />
    </div>
  );
}
