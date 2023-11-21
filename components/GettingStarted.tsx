import React from 'react';
import { useTranslation } from "@/contexts/TranslationsContext";

const GettingStarted: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col bg-white border-r border-gray-200 w-80 p-4">
      <h1 className="text-xl font-semibold mb-2">{t('eco_chatbot_title')}</h1>
      <p className="text-gray-600 mb-4">{t('eco_chatbot_purpose')}</p>
      <div className="instructions">
        <h2 className="text-lg font-semibold mb-2">{t('how_to_use')}</h2>
        <ol className="list-decimal list-inside text-gray-600">
          <li>{t('start_conversation')}</li>
          <li>{t('be_specific')}</li>
          <li>{t('review_suggestions')}</li>
          <li>{t('get_additional_help')}</li>
          <li>{t('refine_search')}</li>
        </ol>
      </div>
    </div>
  );
};

export default GettingStarted;
