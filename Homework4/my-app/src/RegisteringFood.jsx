import React from "react"
import './registerFood.css'

export default function RegisteringFood(props) {
  return (
    <div className="registerWrapper">
      <h1>Register Food</h1>
      <div>
        <label htmlFor="">Food Name</label>
        <input type="text" placeholder="name"/>
      </div>
      <div>
        <label htmlFor="">Food Barcode</label>
        <input type="number" placeholder="name" min={100} max={500}/>
      </div>
      <div>
        <label htmlFor="">Units</label>
        <select name="units" id="units">
          <option value="g">grams</option>
          <option value="mg">milligram</option>
          <option value="oz">ounces</option>
          <option value="l">liters</option>
          <option value="each">each</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Min. stock</label>
        <input type="number" min={1} max={20}/>
      </div>
      <div className="buttonWrapper">
        <button>Register Food</button>
        <button>Cancel</button>
      </div>
    </div>
  )
}
