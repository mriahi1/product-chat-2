import React from 'react'
import { useTranslation } from '@/contexts/TranslationsContext';
import Link from 'next/link';

const MentionsLegales: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Link href="/legal">{t?.('legal_mention')}</Link>
    </div>
  )
}

export default MentionsLegales;
