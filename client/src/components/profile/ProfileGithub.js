import React from "react";
import PropTypes from "prop-types";
import { getGuthubRepos } from "../../actions/profile";
import { connect } from "react-redux";

const GithubRepo = ({ username, getGuthubRepos, repos }) => {
  React.useEffect(() => {
    getGuthubRepos(username);
       //eslint-disable-next-line
  }, [username]);

  if (repos.length < 1) {
    return (
      <div class="profile-github">
        <h2 class="text-primary my-1">
          <i class="fab fa-github"></i> Github Repos
        </h2>
        <h4>No Github repos were found...</h4>
      </div>
    );
  }

  return (
    <div class="profile-github">
      <h2 class="text-primary my-1">
        <i class="fab fa-github"></i> Github Repos
      </h2>
      {repos.map((repo, idx) => {
        const {
          description,
          watchers_count,
          stargazers_count,
          forks_count,
          html_url,
          name,
          _id,
        } = repo;
        return (
          <div key={_id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a href={html_url} target="_blank" rel="noopener noreferrer">
                  {name}
                </a>
              </h4>
              <p>{description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {stargazers_count}
                </li>
                <li className="badge badge-dark">Watchers: {watchers_count}</li>
                <li className="badge badge-light">Forks: {forks_count}</li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

GithubRepo.propTypes = {
  username: PropTypes.string.isRequired,
  getGuthubRepos: PropTypes.func.isRequired,
  repos: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profileReducer.repos,
});

export default connect(mapStateToProps, { getGuthubRepos })(GithubRepo);
