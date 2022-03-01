import { Routes, Route } from "react-router-dom";
import "./App.css";
import FoodSearch from "./FoodSearch";
import Navbar from "./Navbar";
import RegisteringFood from "./RegisteringFood";
import ShoppingList from "./ShoppingList";
import Zones from "./Zones";

function App() {
  return (
    <div className="App">
      <div className="headerbar">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Zones />} />
        <Route path="/register-food" element={<RegisteringFood />} />
        <Route path="/search-food" element={<FoodSearch />} />
        <Route path="/shoppinglist" element={<ShoppingList />} />
      </Routes>
    </div>
  );
}

export default App;
