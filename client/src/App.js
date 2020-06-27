import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import Alerts from "./components/layout/Alerts";
import { loadUser } from "./actions/authActions";
import PrivateRoute from "./util/PrivateRoute";

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <BrowserRouter>
      <Navbar />
      <Alerts />
      <Container>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/profile/:id" component={Profile} />
          <Route render={() => <h1>404 NOT FOUND</h1>} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default connect(null, { loadUser })(App);
