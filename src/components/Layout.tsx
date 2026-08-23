// src/components/Layout.tsx
import { lazy, Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router'; // 1. Added ScrollRestoration
import Navbar from './Navbar'; 
const Footer = lazy(() => import('./Footer'));

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 2. Place it here; it doesn't render anything visible */}
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
    </div>
  );
}
