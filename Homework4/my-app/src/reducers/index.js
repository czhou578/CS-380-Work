import { combineReducers } from "redux";
import addFoodReducer from "./AddFoodReducer";
import addZoneReducer from "./AddZoneReducer";

const allReducers = combineReducers({
  addFoodReducer,
  addZoneReducer
})

export default allReducers