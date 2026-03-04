/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  //Star, 
  Truck,
  Shield,
  Check,
  ExternalLink,
  Loader2
} from 'lucide-react';
import type{ Product1 } from "@/Interface/Type";

interface ProductCardProps {
  product: Product1;
}

const cardVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const {
    brand_clean,
    title_clean,
    price_clean,
    primary_image,
    images,
    color_clean,
    material_clean,
    style_clean,
    specifications_dict,
    product_type,
    country_of_origin,
  } = product;
  
  // Safely extract rating and review count
 // const customerReviews = specifications_dict?.['Customer Reviews'] || '';
 // const ratingMatch = customerReviews.match(/(\d+\.\d+|\d+)\s+out of 5 stars/);
 // const ratingText = ratingMatch?.[1] || '0';
 // const rating = parseFloat(ratingText);
 // const reviewCount = customerReviews.match(/\d+(?=\s*rating)/)?.[0] || '0';
 // const isReviewed = rating > 0 && reviewCount !== '0';

 
  // Safely get available images
// Normalize images: handle array, stringified array, or comma-separated string
let normalizedImages: string[] = [];

if (Array.isArray(images)) {
  normalizedImages = images;
} 

const availableImages =
  normalizedImages.length > 0
    ? normalizedImages
    : primary_image
    ? [primary_image]
    : ["https://placehold.co/400x400/CCCCCC/333333?text=No+Image"];

const thumbImages = availableImages.slice(0, 4);



  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: title_clean,
          text: `Check out this ${product_type}: ${title_clean}`,
          url: product.url,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(product.url);
        alert('Product URL copied to clipboard!'); // Use alert minimally, a Toast is better
      }
    } catch (err) {
      console.error('Error sharing:', err);
    } finally {
      setIsSharing(false);
    }
  };
  
 
  const formatNumber = (value: any) => {
  const num = Number(value);
  return isNaN(num) ? null : num.toFixed(1);
};

const formattedDimensions = [
  formatNumber(product.depth_in) ? `${formatNumber(product.depth_in)}"D` : null,
  formatNumber(product.width_in) ? `${formatNumber(product.width_in)}"W` : null,
  formatNumber(product.height_in) ? `${formatNumber(product.height_in)}"H` : null,
].filter(Boolean).join(' × ');

