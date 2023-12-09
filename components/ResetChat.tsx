import React from 'react';
import { useTranslation } from "@/contexts/TranslationsContext";
import { Product } from '@/types/Product';

interface CategoryProps {
  label: string;
}

interface BackCategoryProps {
  label: string;
  onProductsUpdate?: (products: Product[]) => void;
}

interface NotFoundProps {
  onProductsUpdate?: (products: Product[]) => void;
}

const CategoryButton: React.FC<CategoryProps> = ({ label }) => {
  return (
    <button className="category-button">
      {label}
    </button>
  );
};

const BackToChatButton: React.FC<BackCategoryProps> = ({ label, onProductsUpdate }) => {
  const handleResetProductSelect = () => {
      if (onProductsUpdate) {
          onProductsUpdate([]);
      }
  };

  return (
    <button onClick={handleResetProductSelect} className="back-to-chat-button">
      {label}
    </button>
  );
};

const NotFound: React.FC<NotFoundProps> = ({ onProductsUpdate }) => {
  const { t } = useTranslation();
  return (
    <div className="not-found-container">
      <h1 className="not-found-header">{t('pick_categories_header')}</h1>
      <p className="not-found-subtext">{t('pick_categories_subtext')}</p>
      <div className="button-container">
        <CategoryButton label={t('cat_1')} />
        <CategoryButton label={t('cat_2')} />
      </div>
      <p className="not-found-subtext">{t('reset_subtext')}</p>
      <BackToChatButton label={t('reset_chat')} onProductsUpdate={onProductsUpdate} />
    </div>
  );
};

export default NotFound;
