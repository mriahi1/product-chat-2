"use client";
import React from 'react';
import type { NextPage } from 'next';
import Header from '@/components/Header';
import LegalNotice from '@/components/LegalNotice';  // Ajout de cet import
import AffiliationStatement from '@/components/AffiliationStatement';  // Ajout de cet import
import LegalNoticeContract from '@/components/LegalNoticeContract';
import { TranslationProvider } from '@/contexts/TranslationsContext';

const Legal: NextPage = () => {
  return (
    <TranslationProvider>
      <div className="container" style={{ marginTop: '100px' }}>
        <Header />
        <main className={`flex flex-col md:flex-row`}>
          <LegalNoticeContract />
        </main>
         <footer>
  <div className="footer-link">
    <LegalNotice />
  </div>
  <div className="footer-link">
    <AffiliationStatement />
  </div>
        </footer>
      </div>
    </TranslationProvider>
  );
};

export default Legal;
