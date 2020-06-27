import React, { Fragment } from "react";
import { Form, ListGroup } from "react-bootstrap";

import Message from "./Message";

const Chat = () => {
  return (
    <Fragment>
      <Form.Group>
        <Form.Label>Enter message:</Form.Label>
        <Form.Control as="textarea" rows="2" />
      </Form.Group>
      <div className="message-board">
        <ListGroup>
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </ListGroup>
      </div>
    </Fragment>
  );
};

export default Chat;
