
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/Interface/Type";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
};

export default function LightingProductCard({ products }: { products: Product[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.15 }}
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={cardVariants}
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <Card className="max-w-md mx-auto overflow-hidden bg-white shadow-lg rounded-2xl">
            {/* Product Image */}
            <motion.div
              className="relative w-full h-64 overflow-hidden"
              variants={imageVariants}
            >
              <img
                src={product.image_path}
                alt={product.name}
                className="object-fill w-full h-full transition-transform duration-500 transform hover:scale-110"
              />
            </motion.div>

            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="font-semibold">{product.name}</span>
                <Badge variant={product.featured ? "default" : "secondary"}>
                  {product.featured ? "Featured" : "Standard"}
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{product.sku}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Price */}
              <div className="flex items-center space-x-2">
                <motion.span
                  className="text-xl font-bold text-green-600"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  ${product.discount_price}
                </motion.span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 line-clamp-3">
                {product.description}
              </p>

              <Separator />

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <p><span className="font-medium">Stock:</span> {product.stock}</p>
                <p><span className="font-medium">Status:</span> {product.status}</p>
                <p><span className="font-medium">Finish:</span> {product.finish}</p>
                <p><span className="font-medium">Wood:</span> {product.wood_type}</p>
                <p><span className="font-medium">Weight:</span> {product.weight} kg</p>
                <p>
                  <span className="font-medium">Size:</span>{" "}
                  {product.dimensions?.width}x{product.dimensions?.depth}x{product.dimensions?.height} in
                </p>
              </div>

              {/* Action Button */}
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button className="w-full mt-4">Add to Cart</Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
