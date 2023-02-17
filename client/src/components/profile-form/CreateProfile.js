import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import { withRouter } from "react-router-dom";

const initialState = {
  displaySocialInputs: false,
  handle: "",
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubusername: "",
  bio: "",
  twitter: "sadd",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: "",
  errors: {},
};

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFromData] = useState(initialState);
  const [displaySocial, toggleSocialInput] = useState(false);

  const {
    handle,
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  function handleChange(e) {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createProfile(formData, history);
  }

  return (
    <>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={handleChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Handle"
            name="handle"
            value={handle}
            onChange={handleChange}
          />
          <small className="form-text">Choose a Handle</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={handleChange}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={handleChange}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={handleChange}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={handleChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={handleChange}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={handleChange}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => toggleSocialInput((t) => !t)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input
            type="text"
            placeholder="Twitter URL"
            name="twitter"
            value={displaySocial ? twitter : ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input
            type="text"
            placeholder="Facebook URL"
            name="facebook"
            value={displaySocial ? facebook : ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input
            type="text"
            placeholder="YouTube URL"
            name="youtube"
            value={displaySocial ? youtube : ""}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input
            type="text"
            placeholder="Linkedin URL"
            name="linkedin"
            value={displaySocial ? linkedin : ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input
            type="text"
            placeholder="Instagram URL"
            name="instagram"
            value={displaySocial ? instagram : ""}
            onChange={handleChange}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
