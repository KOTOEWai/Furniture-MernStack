import { useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,


} from "@/components/ui/carousel"
import f3 from "@/assets/images/f3.jpg"
import f2 from "@/assets/images/f2.jpg"
import f4 from "@/assets/images/f4.jpg"
import f5 from "@/assets/images/f5.jpg"
import f6 from "@/assets/images/f6.jpg"
import f7 from "@/assets/images/f7.jpg"
import f8 from "@/assets/images/f8.jpg"
import { AnimatedGroup } from "@/components/ui/animated-group"

const Image = [
  { src: f2, alt: "furniture" },
  { src: f3, alt: "furniture" },
  { src: f5, alt: "furniture" },
  { src: f4, alt: "furniture" },
  { src: f5, alt: "furniture" },
  { src: f4, alt: "furniture" },
  { src: f6, alt: "furniture" },
  { src: f7, alt: "furniture" },
  { src: f8, alt: "furniture" },
]

export function CarouselSpacing() {
  const plugin = useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true })
  );

  return (
    <div >
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-6xl mx-auto "
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
      >
        <CarouselContent className="-ml-1">

          {Image.map((img, index) => (
            <CarouselItem
              key={index}
              className="pl-1 basis-1/4 sm:basis-1/4 md:basis-1/3 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center p-2 sm:p-4 md:p-6 aspect-square">
                    <AnimatedGroup preset='scale'>

                      <img
                        src={img.src}
                        alt={img.alt}
                        className="object-contain w-full h-auto rounded-lg max-h-60"
                      />

                    </AnimatedGroup>
                  </CardContent>
                </Card>
              </div >
            </CarouselItem>
          ))}
        </CarouselContent>

      </Carousel>
    </div>
  )
}