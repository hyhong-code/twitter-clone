import React, { useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import TweetCard from "../components/TweetCard";
import { getUserTweets } from "../../actions/tweetActions";
import Spinner from "../layout/Spinner";

const Profile = ({ match, getUserTweets, tweets, history }) => {
  useEffect(() => {
    getUserTweets(match.params.id);
  }, [getUserTweets]);
  console.log(tweets);

  const handleClick = () => {
    history.goBack();
  };

  return !tweets.length ? (
    <Spinner />
  ) : (
    <Row>
      <Col md={{ spam: 8, offset: 2 }}>
        <Button className="my-3" variant="secondary" onClick={handleClick}>
          GO BACK
        </Button>
        <h2 className="display-4">@{tweets[0].user.handle}</h2>
        <p className="lead">{tweets.length} Tweets:</p>
        {tweets.map((tweet) => (
          <TweetCard key={tweet._id} tweet={tweet} />
        ))}
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tweets }) => ({ tweets });

export default connect(mapStateToProps, { getUserTweets })(Profile);
