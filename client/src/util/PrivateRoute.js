import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(routeProps) =>
      isAuthenticated ? <Component {...routeProps} /> : <Redirect to="/login" />
    }
  />
);

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
