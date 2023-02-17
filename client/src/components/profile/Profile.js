import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinnner from "../layouts/Spinner";
import { getProfileById } from "../../actions/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({
  match,
  getProfileById,
  auth,
  profile: { profile, loading },
}) => {
  const id = match.params.id;
  React.useEffect(() => {
    getProfileById(id);
       //eslint-disable-next-line
  }, [id]);

  if (loading || profile === null) {
    return <Spinnner />;
  }

  return (
    <>
      <Link to="/profiles" className="btn btn-light">
        Back to Profiles
      </Link>
      {auth.isAuthenticated &&
        !auth.loading &&
        auth.user._id === profile.user._id && (
          <Link to="/edit-profile" className="btn btn-dark">
            Edit the Profile
          </Link>
        )}
      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        <ProfileExperience profile={profile} />
        <ProfileEducation profile={profile} />
        {profile.githubusername && (
          <ProfileGithub username={profile.githubusername} />
        )}
      </div>
    </>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
  auth: state.authReducer,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
