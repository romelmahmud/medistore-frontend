"use client";

import { createReview, getMedicineReviews } from "@/actions/review.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: { id: string; name: string; image?: string };
}

export default function Reviews({
  medicineId,
  userId,
}: {
  medicineId: string;
  userId?: string; // optional for guest
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [canReview, setCanReview] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadReviews = async () => {
    setLoadingPage(true);
    try {
      const res = await getMedicineReviews(medicineId);

      setReviews(res.data.reviews ?? []);

      if (userId && res.data.userMeta) {
        setCanReview(res.data.userMeta.canReview ?? false);
        setAlreadyReviewed(res.data.userMeta.alreadyReviewed ?? false);
      }
    } catch (err) {
      toast.error("Failed to load reviews");
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [medicineId, userId]);

  const handleSubmit = async () => {
    if (!comment) return toast.error("Comment cannot be empty");

    setSubmitting(true);

    const res = await createReview({ medicineId, rating, comment });

    if (res.success) {
      toast.success("Review submitted!");
      setComment("");
      setRating(5);
      await loadReviews();
    } else {
      toast.error(res.message);
    }

    setSubmitting(false);
  };

  if (loadingPage) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-muted-foreground">No reviews yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((r) => (
            <div key={r.id} className="flex gap-3 border rounded-md p-3">
              <Avatar>
                {r.user.image ? (
                  <AvatarImage src={r.user.image} alt={r.user.name} />
                ) : (
                  <AvatarFallback>{r.user.name[0]}</AvatarFallback>
                )}
              </Avatar>

              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-semibold">{r.user.name}</p>
                  <span className="text-sm text-muted-foreground">
                    {r.rating} ⭐
                  </span>
                </div>
                <p className="mt-1">{r.comment}</p>
                <span className="text-xs text-muted-foreground">
                  {new Date(r.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {userId && canReview && (
        <div className="mt-6 border-t pt-4 flex flex-col gap-2">
          <h3 className="font-semibold">Leave a Review</h3>

          <select
            className="border rounded px-2 py-1 w-28"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} ⭐
              </option>
            ))}
          </select>

          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
          />

          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              "Submit Review"
            )}
          </Button>
        </div>
      )}

      {!userId && (
        <p className="mt-4 text-sm text-muted-foreground">
          Login to leave a review.
        </p>
      )}

      {userId && alreadyReviewed && (
        <p className="mt-4 text-sm text-muted-foreground">
          You have already reviewed this medicine.
        </p>
      )}
    </div>
  );
}
