import React from "react";
import { Modal, Button } from "react-bootstrap";

import Chat from "./Chat";
import { connect } from "react-redux";

const ChatModal = ({ show, handleClose, chatTarget }) => {
  return (
    <Modal
      className="chatModal"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        {chatTarget && (
          <Modal.Title>Chat with @{chatTarget.handle}</Modal.Title>
        )}
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

const mapStateToProps = ({ chat: { chatTarget } }) => ({ chatTarget });

export default connect(mapStateToProps)(ChatModal);
