// src/components/Layout.tsx
import { lazy, Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router'; 
import { Helmet } from 'react-helmet-async';

// ⚡ FIX 1: Statically import Navbar and Footer so they load in the primary bundle shell
import Navbar from './Navbar';
import Footer from './Footer';

// ✅ KEEP LAZY: Keep the heavy WhatsApp widget deferred out of the critical path
const WhatsAppWidget = lazy(() => import('./WhatsAppWidget').then(module => ({ default: module.WhatsAppWidget })));

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Helmet>
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ScrollRestoration /> 

      {/* Modern structural headers render instantly without JS network request waiting gates */}
      <header className="layout-header">
        <Navbar /> 
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
      
      <Footer />

      {/* Background elements remain decoupled from initial paint benchmarks */}
      <Suspense fallback={null}>
        <WhatsAppWidget 
          phoneNumber="919934418459" 
          message="Hi! I have a question about your services." 
        />
      </Suspense>
    </div>
  );
}
