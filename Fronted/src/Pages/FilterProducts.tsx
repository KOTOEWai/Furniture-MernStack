import { ProductCard } from "@/Layouts/ProductCard"
import { useGetAllProductsQuery } from "@/ApiSlice/AmazonApi"
import Loading from "@/components/Loading"
import { useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"

const FilterProduct: React.FC = () => {
  const [searchParams] = useSearchParams()
  const productType = searchParams.get("product_type")

  const { data, isLoading, error } = useGetAllProductsQuery()
  const filteredProducts = data?.filter(
    (product) => !productType || product.product_type === productType
  )

  if (isLoading) return <Loading />
  if (error) return <p className="text-center text-red-500">Error loading products.</p>

  return (
    <section className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <motion.h1
        className="mb-10 text-3xl font-bold text-center lg:text-4xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {productType ? `${productType} Products` : "All Products"}
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {filteredProducts?.map((product) => (
          <motion.div key={product.asin} whileHover={{ scale: 1.02 }}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default FilterProduct
