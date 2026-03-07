import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WishCard from "./pages/WishCard";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wish/:id" element={<WishCard />} />
      </Routes>
    </Router>
  );
}

export default App;
