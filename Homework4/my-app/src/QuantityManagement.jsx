export default function QuantityManagement(props) {
  const {foundFood} = props

  return (
    <div className="QMwrapper">
      <h2>Quantity Management for ...</h2>
      <div>
        <div>
          <h3>{foundFood.foodName} {foundFood.foodUnits}</h3>
        </div>
      </div>
    </div>
  );
}
