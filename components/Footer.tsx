import React from 'react';
import { usePathname } from 'next/navigation'
import LegalNotice from "@/components/LegalNotice";
import AffiliationStatement from '@/components/AffiliationStatement';
import { useTranslation } from "@/contexts/TranslationsContext";

const CallToAction = () => {
  const { t } = useTranslation();

  return (
    <div className="call-to-action">
      <h2>{t?.('footer_cta_title')}</h2>
      <p>{t?.('footer_cta_subtitle')}</p>
      <button onClick={() => window.location.href = '/chat'}>{t?.('footer_cta_button')}</button>
    </div>
  );
};

const Footer = () => {
  const pathname = usePathname()

  return (
    <>
      {pathname !== '/chat' && <CallToAction />}
      <footer>
          <div className="footer-link">
          <LegalNotice />
          </div>
          <div className="footer-link">
          <AffiliationStatement />
          </div>
      </footer>
    </>
  );
};

export default Footer;
