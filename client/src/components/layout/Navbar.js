import React, { Fragment } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

const _Navbar = ({ logout, isAuthenticated, user }) => {
  const guestLinks = (
    <Fragment>
      <LinkContainer exact to="/signup">
        <Nav.Link>Signup</Nav.Link>
      </LinkContainer>
      <LinkContainer exact to="/login">
        <Nav.Link>Login</Nav.Link>
      </LinkContainer>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <LinkContainer exact to="/">
        <Nav.Link>Home</Nav.Link>
      </LinkContainer>
      {user && (
        <LinkContainer exact to={`profile/${user.id}`}>
          <Nav.Link>Profile</Nav.Link>
        </LinkContainer>
      )}
      <LinkContainer exact to="/login">
        <Nav.Link onClick={logout}>Logout</Nav.Link>
      </LinkContainer>
    </Fragment>
  );

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect="true">
      <Container>
        <LinkContainer exact to="/">
          <Navbar.Brand>TwitterClone</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = ({ auth: { isAuthenticated, user } }) => ({
  isAuthenticated,
  user,
});

export default connect(mapStateToProps, { logout })(_Navbar);
