import React from "react";
import { ListGroup } from "react-bootstrap";
import Moment from "react-moment";

const Message = ({ chat: { name, text, date } }) => {
  return (
    <ListGroup.Item>
      <div>
        <p className="message-user">@{name}</p>
        <p className="message">{text}</p>
        <small className="text-muted">
          <Moment format="dddd, MMMM Do YYYY, h:mm:ss a">{date}</Moment>
        </small>
      </div>
    </ListGroup.Item>
  );
};

export default Message;
