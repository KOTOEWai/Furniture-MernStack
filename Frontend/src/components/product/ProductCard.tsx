/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  ShoppingCart,
  Heart,
  Share2,
 
  ExternalLink,
  Info,
} from 'lucide-react';
import type { Product1 } from '@/types';

interface ProductCardProps {
  product: Product1;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const PLACEHOLDER_IMAGE = 'https://placehold.co/400x400?text=No+Image';

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const {
    brand_clean,
    title_clean,
    price_clean,
    primary_image,
    images,
    color_clean,
    material_clean,
    product_type,
    specifications_dict,
  } = product;

  const getAvailableImages = () => {
    const fallback = primary_image ? [String(primary_image).trim()] : [PLACEHOLDER_IMAGE];

    try {
      if (Array.isArray(images)) {
        const list = images.map((u) => String(u).trim()).filter(Boolean);
        return list.length ? list : fallback;
      }

      if (typeof images === 'string') {
        const raw = images.trim();
        if (!raw || raw.toLowerCase() === 'nan' || raw.toLowerCase() === 'none') return fallback;

        // Common backend format: "['url1 ', ' url2', ...]"
        if (raw.startsWith('[') && raw.endsWith(']')) {
          const list = raw
            .slice(1, -1)
            .split(',')
            .map((p) => p.trim())
            .map((p) => p.replace(/^['"]/, '').replace(/['"]$/, '').trim())
            .filter(Boolean);
          return list.length ? list : fallback;
        }

        // Fallback: attempt JSON array
        const cleaned = raw.replace(/'/g, '"');
        const parsed = JSON.parse(cleaned);
        const list = Array.isArray(parsed) ? parsed.map((u) => String(u).trim()).filter(Boolean) : [];
         console.log(list.length ? list : fallback);
        return list.length ? list : fallback;
      }
    } catch (e) {
      console.error('Image parsing error', e);
    }

    return fallback;
  };

  const availableImages = getAvailableImages();
  const thumbImages = availableImages.slice(0, 4);

  const formatPrice = (value: any) => {
    const num = Number(value);
    return isNaN(num) || num === 0 ? '14.95' : num.toFixed(2);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(product.url);
    } catch {
      // no-op (clipboard not available)
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="relative flex flex-col h-full overflow-hidden transition-all duration-300 border shadow-sm hover:shadow-2xl group border-border/50">
        {/* --- Image Section --- */}
        <div className="relative overflow-hidden aspect-square bg-secondary/30">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={availableImages[currentImageIndex] || PLACEHOLDER_IMAGE}
              alt={title_clean}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMAGE;
              }}
            />
          </AnimatePresence>

          {/* Badges Overlay */}
          <div className="absolute flex flex-wrap gap-1 top-3 left-3">
            <Badge className="font-bold shadow-sm bg-primary/90">{product_type || 'General'}</Badge>
            {specifications_dict?.['Special Feature'] && (
              <Badge
                variant="secondary"
                className="hidden border-none shadow-sm sm:flex bg-background/80 backdrop-blur-md"
              >
                {specifications_dict['Special Feature']}
              </Badge>
            )}
          </div>

          {/* Action Overlay */}
          <div className="absolute flex flex-col gap-2 transition-all duration-300 translate-x-12 opacity-0 top-3 right-3 group-hover:translate-x-0 group-hover:opacity-100">
            <Button
              size="icon"
              variant="secondary"
              className={`rounded-full shadow-lg ${isLiked ? 'text-red-500' : ''}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Thumbnails Overlay (Bottom) */}
          {thumbImages.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1.5 p-3 bg-gradient-to-t from-black/40 to-transparent">
              {thumbImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-10 h-10 rounded-md overflow-hidden border-2 transition-all ${
                    currentImageIndex === idx
                      ? 'border-primary scale-110 shadow-md'
                      : 'border-white/50 opacity-70'
                  }`}
                >
                  <img
                    src={img || PLACEHOLDER_IMAGE}
                    className="object-cover w-full h-full"
                    alt="thumb"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- Content Section --- */}
        <CardHeader className="p-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
              {brand_clean || 'Essential'}
            </span>
            
          </div>
          <h3 className="text-sm font-semibold leading-snug transition-colors line-clamp-2 group-hover:text-primary">
            {title_clean}
          </h3>
        </CardHeader>

        <CardContent className="flex-grow p-4 pt-0 space-y-4">
          <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-secondary/20">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-muted-foreground">Color:</span>
              <span className="font-medium truncate">{color_clean || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Info className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">Material:</span>
              <span className="font-medium truncate">{material_clean || 'Plastic'}</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-primary">
              ${formatPrice(price_clean)}
            </span>
            <span className="text-xs line-through text-muted-foreground opacity-70">$19.99</span>
          </div>
        </CardContent>

        <Separator className="opacity-50" />

        <CardFooter className="p-4">
          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full font-semibold transition-all hover:bg-secondary"
              onClick={() => window.open(product.url, '_blank')}
            >
              <ExternalLink className="w-3.5 h-3.5 mr-2" />
              Details
            </Button>
            <Button size="sm" className="w-full font-semibold shadow-md bg-primary hover:shadow-primary/20">
              <ShoppingCart className="w-3.5 h-3.5 mr-2" />
              Add Cart
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
