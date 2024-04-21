import React from "react";
import { useTranslation } from "@/contexts/TranslationsContext";
import Link from "next/link";

const AffiliationStatement: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Link href="/affiliation">{t?.("affiliation_mention")}</Link>
    </div>
  );
};

export default AffiliationStatement;
