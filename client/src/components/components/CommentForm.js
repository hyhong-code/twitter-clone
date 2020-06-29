import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { createComment } from "../../actions/commentAction";

const CommentForm = ({ createComment, commentingTweet }) => {
  const inputRef = useRef();
  const [text, setText] = useState("");

  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (await createComment({ text }, commentingTweet._id)) {
      setText("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <p className="lead mt-2">Add a comment:</p>
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

const mapStateToProps = ({ comments: { commentingTweet } }) => ({
  commentingTweet,
});

export default connect(mapStateToProps, { createComment })(CommentForm);
