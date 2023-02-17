import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/auth";

export const Navbar = ({ auth: { isAuthenticated, loading }, logoutUser }) => {
  const guestlinks = (
    <>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );

  const authLinks = (
    <>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>
          <span className="hide-sm"> DashBoard</span>
        </Link>
      </li>
      <li>
        <a onClick={logoutUser} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to={"/"}>
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>{!loading && isAuthenticated ? authLinks : guestlinks}</ul>
    </nav>
  );
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
