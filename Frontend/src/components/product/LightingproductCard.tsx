
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/types";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
};

const FALLBACK_IMAGE = "https://placehold.co/800x600/EEEEEE/555555?text=No+Image";

const firstFromPythonListString = (value: unknown): string | undefined => {
  if (!value) return undefined;
  if (Array.isArray(value)) return value.length ? String(value[0]).trim() : undefined;
  if (typeof value !== "string") return undefined;

  const raw = value.trim();
  if (!raw || raw.toLowerCase() === "nan" || raw.toLowerCase() === "none") return undefined;

  // "['url1 ', ' url2', ...]"
  if (raw.startsWith("[") && raw.endsWith("]")) {
    const inner = raw.slice(1, -1).trim();
    if (!inner) return undefined;
    const first = inner.split(",")[0]?.trim();
    return first ? first.replace(/^['"]/, "").replace(/['"]$/, "").trim() : undefined;
  }

  return raw;
};

const normalizeImageUrl = (product: Product): string => {
  const rawImage =
    product.image_path ||
    (Array.isArray(product.image) ? product.image[0] : product.image) ||
    (Array.isArray(product.images) ? product.images[0] : firstFromPythonListString(product.images)) ||
    firstFromPythonListString(product.primary_image);

  const normalized = rawImage ? String(rawImage).trim() : "";
  return normalized || FALLBACK_IMAGE;
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
          key={product.id || product._id || product.name}
          variants={cardVariants}
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <Card className="max-w-md mx-auto overflow-hidden bg-white shadow-lg rounded-2xl">
            <motion.div className="relative w-full h-64 overflow-hidden" variants={imageVariants}>
              <img
                src={normalizeImageUrl(product)}
                alt={product.name}
                className="object-fill w-full h-full transition-transform duration-500 transform hover:scale-110"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
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
              <div className="flex items-center space-x-2">
                <motion.span
                  className="text-xl font-bold text-green-600"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  ${product.discount_price}
                </motion.span>
                <span className="text-sm text-gray-500 line-through">${product.price}</span>
              </div>

              <p className="text-sm text-gray-700 line-clamp-3">{product.description}</p>

              <Separator />

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Stock:</span> {product.stock}
                </p>
                <p>
                  <span className="font-medium">Status:</span> {product.status}
                </p>
                <p>
                  <span className="font-medium">Finish:</span> {product.finish}
                </p>
                <p>
                  <span className="font-medium">Wood:</span> {product.wood_type}
                </p>
                <p>
                  <span className="font-medium">Weight:</span> {product.weight} kg
                </p>
                <p>
                  <span className="font-medium">Size:</span>{" "}
                  {product.dimensions?.width}x{product.dimensions?.depth}x{product.dimensions?.height} in
                </p>
              </div>

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
