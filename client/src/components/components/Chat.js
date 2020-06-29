import React, { Fragment, useEffect, useState, useRef } from "react";
import { Form, ListGroup, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alertActions";
import io from "socket.io-client";

import Message from "./Message";

const Chat = ({ handle, setAlert }) => {
  const socketRef = useRef();
  const inputRef = useRef();
  const chatBoardRef = useRef();

  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    socketRef.current = io("/");

    socketRef.current.on("message", (message) => {
      console.log(message);
      setChats((prev) => [...prev, message]);
    });

    return () => socketRef.current.disconnect();
  }, []);

  useEffect(() => {
    // USE useEffect TO SIMULATE CLASS COMPONENT setState CALLBACK
    chatBoardRef.current.scrollTop = chatBoardRef.current.scrollHeight;
  }, [chats]);

  const handleChange = (evt) => {
    setMsg(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!msg.length) {
      setAlert(true, `Please enter something`, 2000);
    } else {
      socketRef.current.emit("message", {
        name: handle,
        text: msg,
        date: new Date(Date.now()),
      });
      setMsg("");
    }
    inputRef.current.focus();
  };

  return (
    <Fragment>
      <div className="message-board mt-3 border p-2" ref={chatBoardRef}>
        <ListGroup>
          {chats.map((chat) => (
            <Message key={`${chat.name}-${chat.date}`} chat={chat} />
          ))}
        </ListGroup>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            className="mt-1"
            type="text"
            value={msg}
            onChange={handleChange}
            ref={inputRef}
            minLength={1}
            placeholder="Enter message..."
          />
        </Form.Group>
        <Button variant="outline-dark" type="submit">
          Send
        </Button>
      </Form>
    </Fragment>
  );
};

const mapStateToProps = ({
  auth: {
    user: { handle },
  },
}) => ({ handle });

export default connect(mapStateToProps, { setAlert })(Chat);
