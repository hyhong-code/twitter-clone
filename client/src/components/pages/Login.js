import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const Login = () => {
  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h1 className="display-4">Login</h1>
        <Form>
          <Form.Group>
            <Form.Label>Handle</Form.Label>
            <Form.Control type="text" placeholder="Enter handle" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
