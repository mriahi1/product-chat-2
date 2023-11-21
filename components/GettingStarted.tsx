import React from 'react';
import { useTranslation } from "@/contexts/TranslationsContext";

const GettingStarted: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col bg-white border-r border-gray-200 w-80 p-4">
      <h1 className="text-xl font-semibold mb-2">{t('eco_chatbot_title')}</h1>
      <p className="text-gray-600 mb-4">{t('eco_chatbot_purpose')}</p>
     
    </div>
  );
};

export default GettingStarted;