const formatPrice = (value: any) => {
   if(value == ''){
     return 8.90
   }
  const num = Number(value);
  return isNaN(num) ? null : num.toFixed(2);
};

  // Clean color name for CSS background property
  const getBackgroundColor = (color: string) => {
      const lowerColor = color.toLowerCase();
      if (lowerColor === 'white') return '#fff';
      if (lowerColor === 'black') return '#000';
      if (lowerColor.match(/red|crimson/)) return 'red';
      if (lowerColor.match(/blue|navy/)) return 'blue';
      if (lowerColor.match(/green|olive/)) return 'green';
      if (lowerColor.match(/yellow|gold/)) return 'gold';
      if (lowerColor.match(/brown|wood/)) return '#964B00';
      return lowerColor; // Use raw string as fallback
  };

  return (
    <motion.div
      
     initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.15 }}
      
    >
      <motion.div 
      variants={cardVariants}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 120 }}>
    
      <Card
      
      className="w-full max-w-sm overflow-hidden transition-all duration-300 border-2 hover:border-primary/20 hover:shadow-xl">
        {/* Image Gallery */}
        <div className="relative">
          <div className="overflow-hidden aspect-square bg-muted">
            <motion.img
              key={currentImageIndex}
              src={availableImages[currentImageIndex] || 'https://placehold.co/400x400/CCCCCC/333333?text=Image+N%2FA'}
              alt={title_clean || "Product Image"}
              className="object-cover w-full h-full cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => window.open(primary_image, '_blank')}
              onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/CCCCCC/333333?text=Image+Error';
              }}
            />
          </div>

          {/* Image Thumbnails */}
          {thumbImages.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 flex gap-1 p-2 bg-background/80 backdrop-blur-sm">
              {thumbImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageClick(index)}
                  className={`flex-1 aspect-square border-2 rounded-md overflow-hidden transition-colors ${
                    currentImageIndex === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${title_clean} view ${index + 1}`}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/40x40/DDDDDD/666666?text=X';
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Badges */}
          <div className="absolute flex flex-col gap-1 top-2 left-2">
            <Badge variant="default" className="bg-primary text-primary-foreground">
              {product_type || 'Unknown'}
            </Badge>
            {specifications_dict?.['Special Feature'] && (
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                {specifications_dict['Special Feature']}
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute flex flex-col gap-2 top-2 right-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleLike}
              className={`w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm transition-colors ${
                isLiked ? 'text-red-500 hover:text-red-600' : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500' : ''}`} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleShare}
              disabled={isSharing}
              className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm text-foreground/70 hover:text-foreground"
            >
              {isSharing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <CardHeader className="p-4 pb-2">
          {/* Brand & Origin */}
          <div className="flex items-center justify-between mb-1">
            <Badge variant="outline" className="text-xs">
              {brand_clean || 'Unbranded'}
            </Badge>
            {country_of_origin && (
              <span className="text-xs text-muted-foreground">
                Made in {country_of_origin}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold leading-tight line-clamp-2 min-h-[90px]">
            {title_clean || 'Product Title N/A'}
          </h3>

          {/* Rating
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3 w-3 transition-colors ${
                    star <= Math.floor(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
              <span className="ml-1 text-xs font-medium text-foreground/80">
                {isReviewed ? rating.toFixed(1) : '—'}
              </span>
            </div>
            {isReviewed && (
              <span className="text-xs text-muted-foreground">
                ({reviewCount} reviews)
              </span>
            )}
          </div>
          */}
        </CardHeader>

        <CardContent className="p-4 pt-0">
          {/* Key Specifications (Material, Color, Style) */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            {color_clean && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <div
                  className="w-3 h-3 transition-shadow border rounded-full"
                  style={{
                    backgroundColor: getBackgroundColor(color_clean),
                    borderColor: color_clean.toLowerCase() === 'white' ? '#ccc' : 'currentColor'
                  }}
                />
                <span className="truncate">{color_clean}</span>
              </div>
            )}
            {material_clean && (
              <div className="truncate text-muted-foreground">
                Material: {material_clean}
              </div>
            )}
            {style_clean && (
              <div className="col-span-2 truncate text-muted-foreground">
                Style: {style_clean}
              </div>
            )}
          </div>

          {/* Dimensions */}
          {formattedDimensions.length > 0 && (
            <div className="flex items-center gap-2 mb-3 font-mono text-xs text-muted-foreground">
              {formattedDimensions}
            </div>
          )}

          {/* Key Features (Load Capacity, Assembly) */}
          <div className="space-y-1 text-xs">
            {specifications_dict?.['Load Capacity'] && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Shield className="w-3 h-3 text-blue-500" />
                <span>Load: {specifications_dict['Load Capacity']}</span>
              </div>
            )}
            {specifications_dict?.['Assembly Required']?.toLowerCase() === 'yes' && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Check className="w-3 h-3 text-green-500" />
                <span>Assembly Required</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex items-end justify-between w-full">
            {/* Price */}
            <div className="flex flex-col">
             <span className="text-2xl font-extrabold text-primary">
  {formatPrice(price_clean) ? `$${formatPrice(price_clean)}` : 'N/A'}
</span>

              {specifications_dict?.['Shipping'] && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Truck className="w-3 h-3" />
                  {specifications_dict['Shipping']}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(product.url, '_blank')}
                className="flex items-center gap-1 transition-transform hover:scale-[1.02]"
              >
                <ExternalLink className="w-3 h-3" />
                View
              </Button>
              <Button
                size="sm"
                className="flex items-center gap-1 bg-primary hover:bg-primary/90 transition-transform hover:scale-[1.02]"
              >
                <ShoppingCart className="w-3 h-3" />
                Add to Cart
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
      </motion.div>
      
    </motion.div>
  );
};