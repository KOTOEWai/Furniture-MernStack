"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { CustomerReviewCardProps } from "@/Interface/Type"



export function CustomerReviewCard({
  name,
  avatar,
  rating,
  review,
  product,
  date,
  verified = false,
}: CustomerReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-red-600 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
      />
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="w-full max-w-md "
      
    >
      <Card className="transition-shadow duration-300 shadow-lg bg-card border-border hover:shadow-xl">
        <CardContent className="p-6 rounded-lg cursor-pointer" style={{backgroundColor:"#ffc18c"}} >
          {/* Header with customer info and rating */}
          <motion.div
            className="flex items-start justify-between mb-4 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-border">
                <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
                <AvatarFallback className="font-semibold bg-accent text-accent-foreground">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-semibold text-card-foreground">{name}</h3>
                {verified && (
                  <Badge  className="mt-1 text-xs" style={{backgroundColor:"#563232"}}>
                    Verified Purchase
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">{renderStars(rating)}</div>
          </motion.div>

          {/* Quote icon and review text */}
          <motion.div
            className="relative mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Quote className="w-6 h-6 mb-2 text-accent opacity-60" style={{color:"#563232"}} />
            <p className="text-sm italic leading-relaxed text-muted" style={{color:"black"}}>"{review}"</p>
          </motion.div>

          {/* Product and date info */}
          <motion.div
            className="flex items-center justify-between pt-3 text-xs border-t text-muted-foreground border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {product && <span className="font-medium text-black">{product}</span>}
            {date && <span>{date}</span>}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
