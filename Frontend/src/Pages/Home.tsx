
import { TextRoll } from '@/components/motion-primitives/text-roll';
import { TextShimmer } from '@/components/ui/text-shimmer';

import { motion } from 'framer-motion';
import bgImage from '../assets/images/FurnitureHero.webp'
import { CarouselSpacing } from '@/components/shared/carousal';
import { LayoutGridDemo } from '@/components/shared/layoutGrid';
import { LensDemo } from '@/components/shared/ImageLens';
import CountdownTimer from '@/components/shared/CouterDown';
import PromoCards from '@/components/shared/PromoCard';
import Review from '@/components/shared/ReviewCard';

export default function Home() {

  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Hero background"
            className="object-cover w-full h-full opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container relative z-10 px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TextShimmer className='text-sm font-medium'>
              Introducing our new collection
            </TextShimmer>
            <h1 className="mt-4 text-5xl font-extrabold tracking-tight md:text-7xl">
              Elevate Your <br />
              <span className="text-primary">
                <TextRoll>Living Space</TextRoll>
              </span>
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground">
              Discover exquisitely crafted furniture that blends timeless design with modern comfort.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <button className="px-8 py-3 font-semibold text-white transition-all rounded-full bg-primary hover:bg-primary/90">
                Shop Collection
              </button>
              <button className="px-8 py-3 font-semibold transition-all border-2 rounded-full hover:bg-accent">
                View Gallery
              </button>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Carousel Section */}
      <section className="container mx-auto bg-muted/30">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold"style={{ color: "#8B4513" }}>Featured Categories</h2>
          <p className="mt-2 text-muted-foreground">Explore our most popular furniture styles</p>
        </div>
        <CarouselSpacing />
      </section>

      {/* Countdown Timer */}
      <section className="w-full">
        <CountdownTimer />
      </section>
        {/* Promo Cards */}
      <section className="mt-10">
        <PromoCards />
      </section>
      {/* Grid Layout Section */}
      <section className="w-full py-1">
        <div className="container px-4 mx-auto mb-0 text-center">
          <h2 className="pb-2 text-5xl font-bold"style={{ color: "#8B4513" }}>Interior Inspiration</h2>
          <p className="text-muted-foreground">Get inspired by our curated room sets</p>
        </div>
        <LayoutGridDemo />
      </section>

      {/* Lens Demo Section */}
      <section className="py-2 bg-muted/20">
        <div className="container px-4 mx-auto">
          <LensDemo />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-2">
        <Review />
      </section>
    </div>
  );
}
