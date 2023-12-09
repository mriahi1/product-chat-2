import React from 'react';
import { useTranslation } from "@/contexts/TranslationsContext";

interface GettingStartedProps {
  step: number;
}

const GettingStarted: React.FC<GettingStartedProps> = ({ step }) => {
  const { t } = useTranslation();

  return (
    <>
      {step === 1 && (
        <div className="guidance-text flex flex-col p-4">
          <h1>{t('support_text_1')}</h1>
        </div>
      )}
      {step === 2 && (
        <div className="guidance-text-2 flex flex-col p-4">
          <h1>{t('support_text_2')}</h1>
        </div>
      )}
    </>
  );
};

export default GettingStarted;
