import { useState } from "react";
import "./zonemodal.css";

export default function ZoneModal(props) {
  const { setZones, setOpenZoneModal, zones } = props;
  const [zoneName, setZoneName] = useState("");
  const [colorSelect, setColorSelect] = useState("orange");
  const [error, setError] = useState("");

  const submitZoneInfo = () => {
    let resultObj = {
      color: colorSelect,
      name: zoneName,
    };

    for (let zone of zones) {
      if (zone.color === resultObj.color) {
        setError("Zone color already in use, please try again.");
        return;
      } else {
        setError("");
      }
    }

    setZones([...zones, resultObj]);
  };

  return (
    <div className="selectionWrapper">
      <h2>Add Zone</h2>
      <div className="inputs">
        <label htmlFor=""> Name:</label>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setZoneName(e.target.value)}
        />
        <label htmlFor=""> Color: </label>
        <select
          name="colors"
          id="colorSelect"
          onChange={(e) => setColorSelect(e.target.value)}
        >
          <option value="orange">Orange</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="purple">Purple</option>
        </select>
      </div>
      <div className="addCancel">
        <button onClick={() => submitZoneInfo()}>Add Zone</button>
        <button onClick={() => setOpenZoneModal(false)}>Cancel</button>
      </div>
      {setError !== "" ? <p>{error}</p> : null}
    </div>
  );
}
