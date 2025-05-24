import React from 'react';

const About = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      
      <div className="text-center bg-teal-50 p-6 rounded mb-8  transition-all duration-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">About Travel Planner</h1>
        <p className="text-gray-600">Your Personal Journey Companion</p>
      </div>

      {/* Mission */}
      <div className="bg-white p-6 rounded shadow mb-8 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4 text-teal-700">Our Mission</h2>
        <p className="text-gray-600">
          We're dedicated to making travel planning simple and enjoyable.
          Our platform helps you create unforgettable journeys with ease.
        </p>
      </div>

      {/* Features */}
      <div className="bg-white p-6 rounded shadow mb-8 hover:shadow-lg transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4 text-teal-700">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded hover:bg-teal-50 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-2 text-teal-600">Smart Itineraries</h3>
            <p className="text-gray-600">Create and manage travel schedules easily</p>
          </div>
          <div className="p-4 bg-gray-50 rounded hover:bg-teal-50 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-2 text-teal-600">Budget Tracking</h3>
            <p className="text-gray-600">Keep your expenses organized</p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white p-6 rounded shadow mb-8 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4 text-teal-700">Why Choose Us?</h2>
        <ul className="space-y-2">
          {[
            'User-friendly interface',
            'Comprehensive planning tools',
            'Secure and reliable platform',
            'Regular updates and new features'
          ].map((benefit, index) => (
            <li 
              key={index} 
              className="text-gray-600 p-2 rounded hover:bg-teal-50 transition-all duration-300 flex items-center"
            >
              <span className="text-teal-500 mr-2">✓</span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div className="bg-white p-6 rounded shadow text-center hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4 text-teal-700">Get in Touch</h2>
        <p className="text-gray-600 mb-2">Have questions? We'd love to hear from you!</p>
        <a 
          href="mailto:contact@travelplanner.com" 
          className="text-teal-600 hover:text-teal-800 hover:underline transition-colors duration-300 inline-block"
        >
          contact@travelplanner.com
        </a>
      </div>
    </div>
  );
};

export default About;