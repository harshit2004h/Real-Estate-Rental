import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useAddReviewToPropertyMutation } from "@/state/api";
import { Property } from "@/types/prismaTypes";

interface RateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
  userCognitoId: string;
}

const RateDialog: React.FC<RateDialogProps> = ({
  isOpen,
  onClose,
  property,
  userCognitoId,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addReviewToProperty] = useAddReviewToPropertyMutation();

  const handleSubmit = async () => {
    if (rating === 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const reviewData: any = {
        propertyId: property.id,
        cognitoId: userCognitoId,
        rating: rating,
      };

      if (comment.trim()) {
        reviewData.comment = comment.trim();
      }

      await addReviewToProperty(reviewData).unwrap();

      // Reset form
      setRating(0);
      setHoverRating(0);
      setComment("");
      onClose();
    } catch (error) {
      console.error("Failed to submit rating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setRating(0);
    setHoverRating(0);
    setComment("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate {property.name}</DialogTitle>
          <DialogDescription>
            Share your experience with this property to help other renters.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Star Rating */}
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm font-medium">Rate this property:</p>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 transition-colors duration-150"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoverRating || rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-xs text-gray-600">
                {rating} out of 5 stars
              </p>
            )}
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Comment (optional):
            </label>
            <Textarea
              id="comment"
              placeholder="Share your thoughts about this property..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Rating"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RateDialog;