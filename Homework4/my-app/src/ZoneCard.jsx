/**
 * ZoneCard is a card that represents one entered zone as it appears
 * on the UI
 */

import "./zoneCard.css";

export default function ZoneCard(props) {
  const { zoneInfo, deleteHandler } = props;

  return (
    <div className="zoneCardWrapper">
      <h3>Zone Name: <u>{zoneInfo.name}</u></h3>
      <h3>Color: <u>{zoneInfo.color}</u></h3>
      <button id="remove" onClick={() => deleteHandler(zoneInfo)}>
        Remove
      </button>
    </div>
  );
}
