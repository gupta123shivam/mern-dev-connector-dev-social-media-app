import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import alertReducer from "./alertReducer";
import postReducer from "./postReducer";

export default combineReducers({
  alertReducer,
  authReducer,
  profileReducer,
  postReducer,
});
