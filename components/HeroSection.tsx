import React from 'react';
import { useTranslation } from '@/contexts/TranslationsContext';
import Link from 'next/link';


const HeroSection = () => {
    const { t } = useTranslation();

    return (
        <div className="hero-section">
            <img src={"/LOGO_FETCHIZY_BASELINE.png"} alt="Logo" />
            {/* <h1>{t?.('hero_title')}</h1> */}
            {/* <p>{t?.('hero_subtitle')}</p> */}
            <Link href="/chat" className="cta-btn">
              {t?.('hero_cta_button')}
            </Link>
        </div>
    );
};

export default HeroSection;
