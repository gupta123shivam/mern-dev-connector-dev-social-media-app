import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS: {
      return { ...state, posts: payload, loading: false };
    }
    case GET_POST: {
      return { ...state, post: payload, loading: false };
    }
    case ADD_POST: {
      return { ...state, posts: [payload, ...state.posts], loading: false };
    }
    case DELETE_POST: {
      const newPosts = state.posts.filter(
        (post) => post._id !== payload.postId
      );
      return { ...state, posts: newPosts, loading: false };
    }
    case POST_ERROR: {
      return { ...state, error: payload, loading: false };
    }

    case UPDATE_LIKES: {
      const newPosts = state.posts.map((post) => {
        if (post._id === payload.postId) {
          return { ...post, likes: payload.likes };
        } else {
          return post;
        }
      });
      console.log(newPosts);
      return { ...state, posts: newPosts, loading: false };
    }
    case ADD_COMMENT: {
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    }

    case REMOVE_COMMENT: {
      const newComments = state.post.comments.filter(
        (com) => com._id !== payload.commentId
      );
      return {
        ...state,
        post: { ...state.post, comments: newComments },
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
