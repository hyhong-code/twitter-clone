import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import TweetCard from "../components/TweetCard";
import { connect } from "react-redux";
import { getUserTweets } from "../../actions/tweetActions";
import Spinner from "../layout/Spinner";

const Profile = ({ match, getUserTweets, tweets }) => {
  useEffect(() => {
    getUserTweets(match.params.id);
  }, [getUserTweets]);
  console.log(tweets);

  return !tweets.length ? (
    <Spinner />
  ) : (
    <Row>
      <Col md={{ spam: 8, offset: 2 }}>
        <h2 className="display-4">@{tweets[0].user.handle}</h2>
        <p className="lead">Tweets:</p>
        {tweets.map((tweet) => (
          <TweetCard key={tweet._id} tweet={tweet} />
        ))}
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tweets }) => ({ tweets });

export default connect(mapStateToProps, { getUserTweets })(Profile);
