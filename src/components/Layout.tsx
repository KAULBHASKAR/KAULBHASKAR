// src/components/Layout.tsx
import { lazy, Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router'; 
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar'; 

const Footer = lazy(() => import('./Footer'));
// Split the WhatsApp Widget into its own separate chunk
const WhatsAppWidget = lazy(() => import('./WhatsAppWidget').then(module => ({ default: module.WhatsAppWidget })));

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Helmet>
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ScrollRestoration /> 

      <header className="layout-header">
        <Navbar /> 
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Wrap with Suspense so it loads in the background */}
      <Suspense fallback={null}>
        <WhatsAppWidget 
          phoneNumber="919934418459" 
          message="Hi! I have a question about your services." 
        />
      </Suspense>
    </div>
  );
}
