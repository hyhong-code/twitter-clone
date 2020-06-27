import React, { Fragment } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

const _Navbar = ({ logout, isAuthenticated }) => {
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
      <Nav.Link onClick={logout}>Logout</Nav.Link>
    </Fragment>
  );

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>TwitterClone</Navbar.Brand>
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

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated,
});

export default connect(mapStateToProps, { logout })(_Navbar);
