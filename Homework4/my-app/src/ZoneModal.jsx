

export default function ZoneModal(props) {

  return (
    <div className="selectionWrapper">
      <h2>Add Zone</h2>
      <div>
        <label htmlFor="">
          Name: 
          <input type="text" placeholder="name"/>
        </label>
        <label htmlFor=""> Color: </label>
          <select name="colors" id="colorSelect">
            <option value="orange">Orange</option>
            <option value="orange">Red</option>
            <option value="orange">Blue</option>
            <option value="orange">Green</option>
            <option value="orange">Purple</option>
          </select>
      </div>
      <div className="addCancel">
        <button>Add Zone</button>
        <button>Cancel</button>
      </div>
    </div>
  )
}