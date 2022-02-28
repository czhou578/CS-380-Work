export default function QuantityManagement(props) {
  const { foundFood, registeredZones } = props;

  return (
    <div className="QMwrapper">
      <h2>
        Quantity Management for {foundFood.foodName} {foundFood.foodUnits}{" "}
      </h2>
      <h3>Number selection will contain current amount of food by default.</h3>
      <div>
        {registeredZones
          ? registeredZones.map((element, key) => {
              if (element.foundFood.foodName === undefined) {
                return (
                  <div key={key}>
                    <h3>Zone: {element.name}</h3>
                    <h4>Current Amount: 0</h4>
                    <input
                      type="number"
                      min={1}
                      max={40}
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
                      // onChange={(e) => setMinstock(e.target.value)}
                    />
                  </div>
                );
              }
            })
          : null}
        <div>
          <button>Add Quantities</button>
        </div>
      </div>
    </div>
  );
}
