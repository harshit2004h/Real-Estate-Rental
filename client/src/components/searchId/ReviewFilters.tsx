import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewFiltersProps {
  selectedRating: number | null;
  onRatingFilter: (rating: number | null) => void;
  reviewCounts: { [key: number]: number };
  totalReviews: number;
}

const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  selectedRating,
  onRatingFilter,
  reviewCounts,
  totalReviews,
}) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-3">Filter by Rating</h3>
      <div className="space-y-2">
        <Button
          variant={selectedRating === null ? "default" : "outline"}
          size="sm"
          className="w-full justify-between text-sm"
          onClick={() => onRatingFilter(null)}
        >
          <span>All Reviews</span>
          <span className="text-gray-500">({totalReviews})</span>
        </Button>
        
        {[5, 4, 3, 2, 1].map((rating) => (
          <Button
            key={rating}
            variant={selectedRating === rating ? "default" : "outline"}
            size="sm"
            className="w-full justify-between text-sm"
            onClick={() => onRatingFilter(rating)}
          >
            <div className="flex items-center gap-2">
              {renderStars(rating)}
              <span>{rating} Stars</span>
            </div>
            <span className="text-gray-500">
              ({reviewCounts[rating] || 0})
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ReviewFilters;