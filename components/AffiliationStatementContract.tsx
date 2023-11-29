import React from 'react'
import { useTranslation } from '@/contexts/TranslationsContext';

const AffiliationStatement: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t?.('affiliation_mention')}</h1>
      <p>
      {t?.('affiliation_mention_contract')}
      </p>
    </div>
  )
}

export default AffiliationStatement;
