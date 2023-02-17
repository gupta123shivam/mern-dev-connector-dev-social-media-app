import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_ALL_PROFILES,
  GET_REPOS,
} from "../actions/types";

// Get Curnt Profile
const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios("/api/v1/profiles/me");

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    const msg = `${error.response.status} Error : ${
      error.response.data.msg ? error.response.data.msg : "Some error occured"
    }`;
    dispatch(setAlert(msg, "danger"));

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Get All Profiles
const getAllProfile = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios("/api/v1/profiles");

    dispatch({ type: GET_ALL_PROFILES, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Get Profile by ID
const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios(`/api/v1/profiles/user/${userId}`);

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Get
const getGuthubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios(`/api/v1/profiles/github/${username}`);

    dispatch({ type: GET_REPOS, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Create or update Profile
const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    const body = JSON.stringify(formData);

    try {
      const res = await axios.post("/api/v1/profiles", body, config);

      const msg = edit ? "Profile Edited" : "Profile Created";
      dispatch({ type: GET_PROFILE, payload: res.data });
      dispatch(setAlert(msg, "success"));
      if (!edit) {
        history.push("/dashboard");
      }
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

// Add experience
const addExperience =
  ({ formData, history }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    const body = JSON.stringify(formData);

    try {
      const res = await axios.post("/api/v1/profiles/experience", body, config);
      dispatch({ type: UPDATE_PROFILE, payload: res.data });

      dispatch(setAlert("Experinces Added", "success"));
      history.push("/dashboard");
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

// Add education
const addEducation = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post("/api/v1/profiles/education", body, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });

    dispatch(setAlert("Education Added", "success"));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

const deleteExperience = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };

  try {
    const res = await axios.delete(`/api/v1/profiles/experience/${id}`, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

const deleteEducation = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };

  try {
    const res = await axios.delete(`/api/v1/profiles/education/${id}`, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });

    dispatch(setAlert("Education Removed", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete Account and Profile
const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are ypu sure? This can NOT be undone.")) {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    try {
      await axios.delete(`/api/v1/profiles`, config);
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Ypur Account has been permanently deleted"));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};

export {
  getCurrentProfile,
  getAllProfile,
  getProfileById,
  getGuthubRepos,
  createProfile,
  addEducation,
  addExperience,
  deleteEducation,
  deleteExperience,
  deleteAccount,
};
