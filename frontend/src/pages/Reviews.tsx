import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Star } from 'lucide-react';
import { format } from 'date-fns';

const Reviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await api.get('/reviews/my-reviews');
      setReviews(response.data.reviews || []);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Performance Reviews</h1>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{review.period}</h3>
                <p className="text-sm text-gray-500">
                  Reviewed by {review.reviewer?.firstName} {review.reviewer?.lastName}
                </p>
              </div>
              {review.rating && (
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">{review.rating}/5</span>
                </div>
              )}
            </div>
            {review.feedback && (
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium text-gray-700">Feedback</h4>
                <p className="text-gray-600">{review.feedback}</p>
              </div>
            )}
            {review.goals && (
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium text-gray-700">Goals</h4>
                <p className="text-gray-600">{review.goals}</p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                  review.status === 'APPROVED'
                    ? 'bg-green-100 text-green-800'
                    : review.status === 'SUBMITTED'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {review.status}
              </span>
              <span className="text-xs text-gray-500">
                {format(new Date(review.createdAt), 'MMM dd, yyyy')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="rounded-lg bg-white p-12 text-center shadow">
          <Star className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-600">No performance reviews yet</p>
        </div>
      )}
    </div>
  );
};

export default Reviews;

