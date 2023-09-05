import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// pages & components
import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
