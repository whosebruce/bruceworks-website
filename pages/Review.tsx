import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import { Chamfer, Display, GridBand, OpTag } from '../components/brand';

const googleReviewLink = "https://g.page/r/CY1h3jLq5wLvEAE/review";

// The review page (noindex). The form and its FormSubmit behavior are unchanged: same action, same hidden fields,
// same field names (feedback, contact_info), the same ?submitted=true return. No phone field, on purpose.
export const ReviewFunnel: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('submitted') === 'true') {
      setSubmitted(true);
      window.history.replaceState({}, document.title, '/review/');
    }
  }, []);

  // formsubmit redirects back to the clean review URL after submission.
  const returnUrl = `${window.location.origin}/review/?submitted=true`;

  return (
    <main>
      <GridBand className="texture border-t-0" marks={false}>
        <div className="mx-auto max-w-2xl py-12 md:py-20">
          <Chamfer innerClassName="p-6 sm:p-8 md:p-12">

            {!submitted && (
              <div className="animate-fade-in-up text-center">
                <OpTag op="OP-00">Debrief</OpTag>
                <Display as="h1" className="mt-6 text-5xl md:text-6xl">How did <span className="sig">we do?</span></Display>
                <p className="mx-auto mt-5 max-w-lg text-lg text-ink-2">
                  Your feedback is valuable to us. Please rate your experience with Bruce Works.
                </p>

                <div className="mt-8 flex justify-center gap-1 sm:gap-3" role="radiogroup" aria-label="Rate your experience from 1 to 5 stars">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const lit = (hoveredRating ?? rating ?? 0) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(null)}
                        role="radio"
                        aria-checked={rating === star}
                        aria-label={`${star} star${star > 1 ? 's' : ''}`}
                        className="grid h-14 w-14 place-items-center transition-colors sm:h-16 sm:w-16"
                        style={{ borderRadius: 'var(--radius)' }}
                      >
                        <Star size={44} strokeWidth={1.75} className={`transition-colors duration-150 ${lit ? 'fill-signal text-signal-text' : 'fill-transparent text-ink-3'}`} />
                      </button>
                    );
                  })}
                </div>
                <p className="label mt-3" aria-live="polite">{rating ? `${rating} of 5` : 'Tap a star'}</p>
              </div>
            )}

            {rating !== null && !submitted && (
              <div className="animate-fade-in-up mt-10 border-t border-line pt-10 text-left">
                <h2 className="display text-center text-3xl md:text-4xl">
                  {rating >= 4
                    ? "We're thrilled you had a great experience!"
                    : "Thank you for your honesty. We want to make it right."}
                </h2>
                <p className="mt-4 text-center text-ink-2">
                  As a locally owned business, reviews and honest feedback mean the world to us. You can share your
                  experience publicly on Google, send feedback directly to Bruce, or both.
                </p>

                <a
                  href={googleReviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-8 w-full"
                >
                  Leave a Google review <ArrowUpRight size={18} />
                </a>

                <div className="my-8 flex items-center gap-4" aria-hidden="true">
                  <span className="h-px flex-1 bg-line" />
                  <span className="label">or send feedback directly</span>
                  <span className="h-px flex-1 bg-line" />
                </div>

                <form action="https://formsubmit.co/info@bruceworks.net" method="POST">
                  <input type="hidden" name="_subject" value="Customer review feedback from bruceworks.net" />
                  <input type="hidden" name="_next" value={returnUrl} />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="Given_Rating" value={`${rating} Stars`} />
                  <div className="mb-5">
                    <label htmlFor="review-feedback" className="mb-1.5 block text-sm font-semibold text-ink">Your feedback</label>
                    <textarea
                      id="review-feedback"
                      name="feedback"
                      required
                      rows={4}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="field"
                      placeholder="Tell us about your experience..."
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="review-contact" className="mb-1.5 block text-sm font-semibold text-ink">Name / email (optional)</label>
                    <input
                      id="review-contact"
                      type="text"
                      name="contact_info"
                      className="field"
                      placeholder="So we can follow up with you"
                    />
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button type="submit" className="btn btn-outline flex-1 !border-ink-3">Send feedback</button>
                    <button type="button" className="btn btn-outline" onClick={() => setRating(null)}>
                      Change rating
                    </button>
                  </div>
                </form>
              </div>
            )}

            {submitted && (
              <div className="animate-fade-in-up py-6 text-center">
                <span aria-hidden="true" className="display text-6xl text-signal-text">☑</span>
                <Display as="h1" className="mt-4 text-5xl">Debrief received.</Display>
                <p className="mx-auto mt-4 max-w-md text-lg text-ink-2">
                  <b className="font-semibold text-ink">Message Sent.</b> Thank you for your honest feedback. Bruce will review it personally.
                </p>
                <a
                  href={googleReviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
                >
                  Also happy to share publicly? Leave a Google review <ArrowUpRight size={16} />
                </a>
              </div>
            )}

          </Chamfer>
        </div>
      </GridBand>
    </main>
  );
};
