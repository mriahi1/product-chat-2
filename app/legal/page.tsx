"use client";
import React from 'react';
import type { NextPage } from 'next';
import Header from '@/components/Header';
import LegalNotice from '@/components/LegalNotice';
import { TranslationProvider } from '@/contexts/TranslationsContext';
import LegalNoticeContract from '@/components/LegalNoticeContract';

const Legal: NextPage = () => {

  return (
    <TranslationProvider>
      

    <div className="container">
      <Header />
      
      <main
          className={`flex flex-col md:flex-row`}
        >
         <LegalNoticeContract />
        </main>

        <footer>
          <LegalNotice />
        </footer>
      </div>
    </TranslationProvider>
  );
};

export default Legal;
