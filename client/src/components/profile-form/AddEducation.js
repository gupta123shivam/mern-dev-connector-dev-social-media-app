import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";

const initialState = {
  school: "",
  degree: "",
  fieldofstudy: "",
  from: "",
  to: "",
  current: false,
  description: "",
  errors: {},
  disabled: false,
};

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState(initialState);
  const {
    school,
    degree,
    fieldofstudy,
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
    const ttt = { ...formData, to: current ? new Date(Date.now()) : to };
    addEducation(ttt, history);
  }

  return (
    <>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any schoole or bootcamp that
        you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School/BootCamp Title"
            name="school"
            required
            value={school}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            value={degree}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldofstudy"
            value={fieldofstudy}
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
            Current Program
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
            placeholder="Programme Description"
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

AddEducation.propTypes = { addEducation: PropTypes.func.isRequired };

export default connect(null, { addEducation })(withRouter(AddEducation));
