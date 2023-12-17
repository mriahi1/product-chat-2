import React from 'react';
import { useTranslation } from "@/contexts/TranslationsContext";
import { Product } from '@/types/Product';
import { Category } from '@/types/Category';

interface CategoryProps {
  category: Category;
  selectedCategories?: Category[];
  setSelectedCategories?: (categories: Category[]) => void;
}

interface BackCategoryProps {
  label: string;
  onProductsUpdate?: (products: Product[]) => void;
  onCategoriesUpdate?: (categories: Category[]) => void;
}

interface NotFoundProps {
  onProductsUpdate?: (products: Product[]) => void;
  categories: Category[];
  onCategoriesUpdate?: (categories: Category[]) => void;
  selectedCategories?: Category[];
  setSelectedCategories?: (categories: Category[]) => void;
}
const CategoryButton: React.FC<CategoryProps> = ({ category, selectedCategories, setSelectedCategories }) => {
  return (
    <button className="category-button" onClick={() => {
      if (selectedCategories && selectedCategories?.length > 2) {
        window.open(category.amazon_url, '_blank');
      } else {
        if (setSelectedCategories) {
          setSelectedCategories([...(selectedCategories ?? []), category]);
        }
      }
    }}>
      {category.name}
    </button>
  );
};

const BackToChatButton: React.FC<BackCategoryProps> = ({ label, onProductsUpdate, onCategoriesUpdate }) => {
  const handleResetProductSelect = () => {
      if (onCategoriesUpdate) {
        onCategoriesUpdate([]);
      }
  };

  return (
    <button onClick={handleResetProductSelect} className="back-to-chat-button">
      {label}
    </button>
  );
};

const NotFound: React.FC<NotFoundProps> = ({ onProductsUpdate, categories, onCategoriesUpdate, selectedCategories, setSelectedCategories }) => {
  const { t } = useTranslation();

  return (
    <div className="not-found-container">
      <h1 className="not-found-header">{t('pick_categories_header')}</h1>
      <p className="not-found-subtext">{t('pick_categories_subtext')}</p>

      <div className="button-container">
   
            {categories?.length > 0 && categories.map((category, index) => (
                
                <div key={index}>
                   <CategoryButton category={category} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
                </div>

            ))}
      </div>
      <p className="not-found-subtext">{t('reset_subtext')}</p>
      <BackToChatButton label={t('reset_chat')} onProductsUpdate={onProductsUpdate} onCategoriesUpdate={onCategoriesUpdate} />
    </div>
  );
};

export default NotFound;
