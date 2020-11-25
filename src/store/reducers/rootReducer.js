import { combineReducers } from "redux";
import inventoryReducer from "./inventoryReducer";
import redirectionReducer from "./redirectionReducer";

const rootReducer = combineReducers({
  inventoryReducer,
  redirectionReducer,
});

export default rootReducer;
