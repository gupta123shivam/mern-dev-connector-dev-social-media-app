import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({ profile: { education } }) => {
  if (education.length < 1) {
    return (
      <div class="profile-edu bg-white p-2">
        <h2 class="text-primary">Experience</h2>
        <h4>No Education credentials</h4>
      </div>
    );
  }

  return (
    <div class="profile-edu bg-white p-2">
      <h2 class="text-primary">Education</h2>{" "}
      {education.map((exp) => {
        const {
          _id,
          school,
          degree,
          from,
          to,
          description,
        } = exp;
        return (
          <div key={_id}>
            <h3 class="text-dark">{school}</h3>
            <p>
              <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
              {!to ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
            </p>
            <p>
              <strong>Position: </strong>
              {degree}
            </p>
            <p>
              <strong>Description: </strong>
              {description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

ProfileEducation.propTypes = { profile: PropTypes.object.isRequired };

export default ProfileEducation;
