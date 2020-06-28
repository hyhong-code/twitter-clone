import React, { Fragment, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";

import { logout } from "../../actions/authActions";
import ChatModal from "../components/ChatModal";

const _Navbar = ({ logout, isAuthenticated, user }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const guestLinks = (
    <Fragment>
      <LinkContainer exact to="/signup">
        <Nav.Link active={false}>Signup</Nav.Link>
      </LinkContainer>
      <LinkContainer exact to="/login">
        <Nav.Link active={false}>Login</Nav.Link>
      </LinkContainer>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <LinkContainer exact to="/">
        <Nav.Link active={false}>Home</Nav.Link>
      </LinkContainer>
      {user && (
        <LinkContainer exact to={`/profile/${user.id}`}>
          <Nav.Link active={false}>Profile</Nav.Link>
        </LinkContainer>
      )}
      <Nav.Link onClick={handleShow}>Chat</Nav.Link>
      <LinkContainer exact to="/login">
        <Nav.Link onClick={logout}>Logout</Nav.Link>
      </LinkContainer>
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
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ChatModal show={show} handleClose={handleClose} />
    </Fragment>
  );
};

const mapStateToProps = ({ auth: { isAuthenticated, user } }) => ({
  isAuthenticated,
  user,
});

export default connect(mapStateToProps, { logout })(_Navbar);
