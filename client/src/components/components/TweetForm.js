import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const TweetForm = () => {
  const [text, setText] = useState("");

  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(text);
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
        />
      </Form.Group>
      <Button vatiant="primary" type="submit">
        Share
      </Button>
    </Form>
  );
};

export default TweetForm;
