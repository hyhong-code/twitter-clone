import React, { Fragment, useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";

import { logout } from "../../actions/authActions";
import ChatModal from "../components/ChatModal";
import RouterNavLink from "../layout/RouterNavLink";

const _Navbar = ({ logout, isAuthenticated, user, socket }) => {
  const [show, setShow] = useState(false);

  const guestLinks = () => (
    <Fragment>
      <RouterNavLink exact to="/signup">
        Signup
      </RouterNavLink>
      <RouterNavLink exact to="/login">
        Login
      </RouterNavLink>
    </Fragment>
  );

  const authLinks = () => (
    <Fragment>
      <RouterNavLink exact to="/">
        Home
      </RouterNavLink>
      <RouterNavLink exact to={`/profile/${user.id}`}>
        Profile
      </RouterNavLink>
      {/* <Nav.Link onClick={handleShow}>Chat</Nav.Link> */}
      <RouterNavLink exact to={`/follow/${user.profile._id}`}>
        Message
      </RouterNavLink>
      <Nav.Link onClick={logout}>Logout</Nav.Link>
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

const mapStateToProps = ({ auth: { isAuthenticated, user }, socket }) => ({
  isAuthenticated,
  user,
  socket,
});

export default connect(mapStateToProps, { logout })(_Navbar);
