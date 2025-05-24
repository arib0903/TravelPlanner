import { useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const popularDestinations = [
  {
    name: "Paris",
    description:
      "The City of Light awaits with iconic landmarks and charming cafés.",
  },
  {
    name: "Tokyo",
    description:
      "Experience the perfect blend of tradition and modern technology.",
  },
  {
    name: "New York",
    description:
      "The city that never sleeps, filled with endless possibilities.",
  },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 h-[500px] w-full">
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col justify-center items-center h-full text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 px-4">
              Plan Your Perfect Journey
            </h1>
            <p className="text-lg sm:text-xl text-white mb-8 max-w-2xl px-4">
              Discover amazing destinations and create unforgettable memories
              with our travel planning tools.
            </p>

            {/* Search Bar */}
            <div className="w-full max-w-2xl px-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where would you like to go?"
                  className="w-full px-6 py-4 rounded-full shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
                >
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 px-4">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {popularDestinations.map((destination) => (
            <div
              key={destination.name}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition mx-auto w-full max-w-sm"
            >
              <div className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {destination.name}
                </h3>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <Link
                  to={`/destination/${destination.name.toLowerCase()}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-16 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12 text-center px-4">
            Why Plan With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="text-center">

              <h3 className="text-xl font-semibold mb-2">Easy Planning</h3>
              <p className="text-gray-600">
                Create and organize your perfect trip with our intuitive tools.
              </p>
            </div>
            <div className="text-center">

              <h3 className="text-xl font-semibold mb-2">Travel Community</h3>
              <p className="text-gray-600">
                Connect with fellow travelers and share experiences.
              </p>
            </div>
            <div className="text-center">

              <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
              <p className="text-gray-600">
                Stay informed with live travel updates and recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 