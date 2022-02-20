import "./zones.css";
import React from "react";
import ZoneModal from "./ZoneModal";
import ZoneCard from "./ZoneCard";

export default function Zones() {
  const [openZoneModal, setOpenZoneModal] = React.useState(false);
  const [zones, setZones] = React.useState([]);

  return (
    <div className="zoneWrapper">
      <button onClick={() => setOpenZoneModal(true)}> Create New Zone </button>
      {openZoneModal ? (
        <ZoneModal
          setZones={setZones}
          setOpenZoneModal={setOpenZoneModal}
          zones={zones}
        />
      ) : null}
      <div className="currentZoneWrapper">
        <h3>Current Zones</h3>
        {zones.map((element, key) => {
          return (
            <ZoneCard
              key={key}
              zoneInfo={element}
              setZones={setZones}
              zones={zones}
            />
          );
        })}
      </div>
    </div>
  );
}
