import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { addLike, removeLike, deletePost } from "../../actions/post";
import { connect } from "react-redux";

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth,
  addLike,
  removeLike,
  deletePost,
  showAction,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user._id}`}>
          <img className="round-img" src={avatar} alt="avatar" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>

        {showAction && (
          <>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => addLike(_id)}
            >
              <i className="fas fa-thumbs-up"></i>{" "}
              <span>{likes.length > 0 && likes.length}</span>
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => removeLike(_id)}
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>

            {!auth.loading && user._id === auth.user._id && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deletePost(_id)}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showAction: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showAction: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
