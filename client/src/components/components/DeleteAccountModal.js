import React, { Fragment, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { deleteUser } from "../../actions/authActions";

const DeleteAccountModal = ({ deleteUser }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [password, setPassword] = useState("");

  const handleChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleClick = () => {
    deleteUser(password);
  };

  return (
    <Fragment>
      <Button variant="danger" onClick={handleShow}>
        Delete Account
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Please confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your password"
              value={password}
              name={password}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClick}>
            Delete
          </Button>
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default connect(null, { deleteUser })(DeleteAccountModal);
