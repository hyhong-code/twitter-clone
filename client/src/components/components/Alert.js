import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const _Alert = ({ alert: { isError, msg } }) => {
  const [show, setShow] = useState(true);

  return (
    show && (
      <Alert
        variant={isError ? "danger" : "success"}
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading className="alert-head">
          {isError ? (
            <i className="fas fa-exclamation-circle"></i>
          ) : (
            <i className="fas fa-check-circle"></i>
          )}
          {isError ? " Error" : " Success"}
        </Alert.Heading>
        <p className="alert-text">{msg}</p>
      </Alert>
    )
  );
};

export default _Alert;
