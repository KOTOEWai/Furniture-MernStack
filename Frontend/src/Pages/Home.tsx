import { TextRoll } from '@/components/motion-primitives/text-roll';
import { TextShimmer } from '@/components/ui/text-shimmer';
import { Cursor2 } from '@/Layouts/cursorImage';
import { motion } from 'framer-motion';
import bgImage from '../Image/heroImage.jpg'
import { CarouselSpacing } from '@/Layouts/carousal';
import { LayoutGridDemo } from '@/Layouts/layoutGrid';
import { LensDemo } from '@/Layouts/ImageLens';
import CountdownTimer from '@/Layouts/CouterDown';
import PromoCards from '@/Layouts/PromoCard';
import Review from '@/Layouts/ReviewCard';

export default function Home() {

  
  return (
    <>
    <div  style={{backgroundColor: "#e7cfb4"}} >
      
      <div style={{backgroundColor:"#ffc18c"}} className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16 dark:bg-gray-900 sm:flex-row sm:space-y-0 sm:space-x-8">
        <div className="relative z-20 flex flex-col sm:w-2/3 lg:w-2/4">
          <span className="w-20 h-2 mb-12 bg-gray-800 dark:bg-white"></span>
          <TextRoll className="text-6xl font-black leading-none text-gray-800 uppercase font-bebas-neue sm:text-8xl dark:text-white">
            Transform Your Space
          </TextRoll>
          <motion.p
           initial={{ x: 80, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           className="mt-3 text-sm text-gray-700 sm:text-base dark:text-white">
            Discover a curated collection of modern and timeless furniture designed to elevate your living space. From minimalist sofas to handcrafted wooden tables, find pieces that blend quality, comfort, and style to create a home you'll love.
          </motion.p>
          <div className="flex mt-8">
            <a href="#" style={{backgroundColor:"#563232"}} className="px-4 py-2 mr-4 text-white uppercase bg-pink-500 border-2 border-transparent rounded-lg text-md hover:bg-pink-400">
              Buy Now
            </a>
            <a href="#" style={{color:"#563232"}} className="px-4 py-2 uppercase bg-transparent border-2 rounded-lg border-amber-700 dark:text-white hover:bg-amber-700 hover:text-white text-md">
             View Our Full Catalog
            </a>
          </div>
        </div>
        <div className="relative hidden sm:block sm:w-1/3 lg:w-2/5">
        <Cursor2 bgImage={bgImage}/>
         
        </div>
      </div>
      
      <div className='mt-7'>
        <div className='flex items-center justify-center mb-4'>
         <TextShimmer
        duration={1.2}
        className="text-4xl font-medium  [--base-color:#8B4513] [--base-gradient-color:#D2B48C] dark:[--base-color:#A0522D] dark:[--base-gradient-color:#F5DEB3]"
      >
        Crafted with excellent material
      </TextShimmer>
     </div>
     
      </div>
    
      <CarouselSpacing/> 
      <CountdownTimer/>
      <LayoutGridDemo/>
      <LensDemo/>
      <PromoCards/>
      <Review/>
      </div>
    </>
  );
}
