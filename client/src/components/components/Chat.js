import React, { Fragment, useEffect, useState, useRef } from "react";
import { Form, ListGroup, Button } from "react-bootstrap";
import io from "socket.io-client";
import { connect } from "react-redux";

import Message from "./Message";

const Chat = ({ handle }) => {
  const inputRef = useRef();
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io("/");

    socketRef.current.on("message", (message) => {
      setChats((prev) => [message, ...prev]);
    });

    return () => socketRef.current.disconnect();
  }, []);

  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState([]);

  const handleChange = (evt) => {
    setMsg(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    socketRef.current.emit("message", {
      name: handle,
      text: msg,
      date: new Date(Date.now()),
    });
    setMsg("");
    inputRef.current.focus();
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter message:</Form.Label>
          <Form.Control
            type="text"
            value={msg}
            onChange={handleChange}
            ref={inputRef}
          />
        </Form.Group>
        <Button variant="outline-dark" type="submit">
          Send
        </Button>
      </Form>

      <div className="message-board mt-3 border p-2">
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
