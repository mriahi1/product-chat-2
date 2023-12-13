import React from 'react';
import { useTranslation } from "@/contexts/TranslationsContext";
import { Product } from '@/types/Product';
import { Category } from '@/types/Category';

interface CategoryProps {
  label: string;
}

interface BackCategoryProps {
  label: string;
  onProductsUpdate?: (products: Product[]) => void;
}

interface NotFoundProps {
  onProductsUpdate?: (products: Product[]) => void;
  categories: Category[];
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

const NotFound: React.FC<NotFoundProps> = ({ onProductsUpdate, categories }) => {
  const { t } = useTranslation();

  console.log(categories)
  return (
    <div className="not-found-container">
      <h1 className="not-found-header">{t('pick_categories_header')}</h1>
      <p className="not-found-subtext">{t('pick_categories_subtext')}</p>

      <div className="button-container">
   
            {categories?.length > 0 && categories.map((category, index) => (
                
                <div key={index}>
                   <CategoryButton label={category.name} />
                </div>

            ))}
      </div>
      <p className="not-found-subtext">{t('reset_subtext')}</p>
      <BackToChatButton label={t('reset_chat')} onProductsUpdate={onProductsUpdate} />
    </div>
  );
};

export default NotFound;
