import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({ profile: { experience } }) => {
  if (experience.length < 1) {
    return (
      <div class="profile-exp bg-white p-2">
        <h2 class="text-primary">Experience</h2>
        <h4>No Experience credentials</h4>
      </div>
    );
  }

  return (
    <div class="profile-exp bg-white p-2">
      <h2 class="text-primary">Experience</h2>{" "}
      {experience.map((exp) => {
        const { _id, title, company, from, to, description } = exp;
        return (
          <div key={_id}>
            <h3 class="text-dark">{company}</h3>
            <p>
              <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
              {!to ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
            </p>
            <p>
              <strong>Position: </strong>
              {title}
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

ProfileExperience.propTypes = { profile: PropTypes.object.isRequired };

export default ProfileExperience;
