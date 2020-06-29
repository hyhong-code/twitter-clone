import React, { Fragment } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";

import { logout } from "../../actions/authActions";
import RouterNavLink from "../layout/RouterNavLink";

const _Navbar = ({ logout, isAuthenticated, user }) => {
  const guestLinks = () => (
    <Fragment>
      <RouterNavLink exact to="/signup">
        <i className="fas fa-user-plus"></i> Signup
      </RouterNavLink>
      <RouterNavLink exact to="/login">
        <i className="fas fa-key"></i> Login
      </RouterNavLink>
    </Fragment>
  );

  const authLinks = () => (
    <Fragment>
      <RouterNavLink exact to="/">
        <i className="fas fa-home"></i> Home
      </RouterNavLink>
      <RouterNavLink exact to={`/profile/${user.id}`}>
        <i className="fas fa-id-badge"></i> Profile
      </RouterNavLink>
      {/* <Nav.Link onClick={handleShow}>Chat</Nav.Link> */}
      <RouterNavLink exact to={`/follow/${user.profile._id}`}>
        <i className="far fa-comment"></i> Message
      </RouterNavLink>
      <Nav.Link onClick={logout}>
        <i className="fas fa-sign-out-alt"></i> Logout
      </Nav.Link>
    </Fragment>
  );

  return (
    <Fragment>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect="true"
        fixed="top"
      >
        <Container>
          <LinkContainer exact to="/">
            <Navbar.Brand>TwitterClone</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {isAuthenticated && user ? authLinks() : guestLinks()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

const mapStateToProps = ({ auth: { isAuthenticated, user } }) => ({
  isAuthenticated,
  user,
});

export default connect(mapStateToProps, { logout })(_Navbar);
