import React, { useState } from "react";
import PropTypes from "prop-types";
import {  withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

const initialState = {
  company: "",
  title: "",
  location: "",
  from: "",
  to: "",
  current: false,
  description: "",
  disabled: false,
};

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState(initialState);
  const {
    company,
    title,
    location,
    from,
    to,
    current,
    description,
    disabled,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  function handleSubmit(e) {
    e.preventDefault();
    addExperience({formData, history});
  }

  return (
    <>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            required
            value={title}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            required
            value={company}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  current: !current,
                  disabled: !disabled,
                });
              }}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            disabled={disabled ? "disabled" : null}
            value={to}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={onChange}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link to="/dashboard" className="btn btn-light my-1">
          Go Back
        </Link>
      </form>
    </>
  );
};

AddExperience.propTypes = { addExperience: PropTypes.func.isRequired };

export default connect(null, { addExperience })(withRouter(AddExperience));
