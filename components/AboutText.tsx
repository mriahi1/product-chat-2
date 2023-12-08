import React from 'react';
import { useTranslation } from '@/contexts/TranslationsContext';

const About: React.FC = () => {
  const { t } = useTranslation();
  const AboutPurpose = t?.('about_purpose');

  // Remplacez les retours chariot par des balises <br>
  const paragraphs = AboutPurpose?.split('\n').map((paragraph, index) => (
    <p key={index}>{paragraph}<br /></p>
  ));

  return (
    <div>
      <h1><strong>{t?.('about_title')}</strong></h1>
      {paragraphs}
    </div>
  );
};

export default About;