import { ProductCard } from "@/Layouts/ProductCard";
import { useGetAllProductsQuery } from "@/ApiSlice/AmazonApi";
import Loading from "@/components/Loading";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import FilterProductComponent from "@/Layouts/Product-Filter-Component";

const FilterProduct: React.FC = () => {
  const [searchParams] = useSearchParams();
  const productType = searchParams.get("product_type");
  const { data, isLoading, error } = useGetAllProductsQuery();

  const filteredProducts = data?.filter(
    (product) => !productType || product.product_type === productType
  );

  if (isLoading) return <Loading />;
  if (error)
  return <div className="flex items-center justify-center min-h-screen">
    <p className="text-red-400 ">Error loading products.</p></div>;

  return (
    <section className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <motion.h1
        className="mb-3 text-3xl font-bold text-center capitalize lg:text-4xl text-foreground"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {productType ? `${productType} Products` : "All Products"}
      </motion.h1>
      <FilterProductComponent />
      {filteredProducts?.length ? (
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.asin} whileHover={{ scale: 1.02 }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p
          className="text-lg text-center text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No products found for this category.
        </motion.p>
      )}
    </section>
  );
};

export default FilterProduct;
