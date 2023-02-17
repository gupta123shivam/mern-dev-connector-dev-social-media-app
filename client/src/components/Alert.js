import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
  if (alerts === null || alerts.length < 1) {
    return <></>;
  }
  // TODO Add a button to erase the alert
  return (
    <>
      {alerts.map((alert) => {
        return (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </div>
        );
      })}
    </>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alertReducer,
});

export default connect(mapStateToProps)(Alert);
