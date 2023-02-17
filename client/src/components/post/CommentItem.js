import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="avatar" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD"></Moment>
        </p>

        {!auth.loading && auth.user._id === user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteComment(postId, _id)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStoreToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStoreToProps, { deleteComment })(CommentItem);
