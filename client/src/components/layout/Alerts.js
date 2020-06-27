import React from "react";
import Alert from "../components/Alert";
import { connect } from "react-redux";

const Alerts = ({ alerts }) => {
  return (
    <div className="alerts">
      {alerts.map((alert) => (
        <Alert key={alert.id} alert={alert} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ alerts }) => ({ alerts });

export default connect(mapStateToProps)(Alerts);
