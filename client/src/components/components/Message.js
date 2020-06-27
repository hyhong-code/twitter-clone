import React from "react";
import { ListGroup } from "react-bootstrap";

const Message = ({ chat: { name, text, date } }) => {
  return (
    <ListGroup.Item>
      <div>
        <p className="message-user">@{name}</p>
        <p className="message">{text}</p>
        <small className="text-muted">{date}</small>
      </div>
    </ListGroup.Item>
  );
};

export default Message;
