// src/components/Layout.tsx
import { lazy, Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router'; 
import Navbar from './Navbar'; 
// Import the custom WhatsApp widget component
import { WhatsAppWidget } from './WhatsAppWidget'; 

const Footer = lazy(() => import('./Footer'));

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* ⚛️ React 19 Native Global Fallback Metadata Tags */}
      <title>KAULBHASKAR a Legend KAUL | Tantra, Astrology & Spiritual Guidance</title>
      <meta name="description" content="Explore professional spiritual guidance, authentic Tantric rituals, Strategic lifepath mapping, and Sri Vidya Upasana mentorship by Guru Ji Kaulbhaskar." />
      
      {/* Global Open Graph & Social Media Fallbacks */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://kaulbhaskar.com" />
      <meta property="og:title" content="KAULBHASKAR a Legend KAUL | Tantra, Astrology & Spiritual Guidance" />
      <meta property="og:description" content="Explore professional spiritual guidance, authentic Tantric rituals, Strategic lifepath mapping, and Sri Vidya Upasana mentorship by Guru Ji Kaulbhaskar." />
      <meta property="og:image" content="https://kaulbhaskar.com/img/intro.webp" />
      <meta property="twitter:card" content="summary_large_image" />

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

      {/* 🟢 FLOATING WHATSAPP WIDGET INTEGRATION 🟢 */}
      {/*       
        Do not use spaces, dashes, or a leading plus sign (+).
      */}
      <WhatsAppWidget 
        phoneNumber="919934418459" 
        message="Hi! I have a question about your services." 
      />
    </div>
  );
}
