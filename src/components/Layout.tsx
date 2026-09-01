// src/components/Layout.tsx
import { lazy, Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router'; 
import { Helmet } from 'react-helmet-async'; // ✅ Added Helmet import
import Navbar from './Navbar'; 
import { WhatsAppWidget } from './WhatsAppWidget'; 

const Footer = lazy(() => import('./Footer'));

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* ✅ Correctly wrapped in Helmet to hoist tags out of the body and into the head */}
      <Helmet>
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ScrollRestoration /> 

      <header className="layout-header">
        <Navbar /> 
      </header>

      <main className="flex-1">
        {/* Child components rendered inside here will hoist their own unique tags up! */}
        <Outlet />
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <WhatsAppWidget 
        phoneNumber="919934418459" 
        message="Hi! I have a question about your services." 
      />
    </div>
  );
}
