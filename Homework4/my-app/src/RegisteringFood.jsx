import React from "react";
import { useState } from "react";
import "./registerFood.css";
import { addFoodAction } from "./actions";
import { useSelector, useDispatch } from "react-redux";

export default function RegisteringFood(props) {
  const [name, setName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [units, setUnits] = useState("ounces");
  const [minstock, setMinstock] = useState(0);
  const [error, setError] = useState("");
  const registeredFood = useSelector((state) => state.allFoodArray);

  const dispatch = useDispatch();

  const onRegisterHandler = () => {
    let enteredFood = {
      foodName: name,
      foodBarcode: barcode,
      foodUnits: units,
      foodStock: minstock,
    };

    for (const food of registeredFood) {
      if (food.foodBarcode === barcode) {
        setError("Food with this barcode already registered, try again.");
        return;
      }
    }

    dispatch(addFoodAction(enteredFood));
    setError("Successfully added!");

    setTimeout(() => {
      setError("");
    }, 2000);
  };

  return (
    <div className="registerWrapper">
      <h1>Register Food</h1>
      <div>
        <label htmlFor="">Food Name</label>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">Food Barcode</label>
        <input
          type="number"
          placeholder="name"
          min={100}
          max={500}
          onChange={(e) => setBarcode(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">Units</label>
        <select
          name="units"
          id="units"
          onChange={(e) => setUnits(e.target.value)}
        >
          <option value="g">grams</option>
          <option value="mg">milligram</option>
          <option value="oz">ounces</option>
          <option value="l">liters</option>
          <option value="each">each</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Min. stock</label>
        <input
          type="number"
          min={1}
          max={20}
          onChange={(e) => setMinstock(e.target.value)}
        />
      </div>
      <div className="buttonWrapper">
        <button onClick={() => onRegisterHandler()}>Register Food</button>
        <button>Cancel</button>
      </div>

      {setError !== "" ? <div> {error} </div> : null}
    </div>
  );
}
