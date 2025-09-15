import React from "react";
import { Star, User } from "lucide-react";
import { Review } from "@/types/prismaTypes";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
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
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">
              {review.tenant?.firstName} {review.tenant?.lastName}
            </h4>
            <p className="text-sm text-gray-500">
              {formatDate(review.reviewDate)}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          {renderStars(review.rating || 0)}
          <span className="text-sm text-gray-600 mt-1">
            {review.rating}/5
          </span>
        </div>
      </div>
      
      {review.comment && (
        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
      )}
    </div>
  );
};

export default ReviewCard;