import React, { useEffect, Fragment } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import TweetCard from "../components/TweetCard";
import { getUserTweets } from "../../actions/tweetActions";
import Spinner from "../layout/Spinner";

const Profile = ({ match, getUserTweets, tweets, history, user, loading }) => {
  useEffect(() => {
    getUserTweets(match.params.id);
  }, [getUserTweets, match.params.id]);

  const handleClick = () => {
    history.goBack();
  };

  const tweetsDisplay = tweets.length ? (
    <Fragment>
      <h2 className="display-4">@{tweets[0].user.handle}</h2>
      <p className="lead">User has {tweets.length} Tweets:</p>
      {tweets.map((tweet) => (
        <TweetCard key={tweet._id} tweet={tweet} user={user} />
      ))}
    </Fragment>
  ) : (
    <p className="lead">User has no tweets</p>
  );

  return loading ? (
    <Spinner />
  ) : (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <Button className="my-3" variant="secondary" onClick={handleClick}>
          GO BACK
        </Button>
        {tweetsDisplay}
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tweets, auth: { user }, loading }) => ({
  tweets,
  user,
  loading,
});

export default connect(mapStateToProps, { getUserTweets })(Profile);
