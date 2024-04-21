// components/ProductPage.tsx
import React from "react";
import { Product } from "@/types/Product";
import { fetchProducts } from "@/services/ApiService";

interface ProductPageProps {
  // Define any props here if needed
}

const ProductPage: React.FC<ProductPageProps> = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true; // flag to track mounted state

    fetchProducts()
      .then((data) => {
        if (isMounted) {
          setProducts(data);
        }
      })
      .catch((error: Error) => {
        if (isMounted) {
          setError(error.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Other UI elements */}
      <section aria-labelledby="products-heading">
        <h2 id="products-heading" className="text-2xl font-bold mb-4">
          Products
        </h2>
        {products.map((product) => (
          <article key={product.id} className="mb-4 p-4 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">{product.title}</h3>
            {/* More product details */}
          </article>
        ))}
      </section>
      {/* More sections like similar products, secondhand alternatives, etc. */}
    </div>
  );
};

export default ProductPage;
