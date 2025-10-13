import { useState, useEffect } from "react";
import type { Product } from "@/Interface/Type";

const TestProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/CSVfurniture")
      .then((response) => response.json())
      .then((data: Product[]) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="min-h-screen p-6 font-sans bg-gray-50 dark:bg-gray-900">
      <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-center lg:text-4xl text-foreground">
        Product Showcase
      </h1>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
         

          

          return (
            <div key={product.asin} className="overflow-hidden rounded-lg shadow">
                <h1>{product.title}</h1>
                <p>{product.product_type}</p>
                <p> {product.brand_clean}</p>
                <p>{product.product_type}</p>
                <p>{product.price_clean}</p>
                <p>{product.color_clean}</p>
                <p>{product.material_clean}</p>
                <p>{product.height_in}</p>
                <p>{product.width_in}</p>
                <p>{product.depth_in}</p>
                
              <img
                src={product.primary_image}
                alt={product.title_clean || "Product"}
                className="object-cover w-full h-64"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestProduct;
