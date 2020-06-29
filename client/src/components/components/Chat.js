import React, { Fragment, useEffect, useState, useRef } from "react";
import { Form, ListGroup, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alertActions";

import Message from "./Message";

const Chat = ({ handle, setAlert, chatTarget, socket, id }) => {
  const inputRef = useRef();
  const chatBoardRef = useRef();

  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState([]);

  // const socketRef = useRef();

  useEffect(() => {
    // socketRef.current = socket;
    socket.emit("startChat", {
      selfId: id,
      targetId: chatTarget._id,
      targetHandle: chatTarget.handle,
    });
    socket.on("message", (message) => {
      setChats((prev) => [...prev, message]);
    });
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
      socket.emit("message", {
        name: handle,
        text: msg,
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
    user: { handle, id },
  },
  chat: { chatTarget },
  socket,
}) => ({ handle, chatTarget, socket, id });

export default connect(mapStateToProps, { setAlert })(Chat);
