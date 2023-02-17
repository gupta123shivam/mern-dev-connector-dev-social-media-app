import React from "react";
import { Link } from "react-router-dom";

const NotFound = (props) => {
  return (
    <>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle"></i>
      </h1>
      <p className="large">Sorry, this page does not exists</p>
      <Link to={"/"} className="btn btn-dark">
        Go to Home
      </Link>
    </>
  );
};

NotFound.propTypes = {};

export default NotFound;
