import { combineReducers } from "redux";
import addFoodReducer from "./AddFoodReducer";
import addZoneReducer from "./AddZoneReducer";

const allReducers = combineReducers({
  foodReducer: addFoodReducer,
  zoneReducer: addZoneReducer
})

export default allReducers