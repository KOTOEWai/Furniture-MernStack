import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lens } from "@/components/magicui/lens";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { latestProducts, bestSellers, featuredProducts, allProducts } from "@/constants/constant";

// Example Data (you can split them however you like)


export function LensDemo() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Decide which data to show
  const getData = () => {
    switch (selectedCategory) {
      case "latest":
        return latestProducts;
      case "best":
        return bestSellers;
      case "featured":
        return featuredProducts;
      default:
        return allProducts;
    }
  };

  return (
    <div>
      <h2
        style={{ color: "#8B4513" }}
        className="text-3xl font-medium tracking-tight text-center sm:text-4xl md:text-5xl scroll-m-20 first:mt-0"
      >
        Our Products Collections
      </h2>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 px-4 mt-6 sm:flex-row lg:gap-5">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 text-sm sm:text-base rounded-2xl transition-all duration-300 lg:px-7 ${selectedCategory === "all" ? "bg-[#8B4513] text-white shadow-lg scale-105" : "bg-[#D2B48C] text-[#5C4033] hover:bg-[#C2A278]"
            }`}
        >
          All Products
        </button>
        <button
          onClick={() => setSelectedCategory("latest")}
          className={`px-4 py-2 text-sm sm:text-base rounded-2xl transition-all duration-300 lg:px-7 ${selectedCategory === "latest" ? "bg-[#8B4513] text-white shadow-lg scale-105" : "bg-[#D2B48C] text-[#5C4033] hover:bg-[#C2A278]"
            }`}
        >
          Latest Products
        </button>
        <button
          onClick={() => setSelectedCategory("best")}
          className={`px-4 py-2 text-sm sm:text-base rounded-2xl transition-all duration-300 lg:px-7 ${selectedCategory === "best" ? "bg-[#8B4513] text-white shadow-lg scale-105" : "bg-[#D2B48C] text-[#5C4033] hover:bg-[#C2A278]"
            }`}
        >
          Best Sellers
        </button>
        <button
          onClick={() => setSelectedCategory("featured")}
          className={`px-4 py-2 text-sm sm:text-base rounded-2xl transition-all duration-300 lg:px-7 ${selectedCategory === "featured" ? "bg-[#8B4513] text-white shadow-lg scale-105" : "bg-[#D2B48C] text-[#5C4033] hover:bg-[#C2A278]"
            }`}
        >
          Featured Products
        </button>
      </div>

      {/* Carousel */}
      <div className="flex justify-center p-8">
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
          className="w-full mx-auto max-w-7xl"
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.play()}
        >
          <CarouselContent className="p-4">
            {getData().map((item, index) => (
              <CarouselItem
                key={index}
                className="cursor-pointer basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
              >
                <Card className="w-full transition-transform hover:scale-[1.01]" style={{ backgroundColor: "#FFF8F0", border: "1px solid #D2B48C" }}>
                  <CardHeader>
                    <Lens zoomFactor={2} lensSize={150} isStatic={false} ariaLabel="Zoom Area">
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        width={500}
                        height={300}
                        className="object-cover w-full rounded-lg h-72"
                      />
                    </Lens>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                    <CardDescription className="text-black">{item.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="space-x-4">
                    <Button style={{ backgroundColor: "#8B4513" }}>View Details</Button>
                    <Button variant="secondary">Add to Cart</Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
