import React, { useEffect } from "react";
import { connect } from "react-redux";
import TweetForm from "../components/TweetForm";
import { Row, Col } from "react-bootstrap";

import { getTweets } from "../../actions/tweetActions";

const Home = ({ getTweets }) => {
  useEffect(() => {
    getTweets();
  }, []);

  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <TweetForm />
      </Col>
    </Row>
  );
};

export default connect(null, { getTweets })(Home);
