import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import QuantityManagement from "./QuantityManagement";

//link manage button to respective links

export default function FoodSearch(props) {
  const [foodSearch, setFoodSearch] = useState(null);
  const [foundFood, setFoundFood] = useState(null);
  const [error, setError] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const registeredFood = useSelector((state) => state.allFoodArray);

  const findFood = () => {
    for (const foodObj of registeredFood) {
      if (foodObj.foodBarcode === foodSearch) {
        setFoundFood(foodObj);
        return;
      }
    }

    setError(true);
  };

  return (
    <div>
      <h1>Search for Foods</h1>
      <div>
        <label htmlFor="">Enter Food Barcode</label>
        <input
          type="number"
          placeholder="Search"
          onChange={(e) => setFoodSearch(e.target.value)}
        />
        <button onClick={() => findFood()}>Search</button>
      </div>
      <div>
        {foundFood ? (
          <div>
            <h2>Food Name: {foundFood.foodName}</h2>
            <button onClick={() => setManageOpen(true)}>Manage</button>
          </div>
        ) : null}
        {error ? (
          <div>
            <h3>No results found</h3>
          </div>
        ) : null}
      </div>

      {setManageOpen && foundFood ? (
        <div>
          <QuantityManagement foundFood={foundFood}/>
        </div>
      ) : null}
    </div>
  );
}
