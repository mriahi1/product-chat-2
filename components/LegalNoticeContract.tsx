import React from 'react';
import { useTranslation } from '@/contexts/TranslationsContext';

const MentionsLegales: React.FC = () => {
  const { t } = useTranslation();

  const legalMentionsText = t?.('legal_mention_contract');

  // Remplacer les ** par des balises <strong>
  const formattedText = legalMentionsText?.split('**').map((segment, index) => (
    index % 2 === 0 ? segment : <strong key={index}>{segment}</strong>
  ));

  // Remplacer les \n par des balises <br>
  const textWithLineBreaks = formattedText?.join('\n');

  return (
    <div>
      <h1>{t?.('legal_mention')}</h1>
      <p style={{ whiteSpace: 'pre-line' }}>{textWithLineBreaks}</p>
    </div>
  );
};

export default MentionsLegales;
