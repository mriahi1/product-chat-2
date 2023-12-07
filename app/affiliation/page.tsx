"use client";
import React from 'react';
import type { NextPage } from 'next';
import Header from '@/components/Header';
import AffiliationStatementContract from '@/components/AffiliationStatementContract';
import { TranslationProvider } from '@/contexts/TranslationsContext';
import LegalNotice from '@/components/LegalNotice';
import AffiliationStatement from '@/components/AffiliationStatement'; 

const Affiliation: NextPage = () => {
  return (
    <TranslationProvider>
      <div className="container" style={{ marginTop: '100px' }}>
        <Header />
        <main className={`flex flex-col md:flex-row`}>
          <AffiliationStatementContract />
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

export default Affiliation;
