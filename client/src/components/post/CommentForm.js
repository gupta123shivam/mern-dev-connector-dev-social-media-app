import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
import { setAlert } from "../../actions/alert";

const CommentForm = ({ addComment, setAlert, postId }) => {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text) {
      setAlert("Please enter some text", "danger");
      return;
    }
    addComment(postId, { text });
    setText("");
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={handleSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          // required
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { addComment, setAlert })(CommentForm);
