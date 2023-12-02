import React from "react";
import { useTranslation } from "@/contexts/TranslationsContext";
import Link from "next/link";
import CookieConsent from "react-cookie-consent";

const MentionsLegales: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <Link href="/legal">{t?.("legal_mention")}</Link>
      </div>
      <CookieConsent>
        {t?.("cookie_notice")}
      </CookieConsent>
    </>
  );
};

export default MentionsLegales;
