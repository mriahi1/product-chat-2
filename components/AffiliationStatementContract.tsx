import React from "react";
import { useTranslation } from "@/contexts/TranslationsContext";

const AffiliationStatement: React.FC = () => {
  const { t } = useTranslation();
  const affiliationMentionContract = t?.("affiliation_mention_contract");

  const paragraphs = affiliationMentionContract
    ?.split("\n")
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);

  return (
    <div>
      <h1>
        <strong>{t?.("affiliation_mention")}</strong>
      </h1>
      {paragraphs}
    </div>
  );
};

export default AffiliationStatement;
