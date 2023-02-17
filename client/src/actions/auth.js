import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_STARTED,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Load User
const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/v1/auth");

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Regiter user
const registerUser =
  ({ name, email, password }) =>
  async (dispatch) => {
    dispatch({ type: REGISTER_STARTED });

    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    const body = JSON.stringify({ username: name, email, password });

    try {
      const res = await axios.post("/api/v1/auth/register", body, config);

      const msg = `${res.data.msg || "Some error occured"}`;
      dispatch(setAlert(msg, "success"));

      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      dispatch(loadUser());
    } catch (error) {
      const msg = `${error.response.status} Error : ${
        error.response.data.msg ? error.response.data.msg : "Some error occured"
      }`;
      dispatch(setAlert(msg, "danger"));

      dispatch({ type: REGISTER_FAIL });
    }
  };

// Login user
const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/v1/auth/login", body, config);

      const msg = `${res.data.msg || "Success"}`;
      dispatch(setAlert(msg, "success"));

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      dispatch(loadUser());
    } catch (error) {
      const msg = `${error.response.status} Error : ${
        error.response.data.msg ? error.response.data.msg : "Some error occured"
      }`;
      dispatch(setAlert(msg, "danger"));

      dispatch({ type: LOGIN_FAILED });
    }
  };

// Logout /Clear Profile
const logoutUser = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

export { registerUser, loadUser, loginUser, logoutUser };
