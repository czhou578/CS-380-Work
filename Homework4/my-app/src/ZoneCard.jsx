/**
 * ZoneCard is a card that represents one entered zone as it appears
 * on the UI
 */

import "./zoneCard.css";

export default function ZoneCard(props) {
  const { zoneInfo, setZones, zones } = props;

  const removeZone = (deleteElement) => {
    setZones(
      zones.filter((item) => {
        return item.color !== deleteElement;
      })
    );
  };

  return (
    <div>
      <h3>Zone Name: {zoneInfo.name}</h3>
      <h3>Color: {zoneInfo.color}</h3>
      <button id="remove" onClick={() => removeZone(zoneInfo.color)}>
        Remove
      </button>
    </div>
  );
}
