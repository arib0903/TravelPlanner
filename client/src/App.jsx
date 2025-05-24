import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";

// Example page components - you'll need to create these
const About = () => (
  <div>
    <h1>About Page</h1>
  </div>
);
const NotFound = () => (
  <div>
    <h1>404 - Page Not Found</h1>
  </div>
);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App; 