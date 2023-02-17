import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => {
    return (
      <tr key={exp._id}>
        <th>{exp.company}</th>
        <td className="hide-sm">{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : "Now"}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteExperience(exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h2 className="my-2">Experience Credential</h2>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "10rem" }}>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Year</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
