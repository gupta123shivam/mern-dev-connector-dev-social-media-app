import axios from "axios";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";
import { setAlert } from "./alert";

// Get Posts
const getPosts = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };

  try {
    const res = await axios.get("/api/v1/posts", config);

    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    dispatch(setAlert("Error Occured while fetching posts", "danger"));
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add Like
const addLike = (postId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };

  try {
    const res = await axios.put(`/api/v1/posts/like/${postId}`, config);

    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Remove Like
const removeLike = (postId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };

  try {
    const res = await axios.put(`/api/v1/posts/unlike/${postId}`, config);

    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete Like
const deletePost = (postId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };

  try {
    await axios.delete(`/api/v1/posts/${postId}`, config);
    dispatch({ type: DELETE_POST, payload: { postId } });

    dispatch(setAlert("Post removed", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post("/api/v1/posts", body, config);

    dispatch({ type: ADD_POST, payload: res.data });
    dispatch(setAlert("Post Created", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Get Post
const getPost = (postId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };

  try {
    const res = await axios.get(`/api/v1/posts/${postId}`, config);

    dispatch({ type: GET_POST, payload: res.data });
  } catch (error) {
    dispatch(setAlert("Error Occured while fetching post", "danger"));
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post(
      `/api/v1/posts/comments/${postId}`,
      body,
      config
    );

    dispatch({ type: ADD_COMMENT, payload: res.data });
    dispatch(setAlert("Comment Created", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete Like
const deleteComment = (postId, commentId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };

  try {
    await axios.delete(`/api/v1/posts/comments/${postId}/${commentId}`, config);
    dispatch({ type: REMOVE_COMMENT, payload: { commentId } });

    dispatch(setAlert("Comment removed", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export {
  getPosts,
  addLike,
  removeLike,
  deletePost,
  addPost,
  getPost,
  addComment,
  deleteComment,
};
