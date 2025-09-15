import React, { useState, useMemo } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import RateDialog from "@/components/RateDialog";
import ReviewCard from "./ReviewCard";
import ReviewFilters from "./ReviewFilters";
import {
  useGetPropertiesReviewsQuery,
  useGetAuthUserQuery,
  useGetPropertyQuery,
} from "@/state/api";

interface PropertyReviewsProps {
  propertyId: number;
}

const PropertyReviews: React.FC<PropertyReviewsProps> = ({ propertyId }) => {
  const [isRateDialogOpen, setIsRateDialogOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const { data: authUser } = useGetAuthUserQuery();
  const { data: property } = useGetPropertyQuery(propertyId);
  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useGetPropertiesReviewsQuery(propertyId);

  const userCognitoId = authUser?.cognitoInfo?.userId;

  // Filter reviews based on selected rating
  const filteredReviews = useMemo(() => {
    if (selectedRating === null) return reviews;
    return reviews.filter((review) => review.rating === selectedRating);
  }, [reviews, selectedRating]);

  // Get top 5 reviews for initial display
  const displayedReviews = showAllReviews
    ? filteredReviews
    : filteredReviews.slice(0, 5);

  // Calculate review counts by rating
  const reviewCounts = useMemo(() => {
    const counts: { [key: number]: number } = {};
    reviews.forEach((review) => {
      const rating = review.rating || 0;
      counts[rating] = (counts[rating] || 0) + 1;
    });
    return counts;
  }, [reviews]);

  // Calculate average rating
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return total / reviews.length;
  }, [reviews]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-red-500">Failed to load reviews</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Reviews Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Reviews & Ratings
        </h2>
        
        {/* Overall Rating Summary */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {averageRating.toFixed(1)}
                </div>
                {renderStars(Math.round(averageRating))}
                <p className="text-sm text-gray-600 mt-2">
                  Based on {reviews.length} reviews
                </p>
              </div>
            </div>
            
            {/* Rate Property Button */}
            {userCognitoId && property && (
              <Button
                onClick={() => setIsRateDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              >
                <Star className="w-4 h-4 mr-2" />
                Rate Property
              </Button>
            )}
          </div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Reviews Yet
          </h3>
          <p className="text-gray-500">
            Be the first to share your experience with this property!
          </p>
          {userCognitoId && property && (
            <Button
              onClick={() => setIsRateDialogOpen(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Star className="w-4 h-4 mr-2" />
              Write First Review
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ReviewFilters
              selectedRating={selectedRating}
              onRatingFilter={setSelectedRating}
              reviewCounts={reviewCounts}
              totalReviews={reviews.length}
            />
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedRating
                  ? `${selectedRating} Star Reviews (${filteredReviews.length})`
                  : `All Reviews (${reviews.length})`}
              </h3>
            </div>

            <div className="space-y-4">
              {displayedReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {/* Show More/Less Button */}
            {filteredReviews.length > 5 && (
              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="px-6 py-2"
                >
                  {showAllReviews ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-2" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Show All {filteredReviews.length} Reviews
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rate Dialog */}
      {userCognitoId && property && (
        <RateDialog
          isOpen={isRateDialogOpen}
          onClose={() => setIsRateDialogOpen(false)}
          property={property}
          userCognitoId={userCognitoId}
        />
      )}
    </div>
  );
};

export default PropertyReviews;