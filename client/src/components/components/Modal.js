import React from "react";
import { Modal, Button } from "react-bootstrap";

import Chat from "./Chat";

const _Modal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Chat />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">Send</Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default _Modal;
