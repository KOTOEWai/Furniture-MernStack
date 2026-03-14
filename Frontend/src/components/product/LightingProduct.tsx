import ProductCard from "./LightingproductCard";

import { useGetAllProductsQuery } from "@/api/productApi";
import Loading from '@/components/shared/Loading';
import type { Product } from "@/types";

export default function LightingProduct() {

  const { data, isLoading, error } = useGetAllProductsQuery();
  const products = (data as { data?: Product[]; result?: Product[] } | undefined)?.data
    ?? (data as { result?: Product[] } | undefined)?.result
    ?? [];
  if (isLoading) return <Loading />;
  if (error) return <p>Error loading products</p>;
  return (
    <div className="my-6">
      <ProductCard products={products} />
    </div>
  )
}
