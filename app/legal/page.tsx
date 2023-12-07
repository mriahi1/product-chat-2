"use client";
import React from 'react';
import type { NextPage } from 'next';
import Header from '@/components/Header';
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
      </div>
    </TranslationProvider>
  );
};

export default Legal;
