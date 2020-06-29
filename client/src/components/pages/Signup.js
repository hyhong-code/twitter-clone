import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { signup } from "../../actions/authActions";
import { Redirect } from "react-router-dom";

const Signup = ({ signup, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    handle: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { handle, email, password, passwordConfirm } = formData;

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    signup(formData);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Row className="pt-6">
      <Col md={{ span: 6, offset: 3 }}>
        <h1 className="display-4">Signup</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Handle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter handle"
              onChange={handleChange}
              name="handle"
              value={handle}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
              name="email"
              value={email}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={password}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              name="passwordConfirm"
              value={passwordConfirm}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Signup
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
