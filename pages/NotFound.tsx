import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <main className="flex min-h-[60vh] items-center bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-6 text-center">
        <p className="font-condensed text-base font-bold uppercase tracking-[0.12em] text-secondary">404</p>
        <h1 className="font-display mt-3 text-5xl font-extrabold leading-[1.02] text-gray-900 lg:text-6xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          The page you are looking for does not exist or has moved to a new address.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/" className="font-semibold text-secondary underline underline-offset-4 hover:text-blue-900">
            Go to the homepage
          </Link>
          <Link to="/services/" className="font-semibold text-secondary underline underline-offset-4 hover:text-blue-900">
            Browse services
          </Link>
          <Link to="/contact/" className="font-semibold text-secondary underline underline-offset-4 hover:text-blue-900">
            Contact Bruce Works
          </Link>
        </div>
      </div>
    </main>
  );
};
