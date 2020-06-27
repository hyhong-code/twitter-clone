import React from "react";
import { Card, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Moment from "react-moment";
import { connect } from "react-redux";

import { deleteTweet } from "../../actions/tweetActions";
import example from "../../assets/img/example.jpeg";

const TweetCard = ({ tweet, user, deleteTweet }) => {
  const {
    text,
    createdAt,
    user: { handle, _id },
  } = tweet;
  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={example}></Card.Img>
      <Card.Body>
        <LinkContainer className="user" to={`/profile/${_id}`}>
          <Card.Title>@{handle}</Card.Title>
        </LinkContainer>
        <Card.Text className="my-1">{text}</Card.Text>
        <hr className="my-0" />
        <small className="text-muted">
          <Moment format="YYYY/MM/DD h:mm">{createdAt}</Moment>
        </small>
        {user && user.id === _id && (
          <Badge
            pill
            variant="danger"
            className="float-right mt-1"
            onClick={() => deleteTweet(tweet._id)}
          >
            X
          </Badge>
        )}
      </Card.Body>
    </Card>
  );
};

export default connect(null, { deleteTweet })(TweetCard);
