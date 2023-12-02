import React from 'react';
import { Product } from '@/types/Product';
import { useTranslation } from '@/contexts/TranslationsContext';
import FeaturedProduct from "@/components/FeaturedProduct";

interface FeaturedProductsFeedProps {
    products: Product[];
}

const FeaturedProductsFeed: React.FC<FeaturedProductsFeedProps> = ({ products }) => {
    const { t } = useTranslation();

    console.log(products);

    if (!products || products.length === 0) {
        return null;
        // return (<div className="flex overflow-x-scroll space-x-4">
        //     {t?.('loading_products')
        // }</div>);
    }

    return (
        <div className="product-feed flex flex-col overflow-y-scroll space-y-4">
            {products.map((product) => (
                <div key={product.id} className="min-w-[300px]">
                    <FeaturedProduct {...product} />
                </div>
            ))}
        </div>
    );
};

export default FeaturedProductsFeed;
