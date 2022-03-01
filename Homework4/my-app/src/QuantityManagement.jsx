import { useDispatch } from "react-redux";
import { addZoneActionFood } from "./actions";


export default function QuantityManagement(props) {
  const { foundFood, registeredZones } = props;
  const dispatch = useDispatch()
  
  const addQuantityHandler = () => {
    let inputs = document.getElementsByClassName("quantityInput")
    console.log(inputs);
    let name = foundFood.foodName

    
    for (let i = 0; i < registeredZones.length; i++) {
      let newZoneObj = {
        // ...registeredZones[i],
        [name]: inputs[i].valueAsNumber
      }

      console.log(newZoneObj);
      
      // registeredZones.map(zone => )
      // console.log(inputs[0]);
      // registeredZones[i][name] = inputs[i].valueAsNumber
      
      dispatch(addZoneActionFood(newZoneObj))
      
    }
    console.log('num of zones: ' + registeredZones.length);
  }

  return (
    <div className="QMwrapper">
      <h2>
        Quantity Management for {foundFood.foodName} {foundFood.foodUnits}{" "}
      </h2>
      <h3>Number selection will contain current amount of food by default.</h3>
      <div>
        {registeredZones
          ? registeredZones.map((element, key) => {
            console.log(element);
              if (Object.keys(element).length === 2) {
                return (
                  <div key={key}>
                    <h3>Zone: {element.name}</h3>
                    <h4>Current Amount: 0</h4>
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
                  <div key={key}>
                    <h3>Zone: {element.name}</h3>
                    <h4>Current Amount: {element.foundFood}</h4>
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
        <div>
          <button onClick={() => addQuantityHandler()}>Add Quantities</button>
        </div>
      </div>
    </div>
  );
}
