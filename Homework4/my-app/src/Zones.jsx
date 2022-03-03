import "./zones.css";
import React from "react";
import ZoneModal from "./ZoneModal";
import ZoneCard from "./ZoneCard";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteZone } from './actions'
import { useDispatch } from "react-redux";

export default function Zones() {
  const [openZoneModal, setOpenZoneModal] = React.useState(false);
  const [zoneIndex, setZoneIndex] = React.useState([]);
  const registeredZones = useSelector((state) => state.ZoneReducer.allZones)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   console.log(zoneIndex[0]);

  //   dispatch(deleteZone(registeredZones[zoneIndex[0]]))

  // }, [zoneIndex])

  const removeZone = (zone) => {
    dispatch(deleteZone(zone))
  }

  return (
    <div className="zoneWrapper">
      <button onClick={() => setOpenZoneModal(true)}> Create New Zone </button>
      {openZoneModal ? (
        <ZoneModal
          // setZones={setZones}
          setOpenZoneModal={setOpenZoneModal}
          zones={registeredZones}
        />
      ) : null}
      <div className="currentZoneWrapper">
        <h3>Current Zones</h3>
        {registeredZones.map((element, key) => {
          if (element) {
            return (
              <ZoneCard
                key={key}
                zoneInfo={element}
                deleteHandler={removeZone}
                // setZoneIndex={setZoneIndex}
                // zoneState={zoneIndex}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
