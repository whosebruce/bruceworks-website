import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Button } from '../components/Button';

export const ReviewFunnel: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if the URL has ?submitted=true, meaning they just returned from formsubmit
    const params = new URLSearchParams(window.location.search);
    if (params.get('submitted') === 'true') {
      setSubmitted(true);
      // Remove query param without reloading to clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const googleReviewLink = "https://g.page/r/CY1h3jLq5wLvEAE/review";

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleInternalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send 'feedback' to your backend or email service
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center border border-gray-100">
          
          {!rating && !submitted && (
            <div className="animate-fade-in-up">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 mb-4">
                How did we do?
              </h1>
              <p className="text-lg text-gray-600 mb-10">
                Your feedback is incredibly valuable to us. Please rate your experience with Bruce Works.
              </p>
              
              <div className="flex justify-center gap-2 sm:gap-4 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(null)}
                    className="p-1 sm:p-2 transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      size={48}
                      className={`transition-colors duration-200 ${
                        (hoveredRating || 0) >= star
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {rating !== null && rating >= 4 && (
            <div className="animate-fade-in-up text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
                <Star className="fill-green-600 w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">We're thrilled you had a great experience!</h2>
              <p className="text-lg text-gray-600 mb-8">
                As a locally owned business, online reviews mean the world to us. Would you mind taking 30 seconds to share your positive experience on Google?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={googleReviewLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-colors"
                >
                  Yes, leave a Google Review
                </a>
                <Button variant="outline" onClick={() => setRating(null)}>
                  Maybe later
                </Button>
              </div>
            </div>
          )}

          {rating !== null && rating < 4 && !submitted && (
            <div className="animate-fade-in-up text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">We're sorry we didn't meet your expectations.</h2>
              <p className="text-gray-600 mb-6">
                Our goal is 5-star service for every customer. Please let us know exactly what went wrong so Management can make it right.
              </p>
              <form action="https://formsubmit.co/bruceworksllc@gmail.com" method="POST">
                <input type="hidden" name="_subject" value="URGENT: Negative Review Feedback!" />
                <input type="hidden" name="_next" value={window.location.href + "?submitted=true"} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="Given_Rating" value={`${rating} Stars`} />
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Feedback</label>
                  <textarea
                    name="feedback"
                    required
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="Tell us about your experience..."
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name / Email (Optional)</label>
                  <input
                    type="text"
                    name="contact_info"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="So we can follow up with you"
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" variant="primary" className="flex-1">Send to Management</Button>
                  <Button type="button" variant="outline" onClick={() => setRating(null)}>Cancel</Button>
                </div>
              </form>
            </div>
          )}

          {submitted && (
            <div className="animate-fade-in-up text-center py-8">
              <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent</h2>
              <p className="text-gray-600">
                Thank you for your honest feedback. Our management team will review this immediately.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
