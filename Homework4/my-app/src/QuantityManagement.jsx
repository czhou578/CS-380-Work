import { useDispatch } from "react-redux";
import { addZoneActionFood } from "./actions";
import './quantitymanage.css'

export default function QuantityManagement(props) {
  const { foundFood, registeredZones } = props;
  const dispatch = useDispatch();
  let name = foundFood.foodName;

  const addQuantityHandler = () => {
    let inputs = document.getElementsByClassName("quantityInput");
    // console.log(inputs);

    for (let i = 0; i < registeredZones.length; i++) {
      if (inputs[i].valueAsNumber !== NaN) {
        let newZoneObj = {
          [name]: inputs[i].valueAsNumber,
          index: i,
        };
  
        dispatch(addZoneActionFood(newZoneObj));
      }
    }
    // console.log('num of zones: ' + registeredZones.length);
  };

  return (
    <div className="QMwrapper">
      <h2>
        Quantity Management for {foundFood.foodName} ({foundFood.foodUnits}){" "}
      </h2>
      <h3>Note: Number selection will contain current amount of food by default.</h3>
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
                      // onChange={(e) => setMinstock(e.target.value)}
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
                      // onChange={(e) => setMinstock(e.target.value)}
                    />
                  </div>
                );
              }
            })
          : null}
        <div className="unassigned">
          <h4>Unassigned Food</h4>
        </div>
        <div className="addQuantityButton">
          <button onClick={() => addQuantityHandler()}>Add Quantities</button>
        </div>
      </div>
    </div>
  );
}
