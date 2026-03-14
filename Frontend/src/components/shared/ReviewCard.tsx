import { sampleReviews } from "@/constants/constant"
import { CustomerReviewCard } from "./SupportReview"



export default function Review() {
  return (
    <main className="p-4 py-8 sm:p-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl text-foreground" style={{ color: "#8B4513" }}>Customer Reviews</h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted" style={{ color: "#5C4033" }}>
            See what our customers are saying about their furniture purchases
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {sampleReviews.map((review, index) => (
            <CustomerReviewCard
              key={index}
              name={review.name}
              avatar={review.avatar}
              rating={review.rating}
              review={review.review}
              product={review.product}
              date={review.date}
              verified={review.verified}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
