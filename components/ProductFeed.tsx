import React from 'react';
import { Product } from '@/types/Product';
import { useTranslation } from '@/contexts/TranslationsContext';
import FeaturedProduct from "@/components/FeaturedProduct";
import ResetChat from "@/components/ResetChat";

interface FeaturedProductsFeedProps {
    products: Product[];
    onProductsUpdate?: (products: Product[]) => void;
}

const FeaturedProductsFeed: React.FC<FeaturedProductsFeedProps> = ({ products, onProductsUpdate }) => {
    const { t } = useTranslation();

    if (!products || products.length === 0) {
        <div>{t('no_products')}</div>;
    }

    return (
        <div className="product-feed flex flex-col overflow-y-auto space-y-4 p-4" style={{ maxHeight: '70vh' }}> 
            {products.map((product) => (
                <div key={product.id} className="min-w-[300px]">
                    <FeaturedProduct {...product} />
                </div>
            ))}
            <ResetChat onProductsUpdate={onProductsUpdate} />
        </div>
    );
};

export default FeaturedProductsFeed;
