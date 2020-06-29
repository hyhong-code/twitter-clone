import React from "react";
import { Card, Badge, Image, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Moment from "react-moment";
import { connect } from "react-redux";

import { deleteTweet, likeTweet } from "../../actions/tweetActions";

const TweetCard = ({ tweet, user, deleteTweet, likeTweet }) => {
  const {
    text,
    createdAt,
    user: { handle, _id },
  } = tweet;

  return (
    <Card className="mb-3">
      {tweet.photo && (
        <Card.Img
          variant="top"
          src={process.env.PUBLIC_URL + `/uploads/tweets/${tweet.photo}`}
        ></Card.Img>
      )}
      <Card.Body className="py-2">
        <LinkContainer className="user" to={`/profile/${_id}`}>
          <Card.Title>
            <Image
              src={
                process.env.PUBLIC_URL + `/uploads/users/${tweet.profile.photo}`
              }
              className="mr-2"
              roundedCircle
              width="35"
              alt="profilePic"
            />
            @{handle}
          </Card.Title>
        </LinkContainer>
        <Card.Text className="my-1 mt-0">{text}</Card.Text>
        <hr className="my-0" />
        <small className="text-muted d-block">
          <Moment format="YYYY/MM/DD h:mm">{createdAt}</Moment>
        </small>
        <Button
          className={`py-0 mr-2 ${tweet.likes.includes(user.id) && "disabled"}`}
          onClick={() => likeTweet(tweet._id)}
        >
          <i className="far fa-heart"></i> Like
          <Badge variant="secondary" className="ml-1">
            {tweet.likes.length}
          </Badge>
        </Button>
        <LinkContainer to={`/comments/${tweet._id}`}>
          <Button className="py-0 ">
            <i className="far fa-comment"></i> Comment
            <Badge variant="secondary" className="ml-1">
              {tweet.comments.length}
            </Badge>
          </Button>
        </LinkContainer>
        {user && user.id === _id && (
          <Badge
            pill
            variant="danger"
            className="delete float-right mt-1"
            onClick={() => deleteTweet(tweet._id)}
          >
            X
          </Badge>
        )}
      </Card.Body>
    </Card>
  );
};

export default connect(null, { deleteTweet, likeTweet })(TweetCard);
