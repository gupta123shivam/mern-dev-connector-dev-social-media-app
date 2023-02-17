import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner";
import { getAllProfile } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({ profile: { profiles, loading }, getAllProfile }) => {
  useEffect(() => {
    getAllProfile();
  }, [getAllProfile]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className="larger text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i>Browse and Connect with
        developers
      </p>
      <div className="profiles">
        {profiles.length > 0 ? (
          profiles.map((profile) => {
            return <ProfileItem key={profile._id} profile={profile} />;
          })
        ) : (
          <h4>No Profiles found...</h4>
        )}
      </div>
    </>
  );
};

Profiles.propTypes = {
  getAllProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
});

export default connect(mapStateToProps, { getAllProfile })(Profiles);
