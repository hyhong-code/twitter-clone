import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const Signup = () => {
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
    console.log(formData);
  };

  return (
    <Row>
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
          <Form.Group controlId="formBasicEmail">
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
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={password}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
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

export default Signup;
