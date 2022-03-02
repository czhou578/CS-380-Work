import { combineReducers } from "redux";
import addFoodReducer from "./AddFoodReducer";
import ZoneReducer from "./ZoneReducer";

const allReducers = combineReducers({
  addFoodReducer,
  ZoneReducer,
});

export default allReducers;
