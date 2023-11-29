"use client";
import React from 'react';
import type { NextPage } from 'next';
import Header from '@/components/Header';
import AffiliationStatement from '@/components/AffiliationStatement';
import { TranslationProvider } from '@/contexts/TranslationsContext';
import AffiliationStatementContract from '@/components/AffiliationStatementContract';

const Affiliation: NextPage = () => {

  return (
    <TranslationProvider>
      

    <div className="container">
      <Header />
      
      <main
          className={`flex flex-col md:flex-row`}
        >
         <AffiliationStatementContract />
        </main>

        <footer>
          <AffiliationStatement />
        </footer>
      </div>
    </TranslationProvider>
  );
};

export default Affiliation;
