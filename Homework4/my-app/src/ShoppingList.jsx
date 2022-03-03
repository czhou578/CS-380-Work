import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import './shoppingList.css'

export default function ShoppingList(props) {
  const foodArray = useSelector((state) => state.addFoodReducer.allFoodArray);
  const zones = useSelector((state) => state.ZoneReducer.allZones);
  const [foodsToBuy, setFoodsToBuy] = useState([]);

  useEffect(() => {
    for (let foodObj of foodArray) {
      let foodName = foodObj.foodName;
      let minStock = foodObj.foodStock;
      let totalInZones = 0;

      if (minStock === 0 || minStock === null) continue;

      for (let zone of zones) {
        if (zone[foodName]) {
          totalInZones += zone[foodName];
        }
      }

      if (totalInZones < minStock) {
        setFoodsToBuy([...foodsToBuy, foodName]);
      }
    }
  }, []);

  return (
    <div className="list">
      <h3>Food Items In Need Of Replenishing:</h3>
      <div>
        {foodsToBuy.map((element, key) => {
          return (
            <div key={key} className="foodResult">
              <h3>Food: <u>{element}</u></h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
