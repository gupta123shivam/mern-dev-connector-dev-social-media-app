import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { loginUser } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const initialState = {
  email: "",
  password: "",
};

const Login = ({ loginUser, isAuthenticated }) => {
  const [formData, setFormData] = useState(initialState);

  const { email, password } = formData;

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    loginUser({ email, password });
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Log Into Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </div>
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
