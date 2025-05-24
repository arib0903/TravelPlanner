import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";

// Example page components - you'll need to create these
const NotFound = () => (
  <div>
    <h1>404 - Page Not Found</h1>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Main content with padding-top to account for fixed navbar */}
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/destinations" element={<div>Destinations Page Coming Soon</div>} />
          <Route path="/itineraries" element={<div>Itineraries Page Coming Soon</div>} />
          <Route path="/contact" element={<div>Contact Page Coming Soon</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App; 