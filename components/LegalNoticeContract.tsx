import React from 'react';
import { useTranslation } from '@/contexts/TranslationsContext';

const MentionsLegales: React.FC = () => {
  const { t } = useTranslation();

  const legalMentionsText = t?.('legal_mention_contract');

  // Remplacer les ** par des balises <strong> et les \n par des balises <br>
  const formattedText = legalMentionsText?.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line.split('**').map((segment, subIndex) => (
        subIndex % 2 === 0 ? segment : <strong key={subIndex}>{segment}</strong>
      ))}
      <br />
    </React.Fragment>
  ));
};

export default MentionsLegales;
