import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container } from "react-bootstrap";

import Navbar from "./layout/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <h1 className="display-4 mt-5 py-3">HELLO WORLD!</h1>
        <Button variant="primary">
          Let's code! <i className="fas fa-arrow-right"></i>
        </Button>
      </Container>
    </BrowserRouter>
  );
}

export default App;
