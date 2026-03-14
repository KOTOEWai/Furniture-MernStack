import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { promos } from "@/constants/constant";

export default function PromoCards() {
 
  return (
    <div className="flex items-center justify-center">
    <motion.div
    initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    
    className="grid max-w-4xl grid-cols-1 gap-3 mx-3 mb-10 md:grid-cols-2">
      {promos.map((item, idx) => (
        <motion.div  initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            key={idx} >
        <Card
          style={{backgroundColor:"#ffc18c"}}
          className={`flex flex-col justify-between overflow-hidden rounded-2xl shadow-lg sm:flex-row  ${item.text}`}
        >
          {/* Left content */}
          <CardContent className="flex flex-col justify-center p-6 space-y-3">
            <p className="text-sm font-medium">{item.discount}</p>
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="text-sm">{item.desc}</p>
            <Button style={{backgroundColor:"#563232"}} className="text-white rounded-full w-fit hover:bg-green-800">
              Shop Now →
            </Button>
          </CardContent>

          {/* Right image */}
          <div className="flex items-center justify-center p-4 sm:p-6">
            <img
              src={item.img}
              alt={item.title}
              className="object-contain w-40 h-40 sm:w-48 sm:h-48"
            />
          </div>
        </Card>
        </motion.div>
      ))}
    </motion.div>
    </div>
  );
}
