import React from "react";
import { Card, Image, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteTweet } from "../../actions/tweetActions";

const CommentTweet = ({ tweet, user, deleteTweet }) => {
  return (
    tweet &&
    user && (
      <Card className="mb-3">
        {tweet.photo && (
          <Card.Img
            variant="top"
            src={process.env.PUBLIC_URL + `/uploads/tweets/${tweet.photo}`}
          ></Card.Img>
        )}
        <Card.Body className="py-2">
          <LinkContainer className="user" to={`/profile/${tweet.user._id}`}>
            <Card.Title>
              <Image
                src={
                  process.env.PUBLIC_URL +
                  `/uploads/users/${tweet.profile.photo}`
                }
                className="mr-2"
                roundedCircle
                width="35"
                alt="profilePic"
              />
              @{user.handle}
            </Card.Title>
          </LinkContainer>
          <Card.Text className="my-1 mt-0">{tweet.text}</Card.Text>
          <hr className="my-0" />
          <small className="text-muted d-block">
            <Moment format="YYYY/MM/DD h:mm">{tweet.createdAt}</Moment>
          </small>
          <Badge variant="secondary" className="ml-1">
            <i className="far fa-heart"></i> Likes {tweet.likes.length}
          </Badge>
          <Badge variant="secondary" className="ml-1">
            <i className="far fa-comment"></i> Comments {tweet.comments.length}
          </Badge>
          {user && user.id === tweet._id && (
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
    )
  );
};

export default connect(null, { deleteTweet })(CommentTweet);
