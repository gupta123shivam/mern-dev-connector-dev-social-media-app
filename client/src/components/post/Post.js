import React from "react";
import PropTypes from "prop-types";
import { getPost } from "../../actions/post";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from './CommentItem'

const Post = ({ getPost, post: { post, loading }, match }) => {
  React.useEffect(() => {
    getPost(match.params.id);
       //eslint-disable-next-line
  }, [match.params.id]);

  if (loading || post === null) {
    return <Spinner />;
  }

  return (
    <>
      <Link to="/posts" className="btn btn-dark">
        Back to Posts
      </Link>
      <PostItem post={post} showAction={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((com) => (
          <CommentItem key={com._id} comment={com} postId={post._id} />
        ))}
      </div>
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStoreToProps = (state) => ({
  post: state.postReducer,
});

export default connect(mapStoreToProps, { getPost })(Post);
