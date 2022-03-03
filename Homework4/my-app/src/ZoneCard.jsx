/**
 * ZoneCard is a card that represents one entered zone as it appears
 * on the UI
 */

import "./zoneCard.css";

export default function ZoneCard(props) {
  const { zoneInfo, deleteHandler } = props;

  return (
    <div>
      <h3>Zone Name: {zoneInfo.name}</h3>
      <h3>Color: {zoneInfo.color}</h3>
      <button id="remove" onClick={() => deleteHandler(zoneInfo)}>
        Remove
      </button>
    </div>
  );
}
