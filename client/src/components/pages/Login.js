import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    handle: "",
    password: "",
  });
  const { handle, password } = formData;

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    login(formData);
  };

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h1 className="display-4">Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Handle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter handle"
              value={handle}
              name="handle"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default connect(null, { login })(Login);
