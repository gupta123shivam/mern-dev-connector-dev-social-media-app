import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { registerUser } from "../../actions/auth";
import PropTypes from "prop-types";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = ({ setAlert, registerUser, isAuthenticated }) => {
  const [formData, setFormData] = useState(initialState);
  // const [error, setError] = useState("");

  // useEffect(() => {
  //   let timerId;
  //   if (error) {
  //     timerId = setTimeout(() => {
  //       setError("");
  //     }, 5000);
  //     return () => clearTimeout(timerId);
  //   }
  // }, [error]);

  const { name, email, password, password2 } = formData;

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== password2) {
      // return setError("Passwords do not match");
      setAlert("Passwords do not match", "danger");
    }
    registerUser({ name, email, password });

    // const newUser = {
    //   username: name,
    //   email,
    //   password,
    // };

    // try {
    //   const config = {
    //     headers: {
    //       "Content-type": "Application/json",
    //     },
    //   };
    //   const body = JSON.stringify(newUser);
    //   const res = await axios.post('/api/v1/auth/register', body, config);
    //   console.log(res.data)

    // } catch (error) {
    //   console.log(error);
    // }
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={handleChange}
          />
        </div>

        <div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </div>
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.protoType = {
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, registerUser })(Register);
