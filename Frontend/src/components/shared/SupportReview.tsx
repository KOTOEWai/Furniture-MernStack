"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { CustomerReviewCardProps } from "@/types"



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
      <Card className="transition-shadow duration-300 border-none shadow-lg bg-card hover:shadow-xl">
        <CardContent className="p-5 rounded-lg cursor-pointer sm:p-6" style={{ backgroundColor: "#FFF8F0", border: "1px solid #D2B48C" }} >
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
                <h3 className="text-sm font-bold text-card-foreground" style={{ color: "#5C4033" }}>{name}</h3>
                {verified && (
                  <Badge className="mt-1 text-[10px] sm:text-xs" style={{ backgroundColor: "#8B4513" }}>
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
            <Quote className="w-5 h-5 mb-2 opacity-60 sm:w-6 sm:h-6" style={{ color: "#8B4513" }} />
            <p className="text-sm italic leading-relaxed sm:text-base" style={{ color: "#2D1B10" }}>"{review}"</p>
          </motion.div>

          {/* Product and date info */}
          <motion.div
            className="flex items-center justify-between pt-3 text-[10px] sm:text-xs border-t text-muted-foreground border-[#D2B48C]/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {product && <span className="font-semibold" style={{ color: "#5C4033" }}>{product}</span>}
            {date && <span style={{ color: "#8B4513/80" }}>{date}</span>}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
