export type Time = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export interface CustomerReviewCardProps {
  name: string
  avatar?: string
  rating: number
  review: string
  product?: string
  date?: string
  verified?: boolean
}

export interface ProductApiResponse {
    success: boolean;
    count: number;
    data: Product[];
}

export interface User {
    username: string;
    email: string;
    role: string;
}



// types/product.ts
export interface ProductSpecifications {
  [key: string]: string;
}

export interface Product1 {
  asin: string;
  brand_clean: string;
  brand:string;
  categories_clean: string[];
  color_clean: string;
  country_of_origin: string;
  date_first_available_clean: string;
  depth_in: number;
  height_in: number;
  images: string[];
  item_model_number: string;
  manufacturer: string;
  material_clean: string;
  price_clean: number;
  primary_category: string;
  primary_image: string;
  product_type: string;
  scraped_at_clean: string;
  specifications_dict: ProductSpecifications;
  style_clean: string;
  title: string;
  title_clean: string;
  uniq_id: string;
  url: string;
  width_in: number;
}

export interface ProductCardProps {
  product: Product1;
  className?: string;
}



export interface Dimensions {
  depth: number
  width: number
  height: number
}

export interface Product {
  id: string
  name: string
  category: string
  description: string
  price: number
  discount_price: number
  featured: boolean
  finish: string
  wood_type: string
  weight: number
  dimensions: Dimensions
  image_path: string
  sku: string
  status: "active" | "inactive" | string
  stock: number
  tags: string[] | null
  created_at: string
  updated_at: string
  
}

export type Products = Product[];


export interface ProductApiResponse {
    success: boolean;
    count: number;
    data: Product[];
}