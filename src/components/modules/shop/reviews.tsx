"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/user.context";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: { id: string; name: string; image?: string };
}

export default function Reviews({ medicineId }: { medicineId: string }) {
  const { user } = useUser();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [canReview, setCanReview] = useState(false); // if current user can give review
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all reviews for this medicine
  const fetchReviews = async () => {
    const res = await fetch(`/api/reviews?medicineId=${medicineId}`);
    const data = await res.json();
    if (data.success) setReviews(data.data);
  };

  // Check if logged-in user can review
  const checkPermission = async () => {
    if (!user) return;
    const res = await fetch(
      `/api/orders/can-review?medicineId=${medicineId}&userId=${user.id}`,
    );
    const data = await res.json();
    if (data.canReview) {
      // User can leave a review
      setCanReview(true);
      setAlreadyReviewed(false);
    } else {
      // User already left a review
      // Check if user already left a review
      const reviewRes = await fetch(`/api/reviews?medicineId=${medicineId}`);
      const reviewData = await reviewRes.json();
      const userReview = reviewData.data.find(
        (r: Review) => r.user.id === user.id,
      );
      setAlreadyReviewed(!!userReview);
      setCanReview(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    checkPermission();
  }, [user, medicineId]);

  const handleSubmit = async () => {
    if (!comment) return toast.error("Comment cannot be empty");
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id, medicineId, rating, comment }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Review submitted!");
        setComment("");
        setRating(5);
        fetchReviews(); // refresh reviews
        setCanReview(false);
        setAlreadyReviewed(true);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>

      {reviews.length === 0 && (
        <p className="text-muted-foreground">No reviews yet.</p>
      )}

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
              <div className="flex justify-between items-center">
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

      {user && (
        <div className="mt-6 border-t pt-4 flex flex-col gap-2">
          {canReview && (
            <>
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
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit Review"}
              </Button>
            </>
          )}

          {alreadyReviewed && (
            <p className="text-sm text-muted-foreground">
              You have already reviewed this medicine.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
