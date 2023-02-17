import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_STARTED,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  ACCOUNT_DELETED,
} from "../actions/types";

const initialState = {
  token: localStorage.token,
  isAuthenticated: false,
  loading: true,
  user: null,
};

function reducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case REGISTER_STARTED: {
      return { ...state, loading: true };
    }

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS: {
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
      };
    }
    case USER_LOADED: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    }

    case LOGIN_FAILED:
    case REGISTER_FAIL:
    case AUTH_ERROR: {
      // TODO
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        loading: false,
        isAuthenticated: false,
      };
    }

    case ACCOUNT_DELETED:
    case LOGOUT: {
      // TODO
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
