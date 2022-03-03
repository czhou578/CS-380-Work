import { useDispatch } from "react-redux";
import { addZoneActionFood } from "./actions";
import "./quantitymanage.css";

export default function QuantityManagement(props) {
  const { foundFood, registeredZones } = props;
  const dispatch = useDispatch();
  let name = foundFood.foodName;

  const addQuantityHandler = () => {
    let inputs = document.getElementsByClassName("quantityInput");

    for (let i = 0; i < registeredZones.length; i++) {
      if (!isNaN(inputs[i].valueAsNumber)) {
        let newZoneObj = {
          [name]: inputs[i].valueAsNumber,
          index: i,
        };

        dispatch(addZoneActionFood(newZoneObj));
      }
    }
  };

  return (
    <div className="QMwrapper">
      <h2>
        Quantity Management for {foundFood.foodName} ({foundFood.foodUnits}){" "}
      </h2>
      <h3>
        Note: Number selection will contain current amount of food by default.
      </h3>
      <div>
        {registeredZones
          ? registeredZones.map((element, key) => {
              console.log(element);
              if (Object.keys(element).length === 2) {
                return (
                  <div key={key} className="zoneWithFood">
                    <h3>Zone: {element.name}</h3>
                    <h4>Current Amount: 0</h4>
                    <label>Enter New Amount: </label>
                    <input
                      type="number"
                      min={1}
                      max={40}
                      className="quantityInput"
                    />
                  </div>
                );
              } else {
                return (
                  <div key={key} className="zoneWithFood">
                    <h3>Zone: {element.name}</h3>
                    <h4>Current Amount: {element[name]}</h4>
                    <label>Enter New Amount: </label>
                    <input
                      type="number"
                      min={1}
                      max={40}
                      className="quantityInput"
                    />
                  </div>
                );
              }
            })
          : null}

        <div className="addQuantityButton">
          <button onClick={() => addQuantityHandler()}>Add Quantities</button>
        </div>
      </div>
    </div>
  );
}
