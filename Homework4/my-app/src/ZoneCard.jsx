export default function ZoneCard(props) {
  const { zoneInfo, setZones, zones } = props;
  console.log(zones);

  const removeZone = (deleteElement) => {
    setZones(
      zones.filter((item) => {
        return item.name !== deleteElement;
      })
    );
  };

  return (
    <div className="zoneCardWrapper">
      <h3>Zone Name: {zoneInfo.name}</h3>
      <button id="remove" onClick={() => removeZone(zoneInfo.name)}>
        Remove
      </button>
    </div>
  );
}
