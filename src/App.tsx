/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OverviewPage } from './pages/OverviewPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { PartnershipPage } from './pages/PartnershipPage';
import { LabExplorerPage } from './pages/LabExplorerPage';
import { ParentTeacherPortalPage } from './pages/ParentTeacherPortalPage';
import { ContactBookingPage } from './pages/ContactBookingPage';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('overview');
  const [selectedGradeId, setSelectedGradeId] = useState<string>('class-6');

  // Handle URL hash changes if user uses back/forward or direct bookmark
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = ['overview', 'roadmap', 'partnerships', 'simulator', 'toolkit', 'contact'];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page: PageId) => {
    setActivePage(page);
    window.location.hash = page;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navbar adhering strictly to Top Bar Contract */}
      <Navbar activePage={activePage} setActivePage={handlePageChange} />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {activePage === 'overview' && (
          <OverviewPage
            setActivePage={handlePageChange}
            setSelectedGradeId={setSelectedGradeId}
          />
        )}

        {activePage === 'roadmap' && (
          <RoadmapPage
            setActivePage={handlePageChange}
            selectedGradeId={selectedGradeId}
            setSelectedGradeId={setSelectedGradeId}
          />
        )}

        {activePage === 'partnerships' && (
          <PartnershipPage setActivePage={handlePageChange} />
        )}

        {activePage === 'simulator' && (
          <LabExplorerPage setActivePage={handlePageChange} />
        )}

        {activePage === 'toolkit' && (
          <ParentTeacherPortalPage
            setActivePage={handlePageChange}
            setSelectedGradeId={setSelectedGradeId}
          />
        )}

        {activePage === 'contact' && (
          <ContactBookingPage setActivePage={handlePageChange} />
        )}
      </main>

      {/* Authoritative Footer */}
      <Footer setActivePage={handlePageChange} />
    </div>
  );
}
