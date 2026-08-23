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
