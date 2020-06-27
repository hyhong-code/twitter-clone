import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const Signup = () => {
  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h1 className="display-4">Signup</h1>
        <Form>
          <Form.Group>
            <Form.Label>Handle</Form.Label>
            <Form.Control type="text" placeholder="Enter handle" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" />
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
