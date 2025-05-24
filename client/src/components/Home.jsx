import React from 'react';
import { Link } from 'react-router-dom';
import MapSection from './MapSection';

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center py-16 bg-teal-50 rounded-lg my-8 hover:bg-teal-100 transition-colors duration-300">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Travel Planner
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Plan your perfect trip with our easy-to-use tools
        </p>
        <Link
          to="/destinations"
          className="bg-teal-600 text-white px-8 py-3 rounded hover:bg-teal-700 transform hover:scale-105 transition-all duration-300 inline-block"
        >
          Start Planning
        </Link>
      </div>

      {/* Map Section */}
      <MapSection />

      {/* Features */}
      <div className="py-12">
        <h2 className="text-2xl font-bold text-center mb-8">What We Offer</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold mb-2 text-teal-700">Plan Trips</h3>
            <p>Create detailed itineraries for your perfect vacation</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold mb-2 text-teal-700">Track Budget</h3>
            <p>Keep your travel expenses organized and under control</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold mb-2 text-teal-700">Find Places</h3>
            <p>Discover amazing destinations around the world</p>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Popular Destinations</h2>
        <div className="grid gap-8 md:grid-cols-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34" alt="Paris" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Paris, France</h3>
              <p className="text-gray-600">The city of love and lights</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf" alt="Tokyo" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Tokyo, Japan</h3>
              <p className="text-gray-600">Where tradition meets future</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9" alt="New York" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">New York, USA</h3>
              <p className="text-gray-600">The city that never sleeps</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4" alt="Bali" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Bali, Indonesia</h3>
              <p className="text-gray-600">Paradise island getaway</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-12 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="italic mb-4">"This travel planner made organizing my Europe trip so much easier! Highly recommended!"</p>
            <p className="font-bold">- Sarah Johnson</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="italic mb-4">"The budget tracking feature helped me save money while traveling across Asia."</p>
            <p className="font-bold">- Mike Thompson</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
        <div className="space-x-4">
          <Link
            to="/about"
            className="bg-white text-teal-600 px-6 py-2 rounded border border-teal-600 hover:bg-teal-50 hover:border-teal-700 hover:text-teal-700 transition-colors duration-300 inline-block"
          >
            Learn More
          </Link>
          <Link
            to="/destinations"
            className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transform hover:scale-105 transition-all duration-300 inline-block"
          >
            Browse Destinations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 