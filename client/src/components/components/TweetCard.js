import React from "react";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Moment from "react-moment";
import { connect } from "react-redux";

import { deleteTweet } from "../../actions/tweetActions";

const TweetCard = ({ tweet, user, deleteTweet }) => {
  const {
    text,
    createdAt,
    user: { handle, _id },
  } = tweet;
  return (
    <Card className="mb-3">
      <Card.Body>
        <LinkContainer className="user" to={`/profile/${_id}`}>
          <Card.Title>@{handle}</Card.Title>
        </LinkContainer>
        <Card.Text className="my-1">{text}</Card.Text>
        <hr className="my-0" />
        <small className="text-muted">
          <Moment format="dddd, MMMM Do YYYY, h:mm:ss a">{createdAt}</Moment>
        </small>
        {user && user.id === _id && (
          <Button
            onClick={() => deleteTweet(tweet._id)}
            variant="danger"
            className="ml-3"
          >
            X
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default connect(null, { deleteTweet })(TweetCard);
