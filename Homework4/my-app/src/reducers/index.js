import { combineReducers } from "redux";
import addFoodReducer from "./AddFoodReducer";
import ZoneReducer from "./ZoneReducer";
import UnassignFoodReducer from "./UnassignFoodReducer";

const allReducers = combineReducers({
  addFoodReducer,
  ZoneReducer,
  UnassignFoodReducer
});

export default allReducers;
