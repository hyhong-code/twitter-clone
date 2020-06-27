import React, { useState, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { createTweet } from "../../actions/tweetActions";

const TweetForm = ({ createTweet }) => {
  const inputRef = useRef();

  const [text, setText] = useState("");

  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (createTweet(text)) {
      setText("");
    }
    inputRef.current.focus();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <p className="lead mt-2">Share your thoughts</p>
        <Form.Control
          as="textarea"
          rows="3"
          value={text}
          onChange={handleChange}
          ref={inputRef}
        />
      </Form.Group>
      <div className="d-flex align-items-center">
        <Button vatiant="primary" className="mr-2" type="submit">
          Share
        </Button>
        <Form.File id="exampleFormControlFile1" />
      </div>
    </Form>
  );
};

export default connect(null, { createTweet })(TweetForm);
