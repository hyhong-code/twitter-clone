import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { createTweet } from "../../actions/tweetActions";

const TweetForm = ({ createTweet }) => {
  const inputRef = useRef();

  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose a Photo");

  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  const handleFile = (evt) => {
    console.log(evt.target.files[0]);
    setFileName(evt.target.files[0].name);
    setFile(evt.target.files[0]);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", text);
    if (await createTweet(formData)) {
      setText("");
      setFile("");
      setFileName("Choose a Photo");
    }
    inputRef.current.focus();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
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
        <Button vatiant="primary" className="mr-2 px-4" type="submit">
          Share
        </Button>
        <Form.File
          label={
            fileName.length <= 15 ? fileName : `${fileName.slice(0, 14)}...`
          }
          custom
          onChange={handleFile}
        />
      </div>
    </Form>
  );
};

export default connect(null, { createTweet })(TweetForm);
