import './zones.css'
import React from 'react'
import ZoneModal from './ZoneModal'

export default function Zones() {

  const [openZoneModal, setOpenZoneModal] = React.useState(false)

  return (
    <div className='zoneWrapper'>
      <button onClick={() => setOpenZoneModal(true)}> Create New Zone </button>
      {openZoneModal ? <ZoneModal /> : null}
      <div className='currentZoneWrapper'>
        <h3>Current Zones</h3>

      </div>
    </div>
  )
}