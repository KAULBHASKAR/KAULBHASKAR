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
        {/* Universal Fallback Meta Tags */}
        <title>KAULBHASKAR | Tantra & Spiritual Guidance</title>
        <meta name="description" content="Authentic Tantric rituals, Astrology, and Sri Vidya Upasana guidance." />

        {/* Open Graph (Facebook, WhatsApp, LinkedIn, Slack) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="KAULBHASKAR" />
        <meta property="og:title" content="KAULBHASKAR | Tantra & Spiritual Guidance" />
        <meta property="og:description" content="Authentic Tantric rituals, Astrology, and Sri Vidya Upasana guidance." />
        <meta property="og:url" content="https://kaulbhaskar.com" />
        
        {/* Universal Landscape Fallback Image Asset */}
        <meta property="og:image" content="https://kaulbhaskar.com" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Developer Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="KAULBHASKAR | Tantra & Spiritual Guidance" />
        <meta name="twitter:description" content="Authentic Tantric rituals, Astrology, and Sri Vidya Upasana guidance." />
        <meta name="twitter:image" content="https://kaulbhaskar.com" />
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
