
import { useState, useMemo } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { useGetProductsQuery } from "@/api/AmazonApi";
import Loading from "@/components/shared/Loading";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ProductSidebar } from "@/components/product/ProductSidebar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import filtericon from "@/assets/images/filter-icon.webp";


const FilterProduct: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

  // 1. URL search params and local state to create query parameters for the backend
  const currentPage = parseInt(searchParams.get("page") || "1");
  const productType = searchParams.get("product_type") || "";
  const color = searchParams.get("color") || "";

  const queryParams = useMemo(() => {
    const params: Record<string, any> = {
      page: currentPage,
      limit: productType ? 10 : 22, // Adjust limit based on product type
    };
    if (productType) params.product_type = productType;
    if (color) params.color = color;
    if (priceRange.min > 0) params.minPrice = priceRange.min;
    if (priceRange.max < Infinity) params.maxPrice = priceRange.max;
    return params;
  }, [currentPage, productType, color, priceRange]);

  // 2. Fetch data from the backend with the query parameters
  const { data: response, isLoading, error } = useGetProductsQuery(queryParams);
    
  // 3. Get paginated items and total pages from the backend response
  const currentItems = response?.data || []; // This is already correctly typed as Product[] from your API slice
  const totalPages = response?.totalPages || 0;
  const totalItems = response?.totalItems || 0;

  // This function remains the same, it just triggers a refetch by changing URL params
  const handlePageChange = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // အပေါ်ပြန်တက်မယ်
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading products.</div>;
  
  return (
    <section className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 md:p-8">
      <div className="max-w-[1440px] mx-auto">
        {/* Title Section */}
        <div className="flex items-center justify-between gap-4 ">
        <motion.h1 className="mb-4 text-3xl font-bold capitalize lg:text-4xl text-foreground">
          {productType ? `${productType} Collection` : "All Collections"}
        </motion.h1> 
         <img src={filtericon} onClick={() => setOpen(!open)} alt="filter" className="w-10 h-10 mb-2 border-2 border-gray-600 rounded-xl hover:cursor-pointer"/>
         
       </div>
        {/* Filter Section */}
        <div className="flex flex-col gap-8 lg:flex-row">
             {open && (
          <div className="flex-shrink-0 lg:w-64">
            <ProductSidebar onPriceChange={(min, max) => setPriceRange({ min, max })} />
          </div>
                          )}
          <div className="flex flex-col flex-1 gap-8">
            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="wait">
                {currentItems.map((product) => ( // `product` is automatically and correctly typed here
                  <motion.div 
                    key={product.asin}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* ၃။ Pagination UI */}
            {totalPages > 1 && (
              <div className="py-4 mt-10 border-t border-muted">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) handlePageChange(currentPage - 1);
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, idx) => {
                      const pageNum = idx + 1;
                      // Page အရေအတွက် အရမ်းများရင် logic ထပ်ထည့်လို့ရပါတယ် (Ellipsis ပြဖို့)
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === pageNum}
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(pageNum);
                            }}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    <PaginationItem>
                      <PaginationNext 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) handlePageChange(currentPage + 1);
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                <p className="mt-4 text-xs text-center text-muted-foreground">
                  Showing {currentItems.length} of {totalItems} Products
                </p>
              </div>
            )}
            
            {!isLoading && !currentItems.length && (
              <div className="py-20 text-center">No products found.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterProduct;