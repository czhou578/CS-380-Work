
export default function ZoneCard(props) {

  const { zoneInfo } = props

  return (
    <div className="zoneCardWrapper">
      <h3>Zone Name: {zoneInfo.name}</h3>
      <button id="remove">Remove</button>
    </div>
  )
}