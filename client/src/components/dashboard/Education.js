import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => {
    return (
      <tr key={edu._id}>
        <th>{edu.school}</th>
        <td className="hide-sm">{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to ? <Moment format="YYYY/MM/DD">{edu.to}</Moment> : "Now"}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteEducation(edu._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h2 className="my-2">Education Credential</h2>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "10rem" }}>School</th>
            <th className=" ">Degree</th>
            <th className="hide-sm">Year</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
