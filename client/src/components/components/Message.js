import React from "react";
import { ListGroup } from "react-bootstrap";

const Message = () => {
  return (
    <ListGroup.Item>
      <div>
        <p className="message-user">@John-Doe</p>
        <p className="message">Hello there</p>
        <small className="text-muted">2020-06-27T09:48:34.793Z</small>
      </div>
    </ListGroup.Item>
  );
};

export default Message;
