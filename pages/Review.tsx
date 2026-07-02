import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Button } from '../components/Button';

const googleReviewLink = "https://g.page/r/CY1h3jLq5wLvEAE/review";

export const ReviewFunnel: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // With HashRouter the query string can land either before the hash
    // (https://site/?submitted=true#/review) or inside it (#/review?submitted=true).
    const hashQuery = window.location.hash.split('?')[1] ?? '';
    const params = new URLSearchParams(window.location.search || hashQuery);
    if (params.get('submitted') === 'true') {
      setSubmitted(true);
      window.history.replaceState({}, document.title, `${window.location.pathname}#/review`);
    }
  }, []);

  // formsubmit redirects to a plain URL; put the query before the hash so it survives.
  const returnUrl = `${window.location.origin}${window.location.pathname}?submitted=true#/review`;

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-gray-50 -mt-[88px] lg:-mt-[116px] pt-[150px] pb-24">
      {/* Decorative Blue Header Background */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-secondary z-0"></div>

      <div className="container mx-auto px-6 max-w-2xl relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 text-center border border-gray-100">

          {!submitted && (
            <div className="animate-fade-in-up">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 mb-4">
                How did we do?
              </h1>
              <p className="text-lg text-gray-600 mb-10">
                Your feedback is incredibly valuable to us. Please rate your experience with Bruce Works.
              </p>

              <div className="flex justify-center gap-2 sm:gap-4 mb-2" role="radiogroup" aria-label="Rate your experience from 1 to 5 stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(null)}
                    role="radio"
                    aria-checked={rating === star}
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                    className="p-1 sm:p-2 transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      size={48}
                      className={`transition-colors duration-200 ${
                        (hoveredRating ?? rating ?? 0) >= star
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {rating !== null && !submitted && (
            <div className="animate-fade-in-up mt-10 text-left border-t border-gray-100 pt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                {rating >= 4
                  ? "We're thrilled you had a great experience!"
                  : "Thank you for your honesty — we want to make it right."}
              </h2>
              <p className="text-gray-600 mb-8 text-center">
                As a locally owned business, reviews and honest feedback mean the world to us. You can share your
                experience publicly on Google, send feedback directly to Bruce, or both.
              </p>

              <a
                href={googleReviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-colors mb-8"
              >
                Leave a Google Review
              </a>

              <div className="relative mb-8 text-center">
                <span className="relative z-10 bg-white px-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                  or send feedback directly
                </span>
                <div className="absolute left-0 right-0 top-1/2 border-t border-gray-200" aria-hidden="true"></div>
              </div>

              <form action="https://formsubmit.co/info@bruceworks.net" method="POST">
                <input type="hidden" name="_subject" value="Customer review feedback from bruceworks.net" />
                <input type="hidden" name="_next" value={returnUrl} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="Given_Rating" value={`${rating} Stars`} />
                <div className="mb-4">
                  <label htmlFor="review-feedback" className="block text-sm font-medium text-gray-700 mb-2">Your Feedback</label>
                  <textarea
                    id="review-feedback"
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
                  <label htmlFor="review-contact" className="block text-sm font-medium text-gray-700 mb-2">Name / Email (Optional)</label>
                  <input
                    id="review-contact"
                    type="text"
                    name="contact_info"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="So we can follow up with you"
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" variant="primary" className="flex-1">Send Feedback</Button>
                  <Button type="button" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50" onClick={() => setRating(null)}>
                    Change rating
                  </Button>
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
              <p className="text-gray-600 mb-8">
                Thank you for your honest feedback. Bruce will review it personally.
              </p>
              <a
                href={googleReviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-4"
              >
                Also happy to share publicly? Leave a Google Review
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
