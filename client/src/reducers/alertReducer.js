import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

function reducer(state = initialState, action ) {
  const { payload } = action;
  switch (action.type) {
    case SET_ALERT: {
      const newAlert = payload;
      return [...state, newAlert];
    }

    case REMOVE_ALERT: {
      const newAlerts = state.filter((alert) => alert.id !== payload.id);
      return newAlerts;
    }

    default: {
      return state;
    }
  }
}

export default reducer;
