import React from 'react'
import { useTranslation } from '@/contexts/TranslationsContext';

const MentionsLegales: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t?.('legal_mention')}</h1>
      <p>
      {t?.('legal_mention_contract')}
      </p>
    </div>
  )
}

export default MentionsLegales;
