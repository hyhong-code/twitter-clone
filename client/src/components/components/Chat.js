import React, { Fragment, useEffect, useState } from "react";
import { Form, ListGroup, Button } from "react-bootstrap";
import io from "socket.io-client";
import { connect } from "react-redux";

import Message from "./Message";

let socket;

const Chat = ({ handle }) => {
  useEffect(() => {
    socket = io("/");
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setChats([...chats, message]);
    });
  });

  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState([]);

  const handleChange = (evt) => {
    setMsg(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    socket.emit("message", {
      name: handle,
      text: msg,
      date: new Date(Date.now()),
    });
    setMsg("");
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter message:</Form.Label>
          <Form.Control
            as="textarea"
            rows="2"
            value={msg}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="outline-dark" type="submit">
          Send
        </Button>
      </Form>

      <div className="message-board mt-3">
        <ListGroup>
          {chats.map((chat) => (
            <Message key={`${chat.name}-${chat.date}`} chat={chat} />
          ))}
        </ListGroup>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({
  auth: {
    user: { handle },
  },
}) => ({ handle });

export default connect(mapStateToProps)(Chat);
