import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import { getTweets } from "../../actions/tweetActions";
import TweetForm from "../components/TweetForm";
import TweetCard from "../components/TweetCard";
import Spinner from "../layout/Spinner";

const Home = ({ getTweets, isAuthenticated, user, tweets }) => {
  useEffect(() => {
    getTweets();
  }, [getTweets]);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return tweets.length ? (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <TweetForm />
        <div className="p-4">
          {tweets.map((tweet) => (
            <TweetCard key={tweet._id} tweet={tweet} user={user} />
          ))}
        </div>
      </Col>
    </Row>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({ auth: { isAuthenticated, user }, tweets }) => ({
  isAuthenticated,
  tweets,
  user,
});

export default connect(mapStateToProps, { getTweets })(Home);
