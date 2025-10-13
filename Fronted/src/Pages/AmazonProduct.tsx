import { ProductCard } from "@/Layouts/ProductCard";
import { useGetAllProductsQuery } from "@/ApiSlice/AmazonApi";
import Loading from "@/components/Loading";


const AmazonProduct: React.FC = () => {
  const { data, isLoading, error } = useGetAllProductsQuery();
  console.log(data)
  if (isLoading) return <Loading />;
  if (error) return <p>Error loading products</p>;
  return (
    <div className="min-h-screen p-6 font-sans bg-gray-50 dark:bg-gray-900">
      <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-center lg:text-4xl text-foreground">
        Product Showcase
      </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {data?.map((product) => (
          <ProductCard key={product.asin} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AmazonProduct;