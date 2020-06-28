import React, { useState, useRef } from "react";
import { Form } from "react-bootstrap";

const CommentForm = () => {
  const inputRef = useRef();
  const [text, setText] = useState("");

  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <p className="lead mt-2">Comment:</p>
        <Form.Control
          as="textarea"
          rows="2"
          value={text}
          onChange={handleChange}
          ref={inputRef}
        />
      </Form.Group>
      <Button vatiant="primary" className="mr-2 px-4" type="submit">
        Comment
      </Button>
    </Form>
  );
};

export default CommentForm;
