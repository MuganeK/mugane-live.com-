/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ACK St. Mary's Ngariama Church - Main Application Entry
 * Includes hidden, password-protected /admin management route.
 * Strictly adheres to UK English conventions.
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceSchedule } from './components/ServiceSchedule';
import { AboutParish } from './components/AboutParish';
import { MinistriesSection } from './components/MinistriesSection';
import { SermonsPlayer } from './components/SermonsPlayer';
import { LeadershipSection } from './components/LeadershipSection';
import { NewsAnnouncements } from './components/NewsAnnouncements';
import { GallerySection } from './components/GallerySection';
import { PrayerRequestSection } from './components/PrayerRequestSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { GivingModal } from './components/GivingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  // Navigation & Routing state
  const [currentRoute, setCurrentRoute] = useState<'home' | 'admin'>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Modals & Public features
  const [isGivingOpen, setIsGivingOpen] = useState(false);
  const [givingCategory, setGivingCategory] = useState<string>('tithe');

  // Check URL pathname and hash on initialisation and history popstate
  const evaluateRoute = () => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    const search = window.location.search;

    if (path.startsWith('/admin') || hash.startsWith('#/admin') || search.includes('admin=true')) {
      setCurrentRoute('admin');
    } else {
      setCurrentRoute('home');
    }

    // Verify stored administrator authorisation token
    const authStatus = localStorage.getItem('ack_ngariama_admin_auth_v1');
    setIsAdminAuthenticated(authStatus === 'authorised');
  };

  useEffect(() => {
    evaluateRoute();

    const handleLocationChange = () => {
      evaluateRoute();
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (route: 'home' | 'admin') => {
    setCurrentRoute(route);
    if (route === 'admin') {
      window.history.pushState(null, '', '/admin');
    } else {
      window.history.pushState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenGiving = (category: string = 'tithe') => {
    setGivingCategory(category);
    setIsGivingOpen(true);
  };

  const handleScrollToPrayer = () => {
    if (currentRoute !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        const el = document.getElementById('prayer');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById('prayer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToServices = () => {
    if (currentRoute !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // --------------------------------------------------------------------------
  // RENDER ADMIN ROUTE (/admin)
  // --------------------------------------------------------------------------
  if (currentRoute === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onSuccess={() => setIsAdminAuthenticated(true)}
          onCancel={() => navigateTo('home')}
        />
      );
    }

    return (
      <AdminDashboard
        onLogout={() => {
          localStorage.removeItem('ack_ngariama_admin_auth_v1');
          setIsAdminAuthenticated(false);
          navigateTo('home');
        }}
        onViewWebsite={() => navigateTo('home')}
      />
    );
  }

  // --------------------------------------------------------------------------
  // RENDER PUBLIC PARISH WEBSITE
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-purple-900 selection:text-white flex flex-col">
      {/* Navigation */}
      <Navbar
        onOpenGiving={handleOpenGiving}
        onOpenPrayer={handleScrollToPrayer}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenGiving={() => handleOpenGiving('tithe')}
          onOpenVisit={handleScrollToServices}
        />

        <ServiceSchedule />

        <AboutParish />

        <MinistriesSection />

        <SermonsPlayer />

        <LeadershipSection />

        <NewsAnnouncements
          onOpenGiving={handleOpenGiving}
        />

        <GallerySection />

        <PrayerRequestSection />

        <LocationSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenGiving={handleOpenGiving}
        onOpenPrayer={handleScrollToPrayer}
        onOpenAdmin={() => navigateTo('admin')}
      />

      {/* Interactive M-Pesa Giving Modal */}
      <GivingModal
        isOpen={isGivingOpen}
        onClose={() => setIsGivingOpen(false)}
        defaultCategory={givingCategory}
      />

      {/* Floating WhatsApp Pastoral Helpline */}
      <FloatingWhatsApp />
    </div>
  );
}
