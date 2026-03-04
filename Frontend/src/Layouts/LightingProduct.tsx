import ProductCard from "@/components/LightingproductCard";

import { useGetAllProductsQuery } from "@/ApiSlice/productApi";
import Loading from '../components/Loading';

export default function LightingProduct() {
     
  const { data , isLoading, error} = useGetAllProductsQuery();
  if (isLoading) return <Loading />;
  if (error) return <p>Error loading products</p>;
  return (
    <div className="my-6">
       <ProductCard products={data?.data ?? []}/>
    </div>
  )
}
