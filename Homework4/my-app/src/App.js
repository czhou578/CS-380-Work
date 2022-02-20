import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import RegisteringFood from "./RegisteringFood";
import Zones from "./Zones";

function App() {
  return (
    <div className="App">
      <div className="headerbar">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Zones />} />
        <Route path="/search-food" element={<RegisteringFood />} />
      </Routes>
    </div>
  );
}

export default App;
