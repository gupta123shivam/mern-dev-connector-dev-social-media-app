import React from "react";
import PropTypes from "prop-types";
import { getPosts } from "../../actions/post";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner";
import PostItem from "./PostItem";
import CreatePost from "./CreatePost";

const Posts = ({ getPosts, post: { loading, posts } }) => {
  React.useEffect(() => {
    getPosts();
    //eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Welcome to the community
      </p>
      <CreatePost />
      <div className="posts">
        {posts.map((post) => {
          return <PostItem post={post} key={post._id} />;
        })}
      </div>
    </>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.postReducer,
});

export default connect(mapStateToProps, { getPosts })(Posts);
