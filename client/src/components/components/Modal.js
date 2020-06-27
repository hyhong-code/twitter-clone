import React from "react";
import { Modal, Button } from "react-bootstrap";

import Chat from "./Chat";

const _Modal = ({ show, handleClose }) => {
  return (
    <Modal
      className="chatModal"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Chat Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Chat />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default _Modal;
